// Katalog bekannter Gerätetypen. Geräteklassen, keine Hersteller.
// Die Namen stehen hier zweisprachig direkt an den Einträgen - sie sind Daten,
// keine Oberflächentexte, und gehören deshalb nicht in die Sprachdatei.
//
// kind legt fest, wie das Gewicht gezählt wird:
//   plates = Plattenstapel, weight = Kilogramm mit Schrittweite, body = gar nicht.
import { getLang } from './i18n.js';

export const CATEGORIES = [
  {
    id: 'cable', de: 'Kabelzug', en: 'Cable',
    items: [
      { key: 'latPulldown', de: 'Lat-Zug', en: 'Lat pulldown', kind: 'plates' },
      { key: 'seatedRow', de: 'Rudern sitzend am Kabel', en: 'Seated cable row', kind: 'plates' },
      { key: 'cableCrossover', de: 'Kabelkreuzzug', en: 'Cable crossover', kind: 'plates' },
      { key: 'cableTower', de: 'Kabelturm, verstellbar', en: 'Adjustable cable tower', kind: 'plates' },
      { key: 'tricepsPushdown', de: 'Trizepsdrücken am Kabel', en: 'Cable triceps pushdown', kind: 'plates' },
      { key: 'cableCurl', de: 'Bizepscurl am Kabel', en: 'Cable biceps curl', kind: 'plates' },
      { key: 'facePull', de: 'Face Pull am Kabel', en: 'Cable face pull', kind: 'plates' },
      { key: 'cableWoodchop', de: 'Holzhacker am Kabel', en: 'Cable woodchop', kind: 'plates' },
      { key: 'cableAbCrunch', de: 'Bauchcrunch am Kabel', en: 'Cable ab crunch', kind: 'plates' },
      { key: 'cableKickback', de: 'Kickback mit Fußschlaufe', en: 'Cable kickback with ankle strap', kind: 'plates' }
    ]
  },
  {
    id: 'chestBack', de: 'Maschinen für Brust und Rücken', en: 'Chest and back machines',
    items: [
      { key: 'chestPress', de: 'Brustpresse', en: 'Chest press', kind: 'plates' },
      { key: 'verticalChestPress', de: 'Vertical Chest Press', en: 'Vertical chest press', kind: 'plates' },
      { key: 'inclineChestPress', de: 'Schräge Brustpresse', en: 'Incline chest press', kind: 'plates' },
      { key: 'pecDeck', de: 'Butterfly', en: 'Pec deck', kind: 'plates' },
      { key: 'reverseFly', de: 'Butterfly reverse', en: 'Reverse fly', kind: 'plates' },
      { key: 'assistedPullup', de: 'Klimmzugmaschine mit Gegengewicht', en: 'Assisted pull-up machine', kind: 'plates' },
      { key: 'lowRowMachine', de: 'Ruderzug-Maschine', en: 'Low row machine', kind: 'plates' },
      { key: 'tBarRow', de: 'T-Bar-Rudern', en: 'T-bar row', kind: 'weight', step: 2.5 },
      { key: 'pulloverMachine', de: 'Pullover-Maschine', en: 'Pullover machine', kind: 'plates' },
      { key: 'backExtension', de: 'Rückenstrecker', en: 'Back extension', kind: 'body' }
    ]
  },
  {
    id: 'legs', de: 'Beinmaschinen', en: 'Leg machines',
    items: [
      { key: 'legPress', de: 'Beinpresse', en: 'Leg press', kind: 'plates' },
      { key: 'hackSquat', de: 'Hackenschmidt-Maschine', en: 'Hack squat machine', kind: 'weight', step: 2.5 },
      { key: 'legExtension', de: 'Beinstrecker', en: 'Leg extension', kind: 'plates' },
      { key: 'legCurlLying', de: 'Beinbeuger liegend', en: 'Lying leg curl', kind: 'plates' },
      { key: 'legCurlSeated', de: 'Beinbeuger sitzend', en: 'Seated leg curl', kind: 'plates' },
      { key: 'calfRaiseSeated', de: 'Wadenheben sitzend', en: 'Seated calf raise', kind: 'plates' },
      { key: 'calfRaiseStanding', de: 'Wadenheben stehend', en: 'Standing calf raise', kind: 'plates' },
      { key: 'hipAbduction', de: 'Abduktoren-Maschine', en: 'Hip abduction machine', kind: 'plates' },
      { key: 'hipAdduction', de: 'Adduktoren-Maschine', en: 'Hip adduction machine', kind: 'plates' },
      { key: 'hipThrustMachine', de: 'Hip-Thrust-Maschine', en: 'Hip thrust machine', kind: 'plates' },
      { key: 'gluteKickbackMachine', de: 'Glute-Kickback-Maschine', en: 'Glute kickback machine', kind: 'plates' },
      { key: 'smithMachine', de: 'Multipresse', en: 'Smith machine', kind: 'weight', step: 2.5 }
    ]
  },
  {
    id: 'shouldersArms', de: 'Schultern und Arme', en: 'Shoulders and arms',
    items: [
      { key: 'shoulderPressMachine', de: 'Schulterpresse', en: 'Shoulder press machine', kind: 'plates' },
      { key: 'lateralRaiseMachine', de: 'Seitheben-Maschine', en: 'Lateral raise machine', kind: 'plates' },
      { key: 'bicepsCurlMachine', de: 'Bizepsmaschine', en: 'Biceps curl machine', kind: 'plates' },
      { key: 'tricepsMachine', de: 'Trizepsmaschine', en: 'Triceps extension machine', kind: 'plates' },
      { key: 'preacherBench', de: 'Scottbank', en: 'Preacher bench', kind: 'weight', step: 2.5 },
      { key: 'assistedDip', de: 'Dip-Maschine mit Gegengewicht', en: 'Assisted dip machine', kind: 'plates' },
      { key: 'wristRoller', de: 'Unterarmtrainer', en: 'Wrist roller', kind: 'weight', step: 1 }
    ]
  },
  {
    id: 'core', de: 'Rumpf', en: 'Core',
    items: [
      { key: 'abCrunchMachine', de: 'Bauchmaschine', en: 'Ab crunch machine', kind: 'plates' },
      { key: 'rotaryTorso', de: 'Rumpfrotations-Maschine', en: 'Rotary torso machine', kind: 'plates' },
      { key: 'captainsChair', de: 'Beinheber-Station', en: "Captain's chair", kind: 'body' },
      { key: 'romanChair', de: 'Römischer Stuhl', en: 'Roman chair', kind: 'body' },
      { key: 'abWheel', de: 'Bauchroller', en: 'Ab wheel', kind: 'body' },
      { key: 'mat', de: 'Trainingsmatte', en: 'Exercise mat', kind: 'body' }
    ]
  },
  {
    id: 'free', de: 'Freie Gewichte', en: 'Free weights',
    items: [
      { key: 'dumbbells', de: 'Kurzhanteln', en: 'Dumbbells', kind: 'weight', step: 2 },
      { key: 'adjustableDumbbells', de: 'Verstellbare Kurzhanteln', en: 'Adjustable dumbbells', kind: 'weight', step: 2.5 },
      { key: 'barbell', de: 'Langhantel', en: 'Barbell', kind: 'weight', step: 2.5 },
      { key: 'ezBar', de: 'SZ-Stange', en: 'EZ bar', kind: 'weight', step: 2.5 },
      { key: 'trapBar', de: 'Trap-Bar', en: 'Trap bar', kind: 'weight', step: 2.5 },
      { key: 'kettlebell', de: 'Kettlebell', en: 'Kettlebell', kind: 'weight', step: 4 },
      { key: 'weightPlates', de: 'Hantelscheiben', en: 'Weight plates', kind: 'weight', step: 1.25 },
      { key: 'medicineBall', de: 'Medizinball', en: 'Medicine ball', kind: 'weight', step: 1 },
      { key: 'slamBall', de: 'Slam Ball', en: 'Slam ball', kind: 'weight', step: 1 },
      { key: 'sandbag', de: 'Sandsack', en: 'Sandbag', kind: 'weight', step: 5 },
      { key: 'weightVest', de: 'Gewichtsweste', en: 'Weight vest', kind: 'weight', step: 1 },
      { key: 'resistanceBand', de: 'Widerstandsband', en: 'Resistance band', kind: 'body' },
      { key: 'gripTrainer', de: 'Handtrainer', en: 'Grip trainer', kind: 'body' }
    ]
  },
  {
    id: 'benchRack', de: 'Bänke und Racks', en: 'Benches and racks',
    items: [
      { key: 'flatBench', de: 'Flachbank', en: 'Flat bench', kind: 'body' },
      { key: 'inclineBench', de: 'Schrägbank', en: 'Incline bench', kind: 'body' },
      { key: 'declineBench', de: 'Negativbank', en: 'Decline bench', kind: 'body' },
      { key: 'adjustableBench', de: 'Verstellbare Hantelbank', en: 'Adjustable bench', kind: 'body' },
      { key: 'powerRack', de: 'Power Rack', en: 'Power rack', kind: 'weight', step: 2.5 },
      { key: 'squatRack', de: 'Kniebeugenständer', en: 'Squat rack', kind: 'weight', step: 2.5 },
      { key: 'benchPressStation', de: 'Bankdrückstation', en: 'Bench press station', kind: 'weight', step: 2.5 },
      { key: 'landmine', de: 'Landmine', en: 'Landmine', kind: 'weight', step: 2.5 }
    ]
  },
  {
    id: 'bodyweight', de: 'Körpergewicht', en: 'Bodyweight',
    items: [
      { key: 'pullupBar', de: 'Klimmzugstange', en: 'Pull-up bar', kind: 'body' },
      { key: 'dipBars', de: 'Dip-Barren', en: 'Dip bars', kind: 'body' },
      { key: 'gymnasticRings', de: 'Turnringe', en: 'Gymnastic rings', kind: 'body' },
      { key: 'suspensionTrainer', de: 'Schlingentrainer', en: 'Suspension trainer', kind: 'body' },
      { key: 'parallettes', de: 'Parallettes', en: 'Parallettes', kind: 'body' },
      { key: 'plyoBox', de: 'Sprungkasten', en: 'Plyo box', kind: 'body' },
      { key: 'stepPlatform', de: 'Steppbrett', en: 'Step platform', kind: 'body' },
      { key: 'floor', de: 'Boden, ohne Gerät', en: 'Floor, no equipment', kind: 'body' }
    ]
  },
  {
    id: 'cardio', de: 'Ausdauer', en: 'Cardio',
    items: [
      { key: 'treadmill', de: 'Laufband', en: 'Treadmill', kind: 'body' },
      { key: 'rowingMachine', de: 'Rudergerät', en: 'Rowing machine', kind: 'body' },
      { key: 'bike', de: 'Ergometer', en: 'Exercise bike', kind: 'body' },
      { key: 'spinBike', de: 'Indoor Bike', en: 'Spin bike', kind: 'body' },
      { key: 'elliptical', de: 'Crosstrainer', en: 'Elliptical', kind: 'body' },
      { key: 'stairClimber', de: 'Stepper', en: 'Stair climber', kind: 'body' },
      { key: 'skiErg', de: 'Ski-Ergometer', en: 'Ski erg', kind: 'body' },
      { key: 'airBike', de: 'Air Bike', en: 'Air bike', kind: 'body' },
      { key: 'jumpRope', de: 'Springseil', en: 'Jump rope', kind: 'body' }
    ]
  }
];

