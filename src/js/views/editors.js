// Editoren für Geräte, Übungen und Pläne.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { CATEGORIES, BUNDLES, bundleOf, catName, catSub, searchText, catalogEntry, catalogSize } from '../catalog.js';
import { EX_CATEGORIES, exCatalogEntry, exName, exSearchText } from '../ex-catalog.js';
import { weightText, recordText } from './sets.js';
import { esc, on, byId, val, toast, confirmBox, field, textIn, numIn, selectIn, checkIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

// Welcher Eintrag gerade bearbeitet wird: null = keiner, 'new' = neuer.
let editing = null;
let picked = null;           // Katalogschluessel, 'custom' oder null
let bundle = null;           // gewaehltes Kombigeraet
let pickedEx = null;         // Uebungskatalog: Schluessel, 'custom' oder null
let onlyMine = true;         // Uebungen auf die eigenen Geraete beschraenken
let picking = false;         // Mehrfachauswahl in der Uebungsliste
const chosen = new Set();    // was darin angehakt ist
export function resetEditing() {
  editing = null; picked = null; bundle = null; pickedEx = null;
  picking = false; chosen.clear();
}

// Die Kategorie des Katalogs ist zugleich die Muskelgruppe.
function muscleOptions() {
  return [{ id: '', label: t('ex.muscleNone') }]
    .concat(EX_CATEGORIES.map(c => ({ id: c.id, label: exName(c) })));
}
export function muscleLabel(id) {
  const c = EX_CATEGORIES.find(x => x.id === id);
  return c ? exName(c) : '';
}
function muscleOf(key) {
  const c = EX_CATEGORIES.find(x => x.items.some(i => i.key === key));
  return c ? c.id : '';
}

function sideOptions() {
  return [
    { id: '', label: '—' },
    { id: 'leg', label: t('plan.perLeg') },
    { id: 'arm', label: t('plan.perArm') },
    { id: 'alt', label: t('plan.alt') }
  ];
}

function kindOptions() {
  return [
    { id: 'plates', label: t('equip.kindPlates') },
    { id: 'weight', label: t('equip.kindWeight') },
    { id: 'body', label: t('equip.kindBody') }
  ];
}

function backBar(title) {
  return '<div class="sub-bar"><button class="mini" id="back">‹ ' + esc(t('common.back')) + '</button>' +
    '<h2>' + esc(title) + '</h2></div>';
}
function wireBack(to) {
  byId('back').addEventListener('click', () => {
    editing = null; picked = null; bundle = null; pickedEx = null; to();
  });
}

// ---------- Geräte ----------
export function equipment(mount, head, goHub) {
  if (editing) return equipmentForm(mount, head, goHub);

  const rows = st.S.equipment.map(eq => {
    const used = st.equipmentUsage(eq.id);
    const kind = kindOptions().find(k => k.id === eq.kind);
    const extra = eq.kind === 'plates' ? ' · ' + (eq.plate || 4.5) + ' kg'
      : eq.kind === 'weight' ? ' · ' + (eq.step || 2.5) + ' kg' : '';
    return '<div class="lst"><div class="lst-m">' +
      '<div class="lst-n">' + esc(st.nameOf(eq)) + '</div>' +
      '<div class="lst-s">' + esc(kind ? kind.label : eq.kind) + esc(extra) + ' · ' +
      esc(used ? t(used === 1 ? 'equip.inUse1' : 'equip.inUse', { n: used }) : t('equip.unused')) + '</div></div>' +
      '<div class="row-act">' +
      '<button class="mini" data-edit="' + eq.id + '">' + esc(t('common.edit')) + '</button>' +
      '<button class="mini warn" data-del="' + eq.id + '">' + esc(t('common.delete')) + '</button>' +
      '</div></div>';
  }).join('');

  mount.innerHTML = head() + backBar(t('equip.title')) +
    '<p class="intro">' + esc(t('equip.intro')) + '</p>' + rows +
    '<button class="set-btn" id="add">+ ' + esc(t('equip.add')) + '</button>';

  wireBack(goHub);
  byId('add').addEventListener('click', () => { editing = 'new'; rerender(); });
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const eq = st.equipOf(ev.currentTarget.dataset.del);
    if (!eq) return;
    if (st.equipmentUsage(eq.id)) { toast(t('equip.deleteBlocked'), true); return; }
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(eq) }))) return;
    undoable(st.deleteEquipment(eq.id));
  });
}

