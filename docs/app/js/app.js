import {
  LANGS,
  PROVIDERS,
  detectLang,
  getLang,
  locale,
  longDate,
  manualPrompt,
  monthName,
  num,
  providerOf,
  setLang,
  t,
  weekdayShort
} from "./part-JLAQOZ7I.js";
import {
  Directory,
  Encoding
} from "./part-MTR7NSI3.js";
import {
  ImpactStyle
} from "./part-MJLH4ETE.js";
import {
  Capacitor,
  WebPlugin,
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
  { id: "chestpress", key: "chestpress", muscle: "chest", equip: "stack", bands: [4, 6] },
  { id: "butterfly", key: "butterfly", muscle: "chest", equip: "stack", bands: [2, 4] },
  { id: "legext", key: "legext", muscle: "legs", equip: "stack", bands: [3, 5] },
  { id: "backkick", key: "backkick", muscle: "legs", equip: "stack", bands: [2, 4], hintKey: "hintBackkick" },
  { id: "pushdown", key: "pushdown", muscle: "arms", equip: "stack", bands: [3, 5], hintKey: "hintPushdown" },
  { id: "deltoid", key: "deltoid", muscle: "shoulders", equip: "stack", bands: [1, 3] },
  { id: "abcrunch", key: "abcrunch", muscle: "core", equip: "stack", bands: [3, 5] },
  { id: "lat", key: "lat", muscle: "back", equip: "stack", bands: [4, 6] },
  { id: "lowrow", key: "lowrow", muscle: "back", equip: "stack", bands: [4, 6] },
  { id: "curl", key: "curl", muscle: "arms", equip: "stack", bands: [3, 5] },
  { id: "upright", key: "upright", muscle: "shoulders", equip: "stack", bands: [3, 5], hintKey: "hintUpright" },
  { id: "armset", key: "armset", muscle: "arms", equip: "stack", bands: [3, 5] },
  { id: "split", key: "split", muscle: "legs", equip: "body", hintKey: "hintSplit" },
  { id: "calf", key: "calf", muscle: "legs", equip: "body" },
  { id: "plank", key: "plank", muscle: "core", equip: "body" },
  { id: "hipraise", key: "hipraise", muscle: "legs", equip: "body" }
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
var APP_VERSION = "2.3";
var STATE_VERSION = 5;
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
    ai: { provider: "anthropic", model: "", keys: { anthropic: "", openai: "" } },
    chat: [],
    body: [],
    // Körpergewicht: { d: 'JJJJ-MM-TT', kg: Zahl }
    prefs: {
      restOn: true,
      restSec: 90,
      onboarded: false,
      reminder: { on: false, days: [0, 2, 4], hour: 18, minute: 0 }
    }
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
    s2.plans = SEED_PLANS.map((p2) => ({ ...p2, items: p2.items.map((i) => ({ ...i })) }));
  }
  if (!Array.isArray(s2.equipment) || !s2.equipment.length) s2.equipment = SEED_EQUIPMENT.map((e) => ({ ...e }));
  if (!Array.isArray(s2.exercises)) s2.exercises = [];
  if (!Array.isArray(s2.plans)) s2.plans = [];
  if (!s2.ai) s2.ai = { provider: "anthropic", model: "", keys: { anthropic: "", openai: "" } };
  if (!s2.ai.keys) s2.ai.keys = { anthropic: "", openai: "" };
  if (!s2.lang) s2.lang = detectLang();
  if (!Array.isArray(s2.chat)) s2.chat = [];
  if (!Array.isArray(s2.body)) s2.body = [];
  SEED_EXERCISES.forEach((seed) => {
    const vorhanden = s2.exercises.find((e) => e.id === seed.id);
    if (vorhanden && !vorhanden.muscle && seed.muscle) vorhanden.muscle = seed.muscle;
  });
  const p = freshState().prefs;
  s2.prefs = Object.assign({}, p, s2.prefs || {});
  s2.prefs.reminder = Object.assign({}, p.reminder, s2.prefs.reminder || {});
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
  return writeAndShare(name, data2);
}
async function writeAndShare(name, data2) {
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
      await Share.share({ title: APP_NAME, url: res.uri, dialogTitle: APP_NAME });
    }
  } catch (e) {
  }
  return { name, path: `${FOLDER}` };
}
async function exportCsv(state2, resolve) {
  const trenner = ";";
  const zeilen = [[
    "Datum",
    "Plan",
    "Uebung",
    "Saetze",
    "Wiederholungen",
    "Gewicht",
    "Einheit",
    "Abgeschlossen",
    "Dauer_min",
    "Notiz"
  ].join(trenner)];
  Object.keys(state2.log).sort().forEach((d) => {
    const e = state2.log[d];
    if (!e || !e.t) return;
    const dauer = e.start && e.end ? Math.max(1, Math.round((e.end - e.start) / 6e4)) : "";
    Object.keys(e.t).forEach((exId) => {
      const info = resolve(exId, e);
      zeilen.push([
        d,
        csv(resolve.planName(e.k)),
        csv(info.name),
        e.t[exId],
        (e.r && e.r[exId] || []).join("/"),
        e.w && e.w[exId] != null ? String(e.w[exId]).replace(".", ",") : "",
        csv(info.unit),
        e.done ? "ja" : "nein",
        dauer,
        csv(e.n || "")
      ].join(trenner));
    });
  });
  const data2 = "\uFEFF" + zeilen.join("\r\n") + "\r\n";
  const name = `ptapp-${stamp()}.csv`;
  if (!isNative()) {
    downloadInBrowser(name, data2, "text/csv");
    return { name };
  }
  return writeAndShare(name, data2);
}
function csv(text) {
  const s2 = String(text == null ? "" : text);
  return /[;"\r\n]/.test(s2) ? '"' + s2.split('"').join('""') + '"' : s2;
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
function downloadInBrowser(name, data2, typ) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data2], { type: typ || "application/json" }));
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
  emit();
  try {
    await saveState(S);
    if (saveErr) {
      saveErr = "";
      emit();
    }
  } catch (e) {
    saveErr = t("data.saveError");
    emit();
  }
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
  e.r = e.r || {};
  if (wrapped) delete e.r[exId];
  else {
    const liste = (e.r[exId] || []).slice(0, n - 1);
    liste[n - 1] = suggestReps(exId, item, n - 1);
    e.r[exId] = liste;
  }
  if (!e.start) e.start = Date.now();
  snapshotWeights(e, plan);
  persist();
  return !wrapped && n >= goal;
}
function suggestReps(exId, item, index) {
  const frueher = lastPerformance(exId);
  if (frueher && frueher.reps && frueher.reps[index]) return frueher.reps[index];
  return targetReps(item);
}
function targetReps(item) {
  const zahlen = String(item && item.reps || "").match(/\d+/g);
  if (!zahlen || zahlen.length < 2) return 10;
  return parseInt(zahlen[zahlen.length - 1], 10) || 10;
}
function repsOf(e, exId) {
  return e && e.r && e.r[exId] || [];
}
function setReps(exId, index, value) {
  const plan = planOf(activePlan());
  if (!plan) return;
  const e = ensureEntry(plan.id);
  e.r = e.r || {};
  const liste = (e.r[exId] || []).slice();
  liste[index] = Math.max(0, Math.min(999, parseInt(value, 10) || 0));
  e.r[exId] = liste;
  persist();
}
function lastPerformance(exId, vorDatum) {
  const grenze = vorDatum || tk;
  const tage = Object.keys(S.log).filter((d) => d < grenze).sort();
  for (let i = tage.length - 1; i >= 0; i--) {
    const e = S.log[tage[i]];
    if (!e || !e.t || e.t[exId] == null) continue;
    return {
      date: tage[i],
      sets: setsDone(e, { ex: exId, sets: 99 }),
      weight: e.w && e.w[exId] != null ? e.w[exId] : null,
      reps: e.r && e.r[exId] || []
    };
  }
  return null;
}
function personalRecord(exId) {
  let best = null;
  Object.keys(S.log).forEach((d) => {
    const e = S.log[d];
    if (!e || !e.t || !e.t[exId]) return;
    const w = e.w && e.w[exId] != null ? e.w[exId] : 0;
    const reps = Math.max(0, ...e.r && e.r[exId] || [0]);
    if (!best || w > best.weight || w === best.weight && reps > best.reps) {
      best = { date: d, weight: w, reps };
    }
  });
  return best;
}
function exerciseHistory(exId, count) {
  return Object.keys(S.log).sort().filter((d) => S.log[d] && S.log[d].t && S.log[d].t[exId]).slice(-(count || 20)).map((d) => ({
    date: d,
    weight: S.log[d].w && S.log[d].w[exId] != null ? S.log[d].w[exId] : 0,
    reps: S.log[d].r && S.log[d].r[exId] || [],
    sets: S.log[d].t[exId]
  }));
}
function setNote(text) {
  const plan = planOf(activePlan());
  if (!plan) return;
  const e = ensureEntry(plan.id);
  e.n = text;
  persist();
}
function durationMinutes(e) {
  if (!e || !e.start || !e.end) return null;
  return Math.max(1, Math.round((e.end - e.start) / 6e4));
}
function addBodyWeight(kg, date) {
  const d = date || tk;
  const wert = Math.round(parseFloat(kg) * 10) / 10;
  if (!isFinite(wert) || wert <= 0) return false;
  S.body = S.body.filter((b) => b.d !== d);
  S.body.push({ d, kg: wert });
  S.body.sort((a, b) => a.d.localeCompare(b.d));
  persist();
  return true;
}
function removeBodyWeight(d) {
  S.body = S.body.filter((b) => b.d !== d);
  persist();
}
function setPref(key, value) {
  S.prefs[key] = value;
  persist();
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
    e.end = Date.now();
    if (!e.start) e.start = e.end;
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
  if (equipmentUsage(id)) return null;
  const i = S.equipment.findIndex((e) => e.id === id);
  if (i < 0) return null;
  const [eq] = S.equipment.splice(i, 1);
  persist();
  return { art: "equipment", index: i, eintrag: eq };
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
  const snap = entferneUebung(id);
  persist();
  return snap;
}
function deleteExercises(ids) {
  const snaps = ids.map((id) => entferneUebung(id)).filter((s2) => s2 && s2.eintrag);
  persist();
  return snaps;
}
function entferneUebung(id) {
  const ausPlaenen = [];
  S.plans.forEach((p) => {
    const i2 = p.items.findIndex((x) => x.ex === id);
    if (i2 >= 0) ausPlaenen.push({ plan: p.id, index: i2, item: p.items[i2] });
    p.items = p.items.filter((x) => x.ex !== id);
  });
  const i = S.exercises.findIndex((e) => e.id === id);
  const ex = S.exercises[i];
  const gewicht = S.kg[id];
  let versteckt = false;
  if (usedInLog(id)) {
    if (ex) {
      ex.hidden = true;
      versteckt = true;
    }
  } else if (i >= 0) {
    S.exercises.splice(i, 1);
    delete S.kg[id];
  }
  return { art: "exercise", index: i, eintrag: ex, versteckt, gewicht, ausPlaenen };
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
function duplicatePlan(id) {
  const p = planOf(id);
  if (!p) return null;
  const kopie = {
    ...p,
    id: newId("pl", S.plans.map((x) => x.id)),
    short: nextShort(),
    name: nameOf(p) + " (2)",
    focus: focusOf(p),
    items: p.items.map((i) => ({ ...i }))
  };
  delete kopie.key;
  delete kopie.focusKey;
  S.plans.splice(S.plans.indexOf(p) + 1, 0, kopie);
  persist();
  return kopie;
}
function movePlan(id, dir) {
  const i = S.plans.findIndex((p2) => p2.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= S.plans.length) return;
  const [p] = S.plans.splice(i, 1);
  S.plans.splice(j, 0, p);
  persist();
}
function deletePlan(id) {
  const i = S.plans.findIndex((p2) => p2.id === id);
  if (i < 0) return null;
  const [p] = S.plans.splice(i, 1);
  if (S.next === id) S.next = suggested();
  persist();
  return { art: "plan", index: i, eintrag: p };
}
function restore(snap) {
  zurueck(snap);
  persist();
}
function restoreMany(snaps) {
  (snaps || []).slice().reverse().forEach(zurueck);
  persist();
}
function zurueck(snap) {
  if (!snap || !snap.eintrag) return;
  if (snap.art === "equipment") {
    S.equipment.splice(snap.index, 0, snap.eintrag);
  } else if (snap.art === "plan") {
    S.plans.splice(snap.index, 0, snap.eintrag);
  } else if (snap.art === "exercise") {
    if (snap.versteckt) delete snap.eintrag.hidden;
    else if (snap.index >= 0) S.exercises.splice(snap.index, 0, snap.eintrag);
    if (snap.gewicht != null) S.kg[snap.eintrag.id] = snap.gewicht;
    snap.ausPlaenen.forEach((v) => {
      const p = planOf(v.plan);
      if (p && !p.items.some((x) => x.ex === snap.eintrag.id)) p.items.splice(v.index, 0, v.item);
    });
  }
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
function totalSessions() {
  return Object.values(S.log).filter((e) => e && e.done).length;
}
function weekStreak() {
  let n = 0;
  const m = monday(today);
  for (let back = 0; back < 260; back++) {
    const start3 = new Date(m);
    start3.setDate(m.getDate() - back * 7);
    const key = iso(start3);
    const ziel = S.nights[key] ? 2 : 4;
    let done = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(start3);
      d.setDate(start3.getDate() + i);
      const e = S.log[iso(d)];
      if (e && e.done) done++;
    }
    if (done >= ziel) n++;
    else if (back > 0) break;
    else if (done < ziel) break;
  }
  return n;
}
function lastWeeks(count) {
  const m = monday(today);
  const out = [];
  for (let back = count - 1; back >= 0; back--) {
    const start3 = new Date(m);
    start3.setDate(m.getDate() - back * 7);
    let done = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(start3);
      d.setDate(start3.getDate() + i);
      const e = S.log[iso(d)];
      if (e && e.done) done++;
    }
    out.push({ start: iso(start3), done, target: S.nights[iso(start3)] ? 2 : 4 });
  }
  return out;
}
function perPlanCounts() {
  const out = /* @__PURE__ */ new Map();
  Object.values(S.log).forEach((e) => {
    if (!e || !e.done) return;
    out.set(e.k, (out.get(e.k) || 0) + 1);
  });
  return out;
}
function lastSessions(count) {
  return Object.keys(S.log).filter((d) => S.log[d] && S.log[d].done).sort().slice(-count).reverse().map((d) => ({ date: d, plan: planOf(S.log[d].k) }));
}
var CHAT_MAX = 40;
function addChat(role, text) {
  S.chat.push({ role, text, at: Date.now() });
  if (S.chat.length > CHAT_MAX) S.chat = S.chat.slice(-CHAT_MAX);
  return persist();
}
function clearChat() {
  S.chat = [];
  return persist();
}
function applyGenerated(result3) {
  let created = 0;
  const byName = new Map(S.exercises.map((e) => [nameOf(e).toLowerCase(), e.id]));
  (result3.exercises || []).forEach((g) => {
    const key = (g.name || "").toLowerCase();
    if (!key || byName.has(key)) return;
    const eq = equipOf(g.equipment) ? g.equipment : S.equipment[0] && S.equipment[0].id;
    const ex = {
      id: newId("ex", S.exercises.map((e) => e.id)),
      name: g.name,
      equip: eq,
      src: "ai"
    };
    if (g.hint) ex.hint = g.hint;
    S.exercises.push(ex);
    byName.set(key, ex.id);
    created++;
  });
  (result3.plans || []).forEach((g) => {
    const items = (g.items || []).map((i) => ({ ex: byName.get((i.exercise || "").toLowerCase()), reps: i.reps || "3 \xD7 8\u201312", sets: i.sets || 3 })).filter((i) => i.ex);
    if (!items.length) return;
    S.plans.push({
      id: newId("pl", S.plans.map((x) => x.id)),
      short: nextShort(),
      name: g.name || t("common.new"),
      focus: g.focus || "",
      night: !!g.night,
      src: "ai",
      items
    });
  });
  persist();
  return created;
}

