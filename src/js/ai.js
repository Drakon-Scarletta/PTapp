// Plan-Erstellung über einen KI-Anbieter. Der Schlüssel gehört dem Nutzer und
// bleibt auf dem Gerät; die App ruft den Anbieter direkt auf.
// In der App laufen die Aufrufe über die native HTTP-Schicht von Capacitor,
// deshalb greifen dort die Browser-Beschränkungen nicht.
import Anthropic from '@anthropic-ai/sdk';
import { getLang } from './i18n.js';
import { providerOf } from './ai-meta.js';


// Was die KI zurückgeben muss. Wird bei beiden Anbietern erzwungen.
function schema(equipIds) {
  return {
    type: 'object',
    properties: {
      exercises: {
        type: 'array',
        description: 'Every exercise used in the plans, listed once.',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            equipment: { type: 'string', enum: equipIds },
            hint: { type: 'string', description: 'One short technique cue, may be empty.' }
          },
          required: ['name', 'equipment', 'hint'],
          additionalProperties: false
        }
      },
      plans: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            focus: { type: 'string' },
            night: { type: 'boolean', description: 'True only for a shortened fallback session.' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  exercise: { type: 'string', description: 'Must match a name from exercises.' },
                  reps: { type: 'string', description: 'For example "3 x 8-12".' },
                  sets: { type: 'integer' }
                },
                required: ['exercise', 'reps', 'sets'],
                additionalProperties: false
              }
            }
          },
          required: ['name', 'focus', 'night', 'items'],
          additionalProperties: false
        }
      }
    },
    required: ['exercises', 'plans'],
    additionalProperties: false
  };
}

const SYSTEM = [
  'You design strength training plans for one person training on the equipment they list.',
  'Only use the equipment provided; never invent machines, barbells or dumbbells that are not listed.',
  'Every exercise in a plan must appear in the exercises array, with the id of the equipment it is done on.',
  'Keep a session to roughly five to eight exercises and order them from large muscle groups to small.',
  'Write exercise names, focus texts and hints in the requested language.'
].join(' ');

function userPrompt(opts) {
  const lang = getLang() === 'en' ? 'English' : 'German';
  const equip = opts.equipment.map(e => `- id "${e.id}": ${e.name} (${e.kindLabel})`).join('\n');
  return [
    `Language for all text: ${lang}.`,
    `Goal: ${opts.goal}.`,
    `Experience: ${opts.level}.`,
    `Sessions per week: ${opts.days}.`,
    opts.notes ? `Additional notes from the trainee: ${opts.notes}` : '',
    '',
    'Available equipment:',
    equip,
    '',
    `Produce ${opts.days <= 2 ? 1 : 2} to ${Math.min(opts.days, 4)} plans that rotate over the week,`,
    'plus optionally one shortened session marked night=true for weeks with little time.'
  ].filter(Boolean).join('\n');
}

export async function generatePlan(opts) {
  const equipIds = opts.equipment.map(e => e.id);
  if (!equipIds.length) throw new Error('no equipment');
  return opts.provider === 'openai'
    ? viaOpenAI(opts, equipIds)
    : viaAnthropic(opts, equipIds);
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

async function readJson(res) {
  try { return await res.json(); } catch (e) { return null; }
}
function errText(data, status) {
  if (data && data.error && data.error.message) return data.error.message;
  return 'HTTP ' + status;
}