// Ein Kombigerät: alle Teile angehakt, abwählen was der eigene Aufbau nicht hat.
function bundleForm(mount, head, goHub) {
  const b = bundleOf(bundle);
  if (!b) { bundle = null; return equipmentPicker(mount, head, goHub); }

  const have = st.S.equipment.map(e => st.nameOf(e).toLowerCase());
  const rows = b.items.map(key => {
    const item = catalogEntry(key);
    if (!item) return '';
    const schon = have.includes(catName(item).toLowerCase());
    return '<label class="chk bundle-i">' +
      '<input type="checkbox" data-part="' + esc(key) + '"' + (schon ? '' : ' checked') + '>' +
      '<span>' + esc(catName(item)) +
      (schon ? ' <span class="lst-s">— ' + esc(t('equip.alreadyThere')) + '</span>' : '') +
      '</span></label>';
  }).join('');

  mount.innerHTML = head() + backBar(catName(b)) +
    '<p class="intro">' + esc(t('equip.bundleHint')) + '</p>' +
    rows +
    '<button class="set-btn go" id="addsel">' + esc(t('equip.bundleAdd', { n: b.items.length })) + '</button>';

  byId('back').addEventListener('click', () => { bundle = null; rerender(); });

  const zaehlen = () => [...document.querySelectorAll('[data-part]')].filter(c => c.checked);
  const nachzaehlen = () =>
    byId('addsel').textContent = t('equip.bundleAdd', { n: zaehlen().length });
  nachzaehlen();
  on('[data-part]', nachzaehlen, 'change');

  byId('addsel').addEventListener('click', () => {
    const gewaehlt = zaehlen().map(c => c.dataset.part);
    if (!gewaehlt.length) { toast(t('equip.bundleNone'), true); return; }
    let neu = 0, schon = 0;
    const namen = st.S.equipment.map(e => st.nameOf(e).toLowerCase());
    gewaehlt.forEach(key => {
      const item = catalogEntry(key);
      if (!item) return;
      if (namen.includes(catName(item).toLowerCase())) { schon++; return; }
      const data = { name: catName(item), kind: item.kind };
      if (item.kind === 'plates') data.plate = st.S.pw;
      if (item.kind === 'weight') data.step = item.step || 2.5;
      st.addEquipment(data);
      namen.push(catName(item).toLowerCase());
      neu++;
    });
    bundle = null;
    editing = null;
    picked = null;
    toast(t('equip.bundleDone', { n: neu }) +
      (schon ? ' ' + t('equip.bundleSkipped', { n: schon }) : ''));
  });
}