// src/js/views/home.js
var home_exports = {};
__export(home_exports, {
  render: () => render,
  reset: () => reset
});

// node_modules/@capacitor/browser/dist/esm/index.js
var Browser = registerPlugin("Browser", {
  web: () => import("./part-CJEYMYTV.js").then((m) => new m.BrowserWeb())
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
  document.querySelectorAll(selector).forEach((el2) => el2.addEventListener(event, handler));
}
function byId(id) {
  return document.getElementById(id);
}
function val(id) {
  const el2 = byId(id);
  return el2 ? el2.value.trim() : "";
}
var toastTimer = null;
function toast(msg, bad = false, action) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const el2 = document.createElement("div");
  el2.className = "toast" + (bad ? " bad" : "");
  el2.setAttribute("role", "status");
  const text = document.createElement("span");
  text.textContent = msg;
  el2.appendChild(text);
  if (action) {
    const btn = document.createElement("button");
    btn.className = "toast-a";
    btn.textContent = action.label;
    btn.addEventListener("click", () => {
      el2.remove();
      action.run();
    });
    el2.appendChild(btn);
  }
  document.body.appendChild(el2);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el2.remove(), action ? 8e3 : bad ? 6e3 : 2600);
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
function dialog({ title, text, html, actions, onOpen }) {
  const alt = document.querySelector(".overlay");
  if (alt) alt.remove();
  const el2 = document.createElement("div");
  el2.className = "overlay";
  el2.innerHTML = '<div class="dlg" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"><h3>' + esc(title) + "</h3>" + (text ? "<p>" + esc(text) + "</p>" : "") + (html || "") + '<div class="dlg-a">' + actions.map((a, i) => '<button class="set-btn' + (a.primary ? " go" : "") + '" data-act="' + i + '">' + esc(a.label) + "</button>").join("") + "</div></div>";
  const close = () => {
    el2.remove();
    document.removeEventListener("keydown", onKey);
  };
  const onKey = (ev) => {
    if (ev.key === "Escape") close();
  };
  el2.addEventListener("click", (ev) => {
    if (ev.target === el2) close();
  });
  el2.querySelectorAll("[data-act]").forEach((b) => {
    b.addEventListener("click", () => {
      const a = actions[Number(b.dataset.act)];
      close();
      if (a.run) a.run();
    });
  });
  document.body.appendChild(el2);
  document.addEventListener("keydown", onKey);
  if (onOpen) onOpen(el2, close);
  const erster = el2.querySelector(".set-btn.go") || el2.querySelector(".set-btn");
  if (erster) erster.focus();
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

// src/js/views/credits.js
function isCreditProblem(e) {
  return !!(e && e.kind === "credits");
}
function creditsDialog(providerId) {
  const prov = providerOf(providerId);
  dialog({
    title: t("credits.title"),
    text: t("credits.text", { host: prov.billingHost }),
    actions: [
      { label: t("credits.close") },
      {
        label: t("credits.buy"),
        primary: true,
        run: async () => {
          try {
            await Browser.open({ url: prov.billingUrl });
          } catch (e) {
            window.open(prov.billingUrl, "_blank");
          }
        }
      }
    ]
  });
}
function showAiError(e, providerId) {
  if (isCreditProblem(e)) creditsDialog(providerId);
  else toast(t("ai.failed", { msg: e.message }), true);
}

// src/js/catalog.js
var CATEGORIES = [
  {
    id: "cable",
    de: "Kabelzug",
    en: "Cable",
    items: [
      { key: "latPulldown", de: "Lat-Zug", en: "Lat pulldown", kind: "plates" },
      { key: "seatedRow", de: "Rudern sitzend am Kabel", en: "Seated cable row", kind: "plates" },
      { key: "cableCrossover", de: "Kabelkreuzzug", en: "Cable crossover", kind: "plates" },
      { key: "cableTower", de: "Kabelturm, verstellbar", en: "Adjustable cable tower", kind: "plates" },
      { key: "tricepsPushdown", de: "Trizepsdr\xFCcken am Kabel", en: "Cable triceps pushdown", kind: "plates" },
      { key: "cableCurl", de: "Bizepscurl am Kabel", en: "Cable biceps curl", kind: "plates" },
      { key: "facePull", de: "Face Pull am Kabel", en: "Cable face pull", kind: "plates" },
      { key: "cableWoodchop", de: "Holzhacker am Kabel", en: "Cable woodchop", kind: "plates" },
      { key: "cableAbCrunch", de: "Bauchcrunch am Kabel", en: "Cable ab crunch", kind: "plates" },
      { key: "cableKickback", de: "Kickback mit Fu\xDFschlaufe", en: "Cable kickback with ankle strap", kind: "plates" }
    ]
  },
  {
    id: "chestBack",
    de: "Maschinen f\xFCr Brust und R\xFCcken",
    en: "Chest and back machines",
    items: [
      { key: "chestPress", de: "Brustpresse", en: "Chest press", kind: "plates" },
      { key: "verticalChestPress", de: "Vertical Chest Press", en: "Vertical chest press", kind: "plates" },
      { key: "inclineChestPress", de: "Schr\xE4ge Brustpresse", en: "Incline chest press", kind: "plates" },
      { key: "pecDeck", de: "Butterfly", en: "Pec deck", kind: "plates" },
      { key: "reverseFly", de: "Butterfly reverse", en: "Reverse fly", kind: "plates" },
      { key: "assistedPullup", de: "Klimmzugmaschine mit Gegengewicht", en: "Assisted pull-up machine", kind: "plates" },
      { key: "lowRowMachine", de: "Ruderzug-Maschine", en: "Low row machine", kind: "plates" },
      { key: "tBarRow", de: "T-Bar-Rudern", en: "T-bar row", kind: "weight", step: 2.5 },
      { key: "pulloverMachine", de: "Pullover-Maschine", en: "Pullover machine", kind: "plates" },
      { key: "backExtension", de: "R\xFCckenstrecker", en: "Back extension", kind: "body" }
    ]
  },
  {
    id: "legs",
    de: "Beinmaschinen",
    en: "Leg machines",
    items: [
      { key: "legPress", de: "Beinpresse", en: "Leg press", kind: "plates" },
      { key: "hackSquat", de: "Hackenschmidt-Maschine", en: "Hack squat machine", kind: "weight", step: 2.5 },
      { key: "legExtension", de: "Beinstrecker", en: "Leg extension", kind: "plates" },
      { key: "legCurlLying", de: "Beinbeuger liegend", en: "Lying leg curl", kind: "plates" },
      { key: "legCurlSeated", de: "Beinbeuger sitzend", en: "Seated leg curl", kind: "plates" },
      { key: "calfRaiseSeated", de: "Wadenheben sitzend", en: "Seated calf raise", kind: "plates" },
      { key: "calfRaiseStanding", de: "Wadenheben stehend", en: "Standing calf raise", kind: "plates" },
      { key: "hipAbduction", de: "Abduktoren-Maschine", en: "Hip abduction machine", kind: "plates" },
      { key: "hipAdduction", de: "Adduktoren-Maschine", en: "Hip adduction machine", kind: "plates" },
      { key: "hipThrustMachine", de: "Hip-Thrust-Maschine", en: "Hip thrust machine", kind: "plates" },
      { key: "gluteKickbackMachine", de: "Glute-Kickback-Maschine", en: "Glute kickback machine", kind: "plates" },
      { key: "smithMachine", de: "Multipresse", en: "Smith machine", kind: "weight", step: 2.5 }
    ]
  },
  {
    id: "shouldersArms",
    de: "Schultern und Arme",
    en: "Shoulders and arms",
    items: [
      { key: "shoulderPressMachine", de: "Schulterpresse", en: "Shoulder press machine", kind: "plates" },
      { key: "lateralRaiseMachine", de: "Seitheben-Maschine", en: "Lateral raise machine", kind: "plates" },
      { key: "bicepsCurlMachine", de: "Bizepsmaschine", en: "Biceps curl machine", kind: "plates" },
      { key: "tricepsMachine", de: "Trizepsmaschine", en: "Triceps extension machine", kind: "plates" },
      { key: "preacherBench", de: "Scottbank", en: "Preacher bench", kind: "weight", step: 2.5 },
      { key: "assistedDip", de: "Dip-Maschine mit Gegengewicht", en: "Assisted dip machine", kind: "plates" },
      { key: "wristRoller", de: "Unterarmtrainer", en: "Wrist roller", kind: "weight", step: 1 }
    ]
  },
  {
    id: "core",
    de: "Rumpf",
    en: "Core",
    items: [
      { key: "abCrunchMachine", de: "Bauchmaschine", en: "Ab crunch machine", kind: "plates" },
      { key: "rotaryTorso", de: "Rumpfrotations-Maschine", en: "Rotary torso machine", kind: "plates" },
      { key: "captainsChair", de: "Beinheber-Station", en: "Captain's chair", kind: "body" },
      { key: "romanChair", de: "R\xF6mischer Stuhl", en: "Roman chair", kind: "body" },
      { key: "abWheel", de: "Bauchroller", en: "Ab wheel", kind: "body" },
      { key: "mat", de: "Trainingsmatte", en: "Exercise mat", kind: "body" }
    ]
  },
  {
    id: "free",
    de: "Freie Gewichte",
    en: "Free weights",
    items: [
      { key: "dumbbells", de: "Kurzhanteln", en: "Dumbbells", kind: "weight", step: 2 },
      { key: "adjustableDumbbells", de: "Verstellbare Kurzhanteln", en: "Adjustable dumbbells", kind: "weight", step: 2.5 },
      { key: "barbell", de: "Langhantel", en: "Barbell", kind: "weight", step: 2.5 },
      { key: "ezBar", de: "SZ-Stange", en: "EZ bar", kind: "weight", step: 2.5 },
      { key: "trapBar", de: "Trap-Bar", en: "Trap bar", kind: "weight", step: 2.5 },
      { key: "kettlebell", de: "Kettlebell", en: "Kettlebell", kind: "weight", step: 4 },
      { key: "weightPlates", de: "Hantelscheiben", en: "Weight plates", kind: "weight", step: 1.25 },
      { key: "medicineBall", de: "Medizinball", en: "Medicine ball", kind: "weight", step: 1 },
      { key: "slamBall", de: "Slam Ball", en: "Slam ball", kind: "weight", step: 1 },
      { key: "sandbag", de: "Sandsack", en: "Sandbag", kind: "weight", step: 5 },
      { key: "weightVest", de: "Gewichtsweste", en: "Weight vest", kind: "weight", step: 1 },
      { key: "resistanceBand", de: "Widerstandsband", en: "Resistance band", kind: "body" },
      { key: "gripTrainer", de: "Handtrainer", en: "Grip trainer", kind: "body" }
    ]
  },
  {
    id: "benchRack",
    de: "B\xE4nke und Racks",
    en: "Benches and racks",
    items: [
      { key: "flatBench", de: "Flachbank", en: "Flat bench", kind: "body" },
      { key: "inclineBench", de: "Schr\xE4gbank", en: "Incline bench", kind: "body" },
      { key: "declineBench", de: "Negativbank", en: "Decline bench", kind: "body" },
      { key: "adjustableBench", de: "Verstellbare Hantelbank", en: "Adjustable bench", kind: "body" },
      { key: "powerRack", de: "Power Rack", en: "Power rack", kind: "weight", step: 2.5 },
      { key: "squatRack", de: "Kniebeugenst\xE4nder", en: "Squat rack", kind: "weight", step: 2.5 },
      { key: "benchPressStation", de: "Bankdr\xFCckstation", en: "Bench press station", kind: "weight", step: 2.5 },
      { key: "landmine", de: "Landmine", en: "Landmine", kind: "weight", step: 2.5 }
    ]
  },
  {
    id: "bodyweight",
    de: "K\xF6rpergewicht",
    en: "Bodyweight",
    items: [
      { key: "pullupBar", de: "Klimmzugstange", en: "Pull-up bar", kind: "body" },
      { key: "dipBars", de: "Dip-Barren", en: "Dip bars", kind: "body" },
      { key: "gymnasticRings", de: "Turnringe", en: "Gymnastic rings", kind: "body" },
      { key: "suspensionTrainer", de: "Schlingentrainer", en: "Suspension trainer", kind: "body" },
      { key: "parallettes", de: "Parallettes", en: "Parallettes", kind: "body" },
      { key: "plyoBox", de: "Sprungkasten", en: "Plyo box", kind: "body" },
      { key: "stepPlatform", de: "Steppbrett", en: "Step platform", kind: "body" },
      { key: "floor", de: "Boden, ohne Ger\xE4t", en: "Floor, no equipment", kind: "body" }
    ]
  },
  {
    id: "cardio",
    de: "Ausdauer",
    en: "Cardio",
    items: [
      { key: "treadmill", de: "Laufband", en: "Treadmill", kind: "body" },
      { key: "rowingMachine", de: "Ruderger\xE4t", en: "Rowing machine", kind: "body" },
      { key: "bike", de: "Ergometer", en: "Exercise bike", kind: "body" },
      { key: "spinBike", de: "Indoor Bike", en: "Spin bike", kind: "body" },
      { key: "elliptical", de: "Crosstrainer", en: "Elliptical", kind: "body" },
      { key: "stairClimber", de: "Stepper", en: "Stair climber", kind: "body" },
      { key: "skiErg", de: "Ski-Ergometer", en: "Ski erg", kind: "body" },
      { key: "airBike", de: "Air Bike", en: "Air bike", kind: "body" },
      { key: "jumpRope", de: "Springseil", en: "Jump rope", kind: "body" }
    ]
  }
];
var BUNDLES = [
  {
    key: "gym",
    de: "Fitnessstudio, \xFCbliche Ausstattung",
    en: "Gym, usual equipment",
    deSub: "Der g\xE4ngige Maschinenpark samt freien Gewichten.",
    enSub: "The usual set of machines plus free weights.",
    items: [
      "latPulldown",
      "lowRowMachine",
      "chestPress",
      "pecDeck",
      "shoulderPressMachine",
      "legPress",
      "legExtension",
      "legCurlSeated",
      "abCrunchMachine",
      "cableTower",
      "dumbbells",
      "barbell",
      "flatBench"
    ]
  },
  {
    key: "multiGym",
    de: "Kraftstation",
    en: "Multi-gym",
    deSub: "Turm mit Plattenstapel, mehrere Stationen an einem Ger\xE4t.",
    enSub: "One tower with a weight stack and several stations.",
    items: [
      "latPulldown",
      "chestPress",
      "pecDeck",
      "lowRowMachine",
      "legExtension",
      "legCurlSeated",
      "tricepsPushdown"
    ]
  },
  {
    key: "cableStation",
    de: "Kabelzug-Station",
    en: "Cable station",
    deSub: "Verstellbarer Kabelturm, meist mit Klimmzugstange.",
    enSub: "Adjustable cable tower, usually with a pull-up bar.",
    items: ["cableTower", "cableCrossover", "pullupBar", "mat"]
  },
  {
    key: "rack",
    de: "Power Rack mit Langhantel",
    en: "Power rack with barbell",
    deSub: "Rack, Hantel, Scheiben, Bank \u2014 das klassische Heimstudio.",
    enSub: "Rack, bar, plates, bench \u2014 the classic home setup.",
    items: ["powerRack", "barbell", "weightPlates", "adjustableBench", "pullupBar"]
  },
  {
    key: "benchSet",
    de: "Hantelbank mit freien Gewichten",
    en: "Bench with free weights",
    deSub: "Bank, Kurzhanteln, Stange, Scheiben.",
    enSub: "Bench, dumbbells, bar, plates.",
    items: ["adjustableBench", "dumbbells", "ezBar", "weightPlates"]
  },
  {
    key: "bodyweightSet",
    de: "K\xF6rpergewicht-Grundausstattung",
    en: "Bodyweight basics",
    deSub: "Ohne Gewichte, nur Aufh\xE4ngung und Unterlage.",
    enSub: "No weights, just something to hang from and a mat.",
    items: ["pullupBar", "dipBars", "suspensionTrainer", "mat"]
  }
];
var bundleOf = (key) => BUNDLES.find((b) => b.key === key) || null;
var catName = (o) => o[getLang()] || o.de;
var catSub = (o) => o[getLang() + "Sub"] || o.deSub || "";
var searchText = (o) => (o.de + " " + o.en).toLowerCase();
function catalogEntry(key) {
  for (const c of CATEGORIES) {
    const hit = c.items.find((i) => i.key === key);
    if (hit) return hit;
  }
  return null;
}
var catalogSize = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

// src/js/ex-catalog.js
var EX_CATEGORIES = [
  {
    id: "chest",
    de: "Brust",
    en: "Chest",
    items: [
      { key: "benchPress", de: "Bankdr\xFCcken", en: "Bench press", eq: "barbell" },
      { key: "inclineBenchPress", de: "Schr\xE4gbankdr\xFCcken", en: "Incline bench press", eq: "barbell" },
      { key: "closeGripBench", de: "Enges Bankdr\xFCcken", en: "Close-grip bench press", eq: "barbell" },
      { key: "dumbbellPress", de: "Kurzhantel-Bankdr\xFCcken", en: "Dumbbell bench press", eq: "dumbbells" },
      { key: "inclineDumbbellPress", de: "Schr\xE4gbankdr\xFCcken mit Kurzhanteln", en: "Incline dumbbell press", eq: "dumbbells" },
      { key: "dumbbellFly", de: "Fliegende mit Kurzhanteln", en: "Dumbbell fly", eq: "dumbbells" },
      { key: "chestPressEx", de: "Brustpresse", en: "Chest press", eq: "chestPress" },
      { key: "verticalChestPressEx", de: "Vertical Chest Press", en: "Vertical chest press", eq: "verticalChestPress" },
      { key: "pecDeckFly", de: "Butterfly", en: "Pec deck fly", eq: "pecDeck" },
      { key: "cableCrossoverEx", de: "Kabelkreuzheben", en: "Cable crossover", eq: "cableCrossover" },
      { key: "pushup", de: "Liegest\xFCtze", en: "Push-up", eq: "floor" },
      { key: "dips", de: "Dips", en: "Dips", eq: "dipBars" },
      { key: "assistedDipsEx", de: "Dips mit Gegengewicht", en: "Assisted dips", eq: "assistedDip" },
      { key: "smithBenchPress", de: "Bankdr\xFCcken an der Multipresse", en: "Smith machine bench press", eq: "smithMachine" }
    ]
  },
  {
    id: "back",
    de: "R\xFCcken",
    en: "Back",
    items: [
      { key: "latPulldownEx", de: "Latziehen", en: "Lat pulldown", eq: "latPulldown" },
      { key: "latPulldownNarrow", de: "Latziehen eng", en: "Close-grip lat pulldown", eq: "latPulldown" },
      { key: "pullup", de: "Klimmzug", en: "Pull-up", eq: "pullupBar" },
      { key: "chinup", de: "Klimmzug im Untergriff", en: "Chin-up", eq: "pullupBar" },
      { key: "assistedPullupEx", de: "Klimmzug mit Gegengewicht", en: "Assisted pull-up", eq: "assistedPullup" },
      { key: "seatedRowEx", de: "Rudern sitzend am Kabel", en: "Seated cable row", eq: "seatedRow" },
      { key: "lowRowEx", de: "Ruderzug an der Maschine", en: "Machine row", eq: "lowRowMachine" },
      { key: "barbellRow", de: "Langhantelrudern", en: "Barbell row", eq: "barbell" },
      { key: "dumbbellRow", de: "Kurzhantelrudern", en: "Dumbbell row", eq: "dumbbells" },
      { key: "tBarRowEx", de: "T-Bar-Rudern", en: "T-bar row", eq: "tBarRow" },
      { key: "invertedRow", de: "Rudern am Schlingentrainer", en: "Inverted row", eq: "suspensionTrainer" },
      { key: "facePullEx", de: "Face Pull", en: "Face pull", eq: "facePull" },
      { key: "pulloverEx", de: "Pullover", en: "Pullover", eq: "pulloverMachine" },
      { key: "deadlift", de: "Kreuzheben", en: "Deadlift", eq: "barbell" },
      { key: "rackPull", de: "Rack Pull", en: "Rack pull", eq: "powerRack" },
      { key: "shrug", de: "Schulterheben", en: "Shrug", eq: "dumbbells" },
      { key: "backExtensionEx", de: "R\xFCckenstrecken", en: "Back extension", eq: "backExtension" }
    ]
  },
  {
    id: "legs",
    de: "Beine und Ges\xE4\xDF",
    en: "Legs and glutes",
    items: [
      { key: "squat", de: "Kniebeuge", en: "Squat", eq: "barbell" },
      { key: "frontSquat", de: "Frontkniebeuge", en: "Front squat", eq: "barbell" },
      { key: "gobletSquat", de: "Goblet Squat", en: "Goblet squat", eq: "kettlebell" },
      { key: "smithSquat", de: "Kniebeuge an der Multipresse", en: "Smith machine squat", eq: "smithMachine" },
      { key: "legPressEx", de: "Beinpresse", en: "Leg press", eq: "legPress" },
      { key: "hackSquatEx", de: "Hackenschmidt-Kniebeuge", en: "Hack squat", eq: "hackSquat" },
      { key: "legExtensionEx", de: "Beinstrecken", en: "Leg extension", eq: "legExtension" },
      { key: "legCurlLyingEx", de: "Beinbeugen liegend", en: "Lying leg curl", eq: "legCurlLying" },
      { key: "legCurlSeatedEx", de: "Beinbeugen sitzend", en: "Seated leg curl", eq: "legCurlSeated" },
      { key: "romanianDeadlift", de: "Rum\xE4nisches Kreuzheben", en: "Romanian deadlift", eq: "barbell" },
      { key: "bulgarianSplitSquat", de: "Bulgarische Kniebeuge", en: "Bulgarian split squat", eq: "dumbbells" },
      { key: "lunge", de: "Ausfallschritt", en: "Lunge", eq: "dumbbells" },
      { key: "walkingLunge", de: "Gehender Ausfallschritt", en: "Walking lunge", eq: "dumbbells" },
      { key: "stepUp", de: "Aufsteigen auf den Kasten", en: "Step-up", eq: "plyoBox" },
      { key: "wallSit", de: "Wandsitzen", en: "Wall sit", eq: "floor" },
      { key: "calfRaiseSeatedEx", de: "Wadenheben sitzend", en: "Seated calf raise", eq: "calfRaiseSeated" },
      { key: "calfRaiseStandingEx", de: "Wadenheben stehend", en: "Standing calf raise", eq: "calfRaiseStanding" },
      { key: "calfRaiseStep", de: "Wadenheben auf der Stufe", en: "Calf raise on a step", eq: "stepPlatform" },
      { key: "hipThrustEx", de: "Hip Thrust an der Maschine", en: "Machine hip thrust", eq: "hipThrustMachine" },
      { key: "barbellHipThrust", de: "Hip Thrust mit Langhantel", en: "Barbell hip thrust", eq: "barbell" },
      { key: "gluteBridge", de: "Beckenheben", en: "Glute bridge", eq: "mat" },
      { key: "hipAbductionEx", de: "Abduktoren", en: "Hip abduction", eq: "hipAbduction" },
      { key: "hipAdductionEx", de: "Adduktoren", en: "Hip adduction", eq: "hipAdduction" },
      { key: "cableKickbackEx", de: "Kickback am Kabel", en: "Cable kickback", eq: "cableKickback" }
    ]
  },
  {
    id: "shoulders",
    de: "Schultern",
    en: "Shoulders",
    items: [
      { key: "overheadPress", de: "Schulterdr\xFCcken mit Langhantel", en: "Overhead press", eq: "barbell" },
      { key: "dumbbellShoulderPress", de: "Schulterdr\xFCcken mit Kurzhanteln", en: "Dumbbell shoulder press", eq: "dumbbells" },
      { key: "shoulderPressMachineEx", de: "Schulterpresse", en: "Machine shoulder press", eq: "shoulderPressMachine" },
      { key: "arnoldPress", de: "Arnold Press", en: "Arnold press", eq: "dumbbells" },
      { key: "lateralRaise", de: "Seitheben", en: "Lateral raise", eq: "dumbbells" },
      { key: "lateralRaiseCable", de: "Seitheben am Kabel", en: "Cable lateral raise", eq: "cableTower" },
      { key: "lateralRaiseMachineEx", de: "Seitheben an der Maschine", en: "Machine lateral raise", eq: "lateralRaiseMachine" },
      { key: "frontRaise", de: "Frontheben", en: "Front raise", eq: "dumbbells" },
      { key: "reverseFlyEx", de: "Butterfly reverse", en: "Reverse fly", eq: "reverseFly" },
      { key: "reverseFlyDumbbell", de: "Reverse Fly mit Kurzhanteln", en: "Dumbbell reverse fly", eq: "dumbbells" },
      { key: "uprightRow", de: "Aufrechtes Rudern", en: "Upright row", eq: "ezBar" },
      { key: "pikePushup", de: "Pike-Liegest\xFCtz", en: "Pike push-up", eq: "floor" }
    ]
  },
  {
    id: "arms",
    de: "Arme",
    en: "Arms",
    items: [
      { key: "bicepsCurlDumbbell", de: "Bizepscurl mit Kurzhanteln", en: "Dumbbell curl", eq: "dumbbells" },
      { key: "bicepsCurlBarbell", de: "Bizepscurl mit SZ-Stange", en: "EZ bar curl", eq: "ezBar" },
      { key: "hammerCurl", de: "Hammercurl", en: "Hammer curl", eq: "dumbbells" },
      { key: "preacherCurl", de: "Scottcurl", en: "Preacher curl", eq: "preacherBench" },
      { key: "cableCurlEx", de: "Bizepscurl am Kabel", en: "Cable curl", eq: "cableCurl" },
      { key: "concentrationCurl", de: "Konzentrationscurl", en: "Concentration curl", eq: "dumbbells" },
      { key: "bicepsMachineEx", de: "Bizeps an der Maschine", en: "Machine biceps curl", eq: "bicepsCurlMachine" },
      { key: "tricepsPushdownEx", de: "Trizepsdr\xFCcken am Kabel", en: "Triceps pushdown", eq: "tricepsPushdown" },
      { key: "overheadTricepsExtension", de: "Trizepsdr\xFCcken \xFCber Kopf", en: "Overhead triceps extension", eq: "dumbbells" },
      { key: "skullcrusher", de: "Stirndr\xFCcken", en: "Skullcrusher", eq: "ezBar" },
      { key: "tricepsKickback", de: "Trizeps-Kickback", en: "Triceps kickback", eq: "dumbbells" },
      { key: "tricepsDips", de: "Trizeps-Dips", en: "Triceps dips", eq: "dipBars" },
      { key: "tricepsMachineEx", de: "Trizeps an der Maschine", en: "Machine triceps extension", eq: "tricepsMachine" },
      { key: "wristCurl", de: "Handgelenkcurl", en: "Wrist curl", eq: "dumbbells" },
      { key: "farmersCarry", de: "Farmer\u2019s Walk", en: "Farmer's carry", eq: "dumbbells" }
    ]
  },
  {
    id: "core",
    de: "Rumpf",
    en: "Core",
    items: [
      { key: "crunch", de: "Crunch", en: "Crunch", eq: "mat" },
      { key: "bicycleCrunch", de: "Fahrrad-Crunch", en: "Bicycle crunch", eq: "mat" },
      { key: "cableAbCrunchEx", de: "Bauchcrunch am Kabel", en: "Cable ab crunch", eq: "cableAbCrunch" },
      { key: "abCrunchMachineEx", de: "Bauchmaschine", en: "Machine ab crunch", eq: "abCrunchMachine" },
      { key: "plankEx", de: "Plank", en: "Plank", eq: "mat" },
      { key: "sidePlank", de: "Seitlicher Plank", en: "Side plank", eq: "mat" },
      { key: "deadBug", de: "Dead Bug", en: "Dead bug", eq: "mat" },
      { key: "hollowHold", de: "Hollow Hold", en: "Hollow hold", eq: "mat" },
      { key: "legRaiseHanging", de: "H\xE4ngendes Beinheben", en: "Hanging leg raise", eq: "pullupBar" },
      { key: "legRaiseCaptain", de: "Beinheben an der Station", en: "Captain\u2019s chair leg raise", eq: "captainsChair" },
      { key: "russianTwist", de: "Russian Twist", en: "Russian twist", eq: "medicineBall" },
      { key: "woodchopEx", de: "Holzhacker am Kabel", en: "Cable woodchop", eq: "cableWoodchop" },
      { key: "rotaryTorsoEx", de: "Rumpfrotation", en: "Rotary torso", eq: "rotaryTorso" },
      { key: "abWheelRollout", de: "Bauchroller", en: "Ab wheel rollout", eq: "abWheel" },
      { key: "romanChairExtension", de: "R\xFCckenstrecken am r\xF6mischen Stuhl", en: "Roman chair extension", eq: "romanChair" },
      { key: "mountainClimber", de: "Bergsteiger", en: "Mountain climber", eq: "floor" }
    ]
  },
  {
    id: "fullbody",
    de: "Ganzk\xF6rper und Ausdauer",
    en: "Full body and cardio",
    items: [
      { key: "burpee", de: "Burpee", en: "Burpee", eq: "floor" },
      { key: "kettlebellSwing", de: "Kettlebell Swing", en: "Kettlebell swing", eq: "kettlebell" },
      { key: "thruster", de: "Thruster", en: "Thruster", eq: "barbell" },
      { key: "powerClean", de: "Umsetzen", en: "Power clean", eq: "barbell" },
      { key: "boxJump", de: "Kastensprung", en: "Box jump", eq: "plyoBox" },
      { key: "jumpRopeEx", de: "Seilspringen", en: "Jump rope", eq: "jumpRope" },
      { key: "rowErg", de: "Rudern am Ergometer", en: "Rowing machine", eq: "rowingMachine" },
      { key: "bikeErg", de: "Radfahren", en: "Exercise bike", eq: "bike" },
      { key: "spinBikeEx", de: "Indoor Cycling", en: "Indoor cycling", eq: "spinBike" },
      { key: "treadmillRun", de: "Laufen am Band", en: "Treadmill run", eq: "treadmill" },
      { key: "treadmillWalk", de: "Gehen am Band", en: "Treadmill walk", eq: "treadmill" },
      { key: "ellipticalEx", de: "Crosstrainer", en: "Elliptical", eq: "elliptical" },
      { key: "stairClimberEx", de: "Stepper", en: "Stair climber", eq: "stairClimber" },
      { key: "skiErgEx", de: "Ski-Ergometer", en: "Ski erg", eq: "skiErg" },
      { key: "airBikeEx", de: "Air Bike", en: "Air bike", eq: "airBike" }
    ]
  }
];
var exCatalogSize = EX_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
function exCatalogEntry(key) {
  for (const c of EX_CATEGORIES) {
    const hit = c.items.find((i) => i.key === key);
    if (hit) return hit;
  }
  return null;
}
var exName = (o) => o[getLang()] || o.de;
var exSearchText = (o) => (o.de + " " + o.en).toLowerCase();

// src/js/views/sets.js
var rerender = () => document.dispatchEvent(new CustomEvent("rerender"));
function datum(d) {
  const [y, m, tag] = d.split("-").map(Number);
  return new Date(y, m - 1, tag).toLocaleDateString(locale(), { day: "numeric", month: "short" });
}
function performanceText(exId, perf) {
  if (!perf) return "";
  const teile = [];
  if (perf.weight != null) {
    const w = weightLabel(exId, perf.weight);
    if (!w.body) teile.push(w.main + " " + w.unit);
  }
  const reps = (perf.reps || []).filter((r) => r > 0);
  if (reps.length) teile.push(reps.join("/"));
  return teile.join(" \xB7 ");
}
function weightText(exId, value) {
  const w = weightLabel(exId, value || 0);
  return w.body ? w.sub : w.main + " " + w.unit;
}
function recordText(exId, pr) {
  if (!pr) return "";
  const w = weightLabel(exId, pr.weight);
  const teil = w.body ? "" : w.main + " " + w.unit;
  return [teil, pr.reps ? pr.reps + "\xD7" : ""].filter(Boolean).join(" \xB7 ") + " (" + datum(pr.date) + ")";
}
function verlauf(exId) {
  const eintraege = exerciseHistory(exId, 12);
  if (!eintraege.length) return '<p class="fld-h">' + esc(t("set.noHistory")) + "</p>";
  const werte = eintraege.map((e) => e.weight || 0);
  const hoch = Math.max(1, ...werte);
  const balken = eintraege.map((e) => '<div class="bar-col" title="' + esc(e.date) + '"><div class="bar-v full" style="height:' + Math.max(4, Math.round(e.weight / hoch * 100)) + '%"></div></div>').join("");
  const zeilen = eintraege.slice(-5).reverse().map((e) => '<div class="dt-row"><span class="dt-m">' + esc(datum(e.date)) + '</span><span class="dt-n">' + esc((e.reps || []).filter((r) => r > 0).join("/") || "\u2014") + '</span><span class="dt-w">' + esc(weightText(exId, e.weight)) + "</span></div>").join("");
  return "<h4>" + esc(t("set.history")) + '</h4><div class="bars">' + balken + "</div>" + zeilen;
}
function openSets(exId, item) {
  const ex = exOf(exId);
  const e = entry();
  const anzahl = setsDone(e, item);
  const reps = repsOf(e, exId);
  const letzte = lastPerformance(exId);
  const best = personalRecord(exId);
  const zeilen = anzahl ? Array.from({ length: anzahl }, (_, i) => '<label class="chk set-row"><span>' + esc(t("set.nr", { n: i + 1 })) + '</span><input class="in tiny num" type="number" inputmode="numeric" min="0" max="999" data-set="' + i + '" value="' + (reps[i] || 0) + '"><span class="lst-s">' + esc(t("set.reps")) + "</span></label>").join("") : '<p class="fld-h">' + esc(t("set.none")) + "</p>";
  dialog({
    title: t("set.title", { name: nameOf(ex) }),
    html: '<p class="fld-h">' + esc(t("set.hint")) + "</p>" + zeilen + (letzte ? '<p class="fld-h">' + esc(t("set.last", { text: performanceText(exId, letzte) || "\u2014" })) + " \xB7 " + esc(datum(letzte.date)) + "</p>" : "") + (best ? '<p class="fld-h">' + esc(t("set.record", { text: recordText(exId, best) })) + "</p>" : "") + verlauf(exId),
    actions: [{ label: t("common.save"), primary: true }],
    onOpen: (el2) => {
      el2.querySelectorAll("[data-set]").forEach((inp) => {
        inp.addEventListener("change", () => {
          setReps(exId, Number(inp.dataset.set), inp.value);
        });
      });
    }
  });
  setTimeout(rerender, 50);
}

// src/js/views/editors.js
var rerender2 = () => document.dispatchEvent(new CustomEvent("rerender"));
var editing = null;
var picked = null;
var bundle = null;
var pickedEx = null;
var onlyMine = true;
var picking = false;
var chosen = /* @__PURE__ */ new Set();
function resetEditing() {
  editing = null;
  picked = null;
  bundle = null;
  pickedEx = null;
  picking = false;
  chosen.clear();
}
function muscleOptions() {
  return [{ id: "", label: t("ex.muscleNone") }].concat(EX_CATEGORIES.map((c) => ({ id: c.id, label: exName(c) })));
}
function muscleLabel(id) {
  const c = EX_CATEGORIES.find((x) => x.id === id);
  return c ? exName(c) : "";
}
function muscleOf(key) {
  const c = EX_CATEGORIES.find((x) => x.items.some((i) => i.key === key));
  return c ? c.id : "";
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
    picked = null;
    bundle = null;
    pickedEx = null;
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
    rerender2();
  });
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender2();
  });
  on("[data-del]", (ev) => {
    const eq = equipOf(ev.currentTarget.dataset.del);
    if (!eq) return;
    if (equipmentUsage(eq.id)) {
      toast(t("equip.deleteBlocked"), true);
      return;
    }
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(eq) }))) return;
    undoable(deleteEquipment(eq.id));
  });
}
function bundleForm(mount2, head2, goHub) {
  const b = bundleOf(bundle);
  if (!b) {
    bundle = null;
    return equipmentPicker(mount2, head2, goHub);
  }
  const have = S.equipment.map((e) => nameOf(e).toLowerCase());
  const rows = b.items.map((key) => {
    const item = catalogEntry(key);
    if (!item) return "";
    const schon = have.includes(catName(item).toLowerCase());
    return '<label class="chk bundle-i"><input type="checkbox" data-part="' + esc(key) + '"' + (schon ? "" : " checked") + "><span>" + esc(catName(item)) + (schon ? ' <span class="lst-s">\u2014 ' + esc(t("equip.alreadyThere")) + "</span>" : "") + "</span></label>";
  }).join("");
  mount2.innerHTML = head2() + backBar(catName(b)) + '<p class="intro">' + esc(t("equip.bundleHint")) + "</p>" + rows + '<button class="set-btn go" id="addsel">' + esc(t("equip.bundleAdd", { n: b.items.length })) + "</button>";
  byId("back").addEventListener("click", () => {
    bundle = null;
    rerender2();
  });
  const zaehlen = () => [...document.querySelectorAll("[data-part]")].filter((c) => c.checked);
  const nachzaehlen = () => byId("addsel").textContent = t("equip.bundleAdd", { n: zaehlen().length });
  nachzaehlen();
  on("[data-part]", nachzaehlen, "change");
  byId("addsel").addEventListener("click", () => {
    const gewaehlt = zaehlen().map((c) => c.dataset.part);
    if (!gewaehlt.length) {
      toast(t("equip.bundleNone"), true);
      return;
    }
    let neu = 0, schon = 0;
    const namen = S.equipment.map((e) => nameOf(e).toLowerCase());
    gewaehlt.forEach((key) => {
      const item = catalogEntry(key);
      if (!item) return;
      if (namen.includes(catName(item).toLowerCase())) {
        schon++;
        return;
      }
      const data2 = { name: catName(item), kind: item.kind };
      if (item.kind === "plates") data2.plate = S.pw;
      if (item.kind === "weight") data2.step = item.step || 2.5;
      addEquipment(data2);
      namen.push(catName(item).toLowerCase());
      neu++;
    });
    bundle = null;
    editing = null;
    picked = null;
    toast(t("equip.bundleDone", { n: neu }) + (schon ? " " + t("equip.bundleSkipped", { n: schon }) : ""));
  });
}
function equipmentPicker(mount2, head2, goHub) {
  if (bundle) return bundleForm(mount2, head2, goHub);
  const quick = BUNDLES.map((b) => '<button class="nav-row" data-bundle="' + esc(b.key) + '"><span class="nav-n">' + esc(catName(b)) + '</span><span class="nav-s">' + esc(catSub(b)) + " \xB7 " + esc(t("equip.bundleCount", { n: b.items.length })) + '</span><span class="nav-c">\u203A</span></button>').join("");
  const groups = CATEGORIES.map((c) => '<div class="cat" data-cat="' + c.id + '"><h3 class="cat-h">' + esc(catName(c)) + "</h3>" + c.items.map((i) => '<button class="cat-i" data-pickeq="' + esc(i.key) + '" data-find="' + esc(searchText(i)) + '">' + esc(catName(i)) + "</button>").join("") + "</div>").join("");
  mount2.innerHTML = head2() + backBar(t("equip.pick")) + '<h3 class="sec first">' + esc(t("equip.bundles")) + '</h3><p class="intro">' + esc(t("equip.bundlesHint")) + "</p>" + quick + '<h3 class="sec">' + esc(t("equip.single")) + '</h3><p class="intro">' + esc(t("equip.pickHint")) + '</p><input class="in" id="f-search" type="search" autocomplete="off" placeholder="' + esc(t("equip.search")) + '"><p class="intro" id="hits">' + esc(t("equip.fromCatalog", { n: catalogSize })) + '</p><div id="cats">' + groups + '</div><p class="intro" id="nomatch" hidden>' + esc(t("equip.noMatch")) + '</p><button class="set-btn" id="own">+ ' + esc(t("equip.custom")) + "</button>";
  wireBack(rerender2);
  byId("own").addEventListener("click", () => {
    picked = "custom";
    rerender2();
  });
  on("[data-bundle]", (ev) => {
    bundle = ev.currentTarget.dataset.bundle;
    rerender2();
  });
  on("[data-pickeq]", (ev) => {
    picked = ev.currentTarget.dataset.pickeq;
    rerender2();
  });
  const search = byId("f-search");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll(".cat").forEach((cat) => {
      let inCat = 0;
      cat.querySelectorAll(".cat-i").forEach((b) => {
        const hit = !q || b.dataset.find.includes(q);
        b.hidden = !hit;
        if (hit) inCat++;
      });
      cat.hidden = inCat === 0;
      shown += inCat;
    });
    byId("nomatch").hidden = shown > 0;
    byId("hits").textContent = q ? t("equip.fromCatalog", { n: shown }) : t("equip.fromCatalog", { n: catalogSize });
  });
}
function equipmentForm(mount2, head2, goHub) {
  if (editing === "new" && !picked) return equipmentPicker(mount2, head2, goHub);
  const fromCatalog = picked && picked !== "custom" ? catalogEntry(picked) : null;
  const eq = editing === "new" ? {
    kind: fromCatalog ? fromCatalog.kind : "plates",
    plate: S.pw,
    step: fromCatalog && fromCatalog.step ? fromCatalog.step : 2.5,
    name: fromCatalog ? catName(fromCatalog) : ""
  } : equipOf(editing);
  if (!eq) {
    editing = null;
    return equipment(mount2, head2, goHub);
  }
  mount2.innerHTML = head2() + backBar(editing === "new" ? t("equip.add") : nameOf(eq)) + field(t("equip.name"), textIn("f-name", editing === "new" ? eq.name || "" : nameOf(eq))) + field(t("equip.kind"), selectIn("f-kind", kindOptions(), eq.kind)) + '<div id="f-extra"></div><button class="set-btn" id="save">' + esc(t("common.save")) + "</button>";
  const extra = () => {
    const kind = byId("f-kind").value;
    byId("f-extra").innerHTML = kind === "plates" ? field(t("equip.plate"), numIn("f-plate", eq.plate || 4.5, "0.5", 0.5)) : kind === "weight" ? field(t("equip.step"), numIn("f-step", eq.step || 2.5, "0.5", 0.5)) : "";
  };
  extra();
  byId("f-kind").addEventListener("change", extra);
  wireBack(rerender2);
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
    picked = null;
  });
}
function undoableMany(snaps) {
  if (!snaps || !snaps.length) return;
  toast(t("undo.doneMany", { n: snaps.length }), false, {
    label: t("undo.action"),
    run: () => {
      restoreMany(snaps);
      toast(t("undo.back"));
    }
  });
}
function undoable(snap) {
  if (!snap) return;
  toast(t("undo.done"), false, {
    label: t("undo.action"),
    run: () => {
      restore(snap);
      toast(t("undo.back"));
    }
  });
}
function aiMark(obj) {
  return obj && obj.src === "ai" ? ' <span class="ai-mark" title="' + esc(t("ex.aiMade")) + '">\u2726</span>' : "";
}
function exercises(mount2, head2, goHub) {
  if (editing) return exerciseForm(mount2, head2, goHub);
  const liste = visibleExercises();
  chosen.forEach((id) => {
    if (!liste.some((e) => e.id === id)) chosen.delete(id);
  });
  const vonKi = liste.some((e) => e.src === "ai");
  const rows = liste.map((ex) => {
    const eq = equipOf(ex.equip);
    const inPlans = exerciseUsage(ex.id);
    const mitte = '<div class="lst-m"><div class="lst-n">' + esc(nameOf(ex)) + aiMark(ex) + '</div><div class="lst-s">' + esc(nameOf(eq)) + " \xB7 " + esc(inPlans ? t(inPlans === 1 ? "ex.inPlans1" : "ex.inPlans", { n: inPlans }) : t("ex.notInPlan")) + "</div></div>";
    if (picking) {
      return '<label class="lst pick"><input type="checkbox" data-pick="' + ex.id + '"' + (chosen.has(ex.id) ? " checked" : "") + ">" + mitte + "</label>";
    }
    return '<div class="lst">' + mitte + '<div class="row-act"><button class="mini" data-edit="' + ex.id + '">' + esc(t("common.edit")) + '</button><button class="mini warn" data-del="' + ex.id + '">' + esc(t("common.delete")) + "</button></div></div>";
  }).join("");
  mount2.innerHTML = head2() + backBar(t("ex.title")) + '<p class="intro">' + esc(picking ? t("ex.multiHint") : t("ex.intro")) + "</p>" + (picking && liste.length ? pickBar() : "") + rows + (vonKi ? '<p class="fld-h">\u2726 ' + esc(t("ex.legend")) + "</p>" : "") + (liste.length ? '<button class="set-btn" id="multi">' + esc(t(picking ? "ex.multiEnd" : "ex.multi")) + "</button>" : "") + (picking ? "" : '<button class="set-btn" id="add">+ ' + esc(t("ex.add")) + "</button>");
  wireBack(goHub);
  const multi = byId("multi");
  if (multi) multi.addEventListener("click", () => {
    picking = !picking;
    chosen.clear();
    rerender2();
  });
  if (picking) return wirePicking(liste);
  byId("add").addEventListener("click", () => {
    editing = "new";
    rerender2();
  });
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender2();
  });
  on("[data-del]", (ev) => {
    const ex = exOf(ev.currentTarget.dataset.del);
    if (!ex) return;
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(ex) }) + "\n" + t("ex.keepForHistory"))) return;
    undoable(deleteExercise(ex.id));
  });
}
function pickBar() {
  return '<div class="row-act pick-bar"><button class="mini" id="all">' + esc(t("ex.selAll")) + '</button><button class="mini" id="none">' + esc(t("ex.selNone")) + '</button><button class="mini warn" id="delsel"' + (chosen.size ? "" : " disabled") + ">" + esc(t("ex.delSel", { n: chosen.size })) + "</button></div>";
}
function wirePicking(liste) {
  const knopf = byId("delsel");
  const nachfuehren = () => {
    knopf.textContent = t("ex.delSel", { n: chosen.size });
    knopf.disabled = !chosen.size;
  };
  on("[data-pick]", (ev) => {
    const box = ev.currentTarget;
    if (box.checked) chosen.add(box.dataset.pick);
    else chosen.delete(box.dataset.pick);
    nachfuehren();
  }, "change");
  byId("all").addEventListener("click", () => {
    liste.forEach((ex) => chosen.add(ex.id));
    document.querySelectorAll("[data-pick]").forEach((b) => {
      b.checked = true;
    });
    nachfuehren();
  });
  byId("none").addEventListener("click", () => {
    chosen.clear();
    document.querySelectorAll("[data-pick]").forEach((b) => {
      b.checked = false;
    });
    nachfuehren();
  });
  knopf.addEventListener("click", () => {
    const ids = [...chosen];
    if (!ids.length) return;
    if (!confirmBox(t("ex.delSelAsk", { n: ids.length }) + "\n" + t("ex.keepForHistory"))) return;
    const snaps = deleteExercises(ids);
    chosen.clear();
    undoableMany(snaps);
  });
}
function exercisePicker(mount2, head2, goHub) {
  const meine = new Set(S.equipment.map((e) => nameOf(e).toLowerCase()));
  const passt = (i) => {
    const eq = catalogEntry(i.eq);
    return eq ? meine.has(catName(eq).toLowerCase()) : false;
  };
  const groups = EX_CATEGORIES.map((c) => '<div class="cat" data-cat="' + c.id + '"><h3 class="cat-h">' + esc(exName(c)) + "</h3>" + c.items.map((i) => {
    const eq = catalogEntry(i.eq);
    return '<button class="cat-i" data-pickex="' + esc(i.key) + '" data-mine="' + (passt(i) ? "1" : "0") + '" data-find="' + esc(exSearchText(i)) + '">' + esc(exName(i)) + '<span class="cat-eq">' + esc(eq ? catName(eq) : "") + "</span></button>";
  }).join("") + "</div>").join("");
  mount2.innerHTML = head2() + backBar(t("ex.pick")) + '<p class="intro">' + esc(t("ex.pickHint")) + '</p><label class="chk"><input type="checkbox" id="f-mine"' + (onlyMine ? " checked" : "") + "><span>" + esc(t("ex.onlyMine")) + '</span></label><input class="in" id="f-search" type="search" autocomplete="off" placeholder="' + esc(t("ex.search")) + '"><p class="intro" id="hits"></p><div id="cats">' + groups + '</div><p class="intro" id="nomatch" hidden>' + esc(t("ex.noMatch")) + '</p><button class="set-btn" id="own">+ ' + esc(t("ex.custom")) + "</button>";
  wireBack(rerender2);
  byId("own").addEventListener("click", () => {
    pickedEx = "custom";
    rerender2();
  });
  on("[data-pickex]", (ev) => {
    pickedEx = ev.currentTarget.dataset.pickex;
    rerender2();
  });
  const search = byId("f-search");
  const mine = byId("f-mine");
  const filter = () => {
    const q = search.value.trim().toLowerCase();
    const nurMeine = mine.checked;
    let shown = 0;
    document.querySelectorAll(".cat").forEach((cat) => {
      let inCat = 0;
      cat.querySelectorAll(".cat-i").forEach((b) => {
        const hit = (!q || b.dataset.find.includes(q)) && (!nurMeine || b.dataset.mine === "1");
        b.hidden = !hit;
        if (hit) inCat++;
      });
      cat.hidden = inCat === 0;
      shown += inCat;
    });
    byId("nomatch").hidden = shown > 0;
    byId("hits").textContent = t("ex.fromCatalog", { n: shown });
  };
  filter();
  search.addEventListener("input", filter);
  mine.addEventListener("change", () => {
    onlyMine = mine.checked;
    filter();
  });
}
function exerciseForm(mount2, head2, goHub) {
  if (editing === "new" && !pickedEx) return exercisePicker(mount2, head2, goHub);
  const ausKatalog = pickedEx && pickedEx !== "custom" ? exCatalogEntry(pickedEx) : null;
  const geraetTyp = ausKatalog ? catalogEntry(ausKatalog.eq) : null;
  const vorhanden = geraetTyp ? S.equipment.find((e) => nameOf(e).toLowerCase() === catName(geraetTyp).toLowerCase()) : null;
  const ex = editing === "new" ? {
    equip: vorhanden ? vorhanden.id : S.equipment[0] && S.equipment[0].id,
    name: ausKatalog ? exName(ausKatalog) : "",
    muscle: ausKatalog ? muscleOf(ausKatalog.key) : ""
  } : exOf(editing);
  if (!ex) {
    editing = null;
    return exercises(mount2, head2, goHub);
  }
  const eqOpts = S.equipment.map((e) => ({ id: e.id, label: nameOf(e) }));
  const bands = ex.bands || [];
  const fehlendesGeraet = geraetTyp && !vorhanden ? geraetTyp : null;
  mount2.innerHTML = head2() + backBar(editing === "new" ? t("ex.add") : nameOf(ex)) + field(t("ex.name"), textIn("f-name", editing === "new" ? ex.name || "" : nameOf(ex))) + (fehlendesGeraet ? '<p class="intro">' + esc(t("ex.needsEquip", { name: catName(fehlendesGeraet) })) + '</p><label class="chk"><input type="checkbox" id="f-addeq" checked><span>' + esc(t("ex.addEquipToo")) + "</span></label>" : "") + field(t("ex.equip"), selectIn("f-equip", eqOpts, ex.equip)) + field(t("ex.muscle"), selectIn("f-muscle", muscleOptions(), ex.muscle || "")) + field(
    t("ex.bands"),
    '<span class="two">' + numIn("f-b1", bands[0] == null ? "" : bands[0], "0.5", 0) + numIn("f-b2", bands[1] == null ? "" : bands[1], "0.5", 0) + "</span>",
    t("ex.bandsSub")
  ) + '<button class="set-btn" id="save">' + esc(t("common.save")) + "</button>" + (editing === "new" ? "" : exerciseStats(editing));
  wireBack(rerender2);
  byId("save").addEventListener("click", () => {
    const name = val("f-name");
    if (!name) {
      toast(t("common.nameMissing"), true);
      return;
    }
    const b1 = parseFloat(val("f-b1")), b2 = parseFloat(val("f-b2"));
    let equip = byId("f-equip").value;
    const mitAnlegen = byId("f-addeq");
    if (fehlendesGeraet && mitAnlegen && mitAnlegen.checked) {
      const daten = { name: catName(fehlendesGeraet), kind: fehlendesGeraet.kind };
      if (fehlendesGeraet.kind === "plates") daten.plate = S.pw;
      if (fehlendesGeraet.kind === "weight") daten.step = fehlendesGeraet.step || 2.5;
      equip = addEquipment(daten).id;
    }
    const data2 = { name, equip, muscle: byId("f-muscle").value || void 0 };
    data2.bands = isFinite(b1) && isFinite(b2) ? [b1, b2] : void 0;
    if (editing === "new") addExercise(data2);
    else updateExercise(editing, data2);
    editing = null;
    pickedEx = null;
  });
}
function exerciseStats(exId) {
  const best = personalRecord(exId);
  const verlauf2 = exerciseHistory(exId, 12);
  if (!best && !verlauf2.length) return "";
  const hoch = Math.max(1, ...verlauf2.map((v) => v.weight || 0));
  const balken = verlauf2.map((v) => '<div class="bar-col" title="' + esc(v.date) + '"><div class="bar-v full" style="height:' + Math.max(4, Math.round(v.weight / hoch * 100)) + '%"></div></div>').join("");
  const zeilen = verlauf2.slice(-6).reverse().map((v) => '<div class="dt-row"><span class="dt-m">' + esc(v.date.slice(5).replace("-", ".")) + '</span><span class="dt-n">' + esc((v.reps || []).filter((r) => r > 0).join("/") || "\u2014") + '</span><span class="dt-w">' + esc(weightText(exId, v.weight)) + "</span></div>").join("");
  return '<h3 class="sec">' + esc(t("set.history")) + "</h3>" + (best ? '<p class="intro">' + esc(t("set.record", { text: recordText(exId, best) })) + "</p>" : "") + (verlauf2.length ? '<div class="bars">' + balken + "</div>" + zeilen : '<p class="fld-h">' + esc(t("set.noHistory")) + "</p>");
}
function plans(mount2, head2, goHub, openPlanner) {
  if (editing) return planForm(mount2, head2, goHub);
  const rows = S.plans.map((p) => '<div class="lst"><div class="lst-m"><div class="lst-n"><span class="tag">' + esc(p.short || "?") + "</span> " + esc(nameOf(p)) + aiMark(p) + '</div><div class="lst-s">' + esc(focusOf(p) || "\u2014") + " \xB7 " + p.items.length + '</div></div><div class="row-act"><button class="mini" data-up="' + p.id + '" aria-label="' + esc(t("plan.moveUp")) + '">\u2191</button><button class="mini" data-down="' + p.id + '" aria-label="' + esc(t("plan.moveDown")) + '">\u2193</button><button class="mini" data-copy="' + p.id + '">' + esc(t("plan.copy")) + '</button><button class="mini" data-edit="' + p.id + '">' + esc(t("common.edit")) + '</button><button class="mini warn" data-del="' + p.id + '">' + esc(t("common.delete")) + "</button></div></div>").join("");
  const verbunden = !!(S.ai.keys[S.ai.provider] || "").trim();
  mount2.innerHTML = head2() + backBar(t("pl.title")) + '<p class="intro">' + esc(t("pl.intro")) + "</p>" + rows + (S.plans.some((p) => p.src === "ai") ? '<p class="fld-h">\u2726 ' + esc(t("ex.legend")) + "</p>" : "") + '<button class="set-btn" id="add">+ ' + esc(t("pl.add")) + '</button><button class="nav-row" id="ai"><span class="nav-n">\u2726 ' + esc(t("pl.aiCreate")) + '</span><span class="nav-s">' + esc(verbunden ? t("pl.aiCreateSub") : t("pl.aiNeedsKey")) + '</span><span class="nav-c">\u203A</span></button>';
  wireBack(goHub);
  byId("ai").addEventListener("click", () => {
    if (!verbunden) {
      toast(t("pl.aiNeedsKey"), true);
      return;
    }
    openPlanner();
  });
  byId("add").addEventListener("click", () => {
    const p = addPlan({ name: t("common.new"), focus: "" });
    editing = p.id;
  });
  on("[data-copy]", (ev) => {
    duplicatePlan(ev.currentTarget.dataset.copy);
    toast(t("plan.copied"));
  });
  on("[data-up]", (ev) => movePlan(ev.currentTarget.dataset.up, -1));
  on("[data-down]", (ev) => movePlan(ev.currentTarget.dataset.down, 1));
  on("[data-edit]", (ev) => {
    editing = ev.currentTarget.dataset.edit;
    rerender2();
  });
  on("[data-del]", (ev) => {
    const p = planOf(ev.currentTarget.dataset.del);
    if (!p) return;
    if (!confirmBox(t("common.deleteAsk", { name: nameOf(p) }))) return;
    undoable(deletePlan(p.id));
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
  wireBack(rerender2);
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

// src/js/views/home.js
var rerender3 = () => document.dispatchEvent(new CustomEvent("rerender"));
var busy = false;
var draft = "";
function reset() {
  busy = false;
}
var connected = () => !!(S.ai.keys[S.ai.provider] || "").trim();
function stats() {
  const done = weekCount(), ziel = weekTarget();
  const wochen = lastWeeks(8);
  const hoch = Math.max(4, ...wochen.map((w) => w.done));
  const balken = wochen.map((w) => '<div class="bar-col" title="' + esc(w.start) + '"><div class="bar-v' + (w.done >= w.target ? " full" : "") + '" style="height:' + Math.round(w.done / hoch * 100) + '%"></div></div>').join("");
  const letzte = lastSessions(1)[0];
  const datum2 = letzte ? new Date(letzte.date.split("-")[0], letzte.date.split("-")[1] - 1, letzte.date.split("-")[2]).toLocaleDateString(locale(), { day: "numeric", month: "long" }) : null;
  return '<h3 class="sec first">' + esc(t("home.stats")) + '</h3><div class="stat-row"><div class="stat"><b>' + done + "/" + ziel + "</b>" + esc(t("home.thisWeek")) + '</div><div class="stat"><b>' + weekStreak() + "</b>" + esc(t("home.streak")) + '</div><div class="stat"><b>' + totalSessions() + "</b>" + esc(t("home.total")) + '</div></div><div class="bars" aria-hidden="true">' + balken + '</div><p class="intro">' + esc(t("home.lastWeeks")) + " \xB7 " + esc(letzte ? t("home.last", { plan: nameOf(letzte.plan), date: datum2 }) : t("home.never")) + "</p>";
}
function muscles() {
  const zaehler = /* @__PURE__ */ new Map();
  Object.values(S.log).forEach((e) => {
    if (!e || !e.done || !e.t) return;
    Object.keys(e.t).forEach((exId) => {
      if (!e.t[exId]) return;
      const ex = exOf(exId);
      const gruppe = ex && ex.muscle;
      if (!gruppe) return;
      zaehler.set(gruppe, (zaehler.get(gruppe) || 0) + 1);
    });
  });
  if (!zaehler.size) return "";
  const hoch = Math.max(...zaehler.values());
  const zeilen = [...zaehler.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => '<div class="mus"><span class="mus-n">' + esc(muscleLabel(id)) + '</span><span class="mus-b"><i style="width:' + Math.round(n / hoch * 100) + '%"></i></span><span class="mus-c">' + n + "</span></div>").join("");
  return '<h3 class="sec">' + esc(t("stats.muscles")) + "</h3>" + zeilen;
}
function plans2() {
  if (!S.plans.length) return '<p class="intro">' + esc(t("home.noPlans")) + "</p>";
  const sug = suggested();
  const counts = perPlanCounts();
  return S.plans.map((p) => '<button class="nav-row' + (p.id === sug ? " due" : "") + '" data-start="' + esc(p.id) + '"><span class="nav-n"><span class="tag">' + esc(p.short || "?") + "</span> " + esc(nameOf(p)) + (p.src === "ai" ? ' <span class="ai-mark" title="' + esc(t("ex.aiMade")) + '">\u2726</span>' : "") + '</span><span class="nav-s">' + esc(focusOf(p) || "\u2014") + " \xB7 " + (counts.get(p.id) || 0) + '\xD7</span><span class="nav-c">\u203A</span></button>').join("");
}
function coach() {
  if (!connected()) {
    return '<h3 class="sec">' + esc(t("home.coach")) + '</h3><p class="intro">' + esc(t("home.coachOff")) + "</p>";
  }
  const verlauf2 = S.chat.length ? '<div class="chat">' + S.chat.map((m) => '<div class="msg ' + (m.role === "coach" ? "from-coach" : "from-me") + '"><div class="msg-w">' + esc(m.role === "coach" ? t("home.coach") : t("home.you")) + '</div><div class="msg-t">' + esc(m.text) + "</div></div>").join("") + "</div>" : '<p class="intro">' + esc(t("home.coachSub")) + "</p>";
  return '<h3 class="sec">' + esc(t("home.coach")) + "</h3>" + verlauf2 + (busy ? '<p class="intro">' + esc(t("home.thinking")) + "</p>" : "") + '<div class="add-row"><input class="in" id="c-msg" type="text" autocomplete="off" placeholder="' + esc(t("home.ask")) + '" value="' + esc(draft) + '"' + (busy ? " disabled" : "") + '><button class="mini" id="c-send"' + (busy ? " disabled" : "") + ">" + esc(t("home.send")) + '</button></div><p class="fld-h">' + esc(t("home.costHint")) + "</p>" + (S.chat.length ? '<button class="mini" id="c-clear">' + esc(t("home.clearChat")) + "</button>" : "");
}
function context() {
  const geraete = S.equipment.map((e) => nameOf(e)).join(", ");
  const plaene = S.plans.map(
    (p) => nameOf(p) + " (" + p.items.map((i) => nameOf(exOf(i.ex)) + " " + (i.reps || "")).join("; ") + ")"
  ).join(" | ");
  const letzte = lastSessions(8).map((s2) => s2.date + " " + nameOf(s2.plan)).join(", ");
  return [
    "Equipment: " + (geraete || "none"),
    "Plans: " + (plaene || "none"),
    "Recent sessions: " + (letzte || "none"),
    "This week: " + weekCount() + " of " + weekTarget() + " sessions."
  ].join("\n");
}
async function send() {
  const text = val("c-msg");
  if (!text) return;
  draft = "";
  busy = true;
  await addChat("me", text);
  try {
    const mod = await import("./part-UPYRCQPA.js");
    const antwort = await mod.chat({
      provider: S.ai.provider,
      key: (S.ai.keys[S.ai.provider] || "").trim(),
      model: S.ai.model || providerOf(S.ai.provider).defaultModel,
      context: context(),
      messages: S.chat
    });
    busy = false;
    await addChat("coach", antwort);
  } catch (e) {
    busy = false;
    showAiError(e, S.ai.provider);
    rerender3();
  }
}
function render(head2, mount2) {
  mount2.innerHTML = head2() + stats() + muscles() + '<h3 class="sec">' + esc(t("home.pickPlan")) + '</h3><p class="intro">' + esc(t("home.pickPlanSub")) + "</p>" + plans2() + coach();
  on("[data-start]", (ev) => {
    selectPlan(ev.currentTarget.dataset.start);
    document.dispatchEvent(new CustomEvent("goview", { detail: "plan" }));
  });
  const feld = byId("c-msg");
  if (feld) {
    feld.addEventListener("input", () => {
      draft = feld.value;
    });
    feld.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") send();
    });
    byId("c-send").addEventListener("click", send);
    const chat = document.querySelector(".chat");
    if (chat) chat.scrollTop = chat.scrollHeight;
  }
  const clear = byId("c-clear");
  if (clear) clear.addEventListener("click", () => {
    if (confirmBox(t("home.clearChatAsk"))) clearChat();
  });
}

// src/js/views/plan.js
var plan_exports = {};
__export(plan_exports, {
  render: () => render2
});

// src/js/rest.js
var rest = 0;
var timer = null;
var el = null;
function ton() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(1e-4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.45);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    setTimeout(() => ctx.close(), 800);
  } catch (e) {
  }
}
function fertig() {
  stop();
  ton();
  try {
    Haptics.impact({ style: ImpactStyle.Medium });
  } catch (e) {
  }
}
function zeichne() {
  if (!el) {
    el = document.createElement("div");
    el.className = "rest";
    document.body.appendChild(el);
    document.body.classList.add("resting");
  }
  const m = Math.floor(rest / 60), s2 = rest % 60;
  el.innerHTML = '<div class="rest-t">' + m + ":" + String(s2).padStart(2, "0") + '</div><div class="rest-l">' + esc(t("rest.running")) + '</div><button class="mini" data-rest="30">+30 s</button><button class="mini" data-rest="skip">' + esc(t("rest.skip")) + "</button>";
  el.querySelectorAll("[data-rest]").forEach((b) => {
    b.addEventListener("click", () => {
      if (b.dataset.rest === "skip") stop();
      else {
        rest += 30;
        zeichne();
      }
    });
  });
}
function start(seconds) {
  stop();
  rest = Math.max(5, seconds || 90);
  zeichne();
  timer = setInterval(() => {
    rest--;
    if (rest <= 0) fertig();
    else zeichne();
  }, 1e3);
}
function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  rest = 0;
  if (el) {
    el.remove();
    el = null;
  }
  document.body.classList.remove("resting");
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
  const letzte = lastPerformance(item.ex);
  const best = personalRecord(item.ex);
  const heute = S.kg[item.ex] || 0;
  const rekord = best && !w.body && heute > best.weight;
  const letzteZeile = letzte ? t("set.last", { text: performanceText(item.ex, letzte) || "\u2014" }) : "";
  const right = w.body ? '<div class="tp-bw">' + esc(w.sub) + "</div>" : '<div class="tp-kg"><button data-kg="' + item.ex + '" data-dir="-1" aria-label="' + esc(t("plan.less")) + '">\u2212</button><div class="val">' + esc(w.main) + "<small> " + esc(w.unit) + '</small><div class="sub"><i class="dot ' + (bd || "n") + '"></i>' + esc(w.sub) + '</div></div><button data-kg="' + item.ex + '" data-dir="1" aria-label="' + esc(t("plan.more")) + '">+</button></div>';
  return '<div class="tp-ex' + (ok ? " ok" : "") + (n > 0 && !ok ? " part" : "") + '"><button class="tp-box" data-sets="' + item.ex + '" aria-label="' + esc(t("set.title", { name: nameOf(ex) })) + '">' + (ok ? "\u2713" : n + "<em>/" + goal + "</em>") + '</button><div class="tp-mid" data-ex="' + item.ex + '" role="button" tabindex="0" aria-label="' + esc(nameOf(ex)) + ", " + esc(t("plan.sets", { done: n, total: goal })) + '"><div class="nm">' + esc(nameOf(ex)) + (rekord ? ' <span class="ai-mark" title="' + esc(t("set.newRecord")) + '">\u2605</span>' : "") + '</div><div class="rp">' + esc(item.reps || "") + (item.side ? " " + esc(sideLabel(item.side)) : "") + "</div>" + (letzteZeile ? '<div class="last">' + esc(letzteZeile) + "</div>" : "") + (hint ? '<div class="hint">' + esc(hint) + "</div>" : "") + "</div>" + right + "</div>";
}
function render2(head2, mount2) {
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
  const dauer = e.done ? durationMinutes(e) : e.start ? Math.max(1, Math.round((Date.now() - e.start) / 6e4)) : null;
  mount2.innerHTML = head2() + weekStrip() + '<div class="tp-count"><b>' + esc(t("plan.weekCount", { done: weekCount(), target: weekTarget() })) + "</b>" + esc(t("plan.weekCountRest")) + (night ? esc(t("plan.nightHint")) : "") + '</div><div class="tp-shift' + (night ? " on" : "") + '"><div><div class="lbl">' + esc(t("plan.nightTitle")) + '</div><div class="sub">' + esc(t("plan.nightSub")) + '</div></div><button class="tp-toggle" id="nt" role="switch" aria-checked="' + night + '" aria-label="' + esc(t("plan.nightTitle")) + '"><span></span></button></div><div class="tp-pick">' + pick + '</div><div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + esc(plan.short || "") + '</div><div><div class="nm">' + esc(nameOf(plan)) + '</div><div class="fo">' + esc(focusOf(plan)) + (dauer ? " \xB7 " + esc(e.done ? t("dur.minutes", { n: dauer }) : t("dur.running", { n: dauer })) : "") + "</div></div></div>" + rows + '<div class="tp-key"><span><i class="dot g"></i>' + esc(t("plan.light")) + '</span><span><i class="dot y"></i>' + esc(t("plan.medium")) + '</span><span><i class="dot r"></i>' + esc(t("plan.heavy")) + '</span></div><button class="tp-finish' + (e.done ? " undo" : "") + '" id="fin"' + (!hasAnySet() && !e.done ? " disabled" : "") + ">" + esc(e.done ? t("plan.undo") : t("plan.finish")) + '</button></div></div><label class="fld"><span class="fld-l">' + esc(t("note.title")) + '</span><textarea class="in" id="f-note" rows="2" placeholder="' + esc(t("note.hint")) + '">' + esc(e.n || "") + "</textarea></label>" + (lastError() ? '<div class="tp-err">' + esc(lastError()) + "</div>" : "") + '<div class="tp-note">' + esc(t("plan.note")) + "</div>";
  byId("nt").addEventListener("click", () => toggleNight());
  byId("fin").addEventListener("click", () => {
    haptic("medium");
    stop();
    finish();
  });
  byId("f-note").addEventListener("change", (ev) => setNote(ev.target.value));
  on("[data-pick]", (ev) => selectPlan(ev.currentTarget.dataset.pick));
  on("[data-sets]", (ev) => {
    const id = ev.currentTarget.dataset.sets;
    openSets(id, plan.items.find((i) => i.ex === id));
  });
  on("[data-kg]", (ev) => {
    ev.stopPropagation();
    bumpWeight(ev.currentTarget.dataset.kg, parseInt(ev.currentTarget.dataset.dir, 10));
  });
  on("[data-ex]", (ev) => tick(ev.currentTarget.dataset.ex));
  on("[data-ex]", (ev) => {
    if (ev.key === " " || ev.key === "Enter") {
      ev.preventDefault();
      tick(ev.currentTarget.dataset.ex);
    }
  }, "keydown");
}
function tick(exId) {
  const fertig3 = toggleExercise(exId);
  if (fertig3) haptic("light");
  const e = entry();
  if (S.prefs.restOn && setsDone(e, { ex: exId, sets: 99 }) > 0) {
    start(S.prefs.restSec);
  }
}

