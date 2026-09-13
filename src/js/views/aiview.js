// Plan von der KI erstellen lassen: Eingaben, Aufruf, Vorschau, Übernahme.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { isNative } from '../store.js';
import { PROVIDERS, providerOf } from '../ai-meta.js';
import { esc, on, byId, val, toast, field, textIn, selectIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let busy = false;
let result = null;
let models = [];
let form = { goal: 'muscle', days: 3, level: 'some', notes: '' };

export function reset() { result = null; busy = false; }

function goalOptions() {
  return [
    { id: 'strength', label: t('ai.goalStrength') },
    { id: 'muscle', label: t('ai.goalMuscle') },
    { id: 'fitness', label: t('ai.goalFitness') },
    { id: 'lose', label: t('ai.goalLose') }
  ];
}
function levelOptions() {
  return [
    { id: 'new', label: t('ai.levelNew') },
    { id: 'some', label: t('ai.levelSome') },
    { id: 'pro', label: t('ai.levelPro') }
  ];
}
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
  const ex = (result.exercises || []).map(e =>
    '<li>' + esc(e.name) + ' <span class="lst-s">— ' +
    esc(st.nameOf(st.equipOf(e.equipment))) + '</span></li>').join('');
  const plans = (result.plans || []).map(p =>
    '<div class="tp-card"><div class="tp-card-in">' +
    '<div class="tp-title"><div class="big">' + esc((p.name || '?').slice(0, 1)) + '</div>' +
    '<div><div class="nm">' + esc(p.name || '') + '</div>' +
    '<div class="fo">' + esc(p.focus || '') + '</div></div></div>' +
    (p.items || []).map(i =>
      '<div class="dt-row"><span class="dt-m">' + (i.sets || 3) + '×</span>' +
      '<span class="dt-n">' + esc(i.exercise) + '</span>' +
      '<span class="dt-w">' + esc(i.reps || '') + '</span></div>').join('') +
    '</div></div>').join('');

  return '<h3 class="sec">' + esc(t('ai.result')) + '</h3>' + plans +
    (ex ? '<p class="intro">' + esc(t('ai.newExercises', { n: (result.exercises || []).length })) +
      '</p><ul class="plain">' + ex + '</ul>' : '') +
    '<button class="set-btn" id="accept">' + esc(t('ai.accept')) + '</button>' +
    '<button class="set-btn" id="discard">' + esc(t('ai.discard')) + '</button>';
}

export function render(mount, head, backBar, goHub) {
  const ai = st.S.ai;
  const prov = providerOf(ai.provider);
  const key = ai.keys[ai.provider] || '';
  const modelOpts = models.length
    ? models.map(m => ({ id: m.id, label: m.label }))
    : [{ id: ai.model || prov.defaultModel, label: ai.model || prov.defaultModel }];

  mount.innerHTML = head() + backBar(t('ai.title')) +
    '<p class="intro">' + esc(t('ai.intro')) + '</p>' +
    (isNative() ? '' : '<div class="tp-err">' + esc(t('ai.webBlocked')) + '</div>') +

    field(t('ai.provider'), selectIn('f-prov', PROVIDERS.map(p => ({ id: p.id, label: p.label })), ai.provider)) +
    field(t('ai.key'),
      '<input class="in" id="f-key" type="password" autocomplete="off" value="' + esc(key) + '">',
      (ai.provider === 'openai' ? t('ai.keyHintOpenAI') : t('ai.keyHintAnthropic')) + ' ' + t('ai.keyStored')) +
    field(t('ai.model'),
      '<span class="two">' + selectIn('f-model', modelOpts, ai.model || prov.defaultModel) +
      textIn('f-modelfree', ai.model || prov.defaultModel) + '</span>') +
    '<button class="mini" id="loadmodels">' + esc(t('ai.loadModels')) + '</button>' +

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

  byId('back').addEventListener('click', goHub);

  byId('f-prov').addEventListener('change', ev => {
    readForm();
    models = [];
    st.S.ai.provider = ev.target.value;
    st.S.ai.model = providerOf(ev.target.value).defaultModel;
    st.touch();
  });
  byId('f-key').addEventListener('change', ev => {
    st.S.ai.keys[st.S.ai.provider] = ev.target.value.trim();
    st.touch();
  });
  byId('f-model').addEventListener('change', ev => {
    byId('f-modelfree').value = ev.target.value;
    st.S.ai.model = ev.target.value;
    st.touch();
  });
  byId('f-modelfree').addEventListener('change', ev => {
    st.S.ai.model = ev.target.value.trim();
    st.touch();
  });

  byId('loadmodels').addEventListener('click', async () => {
    const k = val('f-key');
    if (!k) { toast(t('ai.needKey'), true); return; }
    const btn = byId('loadmodels');
    btn.disabled = true;
    btn.textContent = t('ai.loadingModels');
    try {
      const mod = await import('../ai.js');
      models = await mod.listModels(st.S.ai.provider, k);
      readForm();
      rerender();
    } catch (e) {
      toast(t('ai.failed', { msg: e.message }), true);
      btn.disabled = false;
      btn.textContent = t('ai.loadModels');
    }
  });

  byId('gen').addEventListener('click', async () => {
    readForm();
    const k = val('f-key');
    if (!k) { toast(t('ai.needKey'), true); return; }
    if (!st.S.equipment.length) { toast(t('ai.needEquip'), true); return; }
    busy = true;
    result = null;
    rerender();
    try {
      const mod = await import('../ai.js');
      result = await mod.generatePlan({
        provider: st.S.ai.provider,
        key: k,
        model: val('f-modelfree') || st.S.ai.model,
        goal: goalOptions().find(o => o.id === form.goal).label,
        level: levelOptions().find(o => o.id === form.level).label,
        days: form.days,
        notes: form.notes,
        equipment: st.S.equipment.map(e => ({ id: e.id, name: st.nameOf(e), kindLabel: kindLabel(e) }))
      });
    } catch (e) {
      toast(t('ai.failed', { msg: e.message }), true);
    }
    busy = false;
    rerender();
  });

  if (result) {
    byId('accept').addEventListener('click', () => {
      const n = st.applyGenerated(result);
      result = null;
      toast(t('ai.accepted') + (n ? ' ' + t('ai.newExercises', { n }) : ''));
    });
    byId('discard').addEventListener('click', () => { result = null; rerender(); });
  }

  on('#f-goal, #f-days, #f-level, #f-notes', readForm, 'change');
}
