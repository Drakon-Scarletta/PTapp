// Einstieg: Ansichtswechsel, Android-Zurück-Taste, Tageswechsel.
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import * as st from './state.js';
import * as plan from './views/plan.js';
import * as log from './views/log.js';
import * as settings from './views/settings.js';
import { toast } from './ui.js';

const VIEWS = { plan, log, settings };
const LABEL = { plan: 'Training', log: 'Verlauf', settings: 'Mehr' };
let view = 'plan';
const mount = document.getElementById('app');

function head() {
  return '<div class="tp-head"><h1>PTapp</h1><div class="tp-date">' +
    st.today.toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' }) + '</div></div>' +
    '<div class="tp-nav">' +
      Object.keys(VIEWS).map(v =>
        '<button data-view="' + v + '" class="' + (v === view ? 'sel' : '') + '">' + LABEL[v] + '</button>'
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
  if (v === view) return;
  view = v;
  if (v === 'log') log.resetSelection();
  if (v === 'settings') await settings.refresh();
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
  // Beim Zurückkehren in die App prüfen, ob inzwischen ein neuer Tag begonnen hat.
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
    toast('Gespeicherte Daten konnten nicht geladen werden.', true);
  }
  await wireNative();
  wireServiceWorker();
  render();
})();
