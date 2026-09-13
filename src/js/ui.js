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
export function toast(msg, bad = false, action) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (bad ? ' bad' : '');
  el.setAttribute('role', 'status');

  const text = document.createElement('span');
  text.textContent = msg;
  el.appendChild(text);

  // Etwa zum Rückgängigmachen: die Meldung bleibt dafür länger stehen.
  if (action) {
    const btn = document.createElement('button');
    btn.className = 'toast-a';
    btn.textContent = action.label;
    btn.addEventListener('click', () => { el.remove(); action.run(); });
    el.appendChild(btn);
  }

  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), action ? 8000 : (bad ? 6000 : 2600));
}

export async function haptic(style = 'light') {
  try {
    await Haptics.impact({ style: style === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) { /* Gerät ohne Vibration, oder Browser */ }
}

export function confirmBox(text) { return window.confirm(text); }

// Eigenes Fenster für Fälle, in denen ein Hinweis zu wenig ist und der Nutzer
// etwas entscheiden soll. Schließt bei Klick daneben und mit Escape.
export function dialog({ title, text, html, actions, onOpen }) {
  const alt = document.querySelector('.overlay');
  if (alt) alt.remove();

  const el = document.createElement('div');
  el.className = 'overlay';
  el.innerHTML =
    '<div class="dlg" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<h3>' + esc(title) + '</h3>' +
      (text ? '<p>' + esc(text) + '</p>' : '') +
      (html || '') +
      '<div class="dlg-a">' + actions.map((a, i) =>
        '<button class="set-btn' + (a.primary ? ' go' : '') + '" data-act="' + i + '">' +
        esc(a.label) + '</button>').join('') +
      '</div>' +
    '</div>';

  const close = () => {
    el.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = ev => { if (ev.key === 'Escape') close(); };

  el.addEventListener('click', ev => { if (ev.target === el) close(); });
  el.querySelectorAll('[data-act]').forEach(b => {
    b.addEventListener('click', () => {
      const a = actions[Number(b.dataset.act)];
      close();
      if (a.run) a.run();
    });
  });

  document.body.appendChild(el);
  document.addEventListener('keydown', onKey);
  if (onOpen) onOpen(el, close);
  const erster = el.querySelector('.set-btn.go') || el.querySelector('.set-btn');
  if (erster) erster.focus();
}

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
