import * as st from '../state.js';
import { t, monthName, weekdayShort, longDate } from '../i18n.js';
import { esc, on } from '../ui.js';

let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedDay = null;

export function resetSelection() { selectedDay = null; }

function dayDetail() {
  if (!selectedDay) return null;
  const de = st.S.log[selectedDay];
  if (!de) return null;
  const plan = st.planOf(de.k);
  const [y, m, d] = selectedDay.split('-').map(Number);
  const dd = new Date(y, m - 1, d);

  // Was an dem Tag tatsächlich dran war - notfalls aus dem Eintrag selbst.
  const items = plan && plan.items.length
    ? plan.items
    : Object.keys(de.t || {}).map(ex => ({ ex, sets: 3 }));

  const lines = items.map(item => {
    const ex = st.exOf(item.ex);
    const goal = item.sets || 3;
    const n = st.setsDone(de, item);
    const stored = de.w && de.w[item.ex] != null ? de.w[item.ex] : null;
    const w = st.weightLabel(item.ex, stored == null ? 0 : stored);
    const label = w.body ? w.sub
      : (stored == null ? '—' : w.main + ' ' + w.unit + (w.sub ? ' · ' + w.sub : ''));
    return '<div class="dt-row' + (n >= goal ? '' : ' skip') + '">' +
      '<span class="dt-m">' + n + '/' + goal + '</span>' +
      '<span class="dt-n">' + esc(st.nameOf(ex)) + '</span>' +
      '<span class="dt-w">' + esc(label) + '</span></div>';
  }).join('');

  return '<div class="tp-card"><div class="tp-card-in">' +
    '<div class="tp-title"><div class="big">' + esc(plan ? plan.short : '?') + '</div>' +
      '<div><div class="nm">' + esc(longDate(dd)) + '</div>' +
      '<div class="fo">' + esc(st.nameOf(plan)) + ' · ' +
      esc(de.done ? t('log.done') : t('log.notDone')) + '</div></div></div>' +
    lines + '</div></div>';
}

export function render(head, mount) {
  const y = month.getFullYear(), m = month.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  let cells = '', total = 0;
  const per = new Map();

  for (let i = 0; i < 7; i++) cells += '<div class="cal-h">' + esc(weekdayShort(i)) + '</div>';
  for (let i = 0; i < lead; i++) cells += '<div class="cal-c void"></div>';
  for (let d = 1; d <= days; d++) {
    const key = st.iso(new Date(y, m, d));
    const e = st.S.log[key];
    const done = e && e.done;
    const plan = e ? st.planOf(e.k) : null;
    if (done) { total++; const s = plan ? plan.short : '?'; per.set(s, (per.get(s) || 0) + 1); }
    cells += '<button class="cal-c' + (done ? ' done' : '') + (e && !done ? ' part' : '') +
      (key === st.tk ? ' now' : '') + (key === selectedDay ? ' sel' : '') + '"' +
      (e ? '' : ' disabled') + ' data-day="' + key + '" aria-label="' + d + '. ' + esc(monthName(m)) + '">' +
      '<span class="n">' + d + '</span>' +
      (e ? '<span class="k">' + esc(plan ? plan.short : '?') + '</span>' : '') + '</button>';
  }

  const summary = [...per.entries()].map(([s, n]) => esc(s) + ' ' + n).join(' · ');
  const detail = dayDetail() || ('<div class="tp-hint">' +
    esc(total ? t('log.pickDay') : t('log.emptyMonth')) + '</div>');

  mount.innerHTML = head() +
    '<div class="cal-bar">' +
      '<button data-mon="-1" aria-label="' + esc(t('log.prevMonth')) + '">‹</button>' +
      '<div class="cal-t">' + esc(monthName(m)) + ' ' + y + '</div>' +
      '<button data-mon="1" aria-label="' + esc(t('log.nextMonth')) + '">›</button>' +
    '</div>' +
    '<div class="cal-sum"><b>' + total + '</b> ' +
      esc((total === 1 ? t('log.unit', { n: '' }) : t('log.units', { n: '' })).trim()) +
      (summary ? ' — ' + summary : '') + '</div>' +
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
