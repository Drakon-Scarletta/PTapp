// Zustand und alle Ableitungen daraus. Kennt kein DOM.
import { newId } from './data.js';
import { loadState, saveState, freshState } from './store.js';
import { t, setLang, num } from './i18n.js';

export const S = freshState();
let saveErr = '';
const listeners = [];

export function onChange(fn) { listeners.push(fn); }
function emit() { listeners.forEach(fn => fn()); }
export function lastError() { return saveErr; }

export async function init() {
  Object.assign(S, await loadState());
  setLang(S.lang);
}

async function persist() {
  try { await saveState(S); saveErr = ''; }
  catch (e) { saveErr = t('data.saveError'); }
  emit();
}
export function touch() { return persist(); }

export function replaceState(next) {
  Object.keys(S).forEach(k => delete S[k]);
  Object.assign(S, next);
  setLang(S.lang);
  sel = null;
  return persist();
}

export function setLanguage(l) { S.lang = l; setLang(l); persist(); }

// ---- Datum ----
export function iso(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
export function monday(d) {
  const x = new Date(d), wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd); x.setHours(0, 0, 0, 0); return x;
}
export let today = new Date();
export let tk = iso(today);
export let wk = iso(monday(today));
export function refreshDay() {
  const now = new Date();
  if (iso(now) === tk) return false;
  today = now; tk = iso(now); wk = iso(monday(now));
  return true;
}

// ---- Nachschlagen ----
export const equipOf = id => S.equipment.find(e => e.id === id) || null;
export const exOf = id => S.exercises.find(e => e.id === id) || null;
export const planOf = id => S.plans.find(p => p.id === id) || null;

// Eingebaute Einträge tragen einen Sprachschlüssel, eigene einen festen Namen.
export function nameOf(obj) {
  if (!obj) return t('log.gone');
  return obj.key ? t('seed.' + obj.key) : (obj.name || '');
}
export function focusOf(plan) {
  if (!plan) return '';
  return plan.focusKey ? t('seed.' + plan.focusKey) : (plan.focus || '');
}
export function hintOf(ex) {
  if (!ex) return '';
  return ex.hintKey ? t('seed.' + ex.hintKey) : (ex.hint || '');
}

export function sideLabel(side) {
  if (side === 'leg') return t('plan.perLeg');
  if (side === 'arm') return t('plan.perArm');
  if (side === 'alt') return t('plan.alt');
  return '';
}

export function visibleExercises() { return S.exercises.filter(e => !e.hidden); }
export function rotatingPlans() { return S.plans.filter(p => !p.night); }
export function nightPlans() { return S.plans.filter(p => p.night); }

// ---- Gewicht ----
export function kindOf(exId) {
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  return eq ? eq.kind : 'body';
}
export function stepOf(exId) {
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  if (!eq) return 1;
  return eq.kind === 'weight' ? (eq.step || 2.5) : 1;
}
// Anzeige des eingestellten Gewichts einer Übung.
export function weightLabel(exId, value) {
  const v = value == null ? (S.kg[exId] || 0) : value;
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  if (!eq || eq.kind === 'body') return { main: '', sub: t('plan.bodyweight'), body: true };
  if (eq.kind === 'weight') return { main: num(v), unit: 'kg', sub: '', body: false };
  return { main: String(v), unit: t('plan.plates'), sub: num(v * (eq.plate || 4.5)) + ' kg', body: false };
}
export function band(exId) {
  const ex = exOf(exId);
  if (!ex || !ex.bands || !ex.bands.length) return null;
  const n = S.kg[exId] || 0;
  if (!n) return null;
  if (n <= ex.bands[0]) return 'g';
  if (n <= ex.bands[1]) return 'y';
  return 'r';
}

// ---- Ableitungen ----
export function isNight() { return !!S.nights[wk]; }
export function suggested() {
  if (isNight()) {
    const n = nightPlans();
    if (n.length) return n[0].id;
  }
  if (planOf(S.next)) return S.next;
  const r = rotatingPlans();
  return r.length ? r[0].id : (S.plans[0] ? S.plans[0].id : null);
}

let sel = null;
export function selectedPlan() { return sel; }
export function selectPlan(k) { sel = k; emit(); }
export function activePlan() {
  if (sel && planOf(sel)) return sel;
  if (S.log[tk] && planOf(S.log[tk].k)) return S.log[tk].k;
  return suggested();
}
export function entry() {
  const k = activePlan();
  if (!S.log[tk] || S.log[tk].k !== k) return { k, t: {}, w: {}, done: false };
  return S.log[tk];
}
export function weekCount() {
  let n = 0;
  const m = monday(today);
  for (let i = 0; i < 7; i++) {
    const d = new Date(m); d.setDate(m.getDate() + i);
    const e = S.log[iso(d)];
    if (e && e.done) n++;
  }
  return n;
}
export function weekTarget() { return isNight() ? 2 : 4; }
export function setsDone(e, item) {
  const v = e && e.t ? e.t[item.ex] : 0;
  if (v === true) return item.sets || 3;
  return v || 0;
}
export function hasAnySet() {
  const p = planOf(activePlan());
  if (!p) return false;
  const e = entry();
  return p.items.some(i => setsDone(e, i) > 0);
}

