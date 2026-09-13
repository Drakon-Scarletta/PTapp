// Startbestand: Geräte, Übungen und Pläne, mit denen die App loslegt.
// Nach dem ersten Start liegt alles im Zustand und ist frei bearbeitbar.
// `key` verweist auf die Sprachdatei; sobald der Nutzer umbenennt, fällt der
// Schlüssel weg und der eigene Name gilt.

export const SEED_EQUIPMENT = [
  { id: 'stack', key: 'eqStack', kind: 'plates', plate: 4.5 },
  { id: 'body', key: 'eqBody', kind: 'body' }
];

export const SEED_EXERCISES = [
  { id: 'chestpress', key: 'chestpress', equip: 'stack', bands: [4, 6] },
  { id: 'butterfly', key: 'butterfly', equip: 'stack', bands: [2, 4] },
  { id: 'legext', key: 'legext', equip: 'stack', bands: [3, 5] },
  { id: 'backkick', key: 'backkick', equip: 'stack', bands: [2, 4], hintKey: 'hintBackkick' },
  { id: 'pushdown', key: 'pushdown', equip: 'stack', bands: [3, 5], hintKey: 'hintPushdown' },
  { id: 'deltoid', key: 'deltoid', equip: 'stack', bands: [1, 3] },
  { id: 'abcrunch', key: 'abcrunch', equip: 'stack', bands: [3, 5] },
  { id: 'lat', key: 'lat', equip: 'stack', bands: [4, 6] },
  { id: 'lowrow', key: 'lowrow', equip: 'stack', bands: [4, 6] },
  { id: 'curl', key: 'curl', equip: 'stack', bands: [3, 5] },
  { id: 'upright', key: 'upright', equip: 'stack', bands: [3, 5], hintKey: 'hintUpright' },
  { id: 'armset', key: 'armset', equip: 'stack', bands: [3, 5] },
  { id: 'split', key: 'split', equip: 'body', hintKey: 'hintSplit' },
  { id: 'calf', key: 'calf', equip: 'body' },
  { id: 'plank', key: 'plank', equip: 'body' },
  { id: 'hipraise', key: 'hipraise', equip: 'body' }
];

export const SEED_PLANS = [
  {
    id: 'A', short: 'A', key: 'planA', focusKey: 'focusA',
    items: [
      { ex: 'chestpress', reps: '3 × 8–12', sets: 3 },
      { ex: 'butterfly', reps: '3 × 10–15', sets: 3 },
      { ex: 'legext', reps: '3 × 12–15', sets: 3 },
      { ex: 'backkick', reps: '3 × 12–15', sets: 3, side: 'leg' },
      { ex: 'pushdown', reps: '3 × 10–15', sets: 3 },
      { ex: 'deltoid', reps: '2 × 12–15', sets: 2, side: 'arm' },
      { ex: 'abcrunch', reps: '3 × 12–15', sets: 3 }
    ]
  },
  {
    id: 'B', short: 'B', key: 'planB', focusKey: 'focusB',
    items: [
      { ex: 'lat', reps: '3 × 8–12', sets: 3 },
      { ex: 'lowrow', reps: '3 × 8–12', sets: 3 },
      { ex: 'split', reps: '3 × 8–12', sets: 3, side: 'leg' },
      { ex: 'curl', reps: '3 × 10–12', sets: 3 },
      { ex: 'upright', reps: '3 × 12', sets: 3 },
      { ex: 'calf', reps: '3 × 15–20', sets: 3 },
      { ex: 'plank', reps: '3 × 30–60 s', sets: 3 }
    ]
  },
  {
    id: 'C', short: 'C', key: 'planC', focusKey: 'focusC', night: true,
    items: [
      { ex: 'lat', reps: '2–3 × 10–12', sets: 3 },
      { ex: 'chestpress', reps: '2–3 × 10–12', sets: 3 },
      { ex: 'legext', reps: '2–3 × 10–12', sets: 3 },
      { ex: 'hipraise', reps: '2–3 × 10–12', sets: 3, side: 'leg' },
      { ex: 'lowrow', reps: '2–3 × 10–12', sets: 3 },
      { ex: 'armset', reps: '2 × 10–12', sets: 2, side: 'alt' },
      { ex: 'abcrunch', reps: '2–3 × 12–15', sets: 3 }
    ]
  }
];

export const EQUIP_KINDS = ['plates', 'weight', 'body'];

// Eindeutige, kurze Kennung für neu angelegte Einträge.
export function newId(prefix, taken) {
  let n = 1;
  while (taken.includes(prefix + n)) n++;
  return prefix + n;
}
