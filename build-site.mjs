// Baut die Seite unter docs/ für GitHub Pages:
//   docs/index.html      Startseite mit APK-Download und Link zur Web-Version
//   docs/app/            die App selbst, im Browser lauffähig und installierbar
//   docs/PTapp-<v>.apk   die fertige Android-App zum Herunterladen
import { cp, mkdir, rm, writeFile, readFile, readdir, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('./', import.meta.url));
const p = (...s) => join(root, ...s);
// Die Version kommt aus dem Android-Projekt, damit Dateiname und App übereinstimmen.
const gradle = await readFile(p('android/app/build.gradle'), 'utf8');
const VERSION = (/versionName\s+"([^"]+)"/.exec(gradle) || [, '1.0'])[1];
const APK_SRC = p('android/app/build/outputs/apk/release/app-release.apk');
const APK_NAME = `PTapp-${VERSION}.apk`;

await rm(p('docs'), { recursive: true, force: true });
await mkdir(p('docs/app'), { recursive: true });

// --- Die App selbst ---
await cp(p('www'), p('docs/app'), { recursive: true });

// Icons für den Startbildschirm.
await mkdir(p('docs/app/icons'), { recursive: true });
for (const size of [192, 512]) {
  await sharp(p('resources/icon.png')).resize(size, size)
    .png().toFile(p(`docs/app/icons/icon-${size}.png`));
}
// Maskierbares Icon: Motiv kleiner, damit Android es beschneiden kann.
await sharp({
  create: { width: 512, height: 512, channels: 4, background: { r: 1, g: 16, b: 35, alpha: 1 } }
})
  .composite([{ input: await sharp(p('resources/icon.png')).resize(348, 348).png().toBuffer(), gravity: 'center' }])
  .png().toFile(p('docs/app/icons/icon-maskable.png'));

await writeFile(p('docs/app/manifest.webmanifest'), JSON.stringify({
  name: 'PTapp',
  short_name: 'PTapp',
  description: 'Trainingsplan mit Sätzen, Gewichten und Verlauf',
  start_url: './',
  scope: './',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#16140F',
  theme_color: '#16140F',
  lang: 'de',
  icons: [
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2));

// --- Service Worker: alles einmal laden, danach offline ---
async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if ((await stat(full)).isDirectory()) out.push(...await walk(full));
    else out.push(relative(p('docs/app'), full).split('\\').join('/'));
  }
  return out;
}
const assets = (await walk(p('docs/app'))).filter(f => !f.endsWith('.map'));
const cacheName = `ptapp-${VERSION}-${Date.now().toString(36)}`;

await writeFile(p('docs/app/sw.js'), `// Erzeugt von build-site.mjs - nicht von Hand ändern.
const CACHE = '${cacheName}';
const ASSETS = ${JSON.stringify(['./', ...assets], null, 2)};

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Seiten immer zuerst aus dem Netz holen, damit eine neue Fassung ankommt;
// ohne Verbindung aus dem Zwischenspeicher. Alles andere umgekehrt.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate';
  if (isPage) {
    e.respondWith(fetch(e.request).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});
`);

// Manifest und Icon in die App-Seite eintragen (die APK-Fassung braucht das nicht).
const page = await readFile(p('docs/app/index.html'), 'utf8');
await writeFile(p('docs/app/index.html'), page.replace(
  '</head>',
  '  <link rel="manifest" href="manifest.webmanifest">\n' +
  '  <link rel="apple-touch-icon" href="icons/icon-192.png">\n' +
  '  <meta name="apple-mobile-web-app-capable" content="yes">\n' +
  '  <meta name="apple-mobile-web-app-status-bar-style" content="black">\n' +
  '</head>'
));

// --- APK ---
let apkSize = null;
if (existsSync(APK_SRC)) {
  await copyFile(APK_SRC, p('docs', APK_NAME));
  apkSize = (await stat(APK_SRC)).size;
} else {
  console.warn('Keine APK gefunden - erst build-apk.cmd ausführen.');
}

// --- Startseite ---
const mb = apkSize ? (apkSize / 1024 / 1024).toFixed(1).replace('.', ',') : null;
// Kleines Icon für die Seite - die 1024er Vorlage wäre unnötiger Ballast.
await sharp(p('resources/icon.png')).resize(320, 320).png().toFile(p('docs/icon.png'));
await writeFile(p('docs/index.html'), landingPage({ version: VERSION, apk: apkSize ? APK_NAME : null, mb }));

