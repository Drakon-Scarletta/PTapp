// Zustand und alle Ableitungen daraus. Kennt kein DOM.
import { PLANS, BANDS, goal, exOf } from './data.js';
import { loadState, saveState, DEFAULT_STATE } from './store.js';

export const S = { ...DEFAULT_STATE };
let saveErr = '';
const listeners = [];

export function onChange(fn) { listeners.push(fn); }
function emit() { listeners.forEach(fn => fn()); }

export function lastError() { return saveErr; }

export async function init() {
  Object.assign(S, await loadState());
}

async function persist() {
  try { await saveState(S); saveErr = ''; }
  catch (e) { saveErr = 'Konnte nicht gespeichert werden. Die Eingaben gelten nur für diese Sitzung.'; }
  emit();
}

export function replaceState(next) {
  Object.keys(S).forEach(k => delete S[k]);
  Object.assign(S, next);
  return persist();
}

// ---- Datum ----
export function iso(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
export function monday(d) {
  const x = new Date(d), wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd); x.setHours(0, 0, 0, 0); return x;
}
// Wird beim Tageswechsel neu gesetzt, damit die App über Mitternacht hinweg stimmt.
export let today = new Date();
export let tk = iso(today);
export let wk = iso(monday(today));
export function refreshDay() {
  const now = new Date();
  if (iso(now) === tk) return false;
  today = now; tk = iso(now); wk = iso(monday(now));
  return true;
}

// ---- Ableitungen ----
export function band(id) {
  const n = S.kg[id] || 0, b = BANDS[id];
  if (!b || !n) return null;
  if (n <= b[0]) return 'g';
  if (n <= b[1]) return 'y';
  return 'r';
}
export function isNight() { return !!S.nights[wk]; }
export function suggested() { return isNight() ? 'C' : (S.next || 'A'); }

let sel = null;
export function selectedPlan() { return sel; }
export function selectPlan(k) { sel = k; emit(); }
export function clearSelection() { sel = null; }

export function activePlan() {
  return sel || (S.log[tk] ? S.log[tk].k : suggested());
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

export function setsDone(e, x) {
  const v = e && e.t ? e.t[x.id] : 0;
  if (v === true) return goal(x);
  return v || 0;
}

export function plateKg(id) {
  const n = (S.kg[id] || 0) * (S.pw || 4.5);
  return fmt(n);
}
export function fmt(n) {
  return (Math.round(n * 10) / 10).toString().replace('.', ',');
}

// ---- Aktionen ----
function ensureEntry(k) {
  let e = S.log[tk];
  if (!e || e.k !== k) { e = { k, t: {}, w: {}, done: false }; S.log[tk] = e; }
  return e;
}
function snapshotWeights(e, k) {
  e.w = e.w || {};
  PLANS[k].ex.forEach(x => { if (!x.bw) e.w[x.id] = S.kg[x.id] || 0; });
}

export function toggleExercise(id) {
  const k = activePlan(), e = ensureEntry(k), x = exOf(k, id);
  if (!x) return false;
  const n = setsDone(e, x) + 1;
  const wrapped = n > goal(x);
  e.t[id] = wrapped ? 0 : n;
  snapshotWeights(e, k);
  persist();
  return !wrapped && n >= goal(x); // true, wenn die Übung damit fertig ist
}

export function bumpWeight(id, dir) {
  S.kg[id] = Math.max(0, Math.min(20, (S.kg[id] || 0) + dir));
  const k = activePlan(), e = S.log[tk];
  if (e && e.k === k) snapshotWeights(e, k);
  persist();
}

export function setPlateWeight(v) { S.pw = v; persist(); }

export function finish() {
  const k = activePlan(), e = ensureEntry(k);
  snapshotWeights(e, k);
  if (e.done) {
    e.done = false;
    if (k === 'A' || k === 'B') S.next = k;
  } else {
    e.done = true;
    if (k === 'A') S.next = 'B';
    if (k === 'B') S.next = 'A';
  }
  sel = null;
  persist();
  return e.done;
}

export function toggleNight() {
  if (S.nights[wk]) delete S.nights[wk]; else S.nights[wk] = true;
  sel = null;
  persist();
}

export function hasAnySet() {
  const k = activePlan(), e = entry();
  return PLANS[k].ex.some(x => setsDone(e, x) > 0);
}