// src/js/views/log.js
var log_exports = {};
__export(log_exports, {
  render: () => render3,
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
function render3(head2, mount2) {
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
  render: () => render8,
  resetSub: () => resetSub
});

// node_modules/@capacitor/clipboard/dist/esm/web.js
var ClipboardWeb = class extends WebPlugin {
  async write(options) {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      throw this.unavailable("Clipboard API not available in this browser");
    }
    if (options.string !== void 0) {
      await this.writeText(options.string);
    } else if (options.url) {
      await this.writeText(options.url);
    } else if (options.image) {
      if (typeof ClipboardItem !== "undefined") {
        try {
          const blob = await (await fetch(options.image)).blob();
          const clipboardItemInput = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([clipboardItemInput]);
        } catch (err) {
          throw new Error("Failed to write image");
        }
      } else {
        throw this.unavailable("Writing images to the clipboard is not supported in this browser");
      }
    } else {
      throw new Error("Nothing to write");
    }
  }
  async read() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      throw this.unavailable("Clipboard API not available in this browser");
    }
    if (typeof ClipboardItem !== "undefined") {
      try {
        const clipboardItems = await navigator.clipboard.read();
        const type = clipboardItems[0].types[0];
        const clipboardBlob = await clipboardItems[0].getType(type);
        const data2 = await this._getBlobData(clipboardBlob, type);
        return { value: data2, type };
      } catch (err) {
        return this.readText();
      }
    } else {
      return this.readText();
    }
  }
  async readText() {
    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.readText) {
      throw this.unavailable("Reading from clipboard not supported in this browser");
    }
    const text = await navigator.clipboard.readText();
    return { value: text, type: "text/plain" };
  }
  async writeText(text) {
    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.writeText) {
      throw this.unavailable("Writting to clipboard not supported in this browser");
    }
    await navigator.clipboard.writeText(text);
  }
  _getBlobData(clipboardBlob, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (type.includes("image")) {
        reader.readAsDataURL(clipboardBlob);
      } else {
        reader.readAsText(clipboardBlob);
      }
      reader.onloadend = () => {
        const r = reader.result;
        resolve(r);
      };
      reader.onerror = (e) => {
        reject(e);
      };
    });
  }
};

