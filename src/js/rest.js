// Pausen-Uhr zwischen den Sätzen. Sitzt außerhalb von #app, damit sie das
// Neuzeichnen der Ansicht übersteht.
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { t } from './i18n.js';
import { esc } from './ui.js';

let rest = 0;          // verbleibende Sekunden
let timer = null;
let el = null;

function ton() {
  // Kurzer Piepser aus dem Browser selbst - kein Tonfile nötig.
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    setTimeout(() => ctx.close(), 800);
  } catch (e) { /* ohne Ton weiter */ }
}

function fertig() {
  stop();
  ton();
  try { Haptics.impact({ style: ImpactStyle.Medium }); } catch (e) { /* egal */ }
}

function zeichne() {
  if (!el) {
    el = document.createElement('div');
    el.className = 'rest';
    document.body.appendChild(el);
    document.body.classList.add('resting');
  }
  const m = Math.floor(rest / 60), s = rest % 60;
  el.innerHTML =
    '<div class="rest-t">' + m + ':' + String(s).padStart(2, '0') + '</div>' +
    '<div class="rest-l">' + esc(t('rest.running')) + '</div>' +
    '<button class="mini" data-rest="30">+30 s</button>' +
    '<button class="mini" data-rest="skip">' + esc(t('rest.skip')) + '</button>';
  el.querySelectorAll('[data-rest]').forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.rest === 'skip') stop();
      else { rest += 30; zeichne(); }
    });
  });
}

export function start(seconds) {
  stop();
  rest = Math.max(5, seconds || 90);
  zeichne();
  timer = setInterval(() => {
    rest--;
    if (rest <= 0) fertig();
    else zeichne();
  }, 1000);
}

export function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  rest = 0;
  if (el) { el.remove(); el = null; }
  document.body.classList.remove('resting');
}

export const running = () => !!timer;
