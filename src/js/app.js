// Einstieg: Ansichtswechsel, Android-Zurück-Taste, Tageswechsel.
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import * as st from './state.js';
import { t, locale } from './i18n.js';
import { APP_NAME } from './store.js';
import * as plan from './views/plan.js';
import * as log from './views/log.js';
import * as options from './views/options.js';
import { toast, esc } from './ui.js';

const VIEWS = { plan, log, options };
const LABEL = { plan: 'nav.plan', log: 'nav.log', options: 'nav.options' };
let view = 'plan';
const mount = document.getElementById('app');

function head() {
  return '<div class="tp-head"><h1>' + esc(APP_NAME) + '</h1><div class="tp-date">' +
    esc(st.today.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' })) +
    '</div></div>' +
    '<div class="tp-nav">' +
      Object.keys(VIEWS).map(v =>
        '<button data-view="' + v + '" class="' + (v === view ? 'sel' : '') + '">' +
        esc(t(LABEL[v])) + '</button>'
      ).join('') +
    '</div>';
}

function render() {
  const scroll = window.scrollY;
  VIEWS[view].render(head, mount);
  document.querySelectorAll('[data-view]').forEach(b => {
    b.addEventListener('click', () => setView(b.dataset.view));
  });
  window.scrollTo(0, scroll);
}

async function setView(v) {
  // Nochmal auf den aktiven Reiter tippen führt zurück auf dessen Startseite.
  if (v === view) {
    if (v === 'options') { options.resetSub(); render(); }
    if (v === 'log') { log.resetSelection(); render(); }
    return;
  }
  view = v;
  if (v === 'log') log.resetSelection();
  if (v === 'options') { options.resetSub(); await options.refresh(); }
  render();
}

document.addEventListener('rerender', render);
st.onChange(render);

// Android: Zurück führt erst in die Trainingsansicht, dann aus der App.
async function wireNative() {
  if (!Capacitor.isNativePlatform()) return;
  await CapApp.addListener('backButton', () => {
    if (view !== 'plan') setView('plan');
    else CapApp.exitApp();
  });
  await CapApp.addListener('appStateChange', ({ isActive }) => {
    if (isActive && st.refreshDay()) render();
  });
  try {
    await StatusBar.setBackgroundColor({ color: '#16140F' });
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) { /* ältere Geräte */ }
}

// Nur die Web-Fassung: Service Worker, damit die App vom Startbildschirm aus
// auch ohne Verbindung startet. Im APK übernimmt das Capacitor.
function wireServiceWorker() {
  if (Capacitor.isNativePlatform()) return;
  if (!('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;
  navigator.serviceWorker.register('sw.js').catch(() => { /* z. B. lokaler Entwicklungsserver */ });
}

// Falls die App über Mitternacht offen bleibt.
setInterval(() => { if (st.refreshDay()) render(); }, 60000);

(async function start() {
  try {
    await st.init();
  } catch (e) {
    toast(t('data.loadError'), true);
  }
  await wireNative();
  wireServiceWorker();
  render();
})();