// ---- Trainingsaktionen ----
function ensureEntry(k) {
  let e = S.log[tk];
  if (!e || e.k !== k) { e = { k, t: {}, w: {}, done: false }; S.log[tk] = e; }
  return e;
}
function snapshotWeights(e, plan) {
  e.w = e.w || {};
  plan.items.forEach(i => {
    if (kindOf(i.ex) !== 'body') e.w[i.ex] = S.kg[i.ex] || 0;
  });
}

export function toggleExercise(exId) {
  const plan = planOf(activePlan());
  if (!plan) return false;
  const item = plan.items.find(i => i.ex === exId);
  if (!item) return false;
  const e = ensureEntry(plan.id);
  const goal = item.sets || 3;
  const n = setsDone(e, item) + 1;
  const wrapped = n > goal;
  e.t[exId] = wrapped ? 0 : n;
  snapshotWeights(e, plan);
  persist();
  return !wrapped && n >= goal;
}

export function bumpWeight(exId, dir) {
  const kind = kindOf(exId);
  if (kind === 'body') return;
  const step = stepOf(exId);
  const max = kind === 'weight' ? 500 : 40;
  const next = Math.max(0, Math.min(max, (S.kg[exId] || 0) + dir * step));
  S.kg[exId] = Math.round(next * 100) / 100;
  const plan = planOf(activePlan());
  const e = S.log[tk];
  if (plan && e && e.k === plan.id) snapshotWeights(e, plan);
  persist();
}

export function finish() {
  const plan = planOf(activePlan());
  if (!plan) return false;
  const e = ensureEntry(plan.id);
  snapshotWeights(e, plan);
  if (e.done) {
    e.done = false;
    if (!plan.night) S.next = plan.id;
  } else {
    e.done = true;
    S.next = nextRotating(plan.id);
  }
  sel = null;
  persist();
  return e.done;
}

// Nach einer normalen Einheit rückt der Vorschlag eins weiter.
function nextRotating(fromId) {
  const r = rotatingPlans();
  if (!r.length) return S.next;
  const i = r.findIndex(p => p.id === fromId);
  if (i < 0) return r[0].id;
  return r[(i + 1) % r.length].id;
}

export function toggleNight() {
  if (S.nights[wk]) delete S.nights[wk]; else S.nights[wk] = true;
  sel = null;
  persist();
}

// ---- Geräte ----
export function addEquipment(data) {
  const eq = { id: newId('eq', S.equipment.map(e => e.id)), kind: 'plates', plate: S.pw, ...data };
  S.equipment.push(eq);
  persist();
  return eq;
}
export function updateEquipment(id, data) {
  const eq = equipOf(id);
  if (!eq) return;
  Object.assign(eq, data);
  if (data.name) delete eq.key;
  persist();
}
export function equipmentUsage(id) { return S.exercises.filter(e => e.equip === id && !e.hidden).length; }
export function deleteEquipment(id) {
  if (equipmentUsage(id)) return false;
  S.equipment = S.equipment.filter(e => e.id !== id);
  persist();
  return true;
}

// ---- Übungen ----
export function addExercise(data) {
  const ex = { id: newId('ex', S.exercises.map(e => e.id)), ...data };
  S.exercises.push(ex);
  persist();
  return ex;
}
export function updateExercise(id, data) {
  const ex = exOf(id);
  if (!ex) return;
  Object.assign(ex, data);
  if (data.name) { delete ex.key; delete ex.hintKey; }
  persist();
}
export function exerciseUsage(id) { return S.plans.filter(p => p.items.some(i => i.ex === id)).length; }
export function usedInLog(id) {
  return Object.values(S.log).some(e => e && e.t && e.t[id] != null);
}
// Aus allen Plänen nehmen. Was im Verlauf steht, bleibt unsichtbar erhalten,
// damit alte Einträge weiterhin einen Namen haben.
export function deleteExercise(id) {
  S.plans.forEach(p => { p.items = p.items.filter(i => i.ex !== id); });
  if (usedInLog(id)) {
    const ex = exOf(id);
    if (ex) ex.hidden = true;
  } else {
    S.exercises = S.exercises.filter(e => e.id !== id);
    delete S.kg[id];
  }
  persist();
}

