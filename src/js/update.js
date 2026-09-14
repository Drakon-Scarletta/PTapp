// Selbstaktualisierung der Android-App.
// Auf der Web-Seite liegt version.json neben der APK; die App vergleicht die
// dortige Versionsnummer mit der eigenen, lädt bei Bedarf herunter und übergibt
// die Datei dem Android-Installer.
import { registerPlugin, Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { Filesystem, Directory } from '@capacitor/filesystem';

const Updater = registerPlugin('Updater');

export const SITE = 'https://drakon-scarletta.github.io/PTapp';

export const canUpdate = () => Capacitor.isNativePlatform();

export async function currentVersion() {
  if (!canUpdate()) return null;
  const info = await CapApp.getInfo();
  return { code: parseInt(info.build, 10) || 0, name: info.version };
}

export async function fetchLatest() {
  // Der Zeitstempel verhindert, dass eine zwischengespeicherte Antwort kommt.
  const res = await fetch(`${SITE}/version.json?t=${Date.now()}`);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if (!data || typeof data.versionCode !== 'number' || !data.apk) {
    throw new Error('version.json unbrauchbar');
  }
  return data;
}

export async function check() {
  const [cur, latest] = await Promise.all([currentVersion(), fetchLatest()]);
  const res = { cur, latest, newer: !!cur && latest.versionCode > cur.code };
  merken(res);
  return res;
}

// ---- Stiller Blick beim Öffnen der App ----
// Ergebnis liegt hier; die Kopfzeile zeigt daraufhin ein Zeichen an.
let neuere = null;
let naechster = 0;              // frühester Zeitpunkt für den nächsten Blick
let laeuft = false;             // eine Abfrage ist unterwegs
const ABSTAND = 60 * 1000;      // jedes Hereinschauen, aber nicht öfter als einmal je Minute

export function updateHint() { return neuere; }

function merken(res) {
  neuere = res.newer ? res.latest : null;
  naechster = Date.now() + ABSTAND;
}

// Wird bei jedem Öffnen der App aufgerufen - beim Start und jedes Mal, wenn
// sie aus dem Hintergrund zurückkommt. Läuft nebenher und schweigt bei
// Fehlern: ohne Netz, ohne erreichbare Seite oder in der Web-Fassung gibt es
// eben keinen Hinweis. Die Minutensperre fängt nur doppelte Meldungen des
// Systems ab, sonst wird wirklich jedes Mal nachgesehen.
export async function checkQuietly(force) {
  if (!canUpdate()) return null;
  if (!navigator.onLine) return null;
  if (laeuft) return neuere;
  if (!force && Date.now() < naechster) return neuere;
  laeuft = true;
  try {
    await check();
  } catch (e) {
    naechster = Date.now() + ABSTAND;
  } finally {
    laeuft = false;
  }
  return neuere;
}

// Filesystem.downloadFile gilt ab 7.1 als veraltet; der empfohlene Ersatz
// (@capacitor/file-transfer) setzt Capacitor 8 voraus. Bis dahin bleibt dies
// der Weg, der ohne Versionssprung funktioniert.
export async function download(latest, onProgress) {
  let handle = null;
  try {
    handle = await Filesystem.addListener('progress', p => {
      if (onProgress && p && p.contentLength) {
        onProgress(Math.min(100, Math.round((p.bytes / p.contentLength) * 100)));
      }
    });
  } catch (e) { /* ohne Fortschrittsanzeige weitermachen */ }

  try {
    const res = await Filesystem.downloadFile({
      url: `${SITE}/${latest.apk}`,
      path: latest.apk,
      directory: Directory.Cache,
      progress: true
    });
    if (!res || !res.path) throw new Error('Download ohne Ergebnis');
    return res.path;
  } finally {
    if (handle) { try { await handle.remove(); } catch (e) { /* egal */ } }
  }
}

// Gibt false zurück, wenn Android die Installation noch nicht erlaubt;
// die Einstellung dafür wird dann geöffnet.
export async function install(path) {
  const { granted } = await Updater.canInstall();
  if (!granted) {
    await Updater.openInstallSettings();
    return false;
  }
  await Updater.install({ path });
  return true;
}

// Aufgeräumt wird beim nächsten Start: eine alte Datei im Zwischenspeicher
// würde sonst liegen bleiben.
export async function cleanup(name) {
  try { await Filesystem.deleteFile({ path: name, directory: Directory.Cache }); }
  catch (e) { /* war nicht da */ }
}
