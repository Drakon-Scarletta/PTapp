// Plan-Erstellung über einen KI-Anbieter. Der Schlüssel gehört dem Nutzer und
// bleibt auf dem Gerät; die App ruft den Anbieter direkt auf.
// In der App laufen die Aufrufe über die native HTTP-Schicht von Capacitor,
// deshalb greifen dort die Browser-Beschränkungen nicht.
import Anthropic from '@anthropic-ai/sdk';
import { providerOf } from './ai-meta.js';
import { SYSTEM, schema, userPrompt } from './prompt.js';


export async function generatePlan(opts) {
  const equipIds = opts.equipment.map(e => e.id);
  if (!equipIds.length) throw new Error('no equipment');
  try {
    return await (opts.provider === 'openai'
      ? viaOpenAI(opts, equipIds)
      : viaAnthropic(opts, equipIds));
  } catch (e) { throw tagged(e); }
}

// ---- Anthropic ----
function anthropicClient(key) {
  return new Anthropic({
    apiKey: key,
    dangerouslyAllowBrowser: true,
    defaultHeaders: { 'anthropic-dangerous-direct-browser-access': 'true' }
  });
}

// In der App ersetzt Capacitor `fetch` durch eine native Brücke. Das SDK bekommt
// dadurch kein vollwertiges Response-Objekt und liefert stellenweise undefined.
// Deshalb: erst über das SDK, und wenn dabei nichts Brauchbares herauskommt,
// dieselbe Anfrage direkt stellen. Echte Fehler des Anbieters (falscher
// Schlüssel, kein Guthaben) werden vorher durchgereicht.
function anthropicHeaders(key) {
  return {
    'Content-Type': 'application/json',
    'x-api-key': key,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  };
}

async function anthropicRaw(key, path, body) {
  const res = await fetch('https://api.anthropic.com' + path, {
    method: body ? 'POST' : 'GET',
    headers: anthropicHeaders(key),
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(errText(data, res.status));
  if (!data) throw new Error('leere Antwort');
  return data;
}

// Ein Fehler des Anbieters hat einen Status - der soll den Nutzer erreichen.
// Alles andere ist ein Problem der Laufzeitumgebung und wird still umgangen.
function isApiError(e) {
  return !!(e && (typeof e.status === 'number' || e.name === 'AuthenticationError'));
}

async function viaSdkOrRaw(key, sdkCall, ok, path, body) {
  try {
    const res = await sdkCall();
    if (ok(res)) return res;
  } catch (e) {
    if (isApiError(e)) throw e;
  }
  return anthropicRaw(key, path, body);
}

async function viaAnthropic(opts, equipIds) {
  const client = anthropicClient(opts.key);
  const body = {
    model: opts.model || providerOf('anthropic').defaultModel,
    max_tokens: 16000,
    system: SYSTEM,
    tools: [{
      name: 'deliver_plan',
      description: 'Return the finished training plans.',
      strict: true,
      input_schema: schema(equipIds)
    }],
    messages: [{
      role: 'user',
      content: userPrompt(opts) + '\n\nReturn the result by calling the tool deliver_plan.'
    }]
  };
  const res = await viaSdkOrRaw(
    opts.key,
    () => client.messages.create(body),
    r => r && Array.isArray(r.content),
    '/v1/messages', body
  );

  const call = res.content.find(b => b.type === 'tool_use');
  if (!call) {
    const text = res.content.filter(b => b.type === 'text').map(b => b.text).join(' ').trim();
    throw new Error(text || `unexpected answer (${res.stop_reason})`);
  }
  return call.input;
}

// ---- OpenAI ----
async function viaOpenAI(opts, equipIds) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opts.key}`
    },
    body: JSON.stringify({
      model: opts.model || providerOf('openai').defaultModel,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: userPrompt(opts) }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'training_plan', strict: true, schema: schema(equipIds) }
      }
    })
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(errText(data, res.status));
  const content = data.choices && data.choices[0] && data.choices[0].message.content;
  if (!content) throw new Error('empty answer');
  return JSON.parse(content);
}

// ---- Chat mit dem virtuellen Trainer ----
const COACH = [
  'You are the training coach inside a workout tracking app.',
  'Answer briefly and practically - a few sentences, no long essays, no markdown headings.',
  'You know the equipment, the plans and the recent sessions of the person you are talking to;',
  'refer to them when it helps and never suggest equipment they do not have.',
  'If they ask for a whole new plan, tell them the app can build one under Plans.',
  'Answer in the language of the question.'
].join(' ');

export async function chat(opts) {
  try { return await chatInner(opts); } catch (e) { throw tagged(e); }
}

async function chatInner(opts) {
  const system = COACH + '\n\n' + opts.context;
  const messages = opts.messages.map(m => ({
    role: m.role === 'coach' ? 'assistant' : 'user',
    content: m.text
  }));

  if (opts.provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${opts.key}` },
      body: JSON.stringify({
        model: opts.model || providerOf('openai').defaultModel,
        messages: [{ role: 'system', content: system }, ...messages]
      })
    });
    const data = await readJson(res);
    if (!res.ok) throw new Error(errText(data, res.status));
    const text = data.choices && data.choices[0] && data.choices[0].message.content;
    if (!text) throw new Error('empty answer');
    return text.trim();
  }

  const client = anthropicClient(opts.key);
  const body = {
    model: opts.model || providerOf('anthropic').defaultModel,
    max_tokens: 2000,
    system,
    messages
  };
  const res = await viaSdkOrRaw(
    opts.key,
    () => client.messages.create(body),
    r => r && Array.isArray(r.content),
    '/v1/messages', body
  );
  const text = res.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (!text) throw new Error(`unexpected answer (${res.stop_reason})`);
  return text;
}

// ---- Modelle auflisten ----
export async function listModels(provider, key) {
  try { return await listInner(provider, key); } catch (e) { throw tagged(e); }
}

async function listInner(provider, key) {
  if (provider === 'anthropic') {
    const client = anthropicClient(key);
    const page = await viaSdkOrRaw(
      key,
      () => client.models.list({ limit: 50 }),
      r => r && Array.isArray(r.data),
      '/v1/models?limit=50', null
    );
    return (page.data || []).map(m => ({ id: m.id, label: m.display_name || m.id }));
  }
  const res = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(errText(data, res.status));
  return (data.data || [])
    .map(m => m.id)
    .filter(id => /^(gpt|o\d)/.test(id) && !/audio|realtime|transcribe|tts|image|embedding|moderation/.test(id))
    .sort()
    .map(id => ({ id, label: id }));
}

// Ein leeres Guthaben ist kein gewoehnlicher Fehler - die App bietet dafuer
// den Weg zur Aufladeseite an. Beide Anbieter melden es unterschiedlich.
function tagged(e) {
  const text = (e && e.message ? e.message : '') + ' ' + JSON.stringify((e && e.error) || '');
  if (/credit balance is too low|insufficient_quota|exceeded your current quota|billing_not_active/i.test(text)) {
    e.kind = 'credits';
  }
  return e;
}

async function readJson(res) {
  try { return await res.json(); } catch (e) { return null; }
}
function errText(data, status) {
  if (data && data.error && data.error.message) return data.error.message;
  return 'HTTP ' + status;
}
