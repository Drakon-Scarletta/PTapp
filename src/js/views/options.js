// Optionen: Übersicht, Sprache, KI, Geräte, Übungen, Pläne, Daten.
import * as st from '../state.js';
import { t, LANGS, longDate } from '../i18n.js';
import { exportBackup, exportCsv, listBackups, readBackup, parseBackup, isNative, freshState, APP_NAME, APP_VERSION }
  from '../store.js';
import { esc, on, byId, toast, confirmBox, selectIn, field } from '../ui.js';
import * as editors from './editors.js';
import * as aiview from './aiview.js';
import * as updateview from './updateview.js';
import * as planner from './planner.js';
import * as manual from './manual.js';
import * as misc from './misc.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let sub = null;
let backups = [];
let manualFrom = 'planner';   // woher die Copy-und-Paste-Seite geöffnet wurde

export function resetSub() {
  sub = null;
  editors.resetEditing();
  aiview.reset();
  updateview.reset();
  planner.reset();
  manual.reset();
}

export async function refresh() {
  backups = await listBackups();
}

function go(next) {
  sub = next;
  editors.resetEditing();
  if (next !== 'ai') aiview.reset();
  if (next !== 'update') updateview.reset();
  if (next !== 'planner') planner.reset();
  if (next !== 'manual') manual.reset();
  rerender();
}

// Von außen (etwa aus der Einführung) in eine Unterseite springen.
document.addEventListener('gosub', ev => go(ev.detail));

export function backBar(title) {
  return '<div class="sub-bar"><button class="mini" id="back">‹ ' + esc(t('common.back')) + '</button>' +
    '<h2>' + esc(title) + '</h2></div>';
}

export function render(head, mount) {
  const goHub = () => go(null);
  if (sub === 'equipment') return editors.equipment(mount, head, goHub);
  if (sub === 'exercises') return editors.exercises(mount, head, goHub);
  if (sub === 'plans') return editors.plans(mount, head, goHub, () => go('planner'));
  if (sub === 'planner') return planner.render(mount, head, backBar, () => go('plans'), f => {
    manual.prefill(f);
    manualFrom = 'planner';
    go('manual');
  });
  if (sub === 'manual') return manual.render(mount, head, backBar, () => go(manualFrom));
  if (sub === 'ai') return aiview.render(mount, head, backBar, goHub, () => {
    manualFrom = 'ai';
    go('manual');
  });
  if (sub === 'update') return updateview.render(mount, head, backBar, goHub);
  if (sub === 'lang') return language(mount, head, goHub);
  if (sub === 'rest') return misc.restPrefs(mount, head, backBar, goHub);
  if (sub === 'body') return misc.bodyWeight(mount, head, backBar, goHub);
  if (sub === 'reminders') return misc.reminders(mount, head, backBar, goHub);
  if (sub === 'legal') return misc.legal(mount, head, backBar, goHub);
  if (sub === 'data') return data(mount, head, goHub);
  return hub(mount, head);
}

function stats() {
  const done = Object.values(st.S.log).filter(e => e && e.done);
  const first = Object.keys(st.S.log).sort()[0];
  return { total: done.length, first };
}

function entry(id, title, subtitle) {
  return '<button class="nav-row" data-go="' + id + '">' +
    '<span class="nav-n">' + esc(title) + '</span>' +
    '<span class="nav-s">' + esc(subtitle) + '</span>' +
    '<span class="nav-c">›</span></button>';
}

function hub(mount, head) {
  const s = stats();
  const lang = LANGS.find(l => l.id === st.S.lang);

  mount.innerHTML = head() + backBar(t('nav.menu')) +
    '<div class="set-sec"><h2>' + esc(t('opt.overview')) + '</h2>' +
      '<div class="set-stat"><div><b>' + s.total + '</b>' + esc(t('opt.totalUnits')) + '</div></div>' +
      (s.first ? '<p>' + esc(t('opt.firstEntry', {
        date: longDate(new Date(s.first.split('-')[0], s.first.split('-')[1] - 1, s.first.split('-')[2]))
      })) + '</p>' : '') +
    '</div>' +

    entry('ai', t('opt.ai'), t('opt.aiSub')) +
    entry('lang', t('opt.language'), lang ? lang.label : st.S.lang) +
    entry('equipment', t('opt.equipment'), t('opt.equipmentSub', { n: st.S.equipment.length })) +
    entry('exercises', t('opt.exercises'), t('opt.exercisesSub', { n: st.visibleExercises().length })) +
    entry('plans', t('opt.plans'), t('opt.plansSub', { n: st.S.plans.length })) +
    entry('rest', t('rest.title'), t('rest.on')) +
    entry('body', t('body.title'), t('body.sub')) +
    entry('reminders', t('rem.title'), t('rem.sub')) +
    entry('data', t('opt.data'), t('opt.dataSub')) +
    entry('legal', t('legal.title'), t('legal.sub')) +
    entry('update', t('upd.title'), t('upd.titleSub')) +

    '<div class="tp-note">' + esc(t('opt.about', { app: APP_NAME, version: APP_VERSION })) + '</div>';

  byId('back').addEventListener('click',
    () => document.dispatchEvent(new CustomEvent('goback')));
  on('[data-go]', ev => go(ev.currentTarget.dataset.go));
}

