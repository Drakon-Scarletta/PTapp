// Kleine DOM-Helfer, die alle Ansichten teilen.
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function on(selector, handler, event = 'click') {
  document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler));
}

let toastTimer = null;
export function toast(msg, bad = false) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (bad ? ' bad' : '');
  el.setAttribute('role', 'status');
  el.textContent = msg;
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), bad ? 5000 : 2600);
}

export async function haptic(style = 'light') {
  try {
    await Haptics.impact({ style: style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) { /* Gerät ohne Vibration, oder Browser */ }
}

export function confirmBox(text) {
  return window.confirm(text);
}