// Auswahl aus dem Katalog. Erscheint beim Anlegen, bevor das Formular kommt.
function equipmentPicker(mount, head, goHub) {
  if (bundle) return bundleForm(mount, head, goHub);

  const quick = BUNDLES.map(b =>
    '<button class="nav-row" data-bundle="' + esc(b.key) + '">' +
      '<span class="nav-n">' + esc(catName(b)) + '</span>' +
      '<span class="nav-s">' + esc(catSub(b)) + ' · ' +
        esc(t('equip.bundleCount', { n: b.items.length })) + '</span>' +
      '<span class="nav-c">›</span></button>').join('');

  const groups = CATEGORIES.map(c =>
    '<div class="cat" data-cat="' + c.id + '">' +
      '<h3 class="cat-h">' + esc(catName(c)) + '</h3>' +
      c.items.map(i =>
        '<button class="cat-i" data-pickeq="' + esc(i.key) + '" ' +
        'data-find="' + esc(searchText(i)) + '">' + esc(catName(i)) + '</button>').join('') +
    '</div>').join('');

  mount.innerHTML = head() + backBar(t('equip.pick')) +
    '<h3 class="sec first">' + esc(t('equip.bundles')) + '</h3>' +
    '<p class="intro">' + esc(t('equip.bundlesHint')) + '</p>' +
    quick +
    '<h3 class="sec">' + esc(t('equip.single')) + '</h3>' +
    '<p class="intro">' + esc(t('equip.pickHint')) + '</p>' +
    '<input class="in" id="f-search" type="search" autocomplete="off" ' +
      'placeholder="' + esc(t('equip.search')) + '">' +
    '<p class="intro" id="hits">' + esc(t('equip.fromCatalog', { n: catalogSize })) + '</p>' +
    '<div id="cats">' + groups + '</div>' +
    '<p class="intro" id="nomatch" hidden>' + esc(t('equip.noMatch')) + '</p>' +
    '<button class="set-btn" id="own">+ ' + esc(t('equip.custom')) + '</button>';

  wireBack(rerender);
  byId('own').addEventListener('click', () => { picked = 'custom'; rerender(); });
  on('[data-bundle]', ev => { bundle = ev.currentTarget.dataset.bundle; rerender(); });
  on('[data-pickeq]', ev => { picked = ev.currentTarget.dataset.pickeq; rerender(); });

  // Filtern ohne Neuaufbau, sonst verliert das Suchfeld den Fokus.
  const search = byId('f-search');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll('.cat').forEach(cat => {
      let inCat = 0;
      cat.querySelectorAll('.cat-i').forEach(b => {
        const hit = !q || b.dataset.find.includes(q);
        b.hidden = !hit;
        if (hit) inCat++;
      });
      cat.hidden = inCat === 0;
      shown += inCat;
    });
    byId('nomatch').hidden = shown > 0;
    byId('hits').textContent = q
      ? t('equip.fromCatalog', { n: shown })
      : t('equip.fromCatalog', { n: catalogSize });
  });
}

function equipmentForm(mount, head, goHub) {
  if (editing === 'new' && !picked) return equipmentPicker(mount, head, goHub);

  const fromCatalog = picked && picked !== 'custom' ? catalogEntry(picked) : null;
  const eq = editing === 'new'
    ? {
        kind: fromCatalog ? fromCatalog.kind : 'plates',
        plate: st.S.pw,
        step: fromCatalog && fromCatalog.step ? fromCatalog.step : 2.5,
        name: fromCatalog ? catName(fromCatalog) : ''
      }
    : st.equipOf(editing);
  if (!eq) { editing = null; return equipment(mount, head, goHub); }

  mount.innerHTML = head() + backBar(editing === 'new' ? t('equip.add') : st.nameOf(eq)) +
    field(t('equip.name'), textIn('f-name', editing === 'new' ? (eq.name || '') : st.nameOf(eq))) +
    field(t('equip.kind'), selectIn('f-kind', kindOptions(), eq.kind)) +
    '<div id="f-extra"></div>' +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>';

  const extra = () => {
    const kind = byId('f-kind').value;
    byId('f-extra').innerHTML =
      kind === 'plates' ? field(t('equip.plate'), numIn('f-plate', eq.plate || 4.5, '0.5', 0.5))
      : kind === 'weight' ? field(t('equip.step'), numIn('f-step', eq.step || 2.5, '0.5', 0.5))
      : '';
  };
  extra();
  byId('f-kind').addEventListener('change', extra);

  wireBack(rerender);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    const kind = byId('f-kind').value;
    const data = { name, kind };
    if (kind === 'plates') data.plate = parseFloat(val('f-plate')) || 4.5;
    if (kind === 'weight') data.step = parseFloat(val('f-step')) || 2.5;
    if (editing === 'new') st.addEquipment(data); else st.updateEquipment(editing, data);
    editing = null;
    picked = null;
  });
}

// Nach dem Löschen bleibt eine Meldung mit Rückgängig stehen.
// Mehrere auf einmal: ein Schnappschuss je Eintrag, ein Rückgängig für alle.
function undoableMany(snaps) {
  if (!snaps || !snaps.length) return;
  toast(t('undo.doneMany', { n: snaps.length }), false, {
    label: t('undo.action'),
    run: () => { st.restoreMany(snaps); toast(t('undo.back')); }
  });
}

