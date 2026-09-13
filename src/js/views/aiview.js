// KI-Verwaltung: Anbieter, Zugang, Modell. Gearbeitet wird damit anderswo —
// Pläne erstellen unter Pläne, Fragen an den Trainer auf der Startseite.
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import * as st from '../state.js';
import { t, locale } from '../i18n.js';
import { isNative } from '../store.js';
import { PROVIDERS, providerOf } from '../ai-meta.js';
import { showAiError } from './credits.js';
import { esc, byId, val, toast, confirmBox, field, textIn, selectIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

let verifying = false;
let connecting = false;       // Anleitung nach dem Öffnen der Anbieterseite
let models = [];

export function reset() { verifying = false; connecting = false; }

const keyOf = () => (st.S.ai.keys[st.S.ai.provider] || '').trim();
const verifiedAt = () => (st.S.ai.verified || {})[st.S.ai.provider] || 0;

// ---- Verbindung ----
function connectionBlock(prov) {
  const key = keyOf();
  const when = verifiedAt();

  if (!key) {
    return '<div class="conn">' +
      '<div class="conn-s bad">● ' + esc(t('ai.notConnected')) + '</div>' +
      '<p class="intro">' + esc(t('ai.noOauth', { host: prov.keyHost })) + '</p>' +
      '<button class="set-btn go" id="connect">' + esc(t('ai.connect')) + '</button>' +
      (connecting ? steps(prov) : '') + help() +
      '</div>';
  }

  return '<div class="conn">' +
    '<div class="conn-s' + (when ? ' ok' : '') + '">● ' +
      esc(when ? t('ai.connectedAt', { date: new Date(when).toLocaleDateString(locale()) })
               : t('ai.connectedUnchecked')) + '</div>' +
    '<div class="conn-k">' + esc(mask(key)) + '</div>' +
    '<div class="row-act">' +
      '<button class="mini" id="verify"' + (verifying ? ' disabled' : '') + '>' +
        esc(verifying ? t('ai.verifying') : t('ai.verify')) + '</button>' +
      '<button class="mini" id="connect">' + esc(t('ai.replaceKey')) + '</button>' +
      '<button class="mini warn" id="disconnect">' + esc(t('ai.disconnect')) + '</button>' +
    '</div>' +
    (connecting ? steps(prov) : '') + help() +
    '</div>';
}

// Ausklappbare Erklärung. <details> bringt das Auf- und Zuklappen von Haus aus
// mit, das braucht kein eigenes Zutun.
function help() {
  const part = n =>
    '<h4>' + esc(t('ai.helpH' + n)) + '</h4><p>' + esc(t('ai.helpP' + n)) + '</p>';
  return '<details class="help"><summary>' + esc(t('ai.helpOpen')) + '</summary>' +
    [1, 2, 3, 4, 5, 6].map(part).join('') +
    '</details>';
}

function steps(prov) {
  return '<ol class="steps">' +
    '<li>' + esc(t('ai.step1', { host: prov.keyHost })) + '</li>' +
    '<li>' + esc(t('ai.step2')) + '</li>' +
    '<li>' + esc(t('ai.step3')) + '</li></ol>' +
    '<button class="set-btn go" id="paste">' + esc(t('ai.paste')) + '</button>' +
    field(t('ai.orType'), '<input class="in" id="f-key" type="password" autocomplete="off" value="">') +
    '<button class="set-btn" id="savekey">' + esc(t('common.save')) + '</button>';
}

function mask(key) {
  if (key.length <= 12) return '••••';
  return key.slice(0, 7) + '…' + key.slice(-4);
}

async function useKey(raw, prov) {
  const key = (raw || '').trim();
  if (!key) { toast(t('ai.pasteEmpty'), true); return; }
  if (!key.startsWith(prov.keyPrefix)) {
    if (!confirmBox(t('ai.keyLooksWrong', { prefix: prov.keyPrefix }))) return;
  }
  st.S.ai.keys[st.S.ai.provider] = key;
  st.S.ai.verified = st.S.ai.verified || {};
  delete st.S.ai.verified[st.S.ai.provider];
  connecting = false;
  await st.touch();
  runVerify();
}

async function runVerify() {
  const key = keyOf();
  if (!key) { toast(t('ai.needKey'), true); return; }
  verifying = true;
  rerender();
  try {
    const mod = await import('../ai.js');
    models = await mod.listModels(st.S.ai.provider, key);
    st.S.ai.verified = st.S.ai.verified || {};
    st.S.ai.verified[st.S.ai.provider] = Date.now();
    if (models.length && !models.some(m => m.id === st.S.ai.model)) st.S.ai.model = models[0].id;
    verifying = false;
    await st.touch();
    toast(t('ai.verifyOk', { n: models.length }));
  } catch (e) {
    verifying = false;
    showAiError(e, st.S.ai.provider);
    rerender();
  }
}

// ---- Seite ----
export function render(mount, head, backBar, goHub) {
  const prov = providerOf(st.S.ai.provider);
  const connected = !!keyOf();
  const modelOpts = models.length
    ? models.map(m => ({ id: m.id, label: m.label }))
    : [{ id: st.S.ai.model || prov.defaultModel, label: st.S.ai.model || prov.defaultModel }];

  mount.innerHTML = head() + backBar(t('ai.title')) +
    '<p class="intro">' + esc(t('ai.intro')) + '</p>' +
    (isNative() ? '' : '<p class="intro">' + esc(t('ai.webKeyNote')) + '</p>') +

    field(t('ai.provider'), selectIn('f-prov', PROVIDERS.map(p => ({ id: p.id, label: p.label })), st.S.ai.provider)) +
    connectionBlock(prov) +

    (connected
      ? field(t('ai.model'),
          '<span class="two">' + selectIn('f-model', modelOpts, st.S.ai.model || prov.defaultModel) +
          textIn('f-modelfree', st.S.ai.model || prov.defaultModel) + '</span>')
      : '');

  byId('back').addEventListener('click', goHub);

  byId('f-prov').addEventListener('change', ev => {
    models = [];
    connecting = false;
    st.S.ai.provider = ev.target.value;
    st.S.ai.model = providerOf(ev.target.value).defaultModel;
    st.touch();
  });

  const connect = byId('connect');
  if (connect) connect.addEventListener('click', async () => {
    connecting = true;
    rerender();
    try {
      await Browser.open({ url: prov.keyUrl });
    } catch (e) {
      window.open(prov.keyUrl, '_blank');
    }
  });

  const paste = byId('paste');
  if (paste) paste.addEventListener('click', async () => {
    try {
      const { value } = await Clipboard.read();
      await useKey(value, prov);
    } catch (e) {
      toast(t('ai.clipboardFailed'), true);
    }
  });

  const savekey = byId('savekey');
  if (savekey) savekey.addEventListener('click', () => useKey(val('f-key'), prov));

  const verify = byId('verify');
  if (verify) verify.addEventListener('click', runVerify);

  const disconnect = byId('disconnect');
  if (disconnect) disconnect.addEventListener('click', async () => {
    if (!confirmBox(t('ai.disconnectAsk'))) return;
    st.S.ai.keys[st.S.ai.provider] = '';
    if (st.S.ai.verified) delete st.S.ai.verified[st.S.ai.provider];
    models = [];
    await st.touch();
    toast(t('ai.disconnected'));
  });

  if (!connected) return;

  byId('f-model').addEventListener('change', ev => {
    byId('f-modelfree').value = ev.target.value;
    st.S.ai.model = ev.target.value;
    st.touch();
  });
  byId('f-modelfree').addEventListener('change', ev => {
    st.S.ai.model = ev.target.value.trim();
    st.touch();
  });
}
