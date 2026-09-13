import {
  LANGS,
  PROVIDERS,
  detectLang,
  getLang,
  locale,
  longDate,
  monthName,
  num,
  providerOf,
  setLang,
  t,
  weekdayShort
} from "./part-KPUBZ5OY.js";
import {
  Directory,
  Encoding
} from "./part-MTR7NSI3.js";
import {
  ImpactStyle
} from "./part-MJLH4ETE.js";
import {
  Capacitor,
  registerPlugin
} from "./part-NTKUDOCD.js";
import {
  __export
} from "./part-ED4TTFRM.js";

// node_modules/@capacitor/app/dist/esm/index.js
var App = registerPlugin("App", {
  web: () => import("./part-NP5MIX7G.js").then((m) => new m.AppWeb())
});

// node_modules/@capacitor/status-bar/dist/esm/definitions.js
var Style;
(function(Style2) {
  Style2["Dark"] = "DARK";
  Style2["Light"] = "LIGHT";
  Style2["Default"] = "DEFAULT";
})(Style || (Style = {}));
var Animation;
(function(Animation2) {
  Animation2["None"] = "NONE";
  Animation2["Slide"] = "SLIDE";
  Animation2["Fade"] = "FADE";
})(Animation || (Animation = {}));

// node_modules/@capacitor/status-bar/dist/esm/index.js
var StatusBar = registerPlugin("StatusBar");

// src/js/data.js
var SEED_EQUIPMENT = [
  { id: "stack", key: "eqStack", kind: "plates", plate: 4.5 },
  { id: "body", key: "eqBody", kind: "body" }
];
var SEED_EXERCISES = [
  { id: "chestpress", key: "chestpress", equip: "stack", bands: [4, 6] },
  { id: "butterfly", key: "butterfly", equip: "stack", bands: [2, 4] },
  { id: "legext", key: "legext", equip: "stack", bands: [3, 5] },
  { id: "backkick", key: "backkick", equip: "stack", bands: [2, 4], hintKey: "hintBackkick" },
  { id: "pushdown", key: "pushdown", equip: "stack", bands: [3, 5], hintKey: "hintPushdown" },
  { id: "deltoid", key: "deltoid", equip: "stack", bands: [1, 3] },
  { id: "abcrunch", key: "abcrunch", equip: "stack", bands: [3, 5] },
  { id: "lat", key: "lat", equip: "stack", bands: [4, 6] },
  { id: "lowrow", key: "lowrow", equip: "stack", bands: [4, 6] },
  { id: "curl", key: "curl", equip: "stack", bands: [3, 5] },
  { id: "upright", key: "upright", equip: "stack", bands: [3, 5], hintKey: "hintUpright" },
  { id: "armset", key: "armset", equip: "stack", bands: [3, 5] },
  { id: "split", key: "split", equip: "body", hintKey: "hintSplit" },
  { id: "calf", key: "calf", equip: "body" },
  { id: "plank", key: "plank", equip: "body" },
  { id: "hipraise", key: "hipraise", equip: "body" }
];
var SEED_PLANS = [
  {
    id: "A",
    short: "A",
    key: "planA",
    focusKey: "focusA",
    items: [
      { ex: "chestpress", reps: "3 \xD7 8\u201312", sets: 3 },
      { ex: "butterfly", reps: "3 \xD7 10\u201315", sets: 3 },
      { ex: "legext", reps: "3 \xD7 12\u201315", sets: 3 },
      { ex: "backkick", reps: "3 \xD7 12\u201315", sets: 3, side: "leg" },
      { ex: "pushdown", reps: "3 \xD7 10\u201315", sets: 3 },
      { ex: "deltoid", reps: "2 \xD7 12\u201315", sets: 2, side: "arm" },
      { ex: "abcrunch", reps: "3 \xD7 12\u201315", sets: 3 }
    ]
  },
  {
    id: "B",
    short: "B",
    key: "planB",
    focusKey: "focusB",
    items: [
      { ex: "lat", reps: "3 \xD7 8\u201312", sets: 3 },
      { ex: "lowrow", reps: "3 \xD7 8\u201312", sets: 3 },
      { ex: "split", reps: "3 \xD7 8\u201312", sets: 3, side: "leg" },
      { ex: "curl", reps: "3 \xD7 10\u201312", sets: 3 },
      { ex: "upright", reps: "3 \xD7 12", sets: 3 },
      { ex: "calf", reps: "3 \xD7 15\u201320", sets: 3 },
      { ex: "plank", reps: "3 \xD7 30\u201360 s", sets: 3 }
    ]
  },
  {
    id: "C",
    short: "C",
    key: "planC",
    focusKey: "focusC",
    night: true,
    items: [
      { ex: "lat", reps: "2\u20133 \xD7 10\u201312", sets: 3 },
      { ex: "chestpress", reps: "2\u20133 \xD7 10\u201312", sets: 3 },
      { ex: "legext", reps: "2\u20133 \xD7 10\u201312", sets: 3 },
      { ex: "hipraise", reps: "2\u20133 \xD7 10\u201312", sets: 3, side: "leg" },
      { ex: "lowrow", reps: "2\u20133 \xD7 10\u201312", sets: 3 },
      { ex: "armset", reps: "2 \xD7 10\u201312", sets: 2, side: "alt" },
      { ex: "abcrunch", reps: "2\u20133 \xD7 12\u201315", sets: 3 }
    ]
  }
];
function newId(prefix, taken) {
  let n = 1;
  while (taken.includes(prefix + n)) n++;
  return prefix + n;
}

// node_modules/@capacitor/preferences/dist/esm/index.js
var Preferences = registerPlugin("Preferences", {
  web: () => import("./part-RW2RFTHW.js").then((m) => new m.PreferencesWeb())
});

// node_modules/@capacitor/synapse/dist/synapse.mjs
function s(t2) {
  t2.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return new Proxy({}, {
          get(w, o) {
            return (c, p, r) => {
              const i = t2.Capacitor.Plugins[n];
              if (i === void 0) {
                r(new Error(`Capacitor plugin ${n} not found`));
                return;
              }
              if (typeof i[o] != "function") {
                r(new Error(`Method ${o} not found in Capacitor plugin ${n}`));
                return;
              }
              (async () => {
                try {
                  const a = await i[o](c);
                  p(a);
                } catch (a) {
                  r(a);
                }
              })();
            };
          }
        });
      }
    }
  );
}
function u(t2) {
  t2.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return t2.cordova.plugins[n];
      }
    }
  );
}
function f(t2 = false) {
  typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t2 ? s(window) : window.cordova !== void 0 && u(window));
}

// node_modules/@capacitor/filesystem/dist/esm/index.js
var Filesystem = registerPlugin("Filesystem", {
  web: () => import("./part-MOS4NO2Z.js").then((m) => new m.FilesystemWeb())
});
f();

// node_modules/@capacitor/share/dist/esm/index.js
var Share = registerPlugin("Share", {
  web: () => import("./part-DA66V5EW.js").then((m) => new m.ShareWeb())
});

