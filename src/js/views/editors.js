// Editoren für Geräte, Übungen und Pläne.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { esc, on, byId, val, toast, confirmBox, field, textIn, numIn, selectIn, checkIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

// Welcher Eintrag gerade bearbeitet wird: null = keiner, 'new' = neuer.
let editing = null;
export function resetEditing() { editing = null; }

function sideOptions() {
  return [
    { id: '', label: '—' },
    { id: 'leg', label: t('plan.perLeg') },
    { id: 'arm', label: t('plan.perArm') },
    { id: 'alt', label: t('plan.alt') }
  ];
}

function kindOptions() {
  return [
    { id: 'plates', label: t('equip.kindPlates') },
    { id: 'weight', label: t('equip.kindWeight') },
    { id: 'body', label: t('equip.kindBody') }
  ];
}

function backBar(title) {
  return '<div class="sub-bar"><button class="mini" id="back">‹ ' + esc(t('common.back')) + '</button>' +
    '<h2>' + esc(title) + '</h2></div>';
}
function wireBack(to) {
  byId('back').addEventListener('click', () => { editing = null; to(); });
}

// ---------- Geräte ----------
export function equipment(mount, head, goHub) {
  if (editing) return equipmentForm(mount, head, goHub);

  const rows = st.S.equipment.map(eq => {
    const used = st.equipmentUsage(eq.id);
    const kind = kindOptions().find(k => k.id === eq.kind);
    const extra = eq.kind === 'plates' ? ' · ' + (eq.plate || 4.5) + ' kg'
      : eq.kind === 'weight' ? ' · ' + (eq.step || 2.5) + ' kg' : '';
    return '<div class="lst"><div class="lst-m">' +
      '<div class="lst-n">' + esc(st.nameOf(eq)) + '</div>' +
      '<div class="lst-s">' + esc(kind ? kind.label : eq.kind) + esc(extra) + ' · ' +
      esc(used ? t(used === 1 ? 'equip.inUse1' : 'equip.inUse', { n: used }) : t('equip.unused')) + '</div></div>' +
      '<div class="row-act">' +
      '<button class="mini" data-edit="' + eq.id + '">' + esc(t('common.edit')) + '</button>' +
      '<button class="mini warn" data-del="' + eq.id + '">' + esc(t('common.delete')) + '</button>' +
      '</div></div>';
  }).join('');

  mount.innerHTML = head() + backBar(t('equip.title')) +
    '<p class="intro">' + esc(t('equip.intro')) + '</p>' + rows +
    '<button class="set-btn" id="add">+ ' + esc(t('equip.add')) + '</button>';

  wireBack(goHub);
  byId('add').addEventListener('click', () => { editing = 'new'; rerender(); });
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const eq = st.equipOf(ev.currentTarget.dataset.del);
    if (!eq) return;
    if (st.equipmentUsage(eq.id)) { toast(t('equip.deleteBlocked'), true); return; }
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(eq) }))) return;
    st.deleteEquipment(eq.id);
  });
}

function equipmentForm(mount, head, goHub) {
  const eq = editing === 'new' ? { kind: 'plates', plate: st.S.pw, step: 2.5 } : st.equipOf(editing);
  if (!eq) { editing = null; return equipment(mount, head, goHub); }

  mount.innerHTML = head() + backBar(editing === 'new' ? t('equip.add') : st.nameOf(eq)) +
    field(t('equip.name'), textIn('f-name', editing === 'new' ? '' : st.nameOf(eq))) +
    field(t('equip.kind'), selectIn('f-kind', kindOptions(), eq.kind)) +
    '<div id="f-extra"></div>' +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>';

  const extra = () => {
    const kind = byId('f-kind').value;
    byId('f-extra').innerHTML =
      kind === 'plates' ? field(t('equip.plate'), numIn('f-plate', eq.plate || 4.5, '0.5', 0.5))
      : kind === 'weight' ? field(t('equip.step'), numIn('f-step', eq.step || 2.5, '0.5', 0.5))
      : '';
  };
  extra();
  byId('f-kind').addEventListener('change', extra);

  wireBack(goHub);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    const kind = byId('f-kind').value;
    const data = { name, kind };
    if (kind === 'plates') data.plate = parseFloat(val('f-plate')) || 4.5;
    if (kind === 'weight') data.step = parseFloat(val('f-step')) || 2.5;
    if (editing === 'new') st.addEquipment(data); else st.updateEquipment(editing, data);
    editing = null;
  });
}

