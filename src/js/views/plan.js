import * as st from '../state.js';
import { t, weekdayShort } from '../i18n.js';
import { esc, on, byId, haptic } from '../ui.js';
import * as rest from '../rest.js';
import { openSets, performanceText } from './sets.js';

function weekStrip() {
  const m = st.monday(st.today);
  let h = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(m); d.setDate(m.getDate() + i);
    const key = st.iso(d), e = st.S.log[key], done = e && e.done;
    const p = done ? st.planOf(e.k) : null;
    h += '<div class="tp-day' + (done ? ' filled' : '') + (key === st.tk ? ' today' : '') + '">' +
         '<div class="d">' + esc(weekdayShort(i)) + '</div>' +
         '<div class="m' + (done ? '' : ' empty') + '">' +
         (done ? esc(p ? p.short : '·') : '·') + '</div></div>';
  }
  return '<div class="tp-week">' + h + '</div>';
}

function exerciseRow(item, e) {
  const ex = st.exOf(item.ex);
  const goal = item.sets || 3;
  const n = st.setsDone(e, item);
  const ok = n >= goal;
  const w = st.weightLabel(item.ex);
  const bd = w.body ? null : st.band(item.ex);
  const hint = st.hintOf(ex);

  // Was beim letzten Mal stand, und ob das heutige Gewicht darüber liegt.
  const letzte = st.lastPerformance(item.ex);
  const best = st.personalRecord(item.ex);
  const heute = st.S.kg[item.ex] || 0;
  const rekord = best && !w.body && heute > best.weight;
  const letzteZeile = letzte
    ? t('set.last', { text: performanceText(item.ex, letzte) || '—' })
    : '';

  const right = w.body
    ? '<div class="tp-bw">' + esc(w.sub) + '</div>'
    : '<div class="tp-kg">' +
        '<button data-kg="' + item.ex + '" data-dir="-1" aria-label="' + esc(t('plan.less')) + '">−</button>' +
        '<div class="val">' + esc(w.main) +
          '<small> ' + esc(w.unit) + '</small>' +
          '<div class="sub"><i class="dot ' + (bd || 'n') + '"></i>' + esc(w.sub) + '</div>' +
        '</div>' +
        '<button data-kg="' + item.ex + '" data-dir="1" aria-label="' + esc(t('plan.more')) + '">+</button>' +
      '</div>';

  return '<div class="tp-ex' + (ok ? ' ok' : '') + (n > 0 && !ok ? ' part' : '') + '">' +
    '<button class="tp-box" data-sets="' + item.ex + '" ' +
      'aria-label="' + esc(t('set.title', { name: st.nameOf(ex) })) + '">' +
      (ok ? '✓' : n + '<em>/' + goal + '</em>') + '</button>' +
    '<div class="tp-mid" data-ex="' + item.ex + '" role="button" tabindex="0" ' +
      'aria-label="' + esc(st.nameOf(ex)) + ', ' + esc(t('plan.sets', { done: n, total: goal })) + '">' +
      '<div class="nm">' + esc(st.nameOf(ex)) +
        (rekord ? ' <span class="ai-mark" title="' + esc(t('set.newRecord')) + '">★</span>' : '') + '</div>' +
      '<div class="rp">' + esc(item.reps || '') +
        (item.side ? ' ' + esc(st.sideLabel(item.side)) : '') + '</div>' +
      (letzteZeile ? '<div class="last">' + esc(letzteZeile) + '</div>' : '') +
      (hint ? '<div class="hint">' + esc(hint) + '</div>' : '') +
    '</div>' +
    right + '</div>';
}