// src/js/store.js
var KEY = "training:v2";
var FOLDER = "PTapp";
var APP_NAME = "PTapp";
var APP_VERSION = "1.2";
var STATE_VERSION = 3;
var isNative = () => Capacitor.isNativePlatform();
function freshState() {
  return {
    v: STATE_VERSION,
    lang: detectLang(),
    pw: 4.5,
    next: "A",
    nights: {},
    log: {},
    kg: {},
    equipment: SEED_EQUIPMENT.map((e) => ({ ...e })),
    exercises: SEED_EXERCISES.map((e) => ({ ...e, bands: e.bands ? [...e.bands] : void 0 })),
    plans: SEED_PLANS.map((p) => ({ ...p, items: p.items.map((i) => ({ ...i })) })),
    ai: { provider: "anthropic", model: "", keys: { anthropic: "", openai: "" } }
  };
}
async function loadState() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    if (!value) return freshState();
    return migrate(JSON.parse(value));
  } catch (e) {
    console.warn("Laden fehlgeschlagen:", e);
    return freshState();
  }
}
async function saveState(state2) {
  await Preferences.set({ key: KEY, value: JSON.stringify(state2) });
}
function migrate(raw) {
  const s2 = Object.assign(freshState(), raw);
  Object.values(s2.log || {}).forEach((e) => {
    if (!e || !e.t) return;
    Object.keys(e.t).forEach((id) => {
      if (e.t[id] === true) e.t[id] = 3;
    });
  });
  if (!raw.v || raw.v < 3) {
    s2.equipment = SEED_EQUIPMENT.map((e) => ({ ...e }));
    const stack = s2.equipment.find((e) => e.id === "stack");
    if (stack && typeof raw.pw === "number") stack.plate = raw.pw;
    s2.exercises = SEED_EXERCISES.map((e) => ({ ...e, bands: e.bands ? [...e.bands] : void 0 }));
    s2.plans = SEED_PLANS.map((p) => ({ ...p, items: p.items.map((i) => ({ ...i })) }));
  }
  if (!Array.isArray(s2.equipment) || !s2.equipment.length) s2.equipment = SEED_EQUIPMENT.map((e) => ({ ...e }));
  if (!Array.isArray(s2.exercises)) s2.exercises = [];
  if (!Array.isArray(s2.plans)) s2.plans = [];
  if (!s2.ai) s2.ai = { provider: "anthropic", model: "", keys: { anthropic: "", openai: "" } };
  if (!s2.ai.keys) s2.ai.keys = { anthropic: "", openai: "" };
  if (!s2.lang) s2.lang = detectLang();
  s2.v = STATE_VERSION;
  return s2;
}
function stamp() {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}
var DIRS = [Directory.Documents, Directory.Data];
var backupDir = DIRS[0];
async function exportBackup(state2) {
  const data2 = JSON.stringify(
    { app: "ptapp", version: STATE_VERSION, exported: (/* @__PURE__ */ new Date()).toISOString(), state: state2 },
    null,
    2
  );
  const name = `ptapp-${stamp()}.json`;
  if (!isNative()) {
    downloadInBrowser(name, data2);
    return { name, path: "Download" };
  }
  let res = null, lastErr = null;
  for (const dir of DIRS) {
    try {
      await ensureFolder(dir);
      res = await Filesystem.writeFile({
        path: `${FOLDER}/${name}`,
        data: data2,
        directory: dir,
        encoding: Encoding.UTF8
      });
      backupDir = dir;
      break;
    } catch (e) {
      lastErr = e;
    }
  }
  if (!res) throw lastErr || new Error("Kein Schreibzugriff");
  try {
    if ((await Share.canShare()).value) {
      await Share.share({ title: `${APP_NAME} Backup`, url: res.uri, dialogTitle: `${APP_NAME} Backup` });
    }
  } catch (e) {
  }
  return { name, path: `${FOLDER}` };
}
async function listBackups() {
  if (!isNative()) return [];
  const seen = /* @__PURE__ */ new Map();
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readdir({ path: FOLDER, directory: dir });
      (res.files || []).forEach((f2) => {
        const name = typeof f2 === "string" ? f2 : f2.name;
        if (name.endsWith(".json") && !seen.has(name)) seen.set(name, { name, dir });
      });
    } catch (e) {
    }
  }
  return [...seen.values()].sort((a, b) => b.name.localeCompare(a.name));
}
async function readBackup(name) {
  let lastErr = null;
  for (const dir of DIRS) {
    try {
      const res = await Filesystem.readFile({
        path: `${FOLDER}/${name}`,
        directory: dir,
        encoding: Encoding.UTF8
      });
      return parseBackup(res.data);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("Datei nicht gefunden");
}
function parseBackup(text) {
  const obj = JSON.parse(text);
  const state2 = obj && obj.state ? obj.state : obj;
  if (!state2 || typeof state2 !== "object" || !("log" in state2)) throw new Error("kein g\xFCltiges Format");
  return migrate(state2);
}
async function ensureFolder(dir) {
  try {
    await Filesystem.mkdir({ path: FOLDER, directory: dir, recursive: true });
  } catch (e) {
  }
}
function downloadInBrowser(name, data2) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data2], { type: "application/json" }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
}

