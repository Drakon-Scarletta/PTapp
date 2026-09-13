// Bündelt src/js mitsamt den Capacitor-Plugins nach www/js.
// Ohne diesen Schritt fehlen im APK die Plugin-Brücken (Speicher, Dateien, Teilen).
// Der KI-Teil wird in ein eigenes Stück gelegt und erst beim Öffnen der
// KI-Seite nachgeladen - er ist um ein Vielfaches größer als der Rest.
import { build, context } from 'esbuild';
import { rm, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const release = process.argv.includes('--release');

// Alte Teilstücke wegräumen, ihre Namen enthalten einen Inhalts-Hash.
try {
  for (const f of await readdir('www/js')) await unlink(join('www/js', f));
} catch (e) { /* Ordner gibt es beim ersten Lauf noch nicht */ }
if (release) await rm('www/js/app.js.map', { force: true });

const options = {
  entryPoints: ['src/js/app.js'],
  bundle: true,
  splitting: true,
  format: 'esm',
  target: ['es2020'],
  outdir: 'www/js',
  chunkNames: 'part-[hash]',
  sourcemap: !release,
  legalComments: 'none',
  logLevel: 'info'
};

if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  await ctx.watch();
  console.log('Beobachte src/js …');
} else {
  await build(options);
}
