// Gemeinsame Teile der beiden Wege zu einem KI-Plan: die App fragt selbst
// (planner.js) oder der Nutzer trägt den Text in eine fremde KI und bringt die
// Antwort zurück (manual.js). Formular, Geräteliste und Vorschau sind gleich.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { esc, byId, val, field, textIn, selectIn } from '../ui.js';

export const goalOptions = () => [
  { id: 'strength', label: t('ai.goalStrength') },
  { id: 'muscle', label: t('ai.goalMuscle') },
  { id: 'fitness', label: t('ai.goalFitness') },
  { id: 'lose', label: t('ai.goalLose') }
];

export const levelOptions = () => [
  { id: 'new', label: t('ai.levelNew') },
  { id: 'some', label: t('ai.levelSome') },
  { id: 'pro', label: t('ai.levelPro') }
];

export const kindLabel = eq => eq.kind === 'plates' ? t('equip.kindPlates')
  : eq.kind === 'weight' ? t('equip.kindWeight') : t('equip.kindBody');

export const emptyForm = () => ({ goal: 'muscle', days: 3, level: 'some', notes: '' });

export function formFields(form) {
  return field(t('ai.goal'), selectIn('f-goal', goalOptions(), form.goal)) +
    field(t('ai.days'), '<input class="in" id="f-days" type="number" min="1" max="7" value="' + form.days + '">') +
    field(t('ai.level'), selectIn('f-level', levelOptions(), form.level)) +
    field(t('ai.notes'), textIn('f-notes', form.notes));
}

export function readForm(form) {
  if (!byId('f-goal')) return form;
  return {
    goal: byId('f-goal').value,
    days: parseInt(byId('f-days').value, 10) || 3,
    level: byId('f-level').value,
    notes: val('f-notes')
  };
}

export function equipListHtml() {
  return '<h3 class="sec">' + esc(t('ai.equipUsed')) + '</h3>' +
    '<ul class="plain">' + st.S.equipment.map(e =>
      '<li>' + esc(st.nameOf(e)) + ' <span class="lst-s">— ' + esc(kindLabel(e)) + '</span></li>').join('') +
    '</ul>';
}

// Die Angaben, die die Vorgabe braucht - egal wer sie am Ende verschickt.
export function askOptions(form) {
  return {
    goal: goalOptions().find(o => o.id === form.goal).label,
    level: levelOptions().find(o => o.id === form.level).label,
    days: form.days,
    notes: form.notes,
    equipment: st.S.equipment.map(e => ({ id: e.id, name: st.nameOf(e), kindLabel: kindLabel(e) }))
  };
}

// Vorschau des Vorschlags. Die Knöpfe darunter setzt jede Seite selbst.
export function resultHtml(result) {
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
      '</p><ul class="plain">' + neue + '</ul>' : '');
}