// node_modules/@capacitor/clipboard/dist/esm/index.js
var Clipboard = registerPlugin("Clipboard", {
  web: () => new ClipboardWeb()
});

// src/js/views/aiview.js
var rerender4 = () => document.dispatchEvent(new CustomEvent("rerender"));
var verifying = false;
var connecting = false;
var models = [];
function reset2() {
  verifying = false;
  connecting = false;
}
var keyOf = () => (S.ai.keys[S.ai.provider] || "").trim();
var verifiedAt = () => (S.ai.verified || {})[S.ai.provider] || 0;
function connectionBlock(prov) {
  const key = keyOf();
  const when = verifiedAt();
  if (!key) {
    return '<div class="conn"><div class="conn-s bad">\u25CF ' + esc(t("ai.notConnected")) + '</div><p class="intro">' + esc(t("ai.noOauth", { host: prov.keyHost })) + '</p><button class="set-btn go" id="connect">' + esc(t("ai.connect")) + "</button>" + (connecting ? steps(prov) : "") + help() + "</div>";
  }
  return '<div class="conn"><div class="conn-s' + (when ? " ok" : "") + '">\u25CF ' + esc(when ? t("ai.connectedAt", { date: new Date(when).toLocaleDateString(locale()) }) : t("ai.connectedUnchecked")) + '</div><div class="conn-k">' + esc(mask(key)) + '</div><div class="row-act"><button class="mini" id="verify"' + (verifying ? " disabled" : "") + ">" + esc(verifying ? t("ai.verifying") : t("ai.verify")) + '</button><button class="mini" id="connect">' + esc(t("ai.replaceKey")) + '</button><button class="mini warn" id="disconnect">' + esc(t("ai.disconnect")) + "</button></div>" + (connecting ? steps(prov) : "") + help() + "</div>";
}
function help() {
  const part = (n) => "<h4>" + esc(t("ai.helpH" + n)) + "</h4><p>" + esc(t("ai.helpP" + n)) + "</p>";
  return '<details class="help"><summary>' + esc(t("ai.helpOpen")) + "</summary>" + [1, 2, 3, 4, 5, 6].map(part).join("") + "</details>";
}
function steps(prov) {
  return '<ol class="steps"><li>' + esc(t("ai.step1", { host: prov.keyHost })) + "</li><li>" + esc(t("ai.step2")) + "</li><li>" + esc(t("ai.step3")) + '</li></ol><button class="set-btn go" id="paste">' + esc(t("ai.paste")) + "</button>" + field(t("ai.orType"), '<input class="in" id="f-key" type="password" autocomplete="off" value="">') + '<button class="set-btn" id="savekey">' + esc(t("common.save")) + "</button>";
}
function mask(key) {
  if (key.length <= 12) return "\u2022\u2022\u2022\u2022";
  return key.slice(0, 7) + "\u2026" + key.slice(-4);
}
async function useKey(raw, prov) {
  const key = (raw || "").trim();
  if (!key) {
    toast(t("ai.pasteEmpty"), true);
    return;
  }
  if (!key.startsWith(prov.keyPrefix)) {
    if (!confirmBox(t("ai.keyLooksWrong", { prefix: prov.keyPrefix }))) return;
  }
  S.ai.keys[S.ai.provider] = key;
  S.ai.verified = S.ai.verified || {};
  delete S.ai.verified[S.ai.provider];
  connecting = false;
  await touch();
  runVerify();
}
async function runVerify() {
  const key = keyOf();
  if (!key) {
    toast(t("ai.needKey"), true);
    return;
  }
  verifying = true;
  rerender4();
  try {
    const mod = await import("./part-UPYRCQPA.js");
    models = await mod.listModels(S.ai.provider, key);
    S.ai.verified = S.ai.verified || {};
    S.ai.verified[S.ai.provider] = Date.now();
    if (models.length && !models.some((m) => m.id === S.ai.model)) S.ai.model = models[0].id;
    verifying = false;
    await touch();
    toast(t("ai.verifyOk", { n: models.length }));
  } catch (e) {
    verifying = false;
    showAiError(e, S.ai.provider);
    rerender4();
  }
}
function render4(mount2, head2, backBar3, goHub, goManual) {
  const prov = providerOf(S.ai.provider);
  const connected2 = !!keyOf();
  const modelOpts = models.length ? models.map((m) => ({ id: m.id, label: m.label })) : [{ id: S.ai.model || prov.defaultModel, label: S.ai.model || prov.defaultModel }];
  mount2.innerHTML = head2() + backBar3(t("ai.title")) + '<p class="intro">' + esc(t("ai.intro")) + "</p>" + (isNative() ? "" : '<p class="intro">' + esc(t("ai.webKeyNote")) + "</p>") + field(t("ai.provider"), selectIn("f-prov", PROVIDERS.map((p) => ({ id: p.id, label: p.label })), S.ai.provider)) + connectionBlock(prov) + (connected2 ? field(
    t("ai.model"),
    '<span class="two">' + selectIn("f-model", modelOpts, S.ai.model || prov.defaultModel) + textIn("f-modelfree", S.ai.model || prov.defaultModel) + "</span>"
  ) : "") + // Der Weg ohne eigenen Zugang - erreichbar, ob verbunden oder nicht.
  '<h3 class="sec">' + esc(t("man.section")) + '</h3><p class="intro">' + esc(t("man.sectionSub")) + '</p><button class="set-btn' + (connected2 ? "" : " go") + '" id="manual">' + esc(t("man.button")) + "</button>";
  byId("manual").addEventListener("click", goManual);
  byId("back").addEventListener("click", goHub);
  byId("f-prov").addEventListener("change", (ev) => {
    models = [];
    connecting = false;
    S.ai.provider = ev.target.value;
    S.ai.model = providerOf(ev.target.value).defaultModel;
    touch();
  });
  const connect = byId("connect");
  if (connect) connect.addEventListener("click", async () => {
    connecting = true;
    rerender4();
    try {
      await Browser.open({ url: prov.keyUrl });
    } catch (e) {
      window.open(prov.keyUrl, "_blank");
    }
  });
  const paste = byId("paste");
  if (paste) paste.addEventListener("click", async () => {
    try {
      const { value } = await Clipboard.read();
      await useKey(value, prov);
    } catch (e) {
      toast(t("ai.clipboardFailed"), true);
    }
  });
  const savekey = byId("savekey");
  if (savekey) savekey.addEventListener("click", () => useKey(val("f-key"), prov));
  const verify = byId("verify");
  if (verify) verify.addEventListener("click", runVerify);
  const disconnect = byId("disconnect");
  if (disconnect) disconnect.addEventListener("click", async () => {
    if (!confirmBox(t("ai.disconnectAsk"))) return;
    S.ai.keys[S.ai.provider] = "";
    if (S.ai.verified) delete S.ai.verified[S.ai.provider];
    models = [];
    await touch();
    toast(t("ai.disconnected"));
  });
  if (!connected2) return;
  byId("f-model").addEventListener("change", (ev) => {
    byId("f-modelfree").value = ev.target.value;
    S.ai.model = ev.target.value;
    touch();
  });
  byId("f-modelfree").addEventListener("change", (ev) => {
    S.ai.model = ev.target.value.trim();
    touch();
  });
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
var rerender5 = () => document.dispatchEvent(new CustomEvent("rerender"));
var state = "idle";
var latest = null;
var installed = null;
var percent = 0;
var apkPath = null;
function reset3() {
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
function render5(mount2, head2, backBar3, goHub) {
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
  rerender5();
  try {
    const res = await check();
    installed = res.cur;
    latest = res.latest;
    state = res.newer ? "found" : "current";
  } catch (e) {
    state = "idle";
    toast(t("upd.failed", { msg: e.message }), true);
  }
  rerender5();
}
async function runDownload() {
  state = "loading";
  percent = 0;
  rerender5();
  try {
    await cleanup(latest.apk);
    apkPath = await download(latest, (p) => {
      if (p !== percent) {
        percent = p;
        rerender5();
      }
    });
    state = "ready";
  } catch (e) {
    state = "found";
    toast(t("upd.failed", { msg: e.message }), true);
  }
  rerender5();
}
async function runInstall() {
  try {
    const ok = await install(apkPath);
    if (!ok) toast(t("upd.needPermission"), true);
  } catch (e) {
    toast(t("upd.failed", { msg: e.message }), true);
  }
}

// src/js/views/planform.js
var goalOptions = () => [
  { id: "strength", label: t("ai.goalStrength") },
  { id: "muscle", label: t("ai.goalMuscle") },
  { id: "fitness", label: t("ai.goalFitness") },
  { id: "lose", label: t("ai.goalLose") }
];
var levelOptions = () => [
  { id: "new", label: t("ai.levelNew") },
  { id: "some", label: t("ai.levelSome") },
  { id: "pro", label: t("ai.levelPro") }
];
var kindLabel = (eq) => eq.kind === "plates" ? t("equip.kindPlates") : eq.kind === "weight" ? t("equip.kindWeight") : t("equip.kindBody");
var emptyForm = () => ({ goal: "muscle", days: 3, level: "some", notes: "" });
function formFields(form3) {
  return field(t("ai.goal"), selectIn("f-goal", goalOptions(), form3.goal)) + field(t("ai.days"), '<input class="in" id="f-days" type="number" min="1" max="7" value="' + form3.days + '">') + field(t("ai.level"), selectIn("f-level", levelOptions(), form3.level)) + field(t("ai.notes"), textIn("f-notes", form3.notes));
}
function readForm(form3) {
  if (!byId("f-goal")) return form3;
  return {
    goal: byId("f-goal").value,
    days: parseInt(byId("f-days").value, 10) || 3,
    level: byId("f-level").value,
    notes: val("f-notes")
  };
}
function equipListHtml() {
  return '<h3 class="sec">' + esc(t("ai.equipUsed")) + '</h3><ul class="plain">' + S.equipment.map((e) => "<li>" + esc(nameOf(e)) + ' <span class="lst-s">\u2014 ' + esc(kindLabel(e)) + "</span></li>").join("") + "</ul>";
}
function askOptions(form3) {
  return {
    goal: goalOptions().find((o) => o.id === form3.goal).label,
    level: levelOptions().find((o) => o.id === form3.level).label,
    days: form3.days,
    notes: form3.notes,
    equipment: S.equipment.map((e) => ({ id: e.id, name: nameOf(e), kindLabel: kindLabel(e) }))
  };
}
function resultHtml(result3) {
  const neue = (result3.exercises || []).map((e) => "<li>" + esc(e.name) + ' <span class="lst-s">\u2014 ' + esc(nameOf(equipOf(e.equipment))) + "</span></li>").join("");
  const plaene = (result3.plans || []).map((p) => '<div class="tp-card"><div class="tp-card-in"><div class="tp-title"><div class="big">' + esc((p.name || "?").slice(0, 1)) + '</div><div><div class="nm">' + esc(p.name || "") + '</div><div class="fo">' + esc(p.focus || "") + "</div></div></div>" + (p.items || []).map((i) => '<div class="dt-row"><span class="dt-m">' + (i.sets || 3) + '\xD7</span><span class="dt-n">' + esc(i.exercise) + '</span><span class="dt-w">' + esc(i.reps || "") + "</span></div>").join("") + "</div></div>").join("");
  return '<h3 class="sec">' + esc(t("ai.result")) + "</h3>" + plaene + (neue ? '<p class="intro">' + esc(t("ai.newExercises", { n: (result3.exercises || []).length })) + '</p><ul class="plain">' + neue + "</ul>" : "");
}

// src/js/views/planner.js
var rerender6 = () => document.dispatchEvent(new CustomEvent("rerender"));
var busy2 = false;
var result = null;
var form = emptyForm();
function reset4() {
  busy2 = false;
  result = null;
}
function render6(mount2, head2, backBar3, goBack, goManual) {
  const connected2 = !!(S.ai.keys[S.ai.provider] || "").trim();
  mount2.innerHTML = head2() + backBar3(t("pl.aiTitle")) + '<p class="intro">' + esc(t("ai.intro")) + "</p>" + (connected2 ? "" : '<p class="intro">' + esc(t("man.plannerOffline")) + "</p>") + equipListHtml() + formFields(form) + '<button class="set-btn' + (busy2 || !connected2 ? "" : " go") + '" id="gen"' + (busy2 ? " disabled" : "") + ">" + esc(busy2 ? t("ai.working") : t("ai.generate")) + '</button><button class="set-btn' + (connected2 ? "" : " go") + '" id="manual">' + esc(t("man.button")) + "</button>" + (result ? resultHtml(result) + '<button class="set-btn go" id="accept">' + esc(t("ai.accept")) + '</button><button class="set-btn" id="discard">' + esc(t("ai.discard")) + "</button>" : "");
  byId("back").addEventListener("click", goBack);
  byId("manual").addEventListener("click", () => {
    form = readForm(form);
    goManual(form);
  });
  byId("gen").addEventListener("click", async () => {
    form = readForm(form);
    if (!S.equipment.length) {
      toast(t("ai.needEquip"), true);
      return;
    }
    busy2 = true;
    result = null;
    rerender6();
    try {
      const mod = await import("./part-UPYRCQPA.js");
      result = await mod.generatePlan(Object.assign({
        provider: S.ai.provider,
        key: (S.ai.keys[S.ai.provider] || "").trim(),
        model: S.ai.model || providerOf(S.ai.provider).defaultModel
      }, askOptions(form)));
    } catch (e) {
      showAiError(e, S.ai.provider);
    }
    busy2 = false;
    rerender6();
  });
  if (result) {
    byId("accept").addEventListener("click", () => {
      const n = applyGenerated(result);
      result = null;
      toast(t("ai.accepted") + (n ? " " + t("ai.newExercises", { n }) : ""));
      goBack();
    });
    byId("discard").addEventListener("click", () => {
      result = null;
      rerender6();
    });
  }
  on("#f-goal, #f-days, #f-level, #f-notes", () => {
    form = readForm(form);
  }, "change");
}

// src/js/views/manual.js
var rerender7 = () => document.dispatchEvent(new CustomEvent("rerender"));
var form2 = emptyForm();
var answer = "";
var result2 = null;
function reset5() {
  answer = "";
  result2 = null;
}
function prefill(next) {
  if (next) form2 = Object.assign({}, next);
}
function promptText() {
  return manualPrompt(askOptions(form2));
}
async function copy(text) {
  try {
    await Clipboard.write({ string: text });
    return true;
  } catch (e) {
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
  }
  return ueberFeld(text);
}
function ueberFeld(text) {
  const feld = document.createElement("textarea");
  feld.value = text;
  feld.setAttribute("readonly", "");
  feld.style.cssText = "position:fixed;top:-1000px;opacity:0";
  document.body.appendChild(feld);
  feld.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  feld.remove();
  return ok;
}
function jsonAus(text) {
  let s2 = String(text || "").trim();
  const block = s2.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (block) s2 = block[1].trim();
  const a = s2.indexOf("{");
  const b = s2.lastIndexOf("}");
  if (a < 0 || b <= a) throw new Error("no object");
  return JSON.parse(s2.slice(a, b + 1));
}
function geraet(wert) {
  const s2 = String(wert || "").trim();
  if (equipOf(s2)) return s2;
  const low = s2.toLowerCase();
  const hit = S.equipment.find((e) => nameOf(e).toLowerCase() === low);
  if (hit) return hit.id;
  return S.equipment[0] && S.equipment[0].id || "";
}
function pruefe(roh) {
  const exercises2 = (Array.isArray(roh.exercises) ? roh.exercises : []).filter((e) => e && e.name).map((e) => ({ name: String(e.name), equipment: geraet(e.equipment), hint: e.hint ? String(e.hint) : "" }));
  const plans3 = (Array.isArray(roh.plans) ? roh.plans : []).map((p) => ({
    name: p && p.name ? String(p.name) : "",
    focus: p && p.focus ? String(p.focus) : "",
    night: !!(p && p.night),
    items: (p && Array.isArray(p.items) ? p.items : []).filter((i) => i && i.exercise).map((i) => ({
      exercise: String(i.exercise),
      reps: i.reps ? String(i.reps) : "3 \xD7 8\u201312",
      sets: parseInt(i.sets, 10) || 3
    }))
  })).filter((p) => p.items.length);
  if (!plans3.length) throw new Error("no plans");
  return { exercises: exercises2, plans: plans3 };
}
function auswerten() {
  try {
    result2 = pruefe(jsonAus(answer));
    rerender7();
  } catch (e) {
    result2 = null;
    toast(t("man.badAnswer"), true);
  }
}
function render7(mount2, head2, backBar3, goBack) {
  const text = S.equipment.length ? promptText() : "";
  mount2.innerHTML = head2() + backBar3(t("man.title")) + '<p class="intro">' + esc(t("man.intro")) + '</p><ol class="steps"><li>' + esc(t("man.step1")) + "</li><li>" + esc(t("man.step2")) + "</li><li>" + esc(t("man.step3")) + "</li><li>" + esc(t("man.step4")) + "</li></ol>" + equipListHtml() + formFields(form2) + (S.equipment.length ? '<button class="set-btn go" id="copy">' + esc(t("man.copy")) + '</button><details class="help"><summary>' + esc(t("man.show")) + '</summary><textarea class="in mono" id="f-prompt" rows="10" readonly>' + esc(text) + "</textarea></details>" : '<p class="intro">' + esc(t("ai.needEquip")) + "</p>") + '<h3 class="sec">' + esc(t("man.answerTitle")) + '</h3><p class="intro">' + esc(t("man.answerSub")) + '</p><textarea class="in mono" id="f-ans" rows="6" placeholder="' + esc(t("man.answerHint")) + '">' + esc(answer) + '</textarea><button class="set-btn" id="fromclip">' + esc(t("man.fromClipboard")) + '</button><button class="set-btn go" id="read">' + esc(t("man.read")) + "</button>" + (result2 ? resultHtml(result2) + '<button class="set-btn go" id="accept">' + esc(t("ai.accept")) + '</button><button class="set-btn" id="discard">' + esc(t("ai.discard")) + "</button>" : "");
  byId("back").addEventListener("click", goBack);
  const copyBtn = byId("copy");
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    const ok = await copy(promptText());
    toast(ok ? t("man.copied") : t("man.copyFailed"), !ok);
    if (!ok) {
      const box = document.querySelector("details.help");
      if (box) box.open = true;
      const feld = byId("f-prompt");
      if (feld) {
        feld.focus();
        feld.select();
      }
    }
  });
  byId("fromclip").addEventListener("click", async () => {
    try {
      const { value } = await Clipboard.read();
      answer = value || "";
      if (!answer.trim()) {
        toast(t("ai.pasteEmpty"), true);
        return;
      }
      auswerten();
    } catch (e) {
      toast(t("ai.clipboardFailed"), true);
    }
  });
  byId("f-ans").addEventListener("input", (ev) => {
    answer = ev.target.value;
  });
  byId("read").addEventListener("click", () => {
    answer = byId("f-ans").value;
    if (!answer.trim()) {
      toast(t("man.noAnswer"), true);
      return;
    }
    auswerten();
  });
  if (result2) {
    byId("accept").addEventListener("click", () => {
      const n = applyGenerated(result2);
      result2 = null;
      answer = "";
      toast(t("ai.accepted") + (n ? " " + t("ai.newExercises", { n }) : ""));
      goBack();
    });
    byId("discard").addEventListener("click", () => {
      result2 = null;
      rerender7();
    });
  }
  on("#f-goal, #f-days, #f-level, #f-notes", () => {
    form2 = readForm(form2);
    rerender7();
  }, "change");
}

