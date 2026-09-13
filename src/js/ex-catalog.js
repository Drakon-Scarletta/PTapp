// Katalog bekannter Übungen, nach Muskelgruppe geordnet.
// `eq` verweist auf einen Schlüssel aus dem Gerätekatalog (catalog.js) - daran
// erkennt die App, ob das passende Gerät schon angelegt ist.
import { getLang } from './i18n.js';

export const EX_CATEGORIES = [
  {
    id: 'chest', de: 'Brust', en: 'Chest',
    items: [
      { key: 'benchPress', de: 'Bankdrücken', en: 'Bench press', eq: 'barbell' },
      { key: 'inclineBenchPress', de: 'Schrägbankdrücken', en: 'Incline bench press', eq: 'barbell' },
      { key: 'closeGripBench', de: 'Enges Bankdrücken', en: 'Close-grip bench press', eq: 'barbell' },
      { key: 'dumbbellPress', de: 'Kurzhantel-Bankdrücken', en: 'Dumbbell bench press', eq: 'dumbbells' },
      { key: 'inclineDumbbellPress', de: 'Schrägbankdrücken mit Kurzhanteln', en: 'Incline dumbbell press', eq: 'dumbbells' },
      { key: 'dumbbellFly', de: 'Fliegende mit Kurzhanteln', en: 'Dumbbell fly', eq: 'dumbbells' },
      { key: 'chestPressEx', de: 'Brustpresse', en: 'Chest press', eq: 'chestPress' },
      { key: 'verticalChestPressEx', de: 'Vertical Chest Press', en: 'Vertical chest press', eq: 'verticalChestPress' },
      { key: 'pecDeckFly', de: 'Butterfly', en: 'Pec deck fly', eq: 'pecDeck' },
      { key: 'cableCrossoverEx', de: 'Kabelkreuzheben', en: 'Cable crossover', eq: 'cableCrossover' },
      { key: 'pushup', de: 'Liegestütze', en: 'Push-up', eq: 'floor' },
      { key: 'dips', de: 'Dips', en: 'Dips', eq: 'dipBars' },
      { key: 'assistedDipsEx', de: 'Dips mit Gegengewicht', en: 'Assisted dips', eq: 'assistedDip' },
      { key: 'smithBenchPress', de: 'Bankdrücken an der Multipresse', en: 'Smith machine bench press', eq: 'smithMachine' }
    ]
  },
  {
    id: 'back', de: 'Rücken', en: 'Back',
    items: [
      { key: 'latPulldownEx', de: 'Latziehen', en: 'Lat pulldown', eq: 'latPulldown' },
      { key: 'latPulldownNarrow', de: 'Latziehen eng', en: 'Close-grip lat pulldown', eq: 'latPulldown' },
      { key: 'pullup', de: 'Klimmzug', en: 'Pull-up', eq: 'pullupBar' },
      { key: 'chinup', de: 'Klimmzug im Untergriff', en: 'Chin-up', eq: 'pullupBar' },
      { key: 'assistedPullupEx', de: 'Klimmzug mit Gegengewicht', en: 'Assisted pull-up', eq: 'assistedPullup' },
      { key: 'seatedRowEx', de: 'Rudern sitzend am Kabel', en: 'Seated cable row', eq: 'seatedRow' },
      { key: 'lowRowEx', de: 'Ruderzug an der Maschine', en: 'Machine row', eq: 'lowRowMachine' },
      { key: 'barbellRow', de: 'Langhantelrudern', en: 'Barbell row', eq: 'barbell' },
      { key: 'dumbbellRow', de: 'Kurzhantelrudern', en: 'Dumbbell row', eq: 'dumbbells' },
      { key: 'tBarRowEx', de: 'T-Bar-Rudern', en: 'T-bar row', eq: 'tBarRow' },
      { key: 'invertedRow', de: 'Rudern am Schlingentrainer', en: 'Inverted row', eq: 'suspensionTrainer' },
      { key: 'facePullEx', de: 'Face Pull', en: 'Face pull', eq: 'facePull' },
      { key: 'pulloverEx', de: 'Pullover', en: 'Pullover', eq: 'pulloverMachine' },
      { key: 'deadlift', de: 'Kreuzheben', en: 'Deadlift', eq: 'barbell' },
      { key: 'rackPull', de: 'Rack Pull', en: 'Rack pull', eq: 'powerRack' },
      { key: 'shrug', de: 'Schulterheben', en: 'Shrug', eq: 'dumbbells' },
      { key: 'backExtensionEx', de: 'Rückenstrecken', en: 'Back extension', eq: 'backExtension' }
    ]
  },
  {
    id: 'legs', de: 'Beine und Gesäß', en: 'Legs and glutes',
    items: [
      { key: 'squat', de: 'Kniebeuge', en: 'Squat', eq: 'barbell' },
      { key: 'frontSquat', de: 'Frontkniebeuge', en: 'Front squat', eq: 'barbell' },
      { key: 'gobletSquat', de: 'Goblet Squat', en: 'Goblet squat', eq: 'kettlebell' },
      { key: 'smithSquat', de: 'Kniebeuge an der Multipresse', en: 'Smith machine squat', eq: 'smithMachine' },
      { key: 'legPressEx', de: 'Beinpresse', en: 'Leg press', eq: 'legPress' },
      { key: 'hackSquatEx', de: 'Hackenschmidt-Kniebeuge', en: 'Hack squat', eq: 'hackSquat' },
      { key: 'legExtensionEx', de: 'Beinstrecken', en: 'Leg extension', eq: 'legExtension' },
      { key: 'legCurlLyingEx', de: 'Beinbeugen liegend', en: 'Lying leg curl', eq: 'legCurlLying' },
      { key: 'legCurlSeatedEx', de: 'Beinbeugen sitzend', en: 'Seated leg curl', eq: 'legCurlSeated' },
      { key: 'romanianDeadlift', de: 'Rumänisches Kreuzheben', en: 'Romanian deadlift', eq: 'barbell' },
      { key: 'bulgarianSplitSquat', de: 'Bulgarische Kniebeuge', en: 'Bulgarian split squat', eq: 'dumbbells' },
      { key: 'lunge', de: 'Ausfallschritt', en: 'Lunge', eq: 'dumbbells' },
      { key: 'walkingLunge', de: 'Gehender Ausfallschritt', en: 'Walking lunge', eq: 'dumbbells' },
      { key: 'stepUp', de: 'Aufsteigen auf den Kasten', en: 'Step-up', eq: 'plyoBox' },
      { key: 'wallSit', de: 'Wandsitzen', en: 'Wall sit', eq: 'floor' },
      { key: 'calfRaiseSeatedEx', de: 'Wadenheben sitzend', en: 'Seated calf raise', eq: 'calfRaiseSeated' },
      { key: 'calfRaiseStandingEx', de: 'Wadenheben stehend', en: 'Standing calf raise', eq: 'calfRaiseStanding' },
      { key: 'calfRaiseStep', de: 'Wadenheben auf der Stufe', en: 'Calf raise on a step', eq: 'stepPlatform' },
      { key: 'hipThrustEx', de: 'Hip Thrust an der Maschine', en: 'Machine hip thrust', eq: 'hipThrustMachine' },
      { key: 'barbellHipThrust', de: 'Hip Thrust mit Langhantel', en: 'Barbell hip thrust', eq: 'barbell' },
      { key: 'gluteBridge', de: 'Beckenheben', en: 'Glute bridge', eq: 'mat' },
      { key: 'hipAbductionEx', de: 'Abduktoren', en: 'Hip abduction', eq: 'hipAbduction' },
      { key: 'hipAdductionEx', de: 'Adduktoren', en: 'Hip adduction', eq: 'hipAdduction' },
      { key: 'cableKickbackEx', de: 'Kickback am Kabel', en: 'Cable kickback', eq: 'cableKickback' }
    ]
  },
  {
    id: 'shoulders', de: 'Schultern', en: 'Shoulders',
    items: [
      { key: 'overheadPress', de: 'Schulterdrücken mit Langhantel', en: 'Overhead press', eq: 'barbell' },
      { key: 'dumbbellShoulderPress', de: 'Schulterdrücken mit Kurzhanteln', en: 'Dumbbell shoulder press', eq: 'dumbbells' },
      { key: 'shoulderPressMachineEx', de: 'Schulterpresse', en: 'Machine shoulder press', eq: 'shoulderPressMachine' },
      { key: 'arnoldPress', de: 'Arnold Press', en: 'Arnold press', eq: 'dumbbells' },
      { key: 'lateralRaise', de: 'Seitheben', en: 'Lateral raise', eq: 'dumbbells' },
      { key: 'lateralRaiseCable', de: 'Seitheben am Kabel', en: 'Cable lateral raise', eq: 'cableTower' },
      { key: 'lateralRaiseMachineEx', de: 'Seitheben an der Maschine', en: 'Machine lateral raise', eq: 'lateralRaiseMachine' },
      { key: 'frontRaise', de: 'Frontheben', en: 'Front raise', eq: 'dumbbells' },
      { key: 'reverseFlyEx', de: 'Butterfly reverse', en: 'Reverse fly', eq: 'reverseFly' },
      { key: 'reverseFlyDumbbell', de: 'Reverse Fly mit Kurzhanteln', en: 'Dumbbell reverse fly', eq: 'dumbbells' },
      { key: 'uprightRow', de: 'Aufrechtes Rudern', en: 'Upright row', eq: 'ezBar' },
      { key: 'pikePushup', de: 'Pike-Liegestütz', en: 'Pike push-up', eq: 'floor' }
    ]
  },
  {
    id: 'arms', de: 'Arme', en: 'Arms',
    items: [
      { key: 'bicepsCurlDumbbell', de: 'Bizepscurl mit Kurzhanteln', en: 'Dumbbell curl', eq: 'dumbbells' },
      { key: 'bicepsCurlBarbell', de: 'Bizepscurl mit SZ-Stange', en: 'EZ bar curl', eq: 'ezBar' },
      { key: 'hammerCurl', de: 'Hammercurl', en: 'Hammer curl', eq: 'dumbbells' },
      { key: 'preacherCurl', de: 'Scottcurl', en: 'Preacher curl', eq: 'preacherBench' },
      { key: 'cableCurlEx', de: 'Bizepscurl am Kabel', en: 'Cable curl', eq: 'cableCurl' },
      { key: 'concentrationCurl', de: 'Konzentrationscurl', en: 'Concentration curl', eq: 'dumbbells' },
      { key: 'bicepsMachineEx', de: 'Bizeps an der Maschine', en: 'Machine biceps curl', eq: 'bicepsCurlMachine' },
      { key: 'tricepsPushdownEx', de: 'Trizepsdrücken am Kabel', en: 'Triceps pushdown', eq: 'tricepsPushdown' },
      { key: 'overheadTricepsExtension', de: 'Trizepsdrücken über Kopf', en: 'Overhead triceps extension', eq: 'dumbbells' },
      { key: 'skullcrusher', de: 'Stirndrücken', en: 'Skullcrusher', eq: 'ezBar' },
      { key: 'tricepsKickback', de: 'Trizeps-Kickback', en: 'Triceps kickback', eq: 'dumbbells' },
      { key: 'tricepsDips', de: 'Trizeps-Dips', en: 'Triceps dips', eq: 'dipBars' },
      { key: 'tricepsMachineEx', de: 'Trizeps an der Maschine', en: 'Machine triceps extension', eq: 'tricepsMachine' },
      { key: 'wristCurl', de: 'Handgelenkcurl', en: 'Wrist curl', eq: 'dumbbells' },
      { key: 'farmersCarry', de: 'Farmer’s Walk', en: "Farmer's carry", eq: 'dumbbells' }
    ]
  },
  {
    id: 'core', de: 'Rumpf', en: 'Core',
    items: [
      { key: 'crunch', de: 'Crunch', en: 'Crunch', eq: 'mat' },
      { key: 'bicycleCrunch', de: 'Fahrrad-Crunch', en: 'Bicycle crunch', eq: 'mat' },
      { key: 'cableAbCrunchEx', de: 'Bauchcrunch am Kabel', en: 'Cable ab crunch', eq: 'cableAbCrunch' },
      { key: 'abCrunchMachineEx', de: 'Bauchmaschine', en: 'Machine ab crunch', eq: 'abCrunchMachine' },
      { key: 'plankEx', de: 'Plank', en: 'Plank', eq: 'mat' },
      { key: 'sidePlank', de: 'Seitlicher Plank', en: 'Side plank', eq: 'mat' },
      { key: 'deadBug', de: 'Dead Bug', en: 'Dead bug', eq: 'mat' },
      { key: 'hollowHold', de: 'Hollow Hold', en: 'Hollow hold', eq: 'mat' },
      { key: 'legRaiseHanging', de: 'Hängendes Beinheben', en: 'Hanging leg raise', eq: 'pullupBar' },
      { key: 'legRaiseCaptain', de: 'Beinheben an der Station', en: 'Captain’s chair leg raise', eq: 'captainsChair' },
      { key: 'russianTwist', de: 'Russian Twist', en: 'Russian twist', eq: 'medicineBall' },
      { key: 'woodchopEx', de: 'Holzhacker am Kabel', en: 'Cable woodchop', eq: 'cableWoodchop' },
      { key: 'rotaryTorsoEx', de: 'Rumpfrotation', en: 'Rotary torso', eq: 'rotaryTorso' },
      { key: 'abWheelRollout', de: 'Bauchroller', en: 'Ab wheel rollout', eq: 'abWheel' },
      { key: 'romanChairExtension', de: 'Rückenstrecken am römischen Stuhl', en: 'Roman chair extension', eq: 'romanChair' },
      { key: 'mountainClimber', de: 'Bergsteiger', en: 'Mountain climber', eq: 'floor' }
    ]
  },
  {
    id: 'fullbody', de: 'Ganzkörper und Ausdauer', en: 'Full body and cardio',
    items: [
      { key: 'burpee', de: 'Burpee', en: 'Burpee', eq: 'floor' },
      { key: 'kettlebellSwing', de: 'Kettlebell Swing', en: 'Kettlebell swing', eq: 'kettlebell' },
      { key: 'thruster', de: 'Thruster', en: 'Thruster', eq: 'barbell' },
      { key: 'powerClean', de: 'Umsetzen', en: 'Power clean', eq: 'barbell' },
      { key: 'boxJump', de: 'Kastensprung', en: 'Box jump', eq: 'plyoBox' },
      { key: 'jumpRopeEx', de: 'Seilspringen', en: 'Jump rope', eq: 'jumpRope' },
      { key: 'rowErg', de: 'Rudern am Ergometer', en: 'Rowing machine', eq: 'rowingMachine' },
      { key: 'bikeErg', de: 'Radfahren', en: 'Exercise bike', eq: 'bike' },
      { key: 'spinBikeEx', de: 'Indoor Cycling', en: 'Indoor cycling', eq: 'spinBike' },
      { key: 'treadmillRun', de: 'Laufen am Band', en: 'Treadmill run', eq: 'treadmill' },
      { key: 'treadmillWalk', de: 'Gehen am Band', en: 'Treadmill walk', eq: 'treadmill' },
      { key: 'ellipticalEx', de: 'Crosstrainer', en: 'Elliptical', eq: 'elliptical' },
      { key: 'stairClimberEx', de: 'Stepper', en: 'Stair climber', eq: 'stairClimber' },
      { key: 'skiErgEx', de: 'Ski-Ergometer', en: 'Ski erg', eq: 'skiErg' },
      { key: 'airBikeEx', de: 'Air Bike', en: 'Air bike', eq: 'airBike' }
    ]
  }
];

export const exCatalogSize = EX_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

export function exCatalogEntry(key) {
  for (const c of EX_CATEGORIES) {
    const hit = c.items.find(i => i.key === key);
    if (hit) return hit;
  }
  return null;
}

export const exName = o => o[getLang()] || o.de;
export const exSearchText = o => (o.de + ' ' + o.en).toLowerCase();
