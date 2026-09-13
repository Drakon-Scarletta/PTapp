import { PLANS, MONTHS, WEEKDAYS, goal } from '../data.js';
import * as st from '../state.js';
import { esc, on } from '../ui.js';

let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedDay = null;

export function resetSelection() { selectedDay = null; }

function dayDetail() {
  if (!selectedDay) return null;
  const de = st.S.log[selectedDay];
  if (!de) return null;
  const [y, m, d] = selectedDay.split('-').map(Number);
  const dd = new Date(y, m - 1, d);
  const lines = PLANS[de.k].ex.map(x => {
    const g = goal(x), n = st.setsDone(de, x), ok = n >= g;
    const plates = de.w && de.w[x.id] != null ? de.w[x.id] : 0;
    const w = x.bw ? 'Körpergewicht' : plates + ' Pl. · ' + st.fmt(plates * (st.S.pw || 4.5)) + ' kg';
    return '<div class="dt-row' + (ok ? '' : ' skip') + '">' +
      '<span class="dt-m">' + n + '/' + g + '</span>' +
      '<span class="dt-n">' + esc(x.n) + '</span>' +
      '<span class="dt-w">' + w + '</span></div>';
  }).join('');
  return '<div class="tp-card"><div class="tp-card-in">' +
    '<div class="tp-title"><div class="big">' + de.k + '</div>' +
      '<div><div class="nm">' + dd.toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' }) + '</div>' +
      '<div class="fo">' + esc(PLANS[de.k].name) + (de.done ? ' · abgeschlossen' : ' · nicht abgeschlossen') + '</div></div></div>' +
    lines + '</div></div>';
}

export function render(head, mount) {
  const y = month.getFullYear(), m = month.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  let cells = '', total = 0;
  const per = { A: 0, B: 0, C: 0 };

  WEEKDAYS.forEach(l => { cells += '<div class="cal-h">' + l + '</div>'; });
  for (let i = 0; i < lead; i++) cells += '<div class="cal-c void"></div>';
  for (let d = 1; d <= days; d++) {
    const key = st.iso(new Date(y, m, d)), e = st.S.log[key], done = e && e.done;
    if (done) { total++; per[e.k] = (per[e.k] || 0) + 1; }
    cells += '<button class="cal-c' + (done ? ' done' : '') + (e && !done ? ' part' : '') +
      (key === st.tk ? ' now' : '') + (key === selectedDay ? ' sel' : '') + '"' +
      (e ? '' : ' disabled') + ' data-day="' + key + '" aria-label="' + d + '. ' + MONTHS[m] + '">' +
      '<span class="n">' + d + '</span>' +
      (e ? '<span class="k">' + e.k + '</span>' : '') + '</button>';
  }

  const detail = dayDetail() || ('<div class="tp-hint">' + (total
    ? 'Tippe auf einen markierten Tag, um Übungen und Gewichte zu sehen.'
    : 'In diesem Monat ist noch nichts eingetragen.') + '</div>');

  mount.innerHTML = head() +
    '<div class="cal-bar">' +
      '<button data-mon="-1" aria-label="Voriger Monat">‹</button>' +
      '<div class="cal-t">' + MONTHS[m] + ' ' + y + '</div>' +
      '<button data-mon="1" aria-label="Nächster Monat">›</button>' +
    '</div>' +
    '<div class="cal-sum"><b>' + total + '</b> ' + (total === 1 ? 'Einheit' : 'Einheiten') +
      (total ? ' — A ' + per.A + ' · B ' + per.B + ' · C ' + per.C : '') + '</div>' +
    '<div class="cal">' + cells + '</div>' + detail;

  on('[data-mon]', ev => {
    month = new Date(month.getFullYear(), month.getMonth() + parseInt(ev.currentTarget.dataset.mon, 10), 1);
    selectedDay = null;
    document.dispatchEvent(new CustomEvent('rerender'));
  });
  on('[data-day]', ev => {
    const d = ev.currentTarget.dataset.day;
    selectedDay = selectedDay === d ? null : d;
    document.dispatchEvent(new CustomEvent('rerender'));
  });
}