// src/js/state.js
var S = freshState();
var saveErr = "";
var listeners = [];
function onChange(fn) {
  listeners.push(fn);
}
function emit() {
  listeners.forEach((fn) => fn());
}
function lastError() {
  return saveErr;
}
async function init() {
  Object.assign(S, await loadState());
  setLang(S.lang);
}
async function persist() {
  try {
    await saveState(S);
    saveErr = "";
  } catch (e) {
    saveErr = t("data.saveError");
  }
  emit();
}
function touch() {
  return persist();
}
function replaceState(next) {
  Object.keys(S).forEach((k) => delete S[k]);
  Object.assign(S, next);
  setLang(S.lang);
  sel = null;
  return persist();
}
function setLanguage(l) {
  S.lang = l;
  setLang(l);
  persist();
}
function iso(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function monday(d) {
  const x = new Date(d), wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd);
  x.setHours(0, 0, 0, 0);
  return x;
}
var today = /* @__PURE__ */ new Date();
var tk = iso(today);
var wk = iso(monday(today));
function refreshDay() {
  const now = /* @__PURE__ */ new Date();
  if (iso(now) === tk) return false;
  today = now;
  tk = iso(now);
  wk = iso(monday(now));
  return true;
}
var equipOf = (id) => S.equipment.find((e) => e.id === id) || null;
var exOf = (id) => S.exercises.find((e) => e.id === id) || null;
var planOf = (id) => S.plans.find((p) => p.id === id) || null;
function nameOf(obj) {
  if (!obj) return t("log.gone");
  return obj.key ? t("seed." + obj.key) : obj.name || "";
}
function focusOf(plan) {
  if (!plan) return "";
  return plan.focusKey ? t("seed." + plan.focusKey) : plan.focus || "";
}
function hintOf(ex) {
  if (!ex) return "";
  return ex.hintKey ? t("seed." + ex.hintKey) : ex.hint || "";
}
function sideLabel(side) {
  if (side === "leg") return t("plan.perLeg");
  if (side === "arm") return t("plan.perArm");
  if (side === "alt") return t("plan.alt");
  return "";
}
function visibleExercises() {
  return S.exercises.filter((e) => !e.hidden);
}
function rotatingPlans() {
  return S.plans.filter((p) => !p.night);
}
function nightPlans() {
  return S.plans.filter((p) => p.night);
}
function kindOf(exId) {
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  return eq ? eq.kind : "body";
}
function stepOf(exId) {
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  if (!eq) return 1;
  return eq.kind === "weight" ? eq.step || 2.5 : 1;
}
function weightLabel(exId, value) {
  const v = value == null ? S.kg[exId] || 0 : value;
  const ex = exOf(exId);
  const eq = ex ? equipOf(ex.equip) : null;
  if (!eq || eq.kind === "body") return { main: "", sub: t("plan.bodyweight"), body: true };
  if (eq.kind === "weight") return { main: num(v), unit: "kg", sub: "", body: false };
  return { main: String(v), unit: t("plan.plates"), sub: num(v * (eq.plate || 4.5)) + " kg", body: false };
}
function band(exId) {
  const ex = exOf(exId);
  if (!ex || !ex.bands || !ex.bands.length) return null;
  const n = S.kg[exId] || 0;
  if (!n) return null;
  if (n <= ex.bands[0]) return "g";
  if (n <= ex.bands[1]) return "y";
  return "r";
}
function isNight() {
  return !!S.nights[wk];
}
function suggested() {
  if (isNight()) {
    const n = nightPlans();
    if (n.length) return n[0].id;
  }
  if (planOf(S.next)) return S.next;
  const r = rotatingPlans();
  return r.length ? r[0].id : S.plans[0] ? S.plans[0].id : null;
}
var sel = null;
function selectPlan(k) {
  sel = k;
  emit();
}
function activePlan() {
  if (sel && planOf(sel)) return sel;
  if (S.log[tk] && planOf(S.log[tk].k)) return S.log[tk].k;
  return suggested();
}
function entry() {
  const k = activePlan();
  if (!S.log[tk] || S.log[tk].k !== k) return { k, t: {}, w: {}, done: false };
  return S.log[tk];
}
function weekCount() {
  let n = 0;
  const m = monday(today);
  for (let i = 0; i < 7; i++) {
    const d = new Date(m);
    d.setDate(m.getDate() + i);
    const e = S.log[iso(d)];
    if (e && e.done) n++;
  }
  return n;
}
function weekTarget() {
  return isNight() ? 2 : 4;
}
function setsDone(e, item) {
  const v = e && e.t ? e.t[item.ex] : 0;
  if (v === true) return item.sets || 3;
  return v || 0;
}
function hasAnySet() {
  const p = planOf(activePlan());
  if (!p) return false;
  const e = entry();
  return p.items.some((i) => setsDone(e, i) > 0);
}
function ensureEntry(k) {
  let e = S.log[tk];
  if (!e || e.k !== k) {
    e = { k, t: {}, w: {}, done: false };
    S.log[tk] = e;
  }
  return e;
}
function snapshotWeights(e, plan) {
  e.w = e.w || {};
  plan.items.forEach((i) => {
    if (kindOf(i.ex) !== "body") e.w[i.ex] = S.kg[i.ex] || 0;
  });
}
function toggleExercise(exId) {
  const plan = planOf(activePlan());
  if (!plan) return false;
  const item = plan.items.find((i) => i.ex === exId);
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
function bumpWeight(exId, dir) {
  const kind = kindOf(exId);
  if (kind === "body") return;
  const step = stepOf(exId);
  const max = kind === "weight" ? 500 : 40;
  const next = Math.max(0, Math.min(max, (S.kg[exId] || 0) + dir * step));
  S.kg[exId] = Math.round(next * 100) / 100;
  const plan = planOf(activePlan());
  const e = S.log[tk];
  if (plan && e && e.k === plan.id) snapshotWeights(e, plan);
  persist();
}
function finish() {
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
function nextRotating(fromId) {
  const r = rotatingPlans();
  if (!r.length) return S.next;
  const i = r.findIndex((p) => p.id === fromId);
  if (i < 0) return r[0].id;
  return r[(i + 1) % r.length].id;
}
function toggleNight() {
  if (S.nights[wk]) delete S.nights[wk];
  else S.nights[wk] = true;
  sel = null;
  persist();
}
function addEquipment(data2) {
  const eq = { id: newId("eq", S.equipment.map((e) => e.id)), kind: "plates", plate: S.pw, ...data2 };
  S.equipment.push(eq);
  persist();
  return eq;
}
function updateEquipment(id, data2) {
  const eq = equipOf(id);
  if (!eq) return;
  Object.assign(eq, data2);
  if (data2.name) delete eq.key;
  persist();
}
function equipmentUsage(id) {
  return S.exercises.filter((e) => e.equip === id && !e.hidden).length;
}
function deleteEquipment(id) {
  if (equipmentUsage(id)) return false;
  S.equipment = S.equipment.filter((e) => e.id !== id);
  persist();
  return true;
}
function addExercise(data2) {
  const ex = { id: newId("ex", S.exercises.map((e) => e.id)), ...data2 };
  S.exercises.push(ex);
  persist();
  return ex;
}
function updateExercise(id, data2) {
  const ex = exOf(id);
  if (!ex) return;
  Object.assign(ex, data2);
  if (data2.name) {
    delete ex.key;
    delete ex.hintKey;
  }
  persist();
}
function exerciseUsage(id) {
  return S.plans.filter((p) => p.items.some((i) => i.ex === id)).length;
}
function usedInLog(id) {
  return Object.values(S.log).some((e) => e && e.t && e.t[id] != null);
}
function deleteExercise(id) {
  S.plans.forEach((p) => {
    p.items = p.items.filter((i) => i.ex !== id);
  });
  if (usedInLog(id)) {
    const ex = exOf(id);
    if (ex) ex.hidden = true;
  } else {
    S.exercises = S.exercises.filter((e) => e.id !== id);
    delete S.kg[id];
  }
  persist();
}
function addPlan(data2) {
  const p = {
    id: newId("pl", S.plans.map((x) => x.id)),
    short: nextShort(),
    items: [],
    ...data2
  };
  S.plans.push(p);
  persist();
  return p;
}
function nextShort() {
  const taken = S.plans.map((p) => (p.short || "").toUpperCase());
  for (let c = 65; c <= 90; c++) {
    const s2 = String.fromCharCode(c);
    if (!taken.includes(s2)) return s2;
  }
  return String(S.plans.length + 1);
}
function updatePlan(id, data2) {
  const p = planOf(id);
  if (!p) return;
  Object.assign(p, data2);
  if (data2.name) delete p.key;
  if (data2.focus != null) delete p.focusKey;
  persist();
}
function deletePlan(id) {
  S.plans = S.plans.filter((p) => p.id !== id);
  if (S.next === id) S.next = suggested();
  persist();
}
function addPlanItem(planId, exId) {
  const p = planOf(planId);
  if (!p || p.items.some((i) => i.ex === exId)) return;
  p.items.push({ ex: exId, reps: "3 \xD7 8\u201312", sets: 3 });
  persist();
}
function updatePlanItem(planId, exId, data2) {
  const p = planOf(planId);
  const i = p && p.items.find((x) => x.ex === exId);
  if (!i) return;
  Object.assign(i, data2);
  persist();
}
function removePlanItem(planId, exId) {
  const p = planOf(planId);
  if (!p) return;
  p.items = p.items.filter((i) => i.ex !== exId);
  persist();
}
function movePlanItem(planId, exId, dir) {
  const p = planOf(planId);
  if (!p) return;
  const i = p.items.findIndex((x) => x.ex === exId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= p.items.length) return;
  const [item] = p.items.splice(i, 1);
  p.items.splice(j, 0, item);
  persist();
}
function applyGenerated(result2) {
  let created = 0;
  const byName = new Map(S.exercises.map((e) => [nameOf(e).toLowerCase(), e.id]));
  (result2.exercises || []).forEach((g) => {
    const key = (g.name || "").toLowerCase();
    if (!key || byName.has(key)) return;
    const eq = equipOf(g.equipment) ? g.equipment : S.equipment[0] && S.equipment[0].id;
    const ex = {
      id: newId("ex", S.exercises.map((e) => e.id)),
      name: g.name,
      equip: eq
    };
    if (g.hint) ex.hint = g.hint;
    S.exercises.push(ex);
    byName.set(key, ex.id);
    created++;
  });
  (result2.plans || []).forEach((g) => {
    const items = (g.items || []).map((i) => ({ ex: byName.get((i.exercise || "").toLowerCase()), reps: i.reps || "3 \xD7 8\u201312", sets: i.sets || 3 })).filter((i) => i.ex);
    if (!items.length) return;
    S.plans.push({
      id: newId("pl", S.plans.map((x) => x.id)),
      short: nextShort(),
      name: g.name || t("common.new"),
      focus: g.focus || "",
      night: !!g.night,
      items
    });
  });
  persist();
  return created;
}

// src/js/views/plan.js
var plan_exports = {};
__export(plan_exports, {
  render: () => render
});

// node_modules/@capacitor/haptics/dist/esm/index.js
var Haptics = registerPlugin("Haptics", {
  web: () => import("./part-JEYNSYVW.js").then((m) => new m.HapticsWeb())
});

// src/js/ui.js
function esc(s2) {
  return String(s2 == null ? "" : s2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function on(selector, handler, event = "click") {
  document.querySelectorAll(selector).forEach((el) => el.addEventListener(event, handler));
}
function byId(id) {
  return document.getElementById(id);
}
function val(id) {
  const el = byId(id);
  return el ? el.value.trim() : "";
}
var toastTimer = null;
function toast(msg, bad = false) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "toast" + (bad ? " bad" : "");
  el.setAttribute("role", "status");
  el.textContent = msg;
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), bad ? 6e3 : 2600);
}
async function haptic(style = "light") {
  try {
    await Haptics.impact({ style: style === "medium" ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) {
  }
}
function confirmBox(text) {
  return window.confirm(text);
}
function field(label, inner, hint) {
  return '<label class="fld"><span class="fld-l">' + esc(label) + "</span>" + inner + (hint ? '<span class="fld-h">' + esc(hint) + "</span>" : "") + "</label>";
}
function textIn(id, value, placeholder) {
  return '<input class="in" id="' + id + '" type="text" value="' + esc(value) + '"' + (placeholder ? ' placeholder="' + esc(placeholder) + '"' : "") + ">";
}
function numIn(id, value, step, min) {
  return '<input class="in" id="' + id + '" type="number" inputmode="decimal" value="' + esc(value) + '" step="' + (step || "any") + '"' + (min != null ? ' min="' + min + '"' : "") + ">";
}
function selectIn(id, options, value) {
  return '<select class="in" id="' + id + '">' + options.map((o) => '<option value="' + esc(o.id) + '"' + (String(o.id) === String(value) ? " selected" : "") + ">" + esc(o.label) + "</option>").join("") + "</select>";
}
function checkIn(id, label, checked) {
  return '<label class="chk"><input type="checkbox" id="' + id + '"' + (checked ? " checked" : "") + "><span>" + esc(label) + "</span></label>";
}

// src/js/views/plan.js
function weekStrip() {
  const m = monday(today);
  let h = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date(m);
    d.setDate(m.getDate() + i);
    const key = iso(d), e = S.log[key], done = e && e.done;
    const p = done ? planOf(e.k) : null;
    h += '<div class="tp-day' + (done ? " filled" : "") + (key === tk ? " today" : "") + '"><div class="d">' + esc(weekdayShort(i)) + '</div><div class="m' + (done ? "" : " empty") + '">' + (done ? esc(p ? p.short : "\xB7") : "\xB7") + "</div></div>";
  }
  return '<div class="tp-week">' + h + "</div>";
}
function exerciseRow(item, e) {
  const ex = exOf(item.ex);
  const goal = item.sets || 3;
  const n = setsDone(e, item);
  const ok = n >= goal;
  const w = weightLabel(item.ex);
  const bd = w.body ? null : band(item.ex);
  const hint = hintOf(ex);
  const right = w.body ? '<div class="tp-bw">' + esc(w.sub) + "</div>" : '<div class="tp-kg"><button data-kg="' + item.ex + '" data-dir="-1" aria-label="' + esc(t("plan.less")) + '">\u2212</button><div class="val">' + esc(w.main) + "<small> " + esc(w.unit) + "</small>" + (w.sub ? '<div class="sub"><i class="dot ' + (bd || "n") + '"></i>' + esc(w.sub) + "</div>" : '<div class="sub"><i class="dot ' + (bd || "n") + '"></i></div>') + '</div><button data-kg="' + item.ex + '" data-dir="1" aria-label="' + esc(t("plan.more")) + '">+</button></div>';
  return '<div class="tp-ex' + (ok ? " ok" : "") + (n > 0 && !ok ? " part" : "") + '" data-ex="' + item.ex + '" role="button" tabindex="0" aria-label="' + esc(nameOf(ex)) + ", " + esc(t("plan.sets", { done: n, total: goal })) + '"><div class="tp-box">' + (ok ? "\u2713" : n + "<em>/" + goal + "</em>") + '</div><div><div class="nm">' + esc(nameOf(ex)) + '</div><div class="rp">' + esc(item.reps || "") + (item.side ? " " + esc(sideLabel(item.side)) : "") + "</div>" + (hint ? '<div class="hint">' + esc(hint) + "</div>" : "") + "</div>" + right + "</div>";
}
function render(head2, mount2) {
  const planId = activePlan();
  const plan = planOf(planId);
  const e = entry();
  const sug = suggested();
  const night = isNight();
  if (!plan) {
    mount2.innerHTML = head2() + weekStrip() + '<div class="tp-hint">' + esc(t("plan.noPlans")) + "</div>";
    return;
  }
  const pick = S.plans.map((p) => '<button data-pick="' + p.id + '" class="' + (p.id === planId ? "sel" : "") + (p.id === sug && p.id !== planId ? " sug" : "") + '"><span class="k">' + esc(p.short || "?") + "</span>" + esc(nameOf(p)) + "</button>").join("");
  const rows = plan.items.length ? plan.items.map((i) => exerciseRow(i, e)).join("") : '<div class="tp-ex"><div></div><div class="rp">' + esc(t("plan.emptyPlan")) + "</div><div></div></div>";
  mount2.innerHTML = head2() + weekStrip() + '<div class="tp-count"><b>' + esc(t("plan.weekCount", { done: weekCount(), target: weekTarget() })) + "</b>" + esc(t("plan.weekCountRest")) + (night ? esc(t("plan.nightHint")) : "") + '</div><div class="tp-shift' + (night ? " on" : "") + '"><div><div class="lbl">' + esc(t("plan.nightTitle")) + '</div><div class="sub">' + esc(t("plan.nightSub")) + '</div></div><button class="tp-toggle" id="nt" role="switch" aria-checked="' + night + '" aria-label="' + esc(t("plan.nightTitle")) + '"><span></span></button></div><div class="tp-pick">' + pick + '</div><div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + esc(plan.short || "") + '</div><div><div class="nm">' + esc(nameOf(plan)) + '</div><div class="fo">' + esc(focusOf(plan)) + "</div></div></div>" + rows + '<div class="tp-key"><span><i class="dot g"></i>' + esc(t("plan.light")) + '</span><span><i class="dot y"></i>' + esc(t("plan.medium")) + '</span><span><i class="dot r"></i>' + esc(t("plan.heavy")) + '</span></div><button class="tp-finish' + (e.done ? " undo" : "") + '" id="fin"' + (!hasAnySet() && !e.done ? " disabled" : "") + ">" + esc(e.done ? t("plan.undo") : t("plan.finish")) + "</button></div></div>" + (lastError() ? '<div class="tp-err">' + esc(lastError()) + "</div>" : "") + '<div class="tp-note">' + esc(t("plan.note")) + "</div>";
  document.getElementById("nt").addEventListener("click", () => toggleNight());
  document.getElementById("fin").addEventListener("click", () => {
    haptic("medium");
    finish();
  });
  on("[data-pick]", (ev) => selectPlan(ev.currentTarget.dataset.pick));
  on("[data-kg]", (ev) => {
    ev.stopPropagation();
    bumpWeight(ev.currentTarget.dataset.kg, parseInt(ev.currentTarget.dataset.dir, 10));
  });
  on("[data-ex]", (ev) => {
    if (toggleExercise(ev.currentTarget.dataset.ex)) haptic("light");
  });
  on("[data-ex]", (ev) => {
    if (ev.key === " " || ev.key === "Enter") {
      ev.preventDefault();
      toggleExercise(ev.currentTarget.dataset.ex);
    }
  }, "keydown");
}

// src/js/views/log.js
var log_exports = {};
__export(log_exports, {
  render: () => render2,
  resetSelection: () => resetSelection
});
var month = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1);
var selectedDay = null;
function resetSelection() {
  selectedDay = null;
}
function dayDetail() {
  if (!selectedDay) return null;
  const de = S.log[selectedDay];
  if (!de) return null;
  const plan = planOf(de.k);
  const [y, m, d] = selectedDay.split("-").map(Number);
  const dd = new Date(y, m - 1, d);
  const items = plan && plan.items.length ? plan.items : Object.keys(de.t || {}).map((ex) => ({ ex, sets: 3 }));
  const lines = items.map((item) => {
    const ex = exOf(item.ex);
    const goal = item.sets || 3;
    const n = setsDone(de, item);
    const stored = de.w && de.w[item.ex] != null ? de.w[item.ex] : null;
    const w = weightLabel(item.ex, stored == null ? 0 : stored);
    const label = w.body ? w.sub : stored == null ? "\u2014" : w.main + " " + w.unit + (w.sub ? " \xB7 " + w.sub : "");
    return '<div class="dt-row' + (n >= goal ? "" : " skip") + '"><span class="dt-m">' + n + "/" + goal + '</span><span class="dt-n">' + esc(nameOf(ex)) + '</span><span class="dt-w">' + esc(label) + "</span></div>";
  }).join("");
  return '<div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + esc(plan ? plan.short : "?") + '</div><div><div class="nm">' + esc(longDate(dd)) + '</div><div class="fo">' + esc(nameOf(plan)) + " \xB7 " + esc(de.done ? t("log.done") : t("log.notDone")) + "</div></div></div>" + lines + "</div></div>";
}
function render2(head2, mount2) {
  const y = month.getFullYear(), m = month.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  let cells = "", total = 0;
  const per = /* @__PURE__ */ new Map();
  for (let i = 0; i < 7; i++) cells += '<div class="cal-h">' + esc(weekdayShort(i)) + "</div>";
  for (let i = 0; i < lead; i++) cells += '<div class="cal-c void"></div>';
  for (let d = 1; d <= days; d++) {
    const key = iso(new Date(y, m, d));
    const e = S.log[key];
    const done = e && e.done;
    const plan = e ? planOf(e.k) : null;
    if (done) {
      total++;
      const s2 = plan ? plan.short : "?";
      per.set(s2, (per.get(s2) || 0) + 1);
    }
    cells += '<button class="cal-c' + (done ? " done" : "") + (e && !done ? " part" : "") + (key === tk ? " now" : "") + (key === selectedDay ? " sel" : "") + '"' + (e ? "" : " disabled") + ' data-day="' + key + '" aria-label="' + d + ". " + esc(monthName(m)) + '"><span class="n">' + d + "</span>" + (e ? '<span class="k">' + esc(plan ? plan.short : "?") + "</span>" : "") + "</button>";
  }
  const summary = [...per.entries()].map(([s2, n]) => esc(s2) + " " + n).join(" \xB7 ");
  const detail = dayDetail() || '<div class="tp-hint">' + esc(total ? t("log.pickDay") : t("log.emptyMonth")) + "</div>";
  mount2.innerHTML = head2() + '<div class="cal-bar"><button data-mon="-1" aria-label="' + esc(t("log.prevMonth")) + '">\u2039</button><div class="cal-t">' + esc(monthName(m)) + " " + y + '</div><button data-mon="1" aria-label="' + esc(t("log.nextMonth")) + '">\u203A</button></div><div class="cal-sum"><b>' + total + "</b> " + esc((total === 1 ? t("log.unit", { n: "" }) : t("log.units", { n: "" })).trim()) + (summary ? " \u2014 " + summary : "") + '</div><div class="cal">' + cells + "</div>" + detail;
  on("[data-mon]", (ev) => {
    month = new Date(month.getFullYear(), month.getMonth() + parseInt(ev.currentTarget.dataset.mon, 10), 1);
    selectedDay = null;
    document.dispatchEvent(new CustomEvent("rerender"));
  });
  on("[data-day]", (ev) => {
    const d = ev.currentTarget.dataset.day;
    selectedDay = selectedDay === d ? null : d;
    document.dispatchEvent(new CustomEvent("rerender"));
  });
}

// src/js/views/options.js
var options_exports = {};
__export(options_exports, {
  backBar: () => backBar2,
  refresh: () => refresh,
  render: () => render5,
  resetSub: () => resetSub
});

// src/js/views/editors.js
var rerender = () => document.dispatchEvent(new CustomEvent("rerender"));
var editing = null;
function resetEditing() {
  editing = null;
}
function sideOptions() {
  return [
    { id: "", label: "\u2014" },
    { id: "leg", label: t("plan.perLeg") },
    { id: "arm", label: t("plan.perArm") },
    { id: "alt", label: t("plan.alt") }
  ];
}
function kindOptions() {
  return [
    { id: "plates", label: t("equip.kindPlates") },
    { id: "weight", label: t("equip.kindWeight") },
    { id: "body", label: t("equip.kindBody") }
  ];
}
function backBar(title) {
  return '<div class="sub-bar"><button class="mini" id="back">\u2039 ' + esc(t("common.back")) + "</button><h2>" + esc(title) + "</h2></div>";
}
function wireBack(to) {
  byId("back").addEventListener("click", () => {
    editing = null;
    to();
  });
}
function equipment(mount2, head2, goHub) {
  if (editing) return equipmentForm(mount2, head2, goHub);
  const rows = S.equipment.map((eq) => {
    const used = equipmentUsage(eq.id);
    const kind = kindOptions().find((k) => k.id === eq.kind);
    const extra = eq.kind === "plates" ? " \xB7 " + (eq.plate || 4.5) + " kg" : eq.kind === "weight" ? " \xB7 " + (eq.step || 2.5) + " kg" : "";
    return '<div class="lst"><div class="lst-m"><div class="lst-n">' + esc(nameOf(eq)) + '</div><div class="lst-s">' + esc(kind ? kind.label : eq.kind) + esc(extra) + " \xB7 " + esc(used ? t(used === 1 ? "equip.inUse1" : "equip.inUse", { n: used }) : t("equip.unused")) + '</div></div><div class="row-act"><button class="mini" data-edit="' + eq.id + '">' + esc(t("common.edit")) + '</button><button class="mini warn" data-del="' + eq.id + '">' + esc(t("common.delete")) + "</button></div></div>";
  }).join("");
  mount2.innerHTML = head2() + backBar(t("equip.title")) + '<p class="intro">' + esc(t("equip.intro")) + "</p>" + rows + '<button class="set-btn" id="add">+ ' + esc(t("equip.add")) + "</button>";
  wireBack(goHub);
  byId("add").addEventListener("click", () => {
    editing = "new";
    rerender();
  });
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender();
  });
  on("[data-del]", (ev) => {
    const eq = equipOf(ev.currentTarget.dataset.del);
    if (!eq) return;
    if (equipmentUsage(eq.id)) {
      toast(t("equip.deleteBlocked"), true);
      return;
    }
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(eq) }))) return;
    deleteEquipment(eq.id);
  });
}
function equipmentForm(mount2, head2, goHub) {
  const eq = editing === "new" ? { kind: "plates", plate: S.pw, step: 2.5 } : equipOf(editing);
  if (!eq) {
    editing = null;
    return equipment(mount2, head2, goHub);
  }
  mount2.innerHTML = head2() + backBar(editing === "new" ? t("equip.add") : nameOf(eq)) + field(t("equip.name"), textIn("f-name", editing === "new" ? "" : nameOf(eq))) + field(t("equip.kind"), selectIn("f-kind", kindOptions(), eq.kind)) + '<div id="f-extra"></div><button class="set-btn" id="save">' + esc(t("common.save")) + "</button>";
  const extra = () => {
    const kind = byId("f-kind").value;
    byId("f-extra").innerHTML = kind === "plates" ? field(t("equip.plate"), numIn("f-plate", eq.plate || 4.5, "0.5", 0.5)) : kind === "weight" ? field(t("equip.step"), numIn("f-step", eq.step || 2.5, "0.5", 0.5)) : "";
  };
  extra();
  byId("f-kind").addEventListener("change", extra);
  wireBack(goHub);
  byId("save").addEventListener("click", () => {
    const name = val("f-name");
    if (!name) {
      toast(t("common.nameMissing"), true);
      return;
    }
    const kind = byId("f-kind").value;
    const data2 = { name, kind };
    if (kind === "plates") data2.plate = parseFloat(val("f-plate")) || 4.5;
    if (kind === "weight") data2.step = parseFloat(val("f-step")) || 2.5;
    if (editing === "new") addEquipment(data2);
    else updateEquipment(editing, data2);
    editing = null;
  });
}
function exercises(mount2, head2, goHub) {
  if (editing) return exerciseForm(mount2, head2, goHub);
  const rows = visibleExercises().map((ex) => {
    const eq = equipOf(ex.equip);
    const inPlans = exerciseUsage(ex.id);
    return '<div class="lst"><div class="lst-m"><div class="lst-n">' + esc(nameOf(ex)) + '</div><div class="lst-s">' + esc(nameOf(eq)) + " \xB7 " + esc(inPlans ? t(inPlans === 1 ? "ex.inPlans1" : "ex.inPlans", { n: inPlans }) : t("ex.notInPlan")) + '</div></div><div class="row-act"><button class="mini" data-edit="' + ex.id + '">' + esc(t("common.edit")) + '</button><button class="mini warn" data-del="' + ex.id + '">' + esc(t("common.delete")) + "</button></div></div>";
  }).join("");
  mount2.innerHTML = head2() + backBar(t("ex.title")) + '<p class="intro">' + esc(t("ex.intro")) + "</p>" + rows + '<button class="set-btn" id="add">+ ' + esc(t("ex.add")) + "</button>";
  wireBack(goHub);
  byId("add").addEventListener("click", () => {
    editing = "new";
    rerender();
  });
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender();
  });
  on("[data-del]", (ev) => {
    const ex = exOf(ev.currentTarget.dataset.del);
    if (!ex) return;
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(ex) }) + "\n" + t("ex.keepForHistory"))) return;
    deleteExercise(ex.id);
  });
}
function exerciseForm(mount2, head2, goHub) {
  const ex = editing === "new" ? { equip: S.equipment[0] && S.equipment[0].id } : exOf(editing);
  if (!ex) {
    editing = null;
    return exercises(mount2, head2, goHub);
  }
  const eqOpts = S.equipment.map((e) => ({ id: e.id, label: nameOf(e) }));
  const bands = ex.bands || [];
  mount2.innerHTML = head2() + backBar(editing === "new" ? t("ex.add") : nameOf(ex)) + field(t("ex.name"), textIn("f-name", editing === "new" ? "" : nameOf(ex))) + field(t("ex.equip"), selectIn("f-equip", eqOpts, ex.equip)) + field(
    t("ex.bands"),
    '<span class="two">' + numIn("f-b1", bands[0] == null ? "" : bands[0], "0.5", 0) + numIn("f-b2", bands[1] == null ? "" : bands[1], "0.5", 0) + "</span>",
    t("ex.bandsSub")
  ) + '<button class="set-btn" id="save">' + esc(t("common.save")) + "</button>";
  wireBack(goHub);
  byId("save").addEventListener("click", () => {
    const name = val("f-name");
    if (!name) {
      toast(t("common.nameMissing"), true);
      return;
    }
    const b1 = parseFloat(val("f-b1")), b2 = parseFloat(val("f-b2"));
    const data2 = { name, equip: byId("f-equip").value };
    data2.bands = isFinite(b1) && isFinite(b2) ? [b1, b2] : void 0;
    if (editing === "new") addExercise(data2);
    else updateExercise(editing, data2);
    editing = null;
  });
}
function plans(mount2, head2, goHub) {
  if (editing) return planForm(mount2, head2, goHub);
  const rows = S.plans.map((p) => '<div class="lst"><div class="lst-m"><div class="lst-n"><span class="tag">' + esc(p.short || "?") + "</span> " + esc(nameOf(p)) + '</div><div class="lst-s">' + esc(focusOf(p) || "\u2014") + " \xB7 " + p.items.length + '</div></div><div class="row-act"><button class="mini" data-edit="' + p.id + '">' + esc(t("common.edit")) + '</button><button class="mini warn" data-del="' + p.id + '">' + esc(t("common.delete")) + "</button></div></div>").join("");
  mount2.innerHTML = head2() + backBar(t("pl.title")) + '<p class="intro">' + esc(t("pl.intro")) + "</p>" + rows + '<button class="set-btn" id="add">+ ' + esc(t("pl.add")) + "</button>";
  wireBack(goHub);
  byId("add").addEventListener("click", () => {
    const p = addPlan({ name: t("common.new"), focus: "" });
    editing = p.id;
  });
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender();
  });
  on("[data-del]", (ev) => {
    const p = planOf(ev.currentTarget.dataset.del);
    if (!p) return;
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(p) }))) return;
    deletePlan(p.id);
  });
}
function planForm(mount2, head2, goHub) {
  const p = planOf(editing);
  if (!p) {
    editing = null;
    return plans(mount2, head2, goHub);
  }
  const items = p.items.map((i) => {
    const ex = exOf(i.ex);
    return '<div class="pi"><div class="pi-n">' + esc(nameOf(ex)) + '</div><div class="pi-f"><input class="in tiny" data-reps="' + i.ex + '" value="' + esc(i.reps || "") + '" aria-label="' + esc(t("pl.reps")) + '"><input class="in tiny num" type="number" min="1" max="10" data-sets="' + i.ex + '" value="' + (i.sets || 3) + '" aria-label="' + esc(t("pl.setCount")) + '"><select class="in tiny" data-side="' + i.ex + '" aria-label="' + esc(t("plan.side")) + '">' + sideOptions().map((o) => '<option value="' + o.id + '"' + (o.id === (i.side || "") ? " selected" : "") + ">" + esc(o.label) + "</option>").join("") + '</select></div><div class="row-act"><button class="mini" data-up="' + i.ex + '" aria-label="' + esc(t("pl.up")) + '">\u2191</button><button class="mini" data-down="' + i.ex + '" aria-label="' + esc(t("pl.down")) + '">\u2193</button><button class="mini warn" data-rm="' + i.ex + '">\xD7</button></div></div>';
  }).join("");
  const free = visibleExercises().filter((e) => !p.items.some((i) => i.ex === e.id));
  mount2.innerHTML = head2() + backBar(nameOf(p)) + field(t("pl.name"), textIn("f-name", nameOf(p))) + field(t("pl.short"), textIn("f-short", p.short || ""), t("pl.shortSub")) + field(t("pl.focus"), textIn("f-focus", focusOf(p))) + checkIn("f-night", t("pl.night"), !!p.night) + '<p class="fld-h">' + esc(t("pl.nightSub")) + '</p><button class="set-btn" id="save">' + esc(t("common.save")) + '</button><h3 class="sec">' + esc(t("pl.items")) + "</h3>" + (items || '<p class="intro">' + esc(t("pl.empty")) + "</p>") + (free.length ? '<div class="add-row">' + selectIn("f-add", free.map((e) => ({ id: e.id, label: nameOf(e) })), free[0].id) + '<button class="mini" id="additem">+ ' + esc(t("pl.addItem")) + "</button></div>" : '<p class="intro">' + esc(visibleExercises().length ? "" : t("pl.noExercises")) + "</p>");
  wireBack(goHub);
  byId("save").addEventListener("click", () => {
    const name = val("f-name");
    if (!name) {
      toast(t("common.nameMissing"), true);
      return;
    }
    updatePlan(p.id, {
      name,
      short: val("f-short").slice(0, 2) || p.short,
      focus: val("f-focus"),
      night: byId("f-night").checked
    });
  });
  if (byId("additem")) {
    byId("additem").addEventListener("click", () => addPlanItem(p.id, byId("f-add").value));
  }
  on("[data-rm]", (ev) => removePlanItem(p.id, ev.currentTarget.dataset.rm));
  on("[data-up]", (ev) => movePlanItem(p.id, ev.currentTarget.dataset.up, -1));
  on("[data-down]", (ev) => movePlanItem(p.id, ev.currentTarget.dataset.down, 1));
  on("[data-reps]", (ev) => updatePlanItem(p.id, ev.currentTarget.dataset.reps, { reps: ev.currentTarget.value }), "change");
  on("[data-sets]", (ev) => updatePlanItem(
    p.id,
    ev.currentTarget.dataset.sets,
    { sets: Math.max(1, Math.min(10, parseInt(ev.currentTarget.value, 10) || 3)) }
  ), "change");
  on("[data-side]", (ev) => updatePlanItem(
    p.id,
    ev.currentTarget.dataset.side,
    { side: ev.currentTarget.value || void 0 }
  ), "change");
}

