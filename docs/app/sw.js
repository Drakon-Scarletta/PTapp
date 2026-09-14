// Erzeugt von build-site.mjs - nicht von Hand ändern.
const CACHE = 'ptapp-2.8-mu1b2ux4';
const ASSETS = [
  "./",
  "css/app.css",
  "css/fonts.css",
  "fonts/Barlow-400-latin-ext.woff2",
  "fonts/Barlow-400-latin.woff2",
  "fonts/Barlow-500-latin-ext.woff2",
  "fonts/Barlow-500-latin.woff2",
  "fonts/Barlow-600-latin-ext.woff2",
  "fonts/Barlow-600-latin.woff2",
  "fonts/BarlowCondensed-500-latin-ext.woff2",
  "fonts/BarlowCondensed-500-latin.woff2",
  "fonts/BarlowCondensed-600-latin-ext.woff2",
  "fonts/BarlowCondensed-600-latin.woff2",
  "fonts/BarlowCondensed-700-latin-ext.woff2",
  "fonts/BarlowCondensed-700-latin.woff2",
  "icons/icon-192.png",
  "index.html",
  "js/app.js",
  "js/part-3PP7HME7.js",
  "js/part-CJEYMYTV.js",
  "js/part-DA66V5EW.js",
  "js/part-ED4TTFRM.js",
  "js/part-H6H5WROY.js",
  "js/part-JEYNSYVW.js",
  "js/part-MJLH4ETE.js",
  "js/part-MOS4NO2Z.js",
  "js/part-MTR7NSI3.js",
  "js/part-NP5MIX7G.js",
  "js/part-NTKUDOCD.js",
  "js/part-R7XNFKS3.js",
  "js/part-RW2RFTHW.js",
  "js/part-UZ3PHKCF.js",
  "js/part-V4SJM3LU.js",
  "js/part-W64CD333.js",
  "manifest.webmanifest"
];

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
