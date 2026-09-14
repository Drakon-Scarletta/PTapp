// Persistenz. Auf dem Gerät schreibt Preferences in den App-Speicher,
// im Browser fällt dasselbe Plugin auf localStorage zurück.
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { SEED_EQUIPMENT, SEED_EXERCISES, SEED_PLANS } from './data.js';
import { detectLang } from './i18n.js';

const KEY = 'training:v2';   // Schlüsselname bleibt, der Inhalt ist versioniert
const FOLDER = 'PTapp';
export const APP_NAME = 'PTapp';
export const APP_VERSION = '2.4';
const STATE_VERSION = 5;

export const isNative = () => Capacitor.isNativePlatform();

export function freshState() {
  return {
    v: STATE_VERSION,
    lang: detectLang(),
    pw: 4.5,
    next: 'A',
    nights: {},
    log: {},
    kg: {},
    equipment: SEED_EQUIPMENT.map(e => ({ ...e })),
    exercises: SEED_EXERCISES.map(e => ({ ...e, bands: e.bands ? [...e.bands] : undefined })),
    plans: SEED_PLANS.map(p => ({ ...p, items: p.items.map(i => ({ ...i })) })),
    ai: { provider: 'anthropic', model: '', keys: { anthropic: '', openai: '' } },
    chat: [],
    body: [],                 // Körpergewicht: { d: 'JJJJ-MM-TT', kg: Zahl }
    prefs: {
      restOn: true,
      restSec: 90,
      onboarded: false,
      reminder: { on: false, days: [0, 2, 4], hour: 18, minute: 0 }
    }
  };
}

export async function loadState() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    if (!value) return freshState();
    return migrate(JSON.parse(value));
  } catch (e) {
    console.warn('Laden fehlgeschlagen:', e);
    return freshState();
  }
}

export async function saveState(state) {
  await Preferences.set({ key: KEY, value: JSON.stringify(state) });
}

// Hebt ältere Stände auf die aktuelle Form. Übungs- und Plan-Kennungen bleiben
// gleich, damit der bestehende Verlauf weiter aufgelöst werden kann.
function migrate(raw) {
  const s = Object.assign(freshState(), raw);

  // v1: abgehakte Übungen waren true statt einer Satzzahl.
  Object.values(s.log || {}).forEach(e => {
    if (!e || !e.t) return;
    Object.keys(e.t).forEach(id => { if (e.t[id] === true) e.t[id] = 3; });
  });

  if (!raw.v || raw.v < 3) {
    // v2 kannte nur ein globales Plattengewicht und fest eingebaute Pläne.
    s.equipment = SEED_EQUIPMENT.map(e => ({ ...e }));
    const stack = s.equipment.find(e => e.id === 'stack');
    if (stack && typeof raw.pw === 'number') stack.plate = raw.pw;
    s.exercises = SEED_EXERCISES.map(e => ({ ...e, bands: e.bands ? [...e.bands] : undefined }));
    s.plans = SEED_PLANS.map(p => ({ ...p, items: p.items.map(i => ({ ...i })) }));
  }

  // Fehlende Teile ergänzen, ohne Vorhandenes zu überschreiben.
  if (!Array.isArray(s.equipment) || !s.equipment.length) s.equipment = SEED_EQUIPMENT.map(e => ({ ...e }));
  if (!Array.isArray(s.exercises)) s.exercises = [];
  if (!Array.isArray(s.plans)) s.plans = [];
  if (!s.ai) s.ai = { provider: 'anthropic', model: '', keys: { anthropic: '', openai: '' } };
  if (!s.ai.keys) s.ai.keys = { anthropic: '', openai: '' };
  if (!s.lang) s.lang = detectLang();
  if (!Array.isArray(s.chat)) s.chat = [];
  if (!Array.isArray(s.body)) s.body = [];
  // Muskelgruppen kamen später dazu - bei eingebauten Übungen nachtragen.
  SEED_EXERCISES.forEach(seed => {
    const vorhanden = s.exercises.find(e => e.id === seed.id);
    if (vorhanden && !vorhanden.muscle && seed.muscle) vorhanden.muscle = seed.muscle;
  });
  const p = freshState().prefs;
  s.prefs = Object.assign({}, p, s.prefs || {});
  s.prefs.reminder = Object.assign({}, p.reminder, s.prefs.reminder || {});

  s.v = STATE_VERSION;
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
  const data = JSON.stringify(
    { app: 'ptapp', version: STATE_VERSION, exported: new Date().toISOString(), state },
    null, 2
  );
  const name = `ptapp-${stamp()}.json`;

  if (!isNative()) { downloadInBrowser(name, data); return { name, path: 'Download' }; }
  return writeAndShare(name, data);
}

// Datei ablegen und das Teilen-Menü öffnen. Gemeinsam für Sicherung und Tabelle.
async function writeAndShare(name, data) {
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
      await Share.share({ title: APP_NAME, url: res.uri, dialogTitle: APP_NAME });
    }
  } catch (e) { /* Teilen abgebrochen ist kein Fehler */ }

  return { name, path: `${FOLDER}` };
}

// Die Einheiten als Tabelle, eine Zeile je Übung und Tag - zum Weiterrechnen
// in einer Tabellenkalkulation.
export async function exportCsv(state, resolve) {
  const trenner = ';';
  const zeilen = [['Datum', 'Plan', 'Uebung', 'Saetze', 'Wiederholungen', 'Gewicht', 'Einheit',
    'Abgeschlossen', 'Dauer_min', 'Notiz'].join(trenner)];

  Object.keys(state.log).sort().forEach(d => {
    const e = state.log[d];
    if (!e || !e.t) return;
    const dauer = e.start && e.end ? Math.max(1, Math.round((e.end - e.start) / 60000)) : '';
    Object.keys(e.t).forEach(exId => {
      const info = resolve(exId, e);
      zeilen.push([
        d,
        csv(resolve.planName(e.k)),
        csv(info.name),
        e.t[exId],
        ((e.r && e.r[exId]) || []).join('/'),
        e.w && e.w[exId] != null ? String(e.w[exId]).replace('.', ',') : '',
        csv(info.unit),
        e.done ? 'ja' : 'nein',
        dauer,
        csv(e.n || '')
      ].join(trenner));
    });
  });

  const data = '﻿' + zeilen.join('\r\n') + '\r\n';   // BOM für Excel
  const name = `ptapp-${stamp()}.csv`;
  if (!isNative()) { downloadInBrowser(name, data, 'text/csv'); return { name }; }
  return writeAndShare(name, data);
}

function csv(text) {
  const s = String(text == null ? '' : text);
  return /[;"\r\n]/.test(s) ? '"' + s.split('"').join('""') + '"' : s;
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
  if (!state || typeof state !== 'object' || !('log' in state)) throw new Error('kein gültiges Format');
  return migrate(state);
}

async function ensureFolder(dir) {
  try { await Filesystem.mkdir({ path: FOLDER, directory: dir, recursive: true }); }
  catch (e) { /* existiert bereits */ }
}

function downloadInBrowser(name, data, typ) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: typ || 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