function undoable(snap) {
  if (!snap) return;
  toast(t('undo.done'), false, {
    label: t('undo.action'),
    run: () => { st.restore(snap); toast(t('undo.back')); }
  });
}

// Zeichen für alles, was der virtuelle Trainer angelegt hat.
export function aiMark(obj) {
  return obj && obj.src === 'ai'
    ? ' <span class="ai-mark" title="' + esc(t('ex.aiMade')) + '">✦</span>'
    : '';
}

// ---------- Übungen ----------
export function exercises(mount, head, goHub) {
  if (editing) return exerciseForm(mount, head, goHub);

  const liste = st.visibleExercises();
  // Was inzwischen weg ist, kann auch nicht mehr angehakt sein.
  chosen.forEach(id => { if (!liste.some(e => e.id === id)) chosen.delete(id); });
  const vonKi = liste.some(e => e.src === 'ai');

  const rows = liste.map(ex => {
    const eq = st.equipOf(ex.equip);
    const inPlans = st.exerciseUsage(ex.id);
    const mitte = '<div class="lst-m">' +
      '<div class="lst-n">' + esc(st.nameOf(ex)) + aiMark(ex) + '</div>' +
      '<div class="lst-s">' + esc(st.nameOf(eq)) + ' · ' +
      esc(inPlans ? t(inPlans === 1 ? 'ex.inPlans1' : 'ex.inPlans', { n: inPlans }) : t('ex.notInPlan')) +
      '</div></div>';

    if (picking) {
      return '<label class="lst pick"><input type="checkbox" data-pick="' + ex.id + '"' +
        (chosen.has(ex.id) ? ' checked' : '') + '>' + mitte + '</label>';
    }
    return '<div class="lst">' + mitte + '<div class="row-act">' +
      '<button class="mini" data-edit="' + ex.id + '">' + esc(t('common.edit')) + '</button>' +
      '<button class="mini warn" data-del="' + ex.id + '">' + esc(t('common.delete')) + '</button>' +
      '</div></div>';
  }).join('');

  mount.innerHTML = head() + backBar(t('ex.title')) +
    '<p class="intro">' + esc(picking ? t('ex.multiHint') : t('ex.intro')) + '</p>' +
    (picking && liste.length ? pickBar() : '') +
    rows +
    (vonKi ? '<p class="fld-h">✦ ' + esc(t('ex.legend')) + '</p>' : '') +
    (liste.length
      ? '<button class="set-btn" id="multi">' + esc(t(picking ? 'ex.multiEnd' : 'ex.multi')) + '</button>'
      : '') +
    (picking ? '' : '<button class="set-btn" id="add">+ ' + esc(t('ex.add')) + '</button>');

  wireBack(goHub);

  const multi = byId('multi');
  if (multi) multi.addEventListener('click', () => {
    picking = !picking;
    chosen.clear();
    rerender();
  });

  if (picking) return wirePicking(liste);

  byId('add').addEventListener('click', () => { editing = 'new'; rerender(); });
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const ex = st.exOf(ev.currentTarget.dataset.del);
    if (!ex) return;
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(ex) }) + '\n' + t('ex.keepForHistory'))) return;
    undoable(st.deleteExercise(ex.id));
  });
}

function pickBar() {
  return '<div class="row-act pick-bar">' +
    '<button class="mini" id="all">' + esc(t('ex.selAll')) + '</button>' +
    '<button class="mini" id="none">' + esc(t('ex.selNone')) + '</button>' +
    '<button class="mini warn" id="delsel"' + (chosen.size ? '' : ' disabled') + '>' +
      esc(t('ex.delSel', { n: chosen.size })) + '</button>' +
    '</div>';
}

