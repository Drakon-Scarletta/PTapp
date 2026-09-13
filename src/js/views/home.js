// Startseite: Überblick, Planwahl, Trainer-Chat.
import * as st from '../state.js';
import { t, locale } from '../i18n.js';
import { providerOf } from '../ai-meta.js';
import { showAiError } from './credits.js';
import { muscleLabel } from './editors.js';
import { esc, on, byId, val, toast, confirmBox } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let busy = false;
let draft = '';               // Getippter Text überlebt das Neuzeichnen

export function reset() { busy = false; }

const connected = () => !!(st.S.ai.keys[st.S.ai.provider] || '').trim();

function stats() {
  const done = st.weekCount(), ziel = st.weekTarget();
  const wochen = st.lastWeeks(8);
  const hoch = Math.max(4, ...wochen.map(w => w.done));
  const balken = wochen.map(w =>
    '<div class="bar-col" title="' + esc(w.start) + '">' +
      '<div class="bar-v' + (w.done >= w.target ? ' full' : '') + '" ' +
      'style="height:' + Math.round((w.done / hoch) * 100) + '%"></div>' +
    '</div>').join('');

  const letzte = st.lastSessions(1)[0];
  const datum = letzte
    ? new Date(letzte.date.split('-')[0], letzte.date.split('-')[1] - 1, letzte.date.split('-')[2])
      .toLocaleDateString(locale(), { day: 'numeric', month: 'long' })
    : null;

  return '<h3 class="sec first">' + esc(t('home.stats')) + '</h3>' +
    '<div class="stat-row">' +
      '<div class="stat"><b>' + done + '/' + ziel + '</b>' + esc(t('home.thisWeek')) + '</div>' +
      '<div class="stat"><b>' + st.weekStreak() + '</b>' + esc(t('home.streak')) + '</div>' +
      '<div class="stat"><b>' + st.totalSessions() + '</b>' + esc(t('home.total')) + '</div>' +
    '</div>' +
    '<div class="bars" aria-hidden="true">' + balken + '</div>' +
    '<p class="intro">' + esc(t('home.lastWeeks')) + ' · ' +
      esc(letzte ? t('home.last', { plan: st.nameOf(letzte.plan), date: datum }) : t('home.never')) +
    '</p>';
}

// Wie oft welche Muskelgruppe drankam - zeigt Schieflagen.
function muscles() {
  const zaehler = new Map();
  Object.values(st.S.log).forEach(e => {
    if (!e || !e.done || !e.t) return;
    Object.keys(e.t).forEach(exId => {
      if (!e.t[exId]) return;
      const ex = st.exOf(exId);
      const gruppe = ex && ex.muscle;
      if (!gruppe) return;
      zaehler.set(gruppe, (zaehler.get(gruppe) || 0) + 1);
    });
  });
  if (!zaehler.size) return '';

  const hoch = Math.max(...zaehler.values());
  const zeilen = [...zaehler.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id, n]) =>
      '<div class="mus"><span class="mus-n">' + esc(muscleLabel(id)) + '</span>' +
      '<span class="mus-b"><i style="width:' + Math.round((n / hoch) * 100) + '%"></i></span>' +
      '<span class="mus-c">' + n + '</span></div>').join('');

  return '<h3 class="sec">' + esc(t('stats.muscles')) + '</h3>' + zeilen;
}

function plans() {
  if (!st.S.plans.length) return '<p class="intro">' + esc(t('home.noPlans')) + '</p>';
  const sug = st.suggested();
  const counts = st.perPlanCounts();
  return st.S.plans.map(p =>
    '<button class="nav-row' + (p.id === sug ? ' due' : '') + '" data-start="' + esc(p.id) + '">' +
      '<span class="nav-n"><span class="tag">' + esc(p.short || '?') + '</span> ' + esc(st.nameOf(p)) +
        (p.src === 'ai' ? ' <span class="ai-mark" title="' + esc(t('ex.aiMade')) + '">✦</span>' : '') + '</span>' +
      '<span class="nav-s">' + esc(st.focusOf(p) || '—') + ' · ' + (counts.get(p.id) || 0) + '×</span>' +
      '<span class="nav-c">›</span></button>').join('');
}

