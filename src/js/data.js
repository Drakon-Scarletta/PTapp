// Trainingspläne und Ampel-Bereiche. Einziger Ort, an dem Übungen definiert werden.
export const PLANS = {
  A: {
    name: 'Druck',
    focus: 'Brust, Quadrizeps, Trizeps, Schulter',
    ex: [
      { id: 'chestpress', n: 'Vertical Chest Press', r: '3 × 8–12', step: 5 },
      { id: 'butterfly',  n: 'Butterfly',            r: '3 × 10–15', step: 5 },
      { id: 'legext',     n: 'Leg Extension',        r: '3 × 12–15', step: 5 },
      { id: 'backkick',   n: 'Back Kick mit Fußschlaufe', r: '3 × 12–15 je Bein', step: 5, hint: 'Unterer Kabelzug, Bein gestreckt nach hinten. Ein Tipp pro Durchgang.' },
      { id: 'pushdown',   n: 'Triceps Pushdown',     r: '3 × 10–15', step: 5, hint: 'Zu grobe Sprünge? 3 s langsam ablassen statt höher.' },
      { id: 'deltoid',    n: 'Deltoid Raise, einarmig', r: '2 × 12–15 je Arm', step: 2.5, s: 2 },
      { id: 'abcrunch',   n: 'Ab Crunch am Kabel',   r: '3 × 12–15', step: 5 }
    ]
  },
  B: {
    name: 'Zug',
    focus: 'Rücken, Beine einbeinig, Bizeps, Rumpf',
    ex: [
      { id: 'lat',      n: 'Lat Pulldown',        r: '3 × 8–12', step: 5 },
      { id: 'lowrow',   n: 'Low Row',             r: '3 × 8–12', step: 5 },
      { id: 'split',    n: 'Bulgarian Split Squat', r: '3 × 8–12 je Bein', bw: true, hint: 'Hinterer Fuß auf der Bank.' },
      { id: 'curl',     n: 'Standing Arm Curl',   r: '3 × 10–12', step: 5 },
      { id: 'upright',  n: 'Upright Row',         r: '3 × 12', step: 5, hint: 'Nur bis Brusthöhe ziehen, nicht bis zum Kinn.' },
      { id: 'calf',     n: 'Wadenheben auf Stufe', r: '3 × 15–20', bw: true },
      { id: 'plank',    n: 'Plank',               r: '3 × 30–60 s', bw: true }
    ]
  },
  C: {
    name: 'Ganzkörper',
    focus: 'Verkürzte Einheit für Nachtschichtwochen',
    ex: [
      { id: 'lat',        n: 'Lat Pulldown',      r: '2–3 × 10–12', step: 5 },
      { id: 'chestpress', n: 'Vertical Chest Press', r: '2–3 × 10–12', step: 5 },
      { id: 'legext',     n: 'Leg Extension',     r: '2–3 × 10–12', step: 5 },
      { id: 'hipraise',   n: 'Beckenheben, einbeinig', r: '2–3 × 10–12 je Bein', bw: true },
      { id: 'lowrow',     n: 'Low Row',           r: '2–3 × 10–12', step: 5 },
      { id: 'armset',     n: 'Arm Curl + Pushdown', r: '2 × 10–12 im Wechsel', step: 5, s: 2 },
      { id: 'abcrunch',   n: 'Ab Crunch am Kabel', r: '2–3 × 12–15', step: 5 }
    ]
  }
};

// Ampel: bis einschließlich [grün, gelb] Platten. Darüber rot.
export const BANDS = {
  chestpress: [4, 6], butterfly: [2, 4], legext: [3, 5], backkick: [2, 4],
  pushdown: [3, 5], deltoid: [1, 3], abcrunch: [3, 5], lat: [4, 6],
  lowrow: [4, 6], curl: [3, 5], upright: [3, 5], armset: [3, 5]
};

export const MONTHS = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
  'August', 'September', 'Oktober', 'November', 'Dezember'];

export const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export function exOf(planKey, id) {
  const p = PLANS[planKey];
  if (!p) return null;
  return p.ex.find(x => x.id === id) || null;
}

// Zielanzahl Sätze einer Übung.
export function goal(x) { return x.s || 3; }