// Beim Anhaken wird nur der Knopf nachgeführt - die Liste neu zu zeichnen
// würde bei jedem Häkchen nach oben springen.
function wirePicking(liste) {
  const knopf = byId('delsel');
  const nachfuehren = () => {
    knopf.textContent = t('ex.delSel', { n: chosen.size });
    knopf.disabled = !chosen.size;
  };

  on('[data-pick]', ev => {
    const box = ev.currentTarget;
    if (box.checked) chosen.add(box.dataset.pick);
    else chosen.delete(box.dataset.pick);
    nachfuehren();
  }, 'change');

  byId('all').addEventListener('click', () => {
    liste.forEach(ex => chosen.add(ex.id));
    document.querySelectorAll('[data-pick]').forEach(b => { b.checked = true; });
    nachfuehren();
  });
  byId('none').addEventListener('click', () => {
    chosen.clear();
    document.querySelectorAll('[data-pick]').forEach(b => { b.checked = false; });
    nachfuehren();
  });

  knopf.addEventListener('click', () => {
    const ids = [...chosen];
    if (!ids.length) return;
    if (!confirmBox(t('ex.delSelAsk', { n: ids.length }) + '\n' + t('ex.keepForHistory'))) return;
    const snaps = st.deleteExercises(ids);
    chosen.clear();
    undoableMany(snaps);
  });
}

// Auswahl aus dem Übungskatalog, vor dem Formular.
function exercisePicker(mount, head, goHub) {
  const meine = new Set(st.S.equipment.map(e => st.nameOf(e).toLowerCase()));
  // Ein Katalogeintrag passt, wenn das zugehörige Gerät bei mir steht.
  const passt = i => {
    const eq = catalogEntry(i.eq);
    return eq ? meine.has(catName(eq).toLowerCase()) : false;
  };

  const groups = EX_CATEGORIES.map(c =>
    '<div class="cat" data-cat="' + c.id + '">' +
      '<h3 class="cat-h">' + esc(exName(c)) + '</h3>' +
      c.items.map(i => {
        const eq = catalogEntry(i.eq);
        return '<button class="cat-i" data-pickex="' + esc(i.key) + '" ' +
          'data-mine="' + (passt(i) ? '1' : '0') + '" ' +
          'data-find="' + esc(exSearchText(i)) + '">' + esc(exName(i)) +
          '<span class="cat-eq">' + esc(eq ? catName(eq) : '') + '</span></button>';
      }).join('') +
    '</div>').join('');

  mount.innerHTML = head() + backBar(t('ex.pick')) +
    '<p class="intro">' + esc(t('ex.pickHint')) + '</p>' +
    '<label class="chk"><input type="checkbox" id="f-mine"' + (onlyMine ? ' checked' : '') + '>' +
      '<span>' + esc(t('ex.onlyMine')) + '</span></label>' +
    '<input class="in" id="f-search" type="search" autocomplete="off" ' +
      'placeholder="' + esc(t('ex.search')) + '">' +
    '<p class="intro" id="hits"></p>' +
    '<div id="cats">' + groups + '</div>' +
    '<p class="intro" id="nomatch" hidden>' + esc(t('ex.noMatch')) + '</p>' +
    '<button class="set-btn" id="own">+ ' + esc(t('ex.custom')) + '</button>';

  wireBack(rerender);
  byId('own').addEventListener('click', () => { pickedEx = 'custom'; rerender(); });
  on('[data-pickex]', ev => { pickedEx = ev.currentTarget.dataset.pickex; rerender(); });

  const search = byId('f-search');
  const mine = byId('f-mine');
  const filter = () => {
    const q = search.value.trim().toLowerCase();
    const nurMeine = mine.checked;
    let shown = 0;
    document.querySelectorAll('.cat').forEach(cat => {
      let inCat = 0;
      cat.querySelectorAll('.cat-i').forEach(b => {
        const hit = (!q || b.dataset.find.includes(q)) && (!nurMeine || b.dataset.mine === '1');
        b.hidden = !hit;
        if (hit) inCat++;
      });
      cat.hidden = inCat === 0;
      shown += inCat;
    });
    byId('nomatch').hidden = shown > 0;
    byId('hits').textContent = t('ex.fromCatalog', { n: shown });
  };
  filter();
  search.addEventListener('input', filter);
  mine.addEventListener('change', () => { onlyMine = mine.checked; filter(); });
}