// ---------- Übungen ----------
export function exercises(mount, head, goHub) {
  if (editing) return exerciseForm(mount, head, goHub);

  const rows = st.visibleExercises().map(ex => {
    const eq = st.equipOf(ex.equip);
    const inPlans = st.exerciseUsage(ex.id);
    return '<div class="lst"><div class="lst-m">' +
      '<div class="lst-n">' + esc(st.nameOf(ex)) + '</div>' +
      '<div class="lst-s">' + esc(st.nameOf(eq)) + ' · ' +
      esc(inPlans ? t(inPlans === 1 ? 'ex.inPlans1' : 'ex.inPlans', { n: inPlans }) : t('ex.notInPlan')) + '</div></div>' +
      '<div class="row-act">' +
      '<button class="mini" data-edit="' + ex.id + '">' + esc(t('common.edit')) + '</button>' +
      '<button class="mini warn" data-del="' + ex.id + '">' + esc(t('common.delete')) + '</button>' +
      '</div></div>';
  }).join('');

  mount.innerHTML = head() + backBar(t('ex.title')) +
    '<p class="intro">' + esc(t('ex.intro')) + '</p>' + rows +
    '<button class="set-btn" id="add">+ ' + esc(t('ex.add')) + '</button>';

  wireBack(goHub);
  byId('add').addEventListener('click', () => { editing = 'new'; rerender(); });
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const ex = st.exOf(ev.currentTarget.dataset.del);
    if (!ex) return;
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(ex) }) + '\n' + t('ex.keepForHistory'))) return;
    st.deleteExercise(ex.id);
  });
}

function exerciseForm(mount, head, goHub) {
  const ex = editing === 'new' ? { equip: st.S.equipment[0] && st.S.equipment[0].id } : st.exOf(editing);
  if (!ex) { editing = null; return exercises(mount, head, goHub); }
  const eqOpts = st.S.equipment.map(e => ({ id: e.id, label: st.nameOf(e) }));
  const bands = ex.bands || [];

  mount.innerHTML = head() + backBar(editing === 'new' ? t('ex.add') : st.nameOf(ex)) +
    field(t('ex.name'), textIn('f-name', editing === 'new' ? '' : st.nameOf(ex))) +
    field(t('ex.equip'), selectIn('f-equip', eqOpts, ex.equip)) +
    field(t('ex.bands'),
      '<span class="two">' + numIn('f-b1', bands[0] == null ? '' : bands[0], '0.5', 0) +
      numIn('f-b2', bands[1] == null ? '' : bands[1], '0.5', 0) + '</span>',
      t('ex.bandsSub')) +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>';

  wireBack(goHub);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    const b1 = parseFloat(val('f-b1')), b2 = parseFloat(val('f-b2'));
    const data = { name, equip: byId('f-equip').value };
    data.bands = (isFinite(b1) && isFinite(b2)) ? [b1, b2] : undefined;
    if (editing === 'new') st.addExercise(data); else st.updateExercise(editing, data);
    editing = null;
  });
}

// ---------- Pläne ----------
export function plans(mount, head, goHub) {
  if (editing) return planForm(mount, head, goHub);

  const rows = st.S.plans.map(p =>
    '<div class="lst"><div class="lst-m">' +
    '<div class="lst-n"><span class="tag">' + esc(p.short || '?') + '</span> ' + esc(st.nameOf(p)) + '</div>' +
    '<div class="lst-s">' + esc(st.focusOf(p) || '—') + ' · ' + p.items.length + '</div></div>' +
    '<div class="row-act">' +
    '<button class="mini" data-edit="' + p.id + '">' + esc(t('common.edit')) + '</button>' +
    '<button class="mini warn" data-del="' + p.id + '">' + esc(t('common.delete')) + '</button>' +
    '</div></div>').join('');

  mount.innerHTML = head() + backBar(t('pl.title')) +
    '<p class="intro">' + esc(t('pl.intro')) + '</p>' + rows +
    '<button class="set-btn" id="add">+ ' + esc(t('pl.add')) + '</button>';

  wireBack(goHub);
  byId('add').addEventListener('click', () => {
    const p = st.addPlan({ name: t('common.new'), focus: '' });
    editing = p.id;
  });
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const p = st.planOf(ev.currentTarget.dataset.del);
    if (!p) return;
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(p) }))) return;
    st.deletePlan(p.id);
  });
}

