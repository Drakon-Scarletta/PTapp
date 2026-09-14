// Startbestand: Geräte, Übungen und Pläne, mit denen die App loslegt.
// Nach dem ersten Start liegt alles im Zustand und ist frei bearbeitbar.
// `key` verweist auf die Sprachdatei; sobald der Nutzer umbenennt, fällt der
// Schlüssel weg und der eigene Name gilt.

export const SEED_EQUIPMENT = [
  { id: 'stack', key: 'eqStack', kind: 'plates', plate: 4.5 },
  { id: 'body', key: 'eqBody', kind: 'body' }
];

export const SEED_EXERCISES = [
  { id: 'chestpress', key: 'chestpress', muscle: 'chest', equip: 'stack', bands: [4, 6] },
  { id: 'butterfly', key: 'butterfly', muscle: 'chest', equip: 'stack', bands: [2, 4] },
  { id: 'legext', key: 'legext', muscle: 'legs', equip: 'stack', bands: [3, 5] },
  { id: 'backkick', key: 'backkick', muscle: 'legs', equip: 'stack', bands: [2, 4], hintKey: 'hintBackkick' },
  { id: 'pushdown', key: 'pushdown', muscle: 'arms', equip: 'stack', bands: [3, 5], hintKey: 'hintPushdown' },
  { id: 'deltoid', key: 'deltoid', muscle: 'shoulders', equip: 'stack', bands: [1, 3] },
  { id: 'abcrunch', key: 'abcrunch', muscle: 'core', equip: 'stack', bands: [3, 5] },
  { id: 'lat', key: 'lat', muscle: 'back', equip: 'stack', bands: [4, 6] },
  { id: 'lowrow', key: 'lowrow', muscle: 'back', equip: 'stack', bands: [4, 6] },
  { id: 'curl', key: 'curl', muscle: 'arms', equip: 'stack', bands: [3, 5] },
  { id: 'upright', key: 'upright', muscle: 'shoulders', equip: 'stack', bands: [3, 5], hintKey: 'hintUpright' },
  { id: 'armset', key: 'armset', muscle: 'arms', equip: 'stack', bands: [3, 5] },
  { id: 'split', key: 'split', muscle: 'legs', equip: 'body', hintKey: 'hintSplit' },
  { id: 'calf', key: 'calf', muscle: 'legs', equip: 'body' },
  { id: 'plank', key: 'plank', muscle: 'core', equip: 'body', timed: true, secs: [30, 60] },
  { id: 'hipraise', key: 'hipraise', muscle: 'legs', equip: 'body' }
];

export const SEED_PLANS = [
  {
    id: 'A', short: 'A', key: 'planA', focusKey: 'focusA', intensity: 'mid',
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
    id: 'B', short: 'B', key: 'planB', focusKey: 'focusB', intensity: 'mid',
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
    id: 'C', short: 'C', key: 'planC', focusKey: 'focusC', night: true, intensity: 'easy',
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
