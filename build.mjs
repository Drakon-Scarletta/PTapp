// Bündelt src/js mitsamt den Capacitor-Plugins nach www/js/app.js.
// Ohne diesen Schritt fehlen im APK die Plugin-Brücken (Speicher, Dateien, Teilen).
import { build, context } from 'esbuild';
import { rm } from 'node:fs/promises';

// Für die APK ohne Sourcemap - die braucht dort niemand.
const release = process.argv.includes('--release');
if (release) await rm('www/js/app.js.map', { force: true });

const options = {
  entryPoints: ['src/js/app.js'],
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  outfile: 'www/js/app.js',
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
