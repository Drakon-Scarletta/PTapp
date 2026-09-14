// Der Weg ohne eigenen Zugang: Die App schreibt die Vorgabe samt Geräten und
// Wünschen als Text, der Nutzer trägt sie in eine beliebige KI (ChatGPT,
// Claude, was auch immer) und bringt die Antwort zurück. Hier wird sie gelesen
// und genauso übernommen, als hätte die App selbst gefragt.
import { Clipboard } from '@capacitor/clipboard';
import * as st from '../state.js';
import { t } from '../i18n.js';
import { manualPrompt } from '../prompt.js';
import { esc, on, byId, toast } from '../ui.js';
import { emptyForm, formFields, readForm, equipListHtml, askOptions, resultHtml } from './planform.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let form = emptyForm();
let answer = '';
let result = null;

export function reset() { answer = ''; result = null; }

// Aus dem Planer herübergereichte Angaben übernehmen, damit niemand zweimal
// dasselbe ausfüllt.
export function prefill(next) { if (next) form = Object.assign({}, next); }

function promptText() { return manualPrompt(askOptions(form)); }

async function copy(text) {
  try {
    await Clipboard.write({ string: text });
    return true;
  } catch (e) { /* im Browser gibt es die Brücke nicht */ }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) { /* Browser ohne Erlaubnis dafür */ }
  return ueberFeld(text);
}

// Letzter Versuch für ältere Browser: Text in ein Feld legen, markieren,
// kopieren lassen. Auf dem Gerät kommt es dazu gar nicht erst.
function ueberFeld(text) {
  const feld = document.createElement('textarea');
  feld.value = text;
  feld.setAttribute('readonly', '');
  feld.style.cssText = 'position:fixed;top:-1000px;opacity:0';
  document.body.appendChild(feld);
  feld.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  feld.remove();
  return ok;
}

// Chatfenster geben selten sauberes JSON zurück: mal in einem Codeblock, mal
// mit einem Satz davor. Beides ist hier kein Grund zur Aufregung.
function jsonAus(text) {
  let s = String(text || '').trim();
  const block = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (block) s = block[1].trim();
  const a = s.indexOf('{');
  const b = s.lastIndexOf('}');
  if (a < 0 || b <= a) throw new Error('no object');
  return JSON.parse(s.slice(a, b + 1));
}

// Eine fremde KI hält sich nicht zwingend an die Geräte-Kennungen; oft steht
// dort der Name. Beides wird angenommen.
function geraet(wert) {
  const s = String(wert || '').trim();
  if (st.equipOf(s)) return s;
  const low = s.toLowerCase();
  const hit = st.S.equipment.find(e => st.nameOf(e).toLowerCase() === low);
  if (hit) return hit.id;
  return (st.S.equipment[0] && st.S.equipment[0].id) || '';
}

function pruefe(roh) {
  const exercises = (Array.isArray(roh.exercises) ? roh.exercises : [])
    .filter(e => e && e.name)
    .map(e => ({ name: String(e.name), equipment: geraet(e.equipment), hint: e.hint ? String(e.hint) : '' }));

  const plans = (Array.isArray(roh.plans) ? roh.plans : [])
    .map(p => ({
      name: p && p.name ? String(p.name) : '',
      focus: p && p.focus ? String(p.focus) : '',
      intensity: p && st.INTENSITIES.includes(p.intensity) ? p.intensity : undefined,
      night: !!(p && p.night),
      items: (p && Array.isArray(p.items) ? p.items : [])
        .filter(i => i && i.exercise)
        .map(i => ({
          exercise: String(i.exercise),
          reps: i.reps ? String(i.reps) : '3 × 8–12',
          sets: parseInt(i.sets, 10) || 3
        }))
    }))
    .filter(p => p.items.length);

  if (!plans.length) throw new Error('no plans');
  return { exercises, plans };
}

function auswerten() {
  try {
    result = pruefe(jsonAus(answer));
    rerender();
  } catch (e) {
    result = null;
    toast(t('man.badAnswer'), true);
  }
}

export function render(mount, head, backBar, goBack) {
  const text = st.S.equipment.length ? promptText() : '';

  mount.innerHTML = head() + backBar(t('man.title')) +
    '<p class="intro">' + esc(t('man.intro')) + '</p>' +
    '<ol class="steps">' +
      '<li>' + esc(t('man.step1')) + '</li>' +
      '<li>' + esc(t('man.step2')) + '</li>' +
      '<li>' + esc(t('man.step3')) + '</li>' +
      '<li>' + esc(t('man.step4')) + '</li>' +
    '</ol>' +

    equipListHtml() +
    formFields(form) +

    (st.S.equipment.length
      ? '<button class="set-btn go" id="copy">' + esc(t('man.copy')) + '</button>' +
        '<details class="help"><summary>' + esc(t('man.show')) + '</summary>' +
          '<textarea class="in mono" id="f-prompt" rows="10" readonly>' + esc(text) + '</textarea>' +
        '</details>'
      : '<p class="intro">' + esc(t('ai.needEquip')) + '</p>') +

    '<h3 class="sec">' + esc(t('man.answerTitle')) + '</h3>' +
    '<p class="intro">' + esc(t('man.answerSub')) + '</p>' +
    '<textarea class="in mono" id="f-ans" rows="6" placeholder="' + esc(t('man.answerHint')) + '">' +
      esc(answer) + '</textarea>' +
    '<button class="set-btn" id="fromclip">' + esc(t('man.fromClipboard')) + '</button>' +
    '<button class="set-btn go" id="read">' + esc(t('man.read')) + '</button>' +

    (result ? resultHtml(result) +
      '<button class="set-btn go" id="accept">' + esc(t('ai.accept')) + '</button>' +
      '<button class="set-btn" id="discard">' + esc(t('ai.discard')) + '</button>' : '');

  byId('back').addEventListener('click', goBack);

  const copyBtn = byId('copy');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const ok = await copy(promptText());
    toast(ok ? t('man.copied') : t('man.copyFailed'), !ok);
    if (!ok) {
      // Dann wenigstens den Text aufklappen und markieren, damit von Hand
      // kopiert werden kann.
      const box = document.querySelector('details.help');
      if (box) box.open = true;
      const feld = byId('f-prompt');
      if (feld) { feld.focus(); feld.select(); }
    }
  });

  byId('fromclip').addEventListener('click', async () => {
    try {
      const { value } = await Clipboard.read();
      answer = value || '';
      if (!answer.trim()) { toast(t('ai.pasteEmpty'), true); return; }
      auswerten();
    } catch (e) {
      toast(t('ai.clipboardFailed'), true);
    }
  });

  byId('f-ans').addEventListener('input', ev => { answer = ev.target.value; });
  byId('read').addEventListener('click', () => {
    answer = byId('f-ans').value;
    if (!answer.trim()) { toast(t('man.noAnswer'), true); return; }
    auswerten();
  });

  if (result) {
    byId('accept').addEventListener('click', () => {
      const n = st.applyGenerated(result);
      result = null;
      answer = '';
      toast(t('ai.accepted') + (n ? ' ' + t('ai.newExercises', { n }) : ''));
      goBack();
    });
    byId('discard').addEventListener('click', () => { result = null; rerender(); });
  }

  on('#f-goal, #f-days, #f-level, #f-notes', () => {
    form = readForm(form);
    rerender();
  }, 'change');
}