// node_modules/@capacitor/local-notifications/dist/esm/definitions.js
var Weekday;
(function(Weekday2) {
  Weekday2[Weekday2["Sunday"] = 1] = "Sunday";
  Weekday2[Weekday2["Monday"] = 2] = "Monday";
  Weekday2[Weekday2["Tuesday"] = 3] = "Tuesday";
  Weekday2[Weekday2["Wednesday"] = 4] = "Wednesday";
  Weekday2[Weekday2["Thursday"] = 5] = "Thursday";
  Weekday2[Weekday2["Friday"] = 6] = "Friday";
  Weekday2[Weekday2["Saturday"] = 7] = "Saturday";
})(Weekday || (Weekday = {}));

// node_modules/@capacitor/local-notifications/dist/esm/index.js
var LocalNotifications = registerPlugin("LocalNotifications", {
  web: () => import("./part-3PP7HME7.js").then((m) => new m.LocalNotificationsWeb())
});

// src/js/reminder.js
var canRemind = () => Capacitor.isNativePlatform();
var toAndroidWeekday = (tag) => (tag + 1) % 7 + 1;
async function ensurePermission() {
  if (!canRemind()) return false;
  const jetzt = await LocalNotifications.checkPermissions();
  if (jetzt.display === "granted") return true;
  const gefragt = await LocalNotifications.requestPermissions();
  return gefragt.display === "granted";
}
async function clearAll() {
  if (!canRemind()) return;
  try {
    const offen = await LocalNotifications.getPending();
    const meine = (offen.notifications || []).filter((n) => n.id >= 900 && n.id < 910);
    if (meine.length) await LocalNotifications.cancel({ notifications: meine });
  } catch (e) {
  }
}
async function apply(reminder, texte) {
  if (!canRemind()) return false;
  await clearAll();
  if (!reminder.on || !reminder.days.length) return true;
  if (!await ensurePermission()) return false;
  const notifications = reminder.days.map((tag, i) => ({
    id: 900 + i,
    title: texte.title,
    body: texte.body,
    schedule: {
      on: {
        weekday: toAndroidWeekday(tag),
        hour: reminder.hour,
        minute: reminder.minute
      },
      allowWhileIdle: true
    }
  }));
  await LocalNotifications.schedule({ notifications });
  return true;
}