function exerciseForm(mount, head, goHub) {
  if (editing === 'new' && !pickedEx) return exercisePicker(mount, head, goHub);

  const ausKatalog = pickedEx && pickedEx !== 'custom' ? exCatalogEntry(pickedEx) : null;
  const geraetTyp = ausKatalog ? catalogEntry(ausKatalog.eq) : null;
  // Passendes Gerät suchen; fehlt es, kann es beim Speichern mit angelegt werden.
  const vorhanden = geraetTyp
    ? st.S.equipment.find(e => st.nameOf(e).toLowerCase() === catName(geraetTyp).toLowerCase())
    : null;

  const ex = editing === 'new'
    ? {
        equip: vorhanden ? vorhanden.id : (st.S.equipment[0] && st.S.equipment[0].id),
        name: ausKatalog ? exName(ausKatalog) : '',
        muscle: ausKatalog ? muscleOf(ausKatalog.key) : ''
      }
    : st.exOf(editing);
  if (!ex) { editing = null; return exercises(mount, head, goHub); }
  const eqOpts = st.S.equipment.map(e => ({ id: e.id, label: st.nameOf(e) }));
  const bands = ex.bands || [];

  // Fehlt das Gerät aus dem Katalog, wird es auf Wunsch gleich mit angelegt.
  const fehlendesGeraet = geraetTyp && !vorhanden ? geraetTyp : null;

  mount.innerHTML = head() + backBar(editing === 'new' ? t('ex.add') : st.nameOf(ex)) +
    field(t('ex.name'), textIn('f-name', editing === 'new' ? (ex.name || '') : st.nameOf(ex))) +
    (fehlendesGeraet
      ? '<p class="intro">' + esc(t('ex.needsEquip', { name: catName(fehlendesGeraet) })) + '</p>' +
        '<label class="chk"><input type="checkbox" id="f-addeq" checked><span>' +
        esc(t('ex.addEquipToo')) + '</span></label>'
      : '') +
    field(t('ex.equip'), selectIn('f-equip', eqOpts, ex.equip)) +
    field(t('ex.muscle'), selectIn('f-muscle', muscleOptions(), ex.muscle || '')) +
    field(t('ex.bands'),
      '<span class="two">' + numIn('f-b1', bands[0] == null ? '' : bands[0], '0.5', 0) +
      numIn('f-b2', bands[1] == null ? '' : bands[1], '0.5', 0) + '</span>',
      t('ex.bandsSub')) +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>' +
    (editing === 'new' ? '' : exerciseStats(editing));

  wireBack(rerender);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    const b1 = parseFloat(val('f-b1')), b2 = parseFloat(val('f-b2'));

    let equip = byId('f-equip').value;
    const mitAnlegen = byId('f-addeq');
    if (fehlendesGeraet && mitAnlegen && mitAnlegen.checked) {
      const daten = { name: catName(fehlendesGeraet), kind: fehlendesGeraet.kind };
      if (fehlendesGeraet.kind === 'plates') daten.plate = st.S.pw;
      if (fehlendesGeraet.kind === 'weight') daten.step = fehlendesGeraet.step || 2.5;
      equip = st.addEquipment(daten).id;
    }

    const data = { name, equip, muscle: byId('f-muscle').value || undefined };
    data.bands = (isFinite(b1) && isFinite(b2)) ? [b1, b2] : undefined;
    if (editing === 'new') st.addExercise(data); else st.updateExercise(editing, data);
    editing = null;
    pickedEx = null;
  });
}