// src/js/views/aiview.js
var rerender2 = () => document.dispatchEvent(new CustomEvent("rerender"));
var busy = false;
var result = null;
var models = [];
var form = { goal: "muscle", days: 3, level: "some", notes: "" };
function reset() {
  result = null;
  busy = false;
}
function goalOptions() {
  return [
    { id: "strength", label: t("ai.goalStrength") },
    { id: "muscle", label: t("ai.goalMuscle") },
    { id: "fitness", label: t("ai.goalFitness") },
    { id: "lose", label: t("ai.goalLose") }
  ];
}
function levelOptions() {
  return [
    { id: "new", label: t("ai.levelNew") },
    { id: "some", label: t("ai.levelSome") },
    { id: "pro", label: t("ai.levelPro") }
  ];
}
var kindLabel = (eq) => eq.kind === "plates" ? t("equip.kindPlates") : eq.kind === "weight" ? t("equip.kindWeight") : t("equip.kindBody");
function readForm() {
  if (!byId("f-goal")) return;
  form = {
    goal: byId("f-goal").value,
    days: parseInt(byId("f-days").value, 10) || 3,
    level: byId("f-level").value,
    notes: val("f-notes")
  };
}
function preview() {
  const ex = (result.exercises || []).map((e) => "<li>" + esc(e.name) + ' <span class="lst-s">\u2014 ' + esc(nameOf(equipOf(e.equipment))) + "</span></li>").join("");
  const plans2 = (result.plans || []).map((p) => '<div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + esc((p.name || "?").slice(0, 1)) + '</div><div><div class="nm">' + esc(p.name || "") + '</div><div class="fo">' + esc(p.focus || "") + "</div></div></div>" + (p.items || []).map((i) => '<div class="dt-row"><span class="dt-m">' + (i.sets || 3) + '\xD7</span><span class="dt-n">' + esc(i.exercise) + '</span><span class="dt-w">' + esc(i.reps || "") + "</span></div>").join("") + "</div></div>").join("");
  return '<h3 class="sec">' + esc(t("ai.result")) + "</h3>" + plans2 + (ex ? '<p class="intro">' + esc(t("ai.newExercises", { n: (result.exercises || []).length })) + '</p><ul class="plain">' + ex + "</ul>" : "") + '<button class="set-btn" id="accept">' + esc(t("ai.accept")) + '</button><button class="set-btn" id="discard">' + esc(t("ai.discard")) + "</button>";
}
function render3(mount2, head2, backBar3, goHub) {
  const ai = S.ai;
  const prov = providerOf(ai.provider);
  const key = ai.keys[ai.provider] || "";
  const modelOpts = models.length ? models.map((m) => ({ id: m.id, label: m.label })) : [{ id: ai.model || prov.defaultModel, label: ai.model || prov.defaultModel }];
  mount2.innerHTML = head2() + backBar3(t("ai.title")) + '<p class="intro">' + esc(t("ai.intro")) + "</p>" + (isNative() ? "" : '<div class="tp-err">' + esc(t("ai.webBlocked")) + "</div>") + field(t("ai.provider"), selectIn("f-prov", PROVIDERS.map((p) => ({ id: p.id, label: p.label })), ai.provider)) + field(
    t("ai.key"),
    '<input class="in" id="f-key" type="password" autocomplete="off" value="' + esc(key) + '">',
    (ai.provider === "openai" ? t("ai.keyHintOpenAI") : t("ai.keyHintAnthropic")) + " " + t("ai.keyStored")
  ) + field(
    t("ai.model"),
    '<span class="two">' + selectIn("f-model", modelOpts, ai.model || prov.defaultModel) + textIn("f-modelfree", ai.model || prov.defaultModel) + "</span>"
  ) + '<button class="mini" id="loadmodels">' + esc(t("ai.loadModels")) + '</button><h3 class="sec">' + esc(t("ai.equipUsed")) + '</h3><ul class="plain">' + S.equipment.map((e) => "<li>" + esc(nameOf(e)) + ' <span class="lst-s">\u2014 ' + esc(kindLabel(e)) + "</span></li>").join("") + "</ul>" + field(t("ai.goal"), selectIn("f-goal", goalOptions(), form.goal)) + field(t("ai.days"), '<input class="in" id="f-days" type="number" min="1" max="7" value="' + form.days + '">') + field(t("ai.level"), selectIn("f-level", levelOptions(), form.level)) + field(t("ai.notes"), textIn("f-notes", form.notes)) + '<button class="set-btn' + (busy ? "" : " go") + '" id="gen"' + (busy ? " disabled" : "") + ">" + esc(busy ? t("ai.working") : t("ai.generate")) + "</button>" + (result ? preview() : "");
  byId("back").addEventListener("click", goHub);
  byId("f-prov").addEventListener("change", (ev) => {
    readForm();
    models = [];
    S.ai.provider = ev.target.value;
    S.ai.model = providerOf(ev.target.value).defaultModel;
    touch();
  });
  byId("f-key").addEventListener("change", (ev) => {
    S.ai.keys[S.ai.provider] = ev.target.value.trim();
    touch();
  });
  byId("f-model").addEventListener("change", (ev) => {
    byId("f-modelfree").value = ev.target.value;
    S.ai.model = ev.target.value;
    touch();
  });
  byId("f-modelfree").addEventListener("change", (ev) => {
    S.ai.model = ev.target.value.trim();
    touch();
  });
  byId("loadmodels").addEventListener("click", async () => {
    const k = val("f-key");
    if (!k) {
      toast(t("ai.needKey"), true);
      return;
    }
    const btn = byId("loadmodels");
    btn.disabled = true;
    btn.textContent = t("ai.loadingModels");
    try {
      const mod = await import("./part-5OT7EI5P.js");
      models = await mod.listModels(S.ai.provider, k);
      readForm();
      rerender2();
    } catch (e) {
      toast(t("ai.failed", { msg: e.message }), true);
      btn.disabled = false;
      btn.textContent = t("ai.loadModels");
    }
  });
  byId("gen").addEventListener("click", async () => {
    readForm();
    const k = val("f-key");
    if (!k) {
      toast(t("ai.needKey"), true);
      return;
    }
    if (!S.equipment.length) {
      toast(t("ai.needEquip"), true);
      return;
    }
    busy = true;
    result = null;
    rerender2();
    try {
      const mod = await import("./part-5OT7EI5P.js");
      result = await mod.generatePlan({
        provider: S.ai.provider,
        key: k,
        model: val("f-modelfree") || S.ai.model,
        goal: goalOptions().find((o) => o.id === form.goal).label,
        level: levelOptions().find((o) => o.id === form.level).label,
        days: form.days,
        notes: form.notes,
        equipment: S.equipment.map((e) => ({ id: e.id, name: nameOf(e), kindLabel: kindLabel(e) }))
      });
    } catch (e) {
      toast(t("ai.failed", { msg: e.message }), true);
    }
    busy = false;
    rerender2();
  });
  if (result) {
    byId("accept").addEventListener("click", () => {
      const n = applyGenerated(result);
      result = null;
      toast(t("ai.accepted") + (n ? " " + t("ai.newExercises", { n }) : ""));
    });
    byId("discard").addEventListener("click", () => {
      result = null;
      rerender2();
    });
  }
  on("#f-goal, #f-days, #f-level, #f-notes", readForm, "change");
}

// src/js/update.js
var Updater = registerPlugin("Updater");
var SITE = "https://drakon-scarletta.github.io/PTapp";
var canUpdate = () => Capacitor.isNativePlatform();
async function currentVersion() {
  if (!canUpdate()) return null;
  const info = await App.getInfo();
  return { code: parseInt(info.build, 10) || 0, name: info.version };
}
async function fetchLatest() {
  const res = await fetch(`${SITE}/version.json?t=${Date.now()}`);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data2 = await res.json();
  if (!data2 || typeof data2.versionCode !== "number" || !data2.apk) {
    throw new Error("version.json unbrauchbar");
  }
  return data2;
}
async function check() {
  const [cur, latest2] = await Promise.all([currentVersion(), fetchLatest()]);
  return { cur, latest: latest2, newer: !!cur && latest2.versionCode > cur.code };
}
async function download(latest2, onProgress) {
  let handle = null;
  try {
    handle = await Filesystem.addListener("progress", (p) => {
      if (onProgress && p && p.contentLength) {
        onProgress(Math.min(100, Math.round(p.bytes / p.contentLength * 100)));
      }
    });
  } catch (e) {
  }
  try {
    const res = await Filesystem.downloadFile({
      url: `${SITE}/${latest2.apk}`,
      path: latest2.apk,
      directory: Directory.Cache,
      progress: true
    });
    if (!res || !res.path) throw new Error("Download ohne Ergebnis");
    return res.path;
  } finally {
    if (handle) {
      try {
        await handle.remove();
      } catch (e) {
      }
    }
  }
}
async function install(path) {
  const { granted } = await Updater.canInstall();
  if (!granted) {
    await Updater.openInstallSettings();
    return false;
  }
  await Updater.install({ path });
  return true;
}
async function cleanup(name) {
  try {
    await Filesystem.deleteFile({ path: name, directory: Directory.Cache });
  } catch (e) {
  }
}

// src/js/views/updateview.js
var rerender3 = () => document.dispatchEvent(new CustomEvent("rerender"));
var state = "idle";
var latest = null;
var installed = null;
var percent = 0;
var apkPath = null;
function reset2() {
  if (state === "loading") return;
  state = "idle";
  latest = null;
  percent = 0;
  apkPath = null;
}
function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1).toLocaleString() + " MB";
}
function notesOf(info) {
  if (!info || !info.notes) return "";
  return info.notes[getLang()] || info.notes.de || info.notes.en || "";
}
function render4(mount2, head2, backBar3, goHub) {
  const body = canUpdate() ? nativeBody() : '<p class="intro">' + esc(t("upd.webSelfUpdates")) + "</p>";
  mount2.innerHTML = head2() + backBar3(t("upd.title")) + '<p class="intro">' + esc(t("upd.installed", {
    version: installed ? installed.name : APP_VERSION
  })) + "</p>" + body;
  byId("back").addEventListener("click", goHub);
  wire();
}
function nativeBody() {
  if (state === "checking") {
    return '<button class="set-btn" disabled>' + esc(t("upd.checking")) + "</button>";
  }
  if (state === "current") {
    return '<p class="intro">' + esc(t("upd.upToDate")) + '</p><button class="set-btn" id="check">' + esc(t("upd.check")) + "</button>";
  }
  if (state === "found" || state === "loading" || state === "ready") {
    const notes = notesOf(latest);
    return '<h3 class="sec">' + esc(t("upd.available", { version: latest.versionName })) + "</h3>" + (notes ? '<p class="intro">' + esc(notes) + "</p>" : "") + (latest.size ? '<p class="intro">' + esc(mb(latest.size)) + "</p>" : "") + (state === "loading" ? '<div class="bar"><div class="bar-in" style="width:' + percent + '%"></div></div><button class="set-btn" disabled>' + esc(t("upd.downloading", { percent })) + "</button>" : state === "ready" ? '<button class="set-btn go" id="doinstall">' + esc(t("upd.install")) + '</button><p class="fld-h">' + esc(t("upd.installHint")) + "</p>" : '<button class="set-btn go" id="dodownload">' + esc(t("upd.download")) + "</button>");
  }
  return '<button class="set-btn" id="check">' + esc(t("upd.check")) + "</button>";
}
function wire() {
  const check$ = byId("check");
  if (check$) check$.addEventListener("click", runCheck);
  const dl = byId("dodownload");
  if (dl) dl.addEventListener("click", runDownload);
  const inst = byId("doinstall");
  if (inst) inst.addEventListener("click", runInstall);
}
async function runCheck() {
  state = "checking";
  rerender3();
  try {
    const res = await check();
    installed = res.cur;
    latest = res.latest;
    state = res.newer ? "found" : "current";
  } catch (e) {
    state = "idle";
    toast(t("upd.failed", { msg: e.message }), true);
  }
  rerender3();
}
async function runDownload() {
  state = "loading";
  percent = 0;
  rerender3();
  try {
    await cleanup(latest.apk);
    apkPath = await download(latest, (p) => {
      if (p !== percent) {
        percent = p;
        rerender3();
      }
    });
    state = "ready";
  } catch (e) {
    state = "found";
    toast(t("upd.failed", { msg: e.message }), true);
  }
  rerender3();
}
async function runInstall() {
  try {
    const ok = await install(apkPath);
    if (!ok) toast(t("upd.needPermission"), true);
  } catch (e) {
    toast(t("upd.failed", { msg: e.message }), true);
  }
}