// src/js/views/misc.js
var rerender8 = () => document.dispatchEvent(new CustomEvent("rerender"));
function restPrefs(mount2, head2, backBar3, goHub) {
  mount2.innerHTML = head2() + backBar3(t("rest.title")) + checkIn("f-on", t("rest.on"), S.prefs.restOn) + field(t("rest.sec"), numIn("f-sec", S.prefs.restSec, "5", 5));
  byId("back").addEventListener("click", goHub);
  byId("f-on").addEventListener("change", (ev) => setPref("restOn", ev.target.checked));
  byId("f-sec").addEventListener("change", (ev) => setPref("restSec", Math.max(5, Math.min(600, parseInt(ev.target.value, 10) || 90))));
}
function bodyWeight(mount2, head2, backBar3, goHub) {
  const liste = S.body.slice().reverse();
  const werte = S.body.map((b) => b.kg);
  const hoch = Math.max(1, ...werte), tief = Math.min(...werte, hoch);
  const spanne = Math.max(0.5, hoch - tief);
  const balken = S.body.slice(-20).map((b) => '<div class="bar-col" title="' + esc(b.d) + '"><div class="bar-v full" style="height:' + Math.max(6, Math.round((b.kg - tief) / spanne * 90) + 10) + '%"></div></div>').join("");
  const zeilen = liste.slice(0, 20).map((b) => '<div class="lst"><div class="lst-m"><div class="lst-n">' + esc(num(b.kg)) + ' kg</div><div class="lst-s">' + esc(b.d.split("-").reverse().join(".")) + '</div></div><div class="row-act"><button class="mini warn" data-delbody="' + esc(b.d) + '">\xD7</button></div></div>').join("");
  const diff = S.body.length > 1 ? Math.round((S.body[S.body.length - 1].kg - S.body[0].kg) * 10) / 10 : null;
  mount2.innerHTML = head2() + backBar3(t("body.title")) + '<p class="intro">' + esc(t("body.intro")) + '</p><div class="add-row"><input class="in" id="f-kg" type="number" inputmode="decimal" step="0.1" min="1" placeholder="' + esc(t("body.value")) + '"><button class="mini" id="addbody">' + esc(t("body.add")) + "</button></div>" + (S.body.length ? '<div class="bars">' + balken + "</div>" + (diff != null ? '<p class="intro">' + esc(t("body.change", { n: (diff > 0 ? "+" : "") + num(diff) })) + "</p>" : "") + zeilen : '<p class="intro">' + esc(t("body.empty")) + "</p>");
  byId("back").addEventListener("click", goHub);
  byId("addbody").addEventListener("click", () => {
    if (addBodyWeight(val("f-kg"))) rerender8();
  });
  byId("f-kg").addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && addBodyWeight(val("f-kg"))) rerender8();
  });
  on("[data-delbody]", (ev) => removeBodyWeight(ev.currentTarget.dataset.delbody));
}
function reminders(mount2, head2, backBar3, goHub) {
  const r = S.prefs.reminder;
  if (!canRemind()) {
    mount2.innerHTML = head2() + backBar3(t("rem.title")) + '<p class="intro">' + esc(t("rem.webOnly")) + "</p>";
    byId("back").addEventListener("click", goHub);
    return;
  }
  const tage = Array.from({ length: 7 }, (_, i) => '<button class="mini' + (r.days.includes(i) ? " on" : "") + '" data-day="' + i + '">' + esc(weekdayShort(i)) + "</button>").join("");
  mount2.innerHTML = head2() + backBar3(t("rem.title")) + '<p class="intro">' + esc(t("rem.intro")) + "</p>" + checkIn("f-on", t("rem.on"), r.on) + '<label class="fld"><span class="fld-l">' + esc(t("rem.days")) + '</span><span class="days">' + tage + "</span></label>" + field(
    t("rem.time"),
    '<input class="in" id="f-time" type="time" value="' + String(r.hour).padStart(2, "0") + ":" + String(r.minute).padStart(2, "0") + '">'
  ) + '<button class="set-btn go" id="save">' + esc(t("common.save")) + "</button>";
  byId("back").addEventListener("click", goHub);
  on("[data-day]", (ev) => {
    const tag = Number(ev.currentTarget.dataset.day);
    const neu = r.days.includes(tag) ? r.days.filter((d) => d !== tag) : r.days.concat(tag).sort();
    setPref("reminder", { ...r, days: neu });
  });
  byId("save").addEventListener("click", async () => {
    const [h, m] = val("f-time").split(":").map(Number);
    const neu = { ...r, on: byId("f-on").checked, hour: h || 0, minute: m || 0 };
    setPref("reminder", neu);
    const ok = await apply(neu, {
      title: t("rem.notifyTitle"),
      body: t("rem.notifyBody")
    });
    toast(ok ? t("rem.saved") : t("rem.denied"), !ok);
  });
}
function legal(mount2, head2, backBar3, goHub) {
  mount2.innerHTML = head2() + backBar3(t("legal.title")) + '<p class="intro">' + esc(t("ob.healthText", { app: APP_NAME })) + '</p><h3 class="sec">' + esc(t("ai.helpH5")) + '</h3><p class="intro">' + esc(t("ai.helpP5")) + '</p><p class="intro">' + esc(t("legal.chat")) + "</p>";
  byId("back").addEventListener("click", goHub);
}

