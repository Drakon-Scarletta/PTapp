// Kleine DOM-Helfer, die alle Ansichten teilen.
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function on(selector, handler, event = 'click') {
  document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler));
}

export function byId(id) { return document.getElementById(id); }
export function val(id) {
  const el = byId(id);
  return el ? el.value.trim() : '';
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
  toastTimer = setTimeout(() => el.remove(), bad ? 6000 : 2600);
}

export async function haptic(style = 'light') {
  try {
    await Haptics.impact({ style: style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) { /* Gerät ohne Vibration, oder Browser */ }
}

export function confirmBox(text) { return window.confirm(text); }

// ---- Bausteine für die Eingabeformulare ----
export function field(label, inner, hint) {
  return '<label class="fld"><span class="fld-l">' + esc(label) + '</span>' + inner +
    (hint ? '<span class="fld-h">' + esc(hint) + '</span>' : '') + '</label>';
}

export function textIn(id, value, placeholder) {
  return '<input class="in" id="' + id + '" type="text" value="' + esc(value) + '"' +
    (placeholder ? ' placeholder="' + esc(placeholder) + '"' : '') + '>';
}

export function numIn(id, value, step, min) {
  return '<input class="in" id="' + id + '" type="number" inputmode="decimal" value="' + esc(value) + '"' +
    ' step="' + (step || 'any') + '"' + (min != null ? ' min="' + min + '"' : '') + '>';
}

export function selectIn(id, options, value) {
  return '<select class="in" id="' + id + '">' + options.map(o =>
    '<option value="' + esc(o.id) + '"' + (String(o.id) === String(value) ? ' selected' : '') + '>' +
    esc(o.label) + '</option>').join('') + '</select>';
}

export function checkIn(id, label, checked) {
  return '<label class="chk"><input type="checkbox" id="' + id + '"' + (checked ? ' checked' : '') + '>' +
    '<span>' + esc(label) + '</span></label>';
}

export function rowActions(editLabel, deleteLabel, id) {
  return '<div class="row-act">' +
    '<button class="mini" data-edit="' + esc(id) + '">' + esc(editLabel) + '</button>' +
    '<button class="mini warn" data-del="' + esc(id) + '">' + esc(deleteLabel) + '</button></div>';
}
