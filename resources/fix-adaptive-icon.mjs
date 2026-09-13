// capacitor-assets setzt beide Icon-Ebenen zusätzlich um 16,7 % ein.
// Unsere Vorlagen sind bereits richtig bemessen (Motiv im sicheren Bereich),
// der zweite Einzug würde es unnötig schrumpfen. Also flach referenzieren.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const RES = fileURLToPath(new URL('../android/app/src/main/res/mipmap-anydpi-v26/', import.meta.url));

const xml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`;

for (const name of ['ic_launcher.xml', 'ic_launcher_round.xml']) {
  await writeFile(RES + name, xml, 'utf8');
  console.log('ohne Einzug geschrieben:', name);
}