// src/js/views/options.js
var rerender4 = () => document.dispatchEvent(new CustomEvent("rerender"));
var sub = null;
var backups = [];
function resetSub() {
  sub = null;
  resetEditing();
  reset();
  reset2();
}
async function refresh() {
  backups = await listBackups();
}
function go(next) {
  sub = next;
  resetEditing();
  if (next !== "ai") reset();
  if (next !== "update") reset2();
  rerender4();
}
function backBar2(title) {
  return '<div class="sub-bar"><button class="mini" id="back">\u2039 ' + esc(t("common.back")) + "</button><h2>" + esc(title) + "</h2></div>";
}
function render5(head2, mount2) {
  const goHub = () => go(null);
  if (sub === "equipment") return equipment(mount2, head2, goHub);
  if (sub === "exercises") return exercises(mount2, head2, goHub);
  if (sub === "plans") return plans(mount2, head2, goHub);
  if (sub === "ai") return render3(mount2, head2, backBar2, goHub);
  if (sub === "update") return render4(mount2, head2, backBar2, goHub);
  if (sub === "lang") return language(mount2, head2, goHub);
  if (sub === "data") return data(mount2, head2, goHub);
  return hub(mount2, head2);
}
function stats() {
  const done = Object.values(S.log).filter((e) => e && e.done);
  const first = Object.keys(S.log).sort()[0];
  return { total: done.length, first };
}
function entry2(id, title, subtitle) {
  return '<button class="nav-row" data-go="' + id + '"><span class="nav-n">' + esc(title) + '</span><span class="nav-s">' + esc(subtitle) + '</span><span class="nav-c">\u203A</span></button>';
}
function hub(mount2, head2) {
  const s2 = stats();
  const lang = LANGS.find((l) => l.id === S.lang);
  mount2.innerHTML = head2() + '<div class="set-sec"><h2>' + esc(t("opt.overview")) + '</h2><div class="set-stat"><div><b>' + s2.total + "</b>" + esc(t("opt.totalUnits")) + "</div></div>" + (s2.first ? "<p>" + esc(t("opt.firstEntry", {
    date: longDate(new Date(s2.first.split("-")[0], s2.first.split("-")[1] - 1, s2.first.split("-")[2]))
  })) + "</p>" : "") + "</div>" + entry2("ai", t("opt.ai"), t("opt.aiSub")) + entry2("lang", t("opt.language"), lang ? lang.label : S.lang) + entry2("equipment", t("opt.equipment"), t("opt.equipmentSub", { n: S.equipment.length })) + entry2("exercises", t("opt.exercises"), t("opt.exercisesSub", { n: visibleExercises().length })) + entry2("plans", t("opt.plans"), t("opt.plansSub", { n: S.plans.length })) + entry2("data", t("opt.data"), t("opt.dataSub")) + entry2("update", t("upd.title"), t("upd.titleSub")) + '<div class="tp-note">' + esc(t("opt.about", { app: APP_NAME, version: APP_VERSION })) + "</div>";
  on("[data-go]", (ev) => go(ev.currentTarget.dataset.go));
}
function language(mount2, head2, goHub) {
  mount2.innerHTML = head2() + backBar2(t("opt.language")) + '<p class="intro">' + esc(t("opt.languageSub")) + "</p>" + field(t("opt.language"), selectIn("f-lang", LANGS.map((l) => ({ id: l.id, label: l.label })), S.lang));
  byId("back").addEventListener("click", goHub);
  byId("f-lang").addEventListener("change", (ev) => setLanguage(ev.target.value));
}
function data(mount2, head2, goHub) {
  mount2.innerHTML = head2() + backBar2(t("data.title")) + '<p class="intro">' + esc(isNative() ? t("data.backupNative", { app: APP_NAME }) : t("data.backupWeb")) + '</p><button class="set-btn" id="exp">' + esc(t("data.backup")) + "</button>" + (backups.length ? '<p class="intro">' + esc(t("data.existing")) + '</p><div class="set-list">' + backups.slice(0, 12).map((b) => '<button data-imp="' + esc(b.name) + '">' + esc(b.name) + "</button>").join("") + "</div>" : "") + '<button class="set-btn" id="paste">' + esc(t("data.paste")) + '</button><h3 class="sec">' + esc(t("data.reset")) + '</h3><p class="intro">' + esc(t("data.resetSub")) + '</p><button class="set-btn warn" id="wipe">' + esc(t("data.resetBtn")) + "</button>";
  byId("back").addEventListener("click", goHub);
  byId("exp").addEventListener("click", async () => {
    try {
      const r = await exportBackup(S);
      toast(t("data.saved", { name: r.name }));
      await refresh();
      rerender4();
    } catch (e) {
      toast(t("data.saveFailed", { msg: e.message }), true);
    }
  });
  on("[data-imp]", async (ev) => {
    const name = ev.currentTarget.dataset.imp;
    if (!confirmBox(t("data.restoreAsk", { name }))) return;
    try {
      await replaceState(await readBackup(name));
      resetSub();
      toast(t("data.restored"));
    } catch (e) {
      toast(t("data.readFailed", { msg: e.message }), true);
    }
  });
  byId("paste").addEventListener("click", async () => {
    const text = window.prompt(t("data.pastePrompt"));
    if (!text) return;
    try {
      await replaceState(parseBackup(text));
      resetSub();
      toast(t("data.restored"));
    } catch (e) {
      toast(t("data.badFile"), true);
    }
  });
  byId("wipe").addEventListener("click", async () => {
    if (!confirmBox(t("data.resetAsk"))) return;
    await replaceState(freshState());
    resetSub();
    toast(t("data.resetDone"));
  });
}