function language(mount, head, goHub) {
  mount.innerHTML = head() + backBar(t('opt.language')) +
    '<p class="intro">' + esc(t('opt.languageSub')) + '</p>' +
    field(t('opt.language'), selectIn('f-lang', LANGS.map(l => ({ id: l.id, label: l.label })), st.S.lang));

  byId('back').addEventListener('click', goHub);
  byId('f-lang').addEventListener('change', ev => st.setLanguage(ev.target.value));
}

function data(mount, head, goHub) {
  mount.innerHTML = head() + backBar(t('data.title')) +
    '<p class="intro">' + esc(isNative() ? t('data.backupNative', { app: APP_NAME }) : t('data.backupWeb')) + '</p>' +
    '<button class="set-btn" id="exp">' + esc(t('data.backup')) + '</button>' +
    (backups.length
      ? '<p class="intro">' + esc(t('data.existing')) + '</p><div class="set-list">' +
        backups.slice(0, 12).map(b => '<button data-imp="' + esc(b.name) + '">' + esc(b.name) + '</button>').join('') +
        '</div>'
      : '') +
    '<button class="set-btn" id="paste">' + esc(t('data.paste')) + '</button>' +
    '<h3 class="sec">' + esc(t('csv.button')) + '</h3>' +
    '<p class="intro">' + esc(t('csv.hint')) + '</p>' +
    '<button class="set-btn" id="csv">' + esc(t('csv.button')) + '</button>' +
    '<h3 class="sec">' + esc(t('data.reset')) + '</h3>' +
    '<p class="intro">' + esc(t('data.resetSub')) + '</p>' +
    '<button class="set-btn warn" id="wipe">' + esc(t('data.resetBtn')) + '</button>';

  byId('back').addEventListener('click', goHub);

  byId('exp').addEventListener('click', async () => {
    try {
      const r = await exportBackup(st.S);
      toast(t('data.saved', { name: r.name }));
      await refresh();
      rerender();
    } catch (e) {
      toast(t('data.saveFailed', { msg: e.message }), true);
    }
  });

  on('[data-imp]', async ev => {
    const name = ev.currentTarget.dataset.imp;
    if (!confirmBox(t('data.restoreAsk', { name }))) return;
    try {
      const daten = await readBackup(name);
      // Erst die Ansicht zurückstellen: das Übernehmen zeichnet sofort neu.
      resetSub();
      await st.replaceState(daten);
      toast(t('data.restored'));
    } catch (e) {
      toast(t('data.readFailed', { msg: e.message }), true);
    }
  });

  byId('csv').addEventListener('click', async () => {
    try {
      // Namen und Einheit je Übung liefert die App, der Speicher kennt sie nicht.
      const aufloesen = (exId) => {
        const w = st.weightLabel(exId, 0);
        return { name: st.nameOf(st.exOf(exId)), unit: w.body ? '' : w.unit };
      };
      aufloesen.planName = (id) => st.nameOf(st.planOf(id));
      const r = await exportCsv(st.S, aufloesen);
      toast(t('csv.done', { name: r.name }));
    } catch (e) {
      toast(t('data.saveFailed', { msg: e.message }), true);
    }
  });

  byId('paste').addEventListener('click', async () => {
    const text = window.prompt(t('data.pastePrompt'));
    if (!text) return;
    try {
      const daten = parseBackup(text);
      resetSub();
      await st.replaceState(daten);
      toast(t('data.restored'));
    } catch (e) {
      toast(t('data.badFile'), true);
    }
  });

  byId('wipe').addEventListener('click', async () => {
    if (!confirmBox(t('data.resetAsk'))) return;
    resetSub();
    await st.replaceState(freshState());
    toast(t('data.resetDone'));
  });
}