export function render(head, mount) {
  const planId = st.activePlan();
  const plan = st.planOf(planId);
  const e = st.entry();
  const sug = st.suggested();
  const night = st.isNight();

  if (!plan) {
    mount.innerHTML = head() + weekStrip() +
      '<div class="tp-hint">' + esc(t('plan.noPlans')) + '</div>';
    return;
  }

  const pick = st.S.plans.map(p =>
    '<button data-pick="' + p.id + '" class="' + (p.id === planId ? 'sel' : '') +
    (p.id === sug && p.id !== planId ? ' sug' : '') + '">' +
    '<span class="k">' + esc(p.short || '?') + '</span>' + esc(st.nameOf(p)) + '</button>').join('');

  const rows = plan.items.length
    ? plan.items.map(i => exerciseRow(i, e)).join('')
    : '<div class="tp-ex"><div></div><div class="rp">' + esc(t('plan.emptyPlan')) + '</div><div></div></div>';

  // Dauer: abgeschlossen die gemessene, sonst die laufende Zeit.
  const dauer = e.done ? st.durationMinutes(e)
    : (e.start ? Math.max(1, Math.round((Date.now() - e.start) / 60000)) : null);

  mount.innerHTML = head() + weekStrip() +
    '<div class="tp-count"><b>' +
      esc(t('plan.weekCount', { done: st.weekCount(), target: st.weekTarget() })) + '</b>' +
      esc(t('plan.weekCountRest')) + (night ? esc(t('plan.nightHint')) : '') + '</div>' +

    '<div class="tp-shift' + (night ? ' on' : '') + '">' +
      '<div><div class="lbl">' + esc(t('plan.nightTitle')) + '</div>' +
      '<div class="sub">' + esc(t('plan.nightSub')) + '</div></div>' +
      '<button class="tp-toggle" id="nt" role="switch" aria-checked="' + night + '" ' +
      'aria-label="' + esc(t('plan.nightTitle')) + '"><span></span></button>' +
    '</div>' +

    '<div class="tp-pick">' + pick + '</div>' +

    '<div class="tp-card"><div class="tp-card-in">' +
      '<div class="tp-title"><div class="big">' + esc(plan.short || '') + '</div>' +
        '<div><div class="nm">' + esc(st.nameOf(plan)) + '</div>' +
        '<div class="fo">' + esc(st.focusOf(plan)) +
          (dauer ? ' · ' + esc(e.done ? t('dur.minutes', { n: dauer }) : t('dur.running', { n: dauer })) : '') +
        '</div></div></div>' +
      rows +
      '<div class="tp-key">' +
        '<span><i class="dot g"></i>' + esc(t('plan.light')) + '</span>' +
        '<span><i class="dot y"></i>' + esc(t('plan.medium')) + '</span>' +
        '<span><i class="dot r"></i>' + esc(t('plan.heavy')) + '</span>' +
      '</div>' +
      '<button class="tp-finish' + (e.done ? ' undo' : '') + '" id="fin"' +
        (!st.hasAnySet() && !e.done ? ' disabled' : '') + '>' +
        esc(e.done ? t('plan.undo') : t('plan.finish')) + '</button>' +
    '</div></div>' +

    '<label class="fld"><span class="fld-l">' + esc(t('note.title')) + '</span>' +
      '<textarea class="in" id="f-note" rows="2" placeholder="' + esc(t('note.hint')) + '">' +
      esc(e.n || '') + '</textarea></label>' +

    (st.lastError() ? '<div class="tp-err">' + esc(st.lastError()) + '</div>' : '') +
    '<div class="tp-note">' + esc(t('plan.note')) + '</div>';

  byId('nt').addEventListener('click', () => st.toggleNight());
  byId('fin').addEventListener('click', () => {
    haptic('medium');
    rest.stop();
    st.finish();
  });
  byId('f-note').addEventListener('change', ev => st.setNote(ev.target.value));

  on('[data-pick]', ev => st.selectPlan(ev.currentTarget.dataset.pick));
  on('[data-sets]', ev => {
    const id = ev.currentTarget.dataset.sets;
    openSets(id, plan.items.find(i => i.ex === id));
  });
  on('[data-kg]', ev => {
    ev.stopPropagation();
    st.bumpWeight(ev.currentTarget.dataset.kg, parseInt(ev.currentTarget.dataset.dir, 10));
  });
  on('[data-ex]', ev => tick(ev.currentTarget.dataset.ex));
  on('[data-ex]', ev => {
    if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); tick(ev.currentTarget.dataset.ex); }
  }, 'keydown');
}

// Satz abhaken und, falls eingeschaltet, die Pause starten.
function tick(exId) {
  const fertig = st.toggleExercise(exId);
  if (fertig) haptic('light');
  const e = st.entry();
  if (st.S.prefs.restOn && st.setsDone(e, { ex: exId, sets: 99 }) > 0) {
    rest.start(st.S.prefs.restSec);
  }
}