function coach() {
  if (!connected()) {
    return '<h3 class="sec">' + esc(t('home.coach')) + '</h3>' +
      '<p class="intro">' + esc(t('home.coachOff')) + '</p>';
  }

  const verlauf = st.S.chat.length
    ? '<div class="chat">' + st.S.chat.map(m =>
        '<div class="msg ' + (m.role === 'coach' ? 'from-coach' : 'from-me') + '">' +
          '<div class="msg-w">' + esc(m.role === 'coach' ? t('home.coach') : t('home.you')) + '</div>' +
          '<div class="msg-t">' + esc(m.text) + '</div></div>').join('') +
      '</div>'
    : '<p class="intro">' + esc(t('home.coachSub')) + '</p>';

  return '<h3 class="sec">' + esc(t('home.coach')) + '</h3>' + verlauf +
    (busy ? '<p class="intro">' + esc(t('home.thinking')) + '</p>' : '') +
    '<div class="add-row">' +
      '<input class="in" id="c-msg" type="text" autocomplete="off" ' +
        'placeholder="' + esc(t('home.ask')) + '" value="' + esc(draft) + '"' +
        (busy ? ' disabled' : '') + '>' +
      '<button class="mini" id="c-send"' + (busy ? ' disabled' : '') + '>' +
        esc(t('home.send')) + '</button>' +
    '</div>' +
    '<p class="fld-h">' + esc(t('home.costHint')) + '</p>' +
    (st.S.chat.length
      ? '<button class="mini" id="c-clear">' + esc(t('home.clearChat')) + '</button>'
      : '');
}

// Was der Trainer über die Lage wissen muss, kurz gehalten.
function context() {
  const geraete = st.S.equipment.map(e => st.nameOf(e)).join(', ');
  const plaene = st.S.plans.map(p =>
    st.nameOf(p) + ' (' + p.items.map(i => st.nameOf(st.exOf(i.ex)) + ' ' + (i.reps || '')).join('; ') + ')'
  ).join(' | ');
  const letzte = st.lastSessions(8)
    .map(s => s.date + ' ' + st.nameOf(s.plan)).join(', ');
  return [
    'Equipment: ' + (geraete || 'none'),
    'Plans: ' + (plaene || 'none'),
    'Recent sessions: ' + (letzte || 'none'),
    'This week: ' + st.weekCount() + ' of ' + st.weekTarget() + ' sessions.'
  ].join('\n');
}

async function send() {
  const text = val('c-msg');
  if (!text) return;
  draft = '';
  busy = true;
  await st.addChat('me', text);        // löst bereits ein Neuzeichnen aus
  try {
    const mod = await import('../ai.js');
    const antwort = await mod.chat({
      provider: st.S.ai.provider,
      key: (st.S.ai.keys[st.S.ai.provider] || '').trim(),
      model: st.S.ai.model || providerOf(st.S.ai.provider).defaultModel,
      context: context(),
      messages: st.S.chat
    });
    busy = false;
    await st.addChat('coach', antwort);
  } catch (e) {
    busy = false;
    showAiError(e, st.S.ai.provider);
    rerender();
  }
}

export function render(head, mount) {
  mount.innerHTML = head() + stats() + muscles() +
    '<h3 class="sec">' + esc(t('home.pickPlan')) + '</h3>' +
    '<p class="intro">' + esc(t('home.pickPlanSub')) + '</p>' +
    plans() +
    coach();

  on('[data-start]', ev => {
    st.selectPlan(ev.currentTarget.dataset.start);
    document.dispatchEvent(new CustomEvent('goview', { detail: 'plan' }));
  });

  const feld = byId('c-msg');
  if (feld) {
    feld.addEventListener('input', () => { draft = feld.value; });
    feld.addEventListener('keydown', ev => { if (ev.key === 'Enter') send(); });
    byId('c-send').addEventListener('click', send);
    // Ans Ende des Gesprächs springen, damit die letzte Antwort sichtbar ist.
    const chat = document.querySelector('.chat');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }
  const clear = byId('c-clear');
  if (clear) clear.addEventListener('click', () => {
    if (confirmBox(t('home.clearChatAsk'))) st.clearChat();
  });
}
