// Fenster für die Sätze einer Übung: was tatsächlich geschafft wurde,
// was beim letzten Mal war und die bisherige Bestleistung.
import * as st from '../state.js';
import { t, locale, num } from '../i18n.js';
import { esc, dialog } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

function datum(d) {
  const [y, m, tag] = d.split('-').map(Number);
  return new Date(y, m - 1, tag).toLocaleDateString(locale(), { day: 'numeric', month: 'short' });
}

// „5 Pl. · 10/10/8" - kurz genug für eine Zeile.
export function performanceText(exId, perf) {
  if (!perf) return '';
  const teile = [];
  if (perf.weight != null) {
    const w = st.weightLabel(exId, perf.weight);
    if (!w.body) teile.push(w.main + ' ' + w.unit);
  }
  const reps = (perf.reps || []).filter(r => r > 0);
  if (reps.length) teile.push(reps.join('/'));
  return teile.join(' · ');
}

export function weightText(exId, value) {
  const w = st.weightLabel(exId, value || 0);
  return w.body ? w.sub : w.main + " " + w.unit;
}

export function recordText(exId, pr) {
  if (!pr) return '';
  const w = st.weightLabel(exId, pr.weight);
  const teil = w.body ? '' : w.main + ' ' + w.unit;
  return [teil, pr.reps ? pr.reps + '×' : ''].filter(Boolean).join(' · ') + ' (' + datum(pr.date) + ')';
}

function verlauf(exId) {
  const eintraege = st.exerciseHistory(exId, 12);
  if (!eintraege.length) return '<p class="fld-h">' + esc(t('set.noHistory')) + '</p>';

  const werte = eintraege.map(e => e.weight || 0);
  const hoch = Math.max(1, ...werte);
  const balken = eintraege.map(e =>
    '<div class="bar-col" title="' + esc(e.date) + '">' +
      '<div class="bar-v full" style="height:' + Math.max(4, Math.round((e.weight / hoch) * 100)) + '%"></div>' +
    '</div>').join('');

  const zeilen = eintraege.slice(-5).reverse().map(e =>
    '<div class="dt-row"><span class="dt-m">' + esc(datum(e.date)) + '</span>' +
    '<span class="dt-n">' + esc((e.reps || []).filter(r => r > 0).join('/') || '—') + '</span>' +
    '<span class="dt-w">' + esc(weightText(exId, e.weight)) + '</span></div>').join('');

  return '<h4>' + esc(t('set.history')) + '</h4>' +
    '<div class="bars">' + balken + '</div>' + zeilen;
}

export function openSets(exId, item) {
  const ex = st.exOf(exId);
  const e = st.entry();
  const anzahl = st.setsDone(e, item);
  const reps = st.repsOf(e, exId);
  const letzte = st.lastPerformance(exId);
  const best = st.personalRecord(exId);

  const zeilen = anzahl
    ? Array.from({ length: anzahl }, (_, i) =>
        '<label class="chk set-row"><span>' + esc(t('set.nr', { n: i + 1 })) + '</span>' +
        '<input class="in tiny num" type="number" inputmode="numeric" min="0" max="999" ' +
        'data-set="' + i + '" value="' + (reps[i] || 0) + '">' +
        '<span class="lst-s">' + esc(t('set.reps')) + '</span></label>').join('')
    : '<p class="fld-h">' + esc(t('set.none')) + '</p>';

  dialog({
    title: t('set.title', { name: st.nameOf(ex) }),
    html:
      '<p class="fld-h">' + esc(t('set.hint')) + '</p>' + zeilen +
      (letzte ? '<p class="fld-h">' + esc(t('set.last', { text: performanceText(exId, letzte) || '—' })) +
        ' · ' + esc(datum(letzte.date)) + '</p>' : '') +
      (best ? '<p class="fld-h">' + esc(t('set.record', { text: recordText(exId, best) })) + '</p>' : '') +
      verlauf(exId),
    actions: [{ label: t('common.save'), primary: true }],
    onOpen: (el) => {
      el.querySelectorAll('[data-set]').forEach(inp => {
        inp.addEventListener('change', () => {
          st.setReps(exId, Number(inp.dataset.set), inp.value);
        });
      });
    }
  });
  // Änderungen sind bereits gespeichert; nach dem Schließen neu zeichnen.
  setTimeout(rerender, 50);
}