// Bestleistung und die letzten Einheiten einer Übung.
function exerciseStats(exId) {
  const best = st.personalRecord(exId);
  const verlauf = st.exerciseHistory(exId, 12);
  if (!best && !verlauf.length) return '';

  const hoch = Math.max(1, ...verlauf.map(v => v.weight || 0));
  const balken = verlauf.map(v =>
    '<div class="bar-col" title="' + esc(v.date) + '">' +
    '<div class="bar-v full" style="height:' + Math.max(4, Math.round((v.weight / hoch) * 100)) + '%"></div>' +
    '</div>').join('');

  const zeilen = verlauf.slice(-6).reverse().map(v =>
    '<div class="dt-row"><span class="dt-m">' + esc(v.date.slice(5).replace('-', '.')) + '</span>' +
    '<span class="dt-n">' + esc((v.reps || []).filter(r => r > 0).join('/') || '—') + '</span>' +
    '<span class="dt-w">' + esc(weightText(exId, v.weight)) + '</span></div>').join('');

  return '<h3 class="sec">' + esc(t('set.history')) + '</h3>' +
    (best ? '<p class="intro">' + esc(t('set.record', { text: recordText(exId, best) })) + '</p>' : '') +
    (verlauf.length ? '<div class="bars">' + balken + '</div>' + zeilen
                    : '<p class="fld-h">' + esc(t('set.noHistory')) + '</p>');
}

// ---------- Pläne ----------
export function plans(mount, head, goHub, openPlanner) {
  if (editing) return planForm(mount, head, goHub);

  const rows = st.S.plans.map(p =>
    '<div class="lst"><div class="lst-m">' +
    '<div class="lst-n"><span class="tag">' + esc(p.short || '?') + '</span> ' +
      esc(st.nameOf(p)) + aiMark(p) + '</div>' +
    '<div class="lst-s">' + esc(st.focusOf(p) || '—') + ' · ' + p.items.length + '</div></div>' +
    '<div class="row-act">' +
    '<button class="mini" data-up="' + p.id + '" aria-label="' + esc(t('plan.moveUp')) + '">↑</button>' +
    '<button class="mini" data-down="' + p.id + '" aria-label="' + esc(t('plan.moveDown')) + '">↓</button>' +
    '<button class="mini" data-copy="' + p.id + '">' + esc(t('plan.copy')) + '</button>' +
    '<button class="mini" data-edit="' + p.id + '">' + esc(t('common.edit')) + '</button>' +
    '<button class="mini warn" data-del="' + p.id + '">' + esc(t('common.delete')) + '</button>' +
    '</div></div>').join('');

  const verbunden = !!(st.S.ai.keys[st.S.ai.provider] || '').trim();

  mount.innerHTML = head() + backBar(t('pl.title')) +
    '<p class="intro">' + esc(t('pl.intro')) + '</p>' + rows +
    (st.S.plans.some(p => p.src === 'ai') ? '<p class="fld-h">✦ ' + esc(t('ex.legend')) + '</p>' : '') +
    '<button class="set-btn" id="add">+ ' + esc(t('pl.add')) + '</button>' +
    '<button class="nav-row" id="ai">' +
      '<span class="nav-n">✦ ' + esc(t('pl.aiCreate')) + '</span>' +
      '<span class="nav-s">' + esc(verbunden ? t('pl.aiCreateSub') : t('pl.aiNeedsKey')) + '</span>' +
      '<span class="nav-c">›</span></button>';

  wireBack(goHub);
  byId('ai').addEventListener('click', () => {
    if (!verbunden) { toast(t('pl.aiNeedsKey'), true); return; }
    openPlanner();
  });
  byId('add').addEventListener('click', () => {
    const p = st.addPlan({ name: t('common.new'), focus: '' });
    editing = p.id;
  });
  on('[data-copy]', ev => {
    st.duplicatePlan(ev.currentTarget.dataset.copy);
    toast(t('plan.copied'));
  });
  on('[data-up]', ev => st.movePlan(ev.currentTarget.dataset.up, -1));
  on('[data-down]', ev => st.movePlan(ev.currentTarget.dataset.down, 1));
  on('[data-edit]', ev => { editing = ev.currentTarget.dataset.edit; rerender(); });
  on('[data-del]', ev => {
    const p = st.planOf(ev.currentTarget.dataset.del);
    if (!p) return;
    if (!confirmBox(t('common.deleteAsk', { name: st.nameOf(p) }))) return;
    undoable(st.deletePlan(p.id));
  });
}

