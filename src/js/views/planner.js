// Einen Plan von der KI erstellen lassen. Sitzt unter Pläne, nicht unter KI:
// die KI-Seite verwaltet den Zugang, hier wird damit gearbeitet.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { providerOf } from '../ai-meta.js';
import { showAiError } from './credits.js';
import { esc, on, byId, toast } from '../ui.js';
import { emptyForm, formFields, readForm, equipListHtml, askOptions, resultHtml } from './planform.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let busy = false;
let result = null;
let form = emptyForm();

export function reset() { busy = false; result = null; }

export function render(mount, head, backBar, goBack, goManual) {
  const connected = !!(st.S.ai.keys[st.S.ai.provider] || '').trim();

  mount.innerHTML = head() + backBar(t('pl.aiTitle')) +
    '<p class="intro">' + esc(t('ai.intro')) + '</p>' +
    (connected ? '' : '<p class="intro">' + esc(t('man.plannerOffline')) + '</p>') +

    equipListHtml() +
    formFields(form) +

    '<button class="set-btn' + (busy || !connected ? '' : ' go') + '" id="gen"' +
      (busy ? ' disabled' : '') + '>' + esc(busy ? t('ai.working') : t('ai.generate')) + '</button>' +
    '<button class="set-btn' + (connected ? '' : ' go') + '" id="manual">' +
      esc(t('man.button')) + '</button>' +
    (result ? resultHtml(result) +
      '<button class="set-btn go" id="accept">' + esc(t('ai.accept')) + '</button>' +
      '<button class="set-btn" id="discard">' + esc(t('ai.discard')) + '</button>' : '');

  byId('back').addEventListener('click', goBack);

  byId('manual').addEventListener('click', () => {
    form = readForm(form);
    goManual(form);
  });

  byId('gen').addEventListener('click', async () => {
    form = readForm(form);
    if (!st.S.equipment.length) { toast(t('ai.needEquip'), true); return; }
    busy = true;
    result = null;
    rerender();
    try {
      const mod = await import('../ai.js');
      result = await mod.generatePlan(Object.assign({
        provider: st.S.ai.provider,
        key: (st.S.ai.keys[st.S.ai.provider] || '').trim(),
        model: st.S.ai.model || providerOf(st.S.ai.provider).defaultModel
      }, askOptions(form)));
    } catch (e) {
      showAiError(e, st.S.ai.provider);
    }
    busy = false;
    rerender();
  });

  if (result) {
    byId('accept').addEventListener('click', () => {
      const n = st.applyGenerated(result);
      result = null;
      toast(t('ai.accepted') + (n ? ' ' + t('ai.newExercises', { n }) : ''));
      goBack();
    });
    byId('discard').addEventListener('click', () => { result = null; rerender(); });
  }

  on('#f-int, #f-goal, #f-days, #f-level, #f-notes', () => { form = readForm(form); }, 'change');
}
