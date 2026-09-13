// Optionen → Aktualisierung: nachsehen, herunterladen, installieren.
import { t, getLang } from '../i18n.js';
import { APP_VERSION } from '../store.js';
import { canUpdate, check, download, install, cleanup, SITE } from '../update.js';
import { esc, byId, toast } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let state = 'idle';        // idle | checking | current | found | loading | ready
let latest = null;
let installed = null;
let percent = 0;
let apkPath = null;

export function reset() {
  if (state === 'loading') return;   // einen laufenden Download nicht wegwerfen
  state = 'idle';
  latest = null;
  percent = 0;
  apkPath = null;
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1).toLocaleString() + ' MB';
}
function notesOf(info) {
  if (!info || !info.notes) return '';
  return info.notes[getLang()] || info.notes.de || info.notes.en || '';
}

export function render(mount, head, backBar, goHub) {
  const body = canUpdate() ? nativeBody() : '<p class="intro">' + esc(t('upd.webSelfUpdates')) + '</p>';

  mount.innerHTML = head() + backBar(t('upd.title')) +
    '<p class="intro">' + esc(t('upd.installed', {
      version: installed ? installed.name : APP_VERSION
    })) + '</p>' + body;

  byId('back').addEventListener('click', goHub);
  wire();
}

function nativeBody() {
  if (state === 'checking') {
    return '<button class="set-btn" disabled>' + esc(t('upd.checking')) + '</button>';
  }
  if (state === 'current') {
    return '<p class="intro">' + esc(t('upd.upToDate')) + '</p>' +
      '<button class="set-btn" id="check">' + esc(t('upd.check')) + '</button>';
  }
  if (state === 'found' || state === 'loading' || state === 'ready') {
    const notes = notesOf(latest);
    return '<h3 class="sec">' + esc(t('upd.available', { version: latest.versionName })) + '</h3>' +
      (notes ? '<p class="intro">' + esc(notes) + '</p>' : '') +
      (latest.size ? '<p class="intro">' + esc(mb(latest.size)) + '</p>' : '') +
      (state === 'loading'
        ? '<div class="bar"><div class="bar-in" style="width:' + percent + '%"></div></div>' +
          '<button class="set-btn" disabled>' + esc(t('upd.downloading', { percent })) + '</button>'
        : state === 'ready'
          ? '<button class="set-btn go" id="doinstall">' + esc(t('upd.install')) + '</button>' +
            '<p class="fld-h">' + esc(t('upd.installHint')) + '</p>'
          : '<button class="set-btn go" id="dodownload">' + esc(t('upd.download')) + '</button>');
  }
  return '<button class="set-btn" id="check">' + esc(t('upd.check')) + '</button>';
}

function wire() {
  const check$ = byId('check');
  if (check$) check$.addEventListener('click', runCheck);

  const dl = byId('dodownload');
  if (dl) dl.addEventListener('click', runDownload);

  const inst = byId('doinstall');
  if (inst) inst.addEventListener('click', runInstall);
}

async function runCheck() {
  state = 'checking';
  rerender();
  try {
    const res = await check();
    installed = res.cur;
    latest = res.latest;
    state = res.newer ? 'found' : 'current';
  } catch (e) {
    state = 'idle';
    toast(t('upd.failed', { msg: e.message }), true);
  }
  rerender();
}

async function runDownload() {
  state = 'loading';
  percent = 0;
  rerender();
  try {
    await cleanup(latest.apk);
    apkPath = await download(latest, p => {
      if (p !== percent) { percent = p; rerender(); }
    });
    state = 'ready';
  } catch (e) {
    state = 'found';
    toast(t('upd.failed', { msg: e.message }), true);
  }
  rerender();
}

async function runInstall() {
  try {
    const ok = await install(apkPath);
    if (!ok) toast(t('upd.needPermission'), true);
  } catch (e) {
    toast(t('upd.failed', { msg: e.message }), true);
  }
}

export { SITE };