function planForm(mount, head, goHub) {
  const p = st.planOf(editing);
  if (!p) { editing = null; return plans(mount, head, goHub); }

  const items = p.items.map(i => {
    const ex = st.exOf(i.ex);
    return '<div class="pi"><div class="pi-n">' + esc(st.nameOf(ex)) + '</div>' +
      '<div class="pi-f">' +
        '<input class="in tiny" data-reps="' + i.ex + '" value="' + esc(i.reps || '') + '" ' +
        'aria-label="' + esc(t('pl.reps')) + '">' +
        '<input class="in tiny num" type="number" min="1" max="10" data-sets="' + i.ex + '" ' +
        'value="' + (i.sets || 3) + '" aria-label="' + esc(t('pl.setCount')) + '">' +
        '<select class="in tiny" data-side="' + i.ex + '" aria-label="' + esc(t('plan.side')) + '">' +
          sideOptions().map(o => '<option value="' + o.id + '"' +
            (o.id === (i.side || '') ? ' selected' : '') + '>' + esc(o.label) + '</option>').join('') +
        '</select>' +
      '</div>' +
      '<div class="row-act">' +
        '<button class="mini" data-up="' + i.ex + '" aria-label="' + esc(t('pl.up')) + '">↑</button>' +
        '<button class="mini" data-down="' + i.ex + '" aria-label="' + esc(t('pl.down')) + '">↓</button>' +
        '<button class="mini warn" data-rm="' + i.ex + '">×</button>' +
      '</div></div>';
  }).join('');

  const free = st.visibleExercises().filter(e => !p.items.some(i => i.ex === e.id));

  mount.innerHTML = head() + backBar(st.nameOf(p)) +
    field(t('pl.name'), textIn('f-name', st.nameOf(p))) +
    field(t('pl.short'), textIn('f-short', p.short || ''), t('pl.shortSub')) +
    field(t('pl.focus'), textIn('f-focus', st.focusOf(p))) +
    checkIn('f-night', t('pl.night'), !!p.night) +
    '<p class="fld-h">' + esc(t('pl.nightSub')) + '</p>' +
    '<button class="set-btn" id="save">' + esc(t('common.save')) + '</button>' +
    '<h3 class="sec">' + esc(t('pl.items')) + '</h3>' +
    (items || '<p class="intro">' + esc(t('pl.empty')) + '</p>') +
    (free.length
      ? '<div class="add-row">' +
        selectIn('f-add', free.map(e => ({ id: e.id, label: st.nameOf(e) })), free[0].id) +
        '<button class="mini" id="additem">+ ' + esc(t('pl.addItem')) + '</button></div>'
      : '<p class="intro">' + esc(st.visibleExercises().length ? '' : t('pl.noExercises')) + '</p>');

  wireBack(rerender);
  byId('save').addEventListener('click', () => {
    const name = val('f-name');
    if (!name) { toast(t('common.nameMissing'), true); return; }
    st.updatePlan(p.id, {
      name,
      short: val('f-short').slice(0, 2) || p.short,
      focus: val('f-focus'),
      night: byId('f-night').checked
    });
  });
  if (byId('additem')) {
    byId('additem').addEventListener('click', () => st.addPlanItem(p.id, byId('f-add').value));
  }
  on('[data-rm]', ev => st.removePlanItem(p.id, ev.currentTarget.dataset.rm));
  on('[data-up]', ev => st.movePlanItem(p.id, ev.currentTarget.dataset.up, -1));
  on('[data-down]', ev => st.movePlanItem(p.id, ev.currentTarget.dataset.down, 1));
  on('[data-reps]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.reps, { reps: ev.currentTarget.value }), 'change');
  on('[data-sets]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.sets,
    { sets: Math.max(1, Math.min(10, parseInt(ev.currentTarget.value, 10) || 3)) }), 'change');
  on('[data-side]', ev => st.updatePlanItem(p.id, ev.currentTarget.dataset.side,
    { side: ev.currentTarget.value || undefined }), 'change');
}
