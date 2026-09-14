// Was die KI zu tun hat und in welcher Form sie antworten muss. Steht getrennt
// von ai.js, weil es zwei Wege gibt: die App fragt selbst (ai.js) oder der
// Nutzer kopiert den Text in eine beliebige KI und bringt die Antwort zurück
// (views/manual.js). Beide Wege sollen dieselbe Vorgabe benutzen.
import { getLang } from './i18n.js';

// Was die KI zurückgeben muss. Beim eigenen Aufruf wird es erzwungen, beim
// Kopieren steht es als Schema im Text.
export function schema(equipIds) {
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
            intensity: {
              type: 'string',
              enum: ['easy', 'mid', 'hard'],
              description: 'How demanding the session is: easy, mid or hard.'
            },
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
          required: ['name', 'focus', 'intensity', 'night', 'items'],
          additionalProperties: false
        }
      }
    },
    required: ['exercises', 'plans'],
    additionalProperties: false
  };
}

export const SYSTEM = [
  'You design strength training plans for one person training on the equipment they list.',
  'Only use the equipment provided; never invent machines, barbells or dumbbells that are not listed.',
  'Every exercise in a plan must appear in the exercises array, with the id of the equipment it is done on.',
  'Keep a session to roughly five to eight exercises and order them from large muscle groups to small.',
  'Give every plan an intensity: easy for light high-rep work, mid for hypertrophy, hard for heavy low-rep work.',
  'Write exercise names, focus texts and hints in the requested language.'
].join(' ');

export function userPrompt(opts) {
  const lang = getLang() === 'en' ? 'English' : 'German';
  const equip = opts.equipment.map(e => `- id "${e.id}": ${e.name} (${e.kindLabel})`).join('\n');
  return [
    `Language for all text: ${lang}.`,
    `Goal: ${opts.goal}.`,
    `Experience: ${opts.level}.`,
    `Sessions per week: ${opts.days}.`,
    `Intensity: ${opts.intensity || 'mid'}. Use about ${opts.sets || 5} sets for each exercise`,
    'and set the field "intensity" of every plan to exactly this value.',
    opts.notes ? `Additional notes from the trainee: ${opts.notes}` : '',
    '',
    'Available equipment:',
    equip,
    '',
    `Produce ${opts.days <= 2 ? 1 : 2} to ${Math.min(opts.days, 4)} plans that rotate over the week,`,
    'plus optionally one shortened session marked night=true for weeks with little time.'
  ].filter(Boolean).join('\n');
}

// Ein Text zum Kopieren: dieselbe Vorgabe, nur so verpackt, dass sie in jedem
// Chatfenster funktioniert - dort kann die App keine Antwortform erzwingen,
// also steht das Schema mit im Text.
export function manualPrompt(opts) {
  const equipIds = opts.equipment.map(e => e.id);
  return [
    SYSTEM,
    '',
    userPrompt(opts),
    '',
    'Answer with one JSON object and nothing else - no explanation before or after,',
    'no code fence, no markdown. It must match this schema exactly:',
    JSON.stringify(schema(equipIds), null, 2)
  ].join('\n');
}
