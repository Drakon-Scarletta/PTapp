// Einstieg: Ansichtswechsel, Android-Zurück-Taste, Tageswechsel.
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import * as st from './state.js';
import { t, locale } from './i18n.js';
import { APP_NAME } from './store.js';
import * as home from './views/home.js';
import * as plan from './views/plan.js';
import * as log from './views/log.js';
import * as options from './views/options.js';
import { toast, esc } from './ui.js';

const VIEWS = { home, plan, log, options };
// Die Reiter; die Optionen hängen am Menüknopf und stehen nicht dazwischen.
const TABS = [
  ['home', 'nav.home'],
  ['plan', 'nav.plan'],
  ['log', 'nav.log']
];
let view = 'home';
let lastTab = 'home';          // wohin der Zurück-Pfeil aus dem Menü führt
const mount = document.getElementById('app');

function head() {
  return '<div class="tp-head"><h1>' + esc(APP_NAME) + '</h1><div class="tp-date">' +
    esc(st.today.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' })) +
    '</div></div>' +
    '<div class="tp-nav">' +
      TABS.map(([v, key]) =>
        '<button data-view="' + v + '" class="' + (v === view ? 'sel' : '') + '">' +
        esc(t(key)) + '</button>').join('') +
      '<button data-view="options" class="burger' + (view === 'options' ? ' sel' : '') + '" ' +
        'aria-label="' + esc(t('nav.menu')) + '"><span></span><span></span><span></span></button>' +
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
  if (view !== 'options') lastTab = view;
  view = v;
  if (v === 'log') log.resetSelection();
  if (v === 'home') home.reset();
  if (v === 'options') { options.resetSub(); await options.refresh(); }
  render();
}

document.addEventListener('rerender', render);
document.addEventListener('goview', ev => setView(ev.detail));
document.addEventListener('goback', () => setView(lastTab));
st.onChange(render);

// Android: Zurück führt erst auf die Startseite, dann aus der App.
async function wireNative() {
  if (!Capacitor.isNativePlatform()) return;
  await CapApp.addListener('backButton', () => {
    if (view !== 'home') setView('home');
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
