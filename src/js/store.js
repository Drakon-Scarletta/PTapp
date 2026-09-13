// Persistenz. Auf dem Gerät schreibt Preferences in den App-Speicher,
// im Browser fällt dasselbe Plugin auf localStorage zurück.
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const KEY = 'training:v2';
const FOLDER = 'PTapp';

export const isNative = () => Capacitor.isNativePlatform();

export const DEFAULT_STATE = { log: {}, kg: {}, next: 'A', nights: {}, pw: 4.5 };

export async function loadState() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    if (!value) return { ...DEFAULT_STATE };
    return migrate(Object.assign({ ...DEFAULT_STATE }, JSON.parse(value)));
  } catch (e) {
    console.warn('Laden fehlgeschlagen:', e);
    return { ...DEFAULT_STATE };
  }
}

export async function saveState(state) {
  await Preferences.set({ key: KEY, value: JSON.stringify(state) });
}

// Ältere Einträge hatten t[id] === true statt einer Satzzahl.
function migrate(s) {
  Object.values(s.log || {}).forEach(e => {
    if (!e || !e.t) return;
    Object.keys(e.t).forEach(id => { if (e.t[id] === true) e.t[id] = 3; });
  });
  return s;
}

function stamp() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

// ---- Sicherung ----
// Ältere Android-Versionen lassen den öffentlichen Dokumente-Ordner nicht ohne
// Berechtigung zu. Dann landet die Sicherung im App-Ordner und wird geteilt.
const DIRS = [Directory.Documents, Directory.Data];
let backupDir = DIRS[0];

export async function exportBackup(state) {
  const data = JSON.stringify({ app: 'ptapp', version: 1, exported: new Date().toISOString(), state }, null, 2);
  const name = `ptapp-${stamp()}.json`;

  if (!isNative()) { downloadInBrowser(name, data); return { name, path: 'Download-Ordner' }; }

  let res = null, lastErr = null;
  for (const dir of DIRS) {
    try {
      await ensureFolder(dir);
      res = await Filesystem.writeFile({
        path: `${FOLDER}/${name}`, data, directory: dir, encoding: Encoding.UTF8
      });
      backupDir = dir;
      break;
    } catch (e) { lastErr = e; }
  }
  if (!res) throw lastErr || new Error('Kein Schreibzugriff');

  try {
    if ((await Share.canShare()).value) {
      await Share.share({ title: 'PTapp Sicherung', url: res.uri, dialogTitle: 'Sicherung teilen' });
    }
  } catch (e) { /* Teilen abgebrochen ist kein Fehler */ }

  return { name, path: backupDir === Directory.Documents ? `Dokumente/${FOLDER}` : `App-Ordner/${FOLDER}` };
}

export async function listBackups() {
  if (!isNative()) return [];
  const seen = new Map();
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readdir({ path: FOLDER, directory: dir });
      (res.files || []).forEach(f => {
        const name = typeof f === 'string' ? f : f.name;
        if (name.endsWith('.json') && !seen.has(name)) seen.set(name, { name, dir });
      });
    } catch (e) { /* Ordner gibt es dort nicht */ }
  }
  return [...seen.values()].sort((a, b) => b.name.localeCompare(a.name));
}

export async function readBackup(name) {
  let lastErr = null;
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readFile({
        path: `${FOLDER}/${name}`, directory: dir, encoding: Encoding.UTF8
      });
      return parseBackup(res.data);
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('Datei nicht gefunden');
}

export function parseBackup(text) {
  const obj = JSON.parse(text);
  const state = obj && obj.state ? obj.state : obj;
  if (!state || typeof state !== 'object' || !('log' in state)) throw new Error('Keine gültige Sicherung');
  return migrate(Object.assign({ ...DEFAULT_STATE }, state));
}

async function ensureFolder(dir) {
  try { await Filesystem.mkdir({ path: FOLDER, directory: dir, recursive: true }); }
  catch (e) { /* existiert bereits */ }
}

function downloadInBrowser(name, data) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