// Geräte, die mehrere Arten in einem Aufbau vereinen. Sie legen mehrere
// Einträge auf einmal an; abgewählt wird, was der eigene Aufbau nicht hat.
// Die Reihenfolge ist bewusst so: das Studio zuerst, weil es am häufigsten passt.
export const BUNDLES = [
  {
    key: 'gym',
    de: 'Fitnessstudio, übliche Ausstattung',
    en: 'Gym, usual equipment',
    deSub: 'Der gängige Maschinenpark samt freien Gewichten.',
    enSub: 'The usual set of machines plus free weights.',
    items: ['latPulldown', 'lowRowMachine', 'chestPress', 'pecDeck', 'shoulderPressMachine',
      'legPress', 'legExtension', 'legCurlSeated', 'abCrunchMachine', 'cableTower',
      'dumbbells', 'barbell', 'flatBench']
  },
  {
    key: 'multiGym',
    de: 'Kraftstation',
    en: 'Multi-gym',
    deSub: 'Turm mit Plattenstapel, mehrere Stationen an einem Gerät.',
    enSub: 'One tower with a weight stack and several stations.',
    items: ['latPulldown', 'chestPress', 'pecDeck', 'lowRowMachine', 'legExtension',
      'legCurlSeated', 'tricepsPushdown']
  },
  {
    key: 'cableStation',
    de: 'Kabelzug-Station',
    en: 'Cable station',
    deSub: 'Verstellbarer Kabelturm, meist mit Klimmzugstange.',
    enSub: 'Adjustable cable tower, usually with a pull-up bar.',
    items: ['cableTower', 'cableCrossover', 'pullupBar', 'mat']
  },
  {
    key: 'rack',
    de: 'Power Rack mit Langhantel',
    en: 'Power rack with barbell',
    deSub: 'Rack, Hantel, Scheiben, Bank — das klassische Heimstudio.',
    enSub: 'Rack, bar, plates, bench — the classic home setup.',
    items: ['powerRack', 'barbell', 'weightPlates', 'adjustableBench', 'pullupBar']
  },
  {
    key: 'benchSet',
    de: 'Hantelbank mit freien Gewichten',
    en: 'Bench with free weights',
    deSub: 'Bank, Kurzhanteln, Stange, Scheiben.',
    enSub: 'Bench, dumbbells, bar, plates.',
    items: ['adjustableBench', 'dumbbells', 'ezBar', 'weightPlates']
  },
  {
    key: 'bodyweightSet',
    de: 'Körpergewicht-Grundausstattung',
    en: 'Bodyweight basics',
    deSub: 'Ohne Gewichte, nur Aufhängung und Unterlage.',
    enSub: 'No weights, just something to hang from and a mat.',
    items: ['pullupBar', 'dipBars', 'suspensionTrainer', 'mat']
  }
];

export const bundleOf = key => BUNDLES.find(b => b.key === key) || null;

// Name in der eingestellten Sprache.
export const catName = o => o[getLang()] || o.de;
export const catSub = o => o[getLang() + 'Sub'] || o.deSub || '';

// Suchtext eines Eintrags: beide Sprachen, damit "bench" auch auf Deutsch findet.
export const searchText = o => (o.de + ' ' + o.en).toLowerCase();

export function catalogEntry(key) {
  for (const c of CATEGORIES) {
    const hit = c.items.find(i => i.key === key);
    if (hit) return hit;
  }
  return null;
}

export const catalogSize = CATEGORIES.reduce((n, c) => n + c.items.length, 0);