// src/js/views/options.js
var rerender9 = () => document.dispatchEvent(new CustomEvent("rerender"));
var sub = null;
var backups = [];
var manualFrom = "planner";
function resetSub() {
  sub = null;
  resetEditing();
  reset2();
  reset3();
  reset4();
  reset5();
}
async function refresh() {
  backups = await listBackups();
}
function go(next) {
  sub = next;
  resetEditing();
  if (next !== "ai") reset2();
  if (next !== "update") reset3();
  if (next !== "planner") reset4();
  if (next !== "manual") reset5();
  rerender9();
}
document.addEventListener("gosub", (ev) => go(ev.detail));
function backBar2(title) {
  return '<div class="sub-bar"><button class="mini" id="back">\u2039 ' + esc(t("common.back")) + "</button><h2>" + esc(title) + "</h2></div>";
}
function render8(head2, mount2) {
  const goHub = () => go(null);
  if (sub === "equipment") return equipment(mount2, head2, goHub);
  if (sub === "exercises") return exercises(mount2, head2, goHub);
  if (sub === "plans") return plans(mount2, head2, goHub, () => go("planner"));
  if (sub === "planner") return render6(mount2, head2, backBar2, () => go("plans"), (f2) => {
    prefill(f2);
    manualFrom = "planner";
    go("manual");
  });
  if (sub === "manual") return render7(mount2, head2, backBar2, () => go(manualFrom));
  if (sub === "ai") return render4(mount2, head2, backBar2, goHub, () => {
    manualFrom = "ai";
    go("manual");
  });
  if (sub === "update") return render5(mount2, head2, backBar2, goHub);
  if (sub === "lang") return language(mount2, head2, goHub);
  if (sub === "rest") return restPrefs(mount2, head2, backBar2, goHub);
  if (sub === "body") return bodyWeight(mount2, head2, backBar2, goHub);
  if (sub === "reminders") return reminders(mount2, head2, backBar2, goHub);
  if (sub === "legal") return legal(mount2, head2, backBar2, goHub);
  if (sub === "data") return data(mount2, head2, goHub);
  return hub(mount2, head2);
}
function stats2() {
  const done = Object.values(S.log).filter((e) => e && e.done);
  const first = Object.keys(S.log).sort()[0];
  return { total: done.length, first };
}
function entry2(id, title, subtitle) {
  return '<button class="nav-row" data-go="' + id + '"><span class="nav-n">' + esc(title) + '</span><span class="nav-s">' + esc(subtitle) + '</span><span class="nav-c">\u203A</span></button>';
}
function hub(mount2, head2) {
  const s2 = stats2();
  const lang = LANGS.find((l) => l.id === S.lang);
  mount2.innerHTML = head2() + backBar2(t("nav.menu")) + '<div class="set-sec"><h2>' + esc(t("opt.overview")) + '</h2><div class="set-stat"><div><b>' + s2.total + "</b>" + esc(t("opt.totalUnits")) + "</div></div>" + (s2.first ? "<p>" + esc(t("opt.firstEntry", {
    date: longDate(new Date(s2.first.split("-")[0], s2.first.split("-")[1] - 1, s2.first.split("-")[2]))
  })) + "</p>" : "") + "</div>" + entry2("ai", t("opt.ai"), t("opt.aiSub")) + entry2("lang", t("opt.language"), lang ? lang.label : S.lang) + entry2("equipment", t("opt.equipment"), t("opt.equipmentSub", { n: S.equipment.length })) + entry2("exercises", t("opt.exercises"), t("opt.exercisesSub", { n: visibleExercises().length })) + entry2("plans", t("opt.plans"), t("opt.plansSub", { n: S.plans.length })) + entry2("rest", t("rest.title"), t("rest.on")) + entry2("body", t("body.title"), t("body.sub")) + entry2("reminders", t("rem.title"), t("rem.sub")) + entry2("data", t("opt.data"), t("opt.dataSub")) + entry2("legal", t("legal.title"), t("legal.sub")) + entry2("update", t("upd.title"), t("upd.titleSub")) + '<div class="tp-note">' + esc(t("opt.about", { app: APP_NAME, version: APP_VERSION })) + "</div>";
  byId("back").addEventListener(
    "click",
    () => document.dispatchEvent(new CustomEvent("goback"))
  );
  on("[data-go]", (ev) => go(ev.currentTarget.dataset.go));
}
function language(mount2, head2, goHub) {
  mount2.innerHTML = head2() + backBar2(t("opt.language")) + '<p class="intro">' + esc(t("opt.languageSub")) + "</p>" + field(t("opt.language"), selectIn("f-lang", LANGS.map((l) => ({ id: l.id, label: l.label })), S.lang));
  byId("back").addEventListener("click", goHub);
  byId("f-lang").addEventListener("change", (ev) => setLanguage(ev.target.value));
}
function data(mount2, head2, goHub) {
  mount2.innerHTML = head2() + backBar2(t("data.title")) + '<p class="intro">' + esc(isNative() ? t("data.backupNative", { app: APP_NAME }) : t("data.backupWeb")) + '</p><button class="set-btn" id="exp">' + esc(t("data.backup")) + "</button>" + (backups.length ? '<p class="intro">' + esc(t("data.existing")) + '</p><div class="set-list">' + backups.slice(0, 12).map((b) => '<button data-imp="' + esc(b.name) + '">' + esc(b.name) + "</button>").join("") + "</div>" : "") + '<button class="set-btn" id="paste">' + esc(t("data.paste")) + '</button><h3 class="sec">' + esc(t("csv.button")) + '</h3><p class="intro">' + esc(t("csv.hint")) + '</p><button class="set-btn" id="csv">' + esc(t("csv.button")) + '</button><h3 class="sec">' + esc(t("data.reset")) + '</h3><p class="intro">' + esc(t("data.resetSub")) + '</p><button class="set-btn warn" id="wipe">' + esc(t("data.resetBtn")) + "</button>";
  byId("back").addEventListener("click", goHub);
  byId("exp").addEventListener("click", async () => {
    try {
      const r = await exportBackup(S);
      toast(t("data.saved", { name: r.name }));
      await refresh();
      rerender9();
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
  byId("csv").addEventListener("click", async () => {
    try {
      const aufloesen = (exId) => {
        const w = weightLabel(exId, 0);
        return { name: nameOf(exOf(exId)), unit: w.body ? "" : w.unit };
      };
      aufloesen.planName = (id) => nameOf(planOf(id));
      const r = await exportCsv(S, aufloesen);
      toast(t("csv.done", { name: r.name }));
    } catch (e) {
      toast(t("data.saveFailed", { msg: e.message }), true);
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

// src/js/views/onboarding.js
function pending() {
  return !S.prefs.onboarded;
}
function show() {
  dialog({
    title: t("ob.title", { app: APP_NAME }),
    html: "<p>" + esc(t("ob.p1")) + "</p><p>" + esc(t("ob.p2")) + "</p><h4>" + esc(t("ob.health")) + "</h4><p>" + esc(t("ob.healthText", { app: APP_NAME })) + "</p>",
    actions: [
      { label: t("ob.skip"), run: fertig2 },
      {
        label: t("ob.equip"),
        primary: true,
        run: () => {
          fertig2();
          document.dispatchEvent(new CustomEvent("goview", { detail: "options" }));
          setTimeout(() => document.dispatchEvent(
            new CustomEvent("gosub", { detail: "equipment" })
          ), 120);
        }
      }
    ]
  });
}
function fertig2() {
  setPref("onboarded", true);
}

// src/js/app.js
var VIEWS = { home: home_exports, plan: plan_exports, log: log_exports, options: options_exports };
var TABS = [
  ["home", "nav.home"],
  ["plan", "nav.plan"],
  ["log", "nav.log"]
];
var view = "home";
var lastTab = "home";
var mount = document.getElementById("app");
function head() {
  return '<div class="tp-head"><h1>' + esc(APP_NAME) + '</h1><div class="tp-date">' + esc(today.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" })) + '</div></div><div class="tp-nav">' + TABS.map(([v, key]) => '<button data-view="' + v + '" class="' + (v === view ? "sel" : "") + '">' + esc(t(key)) + "</button>").join("") + '<button data-view="options" class="burger' + (view === "options" ? " sel" : "") + '" aria-label="' + esc(t("nav.menu")) + '"><span></span><span></span><span></span></button></div>';
}
function render9() {
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
      render9();
    }
    if (v === "log") {
      resetSelection();
      render9();
    }
    return;
  }
  if (view !== "options") lastTab = view;
  view = v;
  if (v === "log") resetSelection();
  if (v === "home") reset();
  if (v === "options") {
    resetSub();
    await refresh();
  }
  render9();
}
document.addEventListener("rerender", render9);
document.addEventListener("goview", (ev) => setView(ev.detail));
document.addEventListener("goback", () => setView(lastTab));
onChange(render9);
async function wireNative() {
  if (!Capacitor.isNativePlatform()) return;
  await App.addListener("backButton", () => {
    if (view !== "home") setView("home");
    else App.exitApp();
  });
  await App.addListener("appStateChange", ({ isActive }) => {
    if (isActive && refreshDay()) render9();
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
  if (refreshDay()) render9();
}, 6e4);
(async function start2() {
  try {
    await init();
  } catch (e) {
    toast(t("data.loadError"), true);
  }
  await wireNative();
  wireServiceWorker();
  render9();
  if (pending()) show();
})();
