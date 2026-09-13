// Erzeugt aus resources/source-icon.png die Vorlagen für capacitor-assets:
//   icon.png             quadratisches Icon (ältere Launcher)
//   icon-foreground.png  Motiv für adaptive Icons, im sicheren Bereich
//   icon-background.png  Hintergrundebene dahinter
//   splash.png           Startbild
// Android beschneidet adaptive Icons rund. Sichtbar ist nur die mittlere Fläche,
// deshalb sitzt das Motiv im Vordergrund kleiner als die Ebene selbst.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const here = p => fileURLToPath(new URL(p, import.meta.url));
const SRC = here('./source-icon.png');

// Der weiße Rand des Ausgangsbilds gehört nicht zum Motiv.
const CROP = { left: 43, top: 38, width: 1170, height: 1167 };
const SIZE = 1024;
const RADIUS = 178;          // Eckenrundung des Motivs
const SAFE = 0.68;           // Anteil der Ebene, den der runde Zuschnitt sicher zeigt

const square = await sharp(SRC).extract(CROP).resize(SIZE, SIZE).png().toBuffer();

// Die Ecken des Motivs sind weiß - wegmaskieren. Die Maske sitzt ein paar
// Pixel innerhalb der Kante, sonst bleibt ein heller Saum vom weißen Rand.
const INSET = 7;
const cornerMask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><rect x="${INSET}" y="${INSET}" ` +
  `width="${SIZE - 2 * INSET}" height="${SIZE - 2 * INSET}" ` +
  `rx="${RADIUS - INSET}" ry="${RADIUS - INSET}" fill="#fff"/></svg>`
);
const rounded = await sharp(square)
  .composite([{ input: cornerMask, blend: 'dest-in' }])
  .png().toBuffer();

// Vergrößerter Ausschnitt desselben Bildes: füllt die Ecken mit passenden
// Farben, statt einen Farbton zu raten, der zum Verlauf nicht passt.
// Grundlage ist das bereits maskierte Motiv, sonst wandert Weiß in die Ecken.
// Der Zoom ist groß genug, dass die runden Ecken des Motivs außerhalb des
// Ausschnitts liegen; das Ergebnis wird zusätzlich deckend gemacht, damit
// keine durchsichtigen Stellen übrig bleiben.
async function zoomed(blur = 0) {
  const big = Math.round(SIZE * 1.8);
  let img = sharp(rounded).resize(big, big).extract({
    left: Math.round((big - SIZE) / 2), top: Math.round((big - SIZE) / 2),
    width: SIZE, height: SIZE
  });
  if (blur) img = img.blur(blur);
  return img.flatten({ background: '#011023' }).png().toBuffer();
}

// 1) Quadratisches Icon (ältere Launcher, die nicht rund beschneiden):
// Motiv auf dem eigenen, weich weitergeführten Verlauf - so fällt die Kante
// zwischen Motiv und Eckfüllung nicht auf.
await sharp(await zoomed(22))
  .composite([{ input: rounded }])
  .png().toFile(here('./icon.png'));

// 2) Hintergrundebene: nur der weiche Verlauf.
await sharp(await zoomed(28)).png().toFile(here('./icon-background.png'));

// 3) Vordergrund: Motiv verkleinert auf durchsichtiger Fläche.
const inner = Math.round(SIZE * SAFE);
await sharp({
  create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
})
  .composite([{ input: await sharp(rounded).resize(inner, inner).png().toBuffer(), gravity: 'center' }])
  .png().toFile(here('./icon-foreground.png'));

// 4) Startbild: Motiv mittig auf dem Grundton der App, damit beim Start
// kein Farbsprung entsteht.
const SPLASH = 2732, badge = 900;
await sharp({
  create: { width: SPLASH, height: SPLASH, channels: 4, background: { r: 22, g: 20, b: 15, alpha: 1 } }
})
  .composite([{ input: await sharp(rounded).resize(badge, badge).png().toBuffer(), gravity: 'center' }])
  .png().toFile(here('./splash.png'));

console.log('icon.png, icon-background.png, icon-foreground.png, splash.png erzeugt');