// ---- Pläne ----
export function addPlan(data) {
  const p = {
    id: newId('pl', S.plans.map(x => x.id)),
    short: nextShort(),
    items: [],
    ...data
  };
  S.plans.push(p);
  persist();
  return p;
}
function nextShort() {
  const taken = S.plans.map(p => (p.short || '').toUpperCase());
  for (let c = 65; c <= 90; c++) {
    const s = String.fromCharCode(c);
    if (!taken.includes(s)) return s;
  }
  return String(S.plans.length + 1);
}
export function updatePlan(id, data) {
  const p = planOf(id);
  if (!p) return;
  Object.assign(p, data);
  if (data.name) delete p.key;
  if (data.focus != null) delete p.focusKey;
  persist();
}
export function deletePlan(id) {
  S.plans = S.plans.filter(p => p.id !== id);
  if (S.next === id) S.next = suggested();
  persist();
}
export function addPlanItem(planId, exId) {
  const p = planOf(planId);
  if (!p || p.items.some(i => i.ex === exId)) return;
  p.items.push({ ex: exId, reps: '3 × 8–12', sets: 3 });
  persist();
}
export function updatePlanItem(planId, exId, data) {
  const p = planOf(planId);
  const i = p && p.items.find(x => x.ex === exId);
  if (!i) return;
  Object.assign(i, data);
  persist();
}
export function removePlanItem(planId, exId) {
  const p = planOf(planId);
  if (!p) return;
  p.items = p.items.filter(i => i.ex !== exId);
  persist();
}
export function movePlanItem(planId, exId, dir) {
  const p = planOf(planId);
  if (!p) return;
  const i = p.items.findIndex(x => x.ex === exId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= p.items.length) return;
  const [item] = p.items.splice(i, 1);
  p.items.splice(j, 0, item);
  persist();
}

// ---- Statistik ----
export function totalSessions() {
  return Object.values(S.log).filter(e => e && e.done).length;
}
// Wie viele Wochen in Folge das Wochenziel erreicht wurde, die laufende Woche
// zählt nur mit, wenn sie schon voll ist.
export function weekStreak() {
  let n = 0;
  const m = monday(today);
  for (let back = 0; back < 260; back++) {
    const start = new Date(m); start.setDate(m.getDate() - back * 7);
    const key = iso(start);
    const ziel = S.nights[key] ? 2 : 4;
    let done = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const e = S.log[iso(d)];
      if (e && e.done) done++;
    }
    if (done >= ziel) n++;
    else if (back > 0) break;
    else if (done < ziel) break;
  }
  return n;
}
// Einheiten je Woche, jüngste zuletzt.
export function lastWeeks(count) {
  const m = monday(today);
  const out = [];
  for (let back = count - 1; back >= 0; back--) {
    const start = new Date(m); start.setDate(m.getDate() - back * 7);
    let done = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const e = S.log[iso(d)];
      if (e && e.done) done++;
    }
    out.push({ start: iso(start), done, target: S.nights[iso(start)] ? 2 : 4 });
  }
  return out;
}
export function perPlanCounts() {
  const out = new Map();
  Object.values(S.log).forEach(e => {
    if (!e || !e.done) return;
    out.set(e.k, (out.get(e.k) || 0) + 1);
  });
  return out;
}
export function lastSessions(count) {
  return Object.keys(S.log)
    .filter(d => S.log[d] && S.log[d].done)
    .sort()
    .slice(-count)
    .reverse()
    .map(d => ({ date: d, plan: planOf(S.log[d].k) }));
}

// ---- Chat mit dem virtuellen Trainer ----
const CHAT_MAX = 40;
export function addChat(role, text) {
  S.chat.push({ role, text, at: Date.now() });
  if (S.chat.length > CHAT_MAX) S.chat = S.chat.slice(-CHAT_MAX);
  return persist();
}
export function clearChat() { S.chat = []; return persist(); }

// ---- Von der KI erzeugte Pläne übernehmen ----
export function applyGenerated(result) {
  let created = 0;
  const byName = new Map(S.exercises.map(e => [nameOf(e).toLowerCase(), e.id]));

  (result.exercises || []).forEach(g => {
    const key = (g.name || '').toLowerCase();
    if (!key || byName.has(key)) return;
    const eq = equipOf(g.equipment) ? g.equipment : (S.equipment[0] && S.equipment[0].id);
    const ex = {
      id: newId('ex', S.exercises.map(e => e.id)),
      name: g.name,
      equip: eq,
      src: 'ai'
    };
    if (g.hint) ex.hint = g.hint;
    S.exercises.push(ex);
    byName.set(key, ex.id);
    created++;
  });

  (result.plans || []).forEach(g => {
    const items = (g.items || [])
      .map(i => ({ ex: byName.get((i.exercise || '').toLowerCase()), reps: i.reps || '3 × 8–12', sets: i.sets || 3 }))
      .filter(i => i.ex);
    if (!items.length) return;
    S.plans.push({
      id: newId('pl', S.plans.map(x => x.id)),
      short: nextShort(),
      name: g.name || t('common.new'),
      focus: g.focus || '',
      night: !!g.night,
      src: 'ai',
      items
    });
  });

  persist();
  return created;
}
