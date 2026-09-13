// Einen Plan von der KI erstellen lassen. Sitzt unter Pläne, nicht unter KI:
// die KI-Seite verwaltet den Zugang, hier wird damit gearbeitet.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { providerOf } from '../ai-meta.js';
import { showAiError } from './credits.js';
import { esc, on, byId, val, toast, field, textIn, selectIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let busy = false;
let result = null;
let form = { goal: 'muscle', days: 3, level: 'some', notes: '' };

export function reset() { busy = false; result = null; }

const goalOptions = () => [
  { id: 'strength', label: t('ai.goalStrength') },
  { id: 'muscle', label: t('ai.goalMuscle') },
  { id: 'fitness', label: t('ai.goalFitness') },
  { id: 'lose', label: t('ai.goalLose') }
];
const levelOptions = () => [
  { id: 'new', label: t('ai.levelNew') },
  { id: 'some', label: t('ai.levelSome') },
  { id: 'pro', label: t('ai.levelPro') }
];
const kindLabel = eq => eq.kind === 'plates' ? t('equip.kindPlates')
  : eq.kind === 'weight' ? t('equip.kindWeight') : t('equip.kindBody');

function readForm() {
  if (!byId('f-goal')) return;
  form = {
    goal: byId('f-goal').value,
    days: parseInt(byId('f-days').value, 10) || 3,
    level: byId('f-level').value,
    notes: val('f-notes')
  };
}

function preview() {
  const neue = (result.exercises || []).map(e =>
    '<li>' + esc(e.name) + ' <span class="lst-s">— ' +
    esc(st.nameOf(st.equipOf(e.equipment))) + '</span></li>').join('');
  const plaene = (result.plans || []).map(p =>
    '<div class="tp-card"><div class="tp-card-in">' +
    '<div class="tp-title"><div class="big">' + esc((p.name || '?').slice(0, 1)) + '</div>' +
    '<div><div class="nm">' + esc(p.name || '') + '</div>' +
    '<div class="fo">' + esc(p.focus || '') + '</div></div></div>' +
    (p.items || []).map(i =>
      '<div class="dt-row"><span class="dt-m">' + (i.sets || 3) + '×</span>' +
      '<span class="dt-n">' + esc(i.exercise) + '</span>' +
      '<span class="dt-w">' + esc(i.reps || '') + '</span></div>').join('') +
    '</div></div>').join('');

  return '<h3 class="sec">' + esc(t('ai.result')) + '</h3>' + plaene +
    (neue ? '<p class="intro">' + esc(t('ai.newExercises', { n: (result.exercises || []).length })) +
      '</p><ul class="plain">' + neue + '</ul>' : '') +
    '<button class="set-btn go" id="accept">' + esc(t('ai.accept')) + '</button>' +
    '<button class="set-btn" id="discard">' + esc(t('ai.discard')) + '</button>';
}

export function render(mount, head, backBar, goBack) {
  mount.innerHTML = head() + backBar(t('pl.aiTitle')) +
    '<p class="intro">' + esc(t('ai.intro')) + '</p>' +

    '<h3 class="sec">' + esc(t('ai.equipUsed')) + '</h3>' +
    '<ul class="plain">' + st.S.equipment.map(e =>
      '<li>' + esc(st.nameOf(e)) + ' <span class="lst-s">— ' + esc(kindLabel(e)) + '</span></li>').join('') + '</ul>' +

    field(t('ai.goal'), selectIn('f-goal', goalOptions(), form.goal)) +
    field(t('ai.days'), '<input class="in" id="f-days" type="number" min="1" max="7" value="' + form.days + '">') +
    field(t('ai.level'), selectIn('f-level', levelOptions(), form.level)) +
    field(t('ai.notes'), textIn('f-notes', form.notes)) +

    '<button class="set-btn' + (busy ? '' : ' go') + '" id="gen"' + (busy ? ' disabled' : '') + '>' +
      esc(busy ? t('ai.working') : t('ai.generate')) + '</button>' +
    (result ? preview() : '');

  byId('back').addEventListener('click', goBack);

  byId('gen').addEventListener('click', async () => {
    readForm();
    if (!st.S.equipment.length) { toast(t('ai.needEquip'), true); return; }
    busy = true;
    result = null;
    rerender();
    try {
      const mod = await import('../ai.js');
      result = await mod.generatePlan({
        provider: st.S.ai.provider,
        key: (st.S.ai.keys[st.S.ai.provider] || '').trim(),
        model: st.S.ai.model || providerOf(st.S.ai.provider).defaultModel,
        goal: goalOptions().find(o => o.id === form.goal).label,
        level: levelOptions().find(o => o.id === form.level).label,
        days: form.days,
        notes: form.notes,
        equipment: st.S.equipment.map(e => ({ id: e.id, name: st.nameOf(e), kindLabel: kindLabel(e) }))
      });
    } catch (e) {
      showAiError(e, st.S.ai.provider);
    }
    busy = false;
    rerender();
  });

  if (result) {
    byId('accept').addEventListener('click', () => {
      const n = st.applyGenerated(result);
      result = null;
      toast(t('ai.accepted') + (n ? ' ' + t('ai.newExercises', { n }) : ''));
      goBack();
    });
    byId('discard').addEventListener('click', () => { result = null; rerender(); });
  }

  on('#f-goal, #f-days, #f-level, #f-notes', readForm, 'change');
}