// src/js/app.js
var VIEWS = { plan: plan_exports, log: log_exports, options: options_exports };
var LABEL = { plan: "nav.plan", log: "nav.log", options: "nav.options" };
var view = "plan";
var mount = document.getElementById("app");
function head() {
  return '<div class="tp-head"><h1>' + esc(APP_NAME) + '</h1><div class="tp-date">' + esc(today.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })) + '</div></div><div class="tp-nav">' + Object.keys(VIEWS).map(
    (v) => '<button data-view="' + v + '" class="' + (v === view ? "sel" : "") + '">' + esc(t(LABEL[v])) + "</button>"
  ).join("") + "</div>";
}
function render6() {
  const scroll = window.scrollY;
  VIEWS[view].render(head, mount);
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });
  window.scrollTo(0, scroll);
}
async function setView(v) {
  if (v === view) {
    if (v === "options") {
      resetSub();
      render6();
    }
    if (v === "log") {
      resetSelection();
      render6();
    }
    return;
  }
  view = v;
  if (v === "log") resetSelection();
  if (v === "options") {
    resetSub();
    await refresh();
  }
  render6();
}
document.addEventListener("rerender", render6);
onChange(render6);
async function wireNative() {
  if (!Capacitor.isNativePlatform()) return;
  await App.addListener("backButton", () => {
    if (view !== "plan") setView("plan");
    else App.exitApp();
  });
  await App.addListener("appStateChange", ({ isActive }) => {
    if (isActive && refreshDay()) render6();
  });
  try {
    await StatusBar.setBackgroundColor({ color: "#16140F" });
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
  }
}
function wireServiceWorker() {
  if (Capacitor.isNativePlatform()) return;
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("sw.js").catch(() => {
  });
}
setInterval(() => {
  if (refreshDay()) render6();
}, 6e4);
(async function start() {
  try {
    await init();
  } catch (e) {
    toast(t("data.loadError"), true);
  }
  await wireNative();
  wireServiceWorker();
  render6();
})();