function planForm(mount, head, goHub) {
  const p = st.planOf(editing);
  if (!p) { editing = null; return plans(mount, head, goHub); }

  const items = p.items.map(i => {
    const ex = st.exOf(i.ex);
    return '<div class="pi"><div class="pi-n">' + esc(st.nameOf(ex)) + '</div>' +
      '<div class="pi-f">' +
        '<input class="in tiny" data-reps="' + i.ex + '" value="' + esc(i.reps || '') + '" ' +
        'aria-label="' + esc(t('pl.reps')) + '">' +
        '<input class="in tiny num" type="number" min="1" max="10" data-sets="' + i.ex + '" ' +
        'value="' + (i.sets || 3) + '" aria-label="' + esc(t('pl.setCount')) + '">' +
        '<select class="in tiny" data-side="' + i.ex + '" aria-label="' + esc(t('plan.side')) + '">' +
          sideOptions().map(o => '<option value="' + o.id + '"' +
            (o.id === (i.side || '') ? ' selected' : '') + '>' + esc(o.label) + '</option>').join('') +
        '</select>' +
      '</div>' +
      '<div class="row-act">' +
        '<button class="mini" data-up="' + i.ex + '" aria-label="' + esc(t('pl.up')) + '">↑</button>' +
        '<button class="mini" data-down="' + i.ex + '" aria-label="' + esc(t('pl.down')) + '">↓</button>' +
        '<button class="mini warn" data-rm="' + i.ex + '">×</button>' +
      '</div></div>';
  }).join('');

  const free = st.visibleExercises().filter(e => !p.items.some(i => i.ex === e.id));

  mount.innerHTML = head() + backBar(st.nameOf(p)) +
    field(t('pl.name'), textIn('f-name', st.nameOf(p))) +
    field(t('pl.short'), textIn('f-short', p.short || ''), t('pl.shortSub')) +
    field(t('pl.focus'), textIn('f-focus', st.focusOf(p))) +
    checkIn('f-night', t('pl.night'), !!p.night) +
    '<p class="fld-h">' + esc(t('pl.nightSub')) + '</p>' +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>' +
    '<h3 class="sec">' + esc(t('pl.items')) + '</h3>' +
    (items || '<p class="intro">' + esc(t('pl.empty')) + '</p>') +
    (free.length
      ? '<div class="add-row">' +
        selectIn('f-add', free.map(e => ({ id: e.id, label: st.nameOf(e) })), free[0].id) +
        '<button class="mini" id="additem">+ ' + esc(t('pl.addItem')) + '</button></div>'
      : '<p class="intro">' + esc(st.visibleExercises().length ? '' : t('pl.noExercises')) + '</p>');

  wireBack(goHub);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    st.updatePlan(p.id, {
      name,
      short: val('f-short').slice(0, 2) || p.short,
      focus: val('f-focus'),
      night: byId('f-night').checked
    });
  });
  if (byId('additem')) {
    byId('additem').addEventListener('click', () => st.addPlanItem(p.id, byId('f-add').value));
  }
  on('[data-rm]', ev => st.removePlanItem(p.id, ev.currentTarget.dataset.rm));
  on('[data-up]', ev => st.movePlanItem(p.id, ev.currentTarget.dataset.up, -1));
  on('[data-down]', ev => st.movePlanItem(p.id, ev.currentTarget.dataset.down, 1));
  on('[data-reps]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.reps, { reps: ev.currentTarget.value }), 'change');
  on('[data-sets]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.sets,
    { sets: Math.max(1, Math.min(10, parseInt(ev.currentTarget.value, 10) || 3)) }), 'change');
  on('[data-side]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.side,
    { side: ev.currentTarget.value || undefined }), 'change');
}