console.log('docs/ gebaut' + (apkSize ? ` (inkl. ${APK_NAME}, ${mb} MB)` : ' (ohne APK)'));

function landingPage({ version, apk, mb }) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>PTapp</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#16140F">
<meta name="description" content="Trainingsplan mit Sätzen, Gewichten und Verlauf - als Android-App oder im Browser.">
<link rel="icon" href="icon.png">
<link rel="stylesheet" href="app/css/fonts.css">
<style>
  :root { --ink:#16140F; --ink-2:#211E17; --line:#3A3026; --decal:#E9E4D4;
          --muted:#8C8272; --signal:#F0B90B; --blue:#2E8BE0; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--ink); color:var(--decal);
         font-family:'Barlow',system-ui,sans-serif; line-height:1.5; }
  main { max-width:460px; margin:0 auto; padding:40px 20px 56px; }
  .top { text-align:center; }
  .top img { width:112px; height:112px; border-radius:24px; display:block; margin:0 auto 16px; }
  h1 { font-family:'Barlow Condensed',sans-serif; font-size:40px; font-weight:700;
       margin:0; letter-spacing:.01em; }
  .sub { color:var(--muted); font-size:15px; margin:4px 0 30px; }
  a.btn { display:block; text-decoration:none; text-align:center;
          font-family:'Barlow Condensed',sans-serif; font-size:19px; font-weight:700;
          padding:16px; border-radius:4px; margin-bottom:10px; }
  a.primary { background:var(--signal); color:#241D02; }
  a.ghost { background:var(--ink-2); color:var(--decal); border:1px solid var(--line); }
  a.btn small { display:block; font-family:'Barlow',sans-serif; font-size:12.5px;
                font-weight:500; opacity:.72; margin-top:2px; }
  section { margin-top:34px; }
  h2 { font-family:'Barlow Condensed',sans-serif; font-size:21px; font-weight:700; margin:0 0 8px; }
  ol, ul { margin:0; padding-left:20px; font-size:14.5px; color:#C9C2B1; }
  li { margin-bottom:6px; }
  p.note { font-size:13.5px; color:var(--muted); }
  footer { margin-top:38px; padding-top:16px; border-top:1px solid var(--line);
           font-size:12.5px; color:var(--muted); text-align:center; }
  footer a { color:var(--muted); }
</style>
</head>
<body>
<main>
  <div class="top">
    <img src="icon.png" alt="">
    <h1>PTapp</h1>
    <div class="sub">Trainingsplan mit Sätzen, Gewichten und Verlauf</div>
  </div>

  <a class="btn primary" href="app/">Im Browser öffnen<small>Läuft sofort, auch offline</small></a>
${apk
    ? `  <a class="btn ghost" href="${apk}" download>Android-App laden<small>APK, ${mb} MB &middot; Version ${version}</small></a>`
    : '  <!-- keine APK gebaut -->'}

  <section>
    <h2>Auf den Startbildschirm legen</h2>
    <p class="note">Der einfachere Weg, ganz ohne Installation:</p>
    <ol>
      <li>Oben <b>Im Browser öffnen</b> antippen.</li>
      <li>Im Chrome-Menü (drei Punkte) <b>Zum Startbildschirm hinzufügen</b> wählen.</li>
      <li>Fertig — eigenes Icon, eigener Vollbildstart, funktioniert ohne Netz.</li>
    </ol>
  </section>

${apk
    ? `  <section>
    <h2>Oder als APK installieren</h2>
    <ol>
      <li><b>Android-App laden</b> antippen und den Download bestätigen.</li>
      <li>Die Datei aus der Download-Leiste öffnen.</li>
      <li>Android fragt nach der Erlaubnis für Apps aus dieser Quelle — erlauben.</li>
    </ol>
    <p class="note">Die App ist selbst signiert, nicht aus dem Play Store. Die Warnung
    dabei ist normal.</p>
  </section>`
    : ''}

  <section>
    <h2>Gut zu wissen</h2>
    <ul>
      <li>Alle Daten bleiben auf dem Gerät. Kein Konto, keine Cloud.</li>
      <li>Browser-Fassung und installierte App führen <b>getrennte</b> Verläufe.
          Zum Umziehen: <i>Mehr → Daten sichern</i>, dann drüben einlesen.</li>
    </ul>
  </section>

  <footer>
    Version ${version} &middot;
    <a href="https://github.com/Drakon-Scarletta/PTapp">Quellcode auf GitHub</a>
  </footer>
</main>
</body>
</html>
`;
}
