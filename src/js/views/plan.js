import { PLANS, WEEKDAYS, goal } from '../data.js';
import * as st from '../state.js';
import { esc, on, haptic } from '../ui.js';

function weekStrip() {
  const m = st.monday(st.today);
  let h = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(m); d.setDate(m.getDate() + i);
    const key = st.iso(d), e = st.S.log[key], done = e && e.done;
    h += '<div class="tp-day' + (done ? ' filled' : '') + (key === st.tk ? ' today' : '') + '">' +
         '<div class="d">' + WEEKDAYS[i] + '</div>' +
         '<div class="m' + (done ? '' : ' empty') + '">' + (done ? e.k : '·') + '</div></div>';
  }
  return '<div class="tp-week">' + h + '</div>';
}

function exerciseRow(x, e) {
  const g = goal(x), n = st.setsDone(e, x), ok = n >= g;
  const bd = x.bw ? null : st.band(x.id);
  const right = x.bw
    ? '<div class="tp-bw">Körpergewicht</div>'
    : '<div class="tp-kg">' +
        '<button data-kg="' + x.id + '" data-dir="-1" aria-label="Eine Platte weniger">−</button>' +
        '<div class="val">' + (st.S.kg[x.id] || 0) +
          '<small> Pl.</small><div class="sub">' +
          '<i class="dot ' + (bd || 'n') + '"></i>' + st.plateKg(x.id) + ' kg</div></div>' +
        '<button data-kg="' + x.id + '" data-dir="1" aria-label="Eine Platte mehr">+</button>' +
      '</div>';
  return '<div class="tp-ex' + (ok ? ' ok' : '') + (n > 0 && !ok ? ' part' : '') +
    '" data-ex="' + x.id + '" role="button" tabindex="0" ' +
    'aria-label="' + esc(x.n) + ', ' + n + ' von ' + g + ' Sätzen">' +
    '<div class="tp-box">' + (ok ? '✓' : n + '<em>/' + g + '</em>') + '</div>' +
    '<div><div class="nm">' + esc(x.n) + '</div><div class="rp">' + esc(x.r) + '</div>' +
    (x.hint ? '<div class="hint">' + esc(x.hint) + '</div>' : '') + '</div>' +
    right + '</div>';
}

export function render(head, mount) {
  const k = st.activePlan(), p = PLANS[k], e = st.entry(), sug = st.suggested();
  const target = st.weekTarget(), cnt = st.weekCount();
  const night = st.isNight();

  const pick = ['A', 'B', 'C'].map(x =>
    '<button data-pick="' + x + '" class="' + (x === k ? 'sel' : '') + (x === sug && x !== k ? ' sug' : '') + '">' +
    '<span class="k">' + x + '</span>' + PLANS[x].name + '</button>').join('');

  mount.innerHTML = head() + weekStrip() +
    '<div class="tp-count"><b>' + cnt + ' von ' + target + '</b> Einheiten diese Woche' +
      (night ? ' — Nachtschichtwoche, Sa und So reichen.' : '') + '</div>' +
    '<div class="tp-shift' + (night ? ' on' : '') + '">' +
      '<div><div class="lbl">Diese Woche Nachtschicht</div>' +
      '<div class="sub">Schaltet auf zwei Ganzkörper-Einheiten am Wochenende.</div></div>' +
      '<button class="tp-toggle" id="nt" role="switch" aria-checked="' + night + '" aria-label="Nachtschichtwoche"><span></span></button>' +
    '</div>' +
    '<div class="tp-pick">' + pick + '</div>' +
    '<div class="tp-card"><div class="tp-card-in">' +
      '<div class="tp-title"><div class="big">' + k + '</div>' +
        '<div><div class="nm">' + esc(p.name) + '</div><div class="fo">' + esc(p.focus) + '</div></div></div>' +
      p.ex.map(x => exerciseRow(x, e)).join('') +
      '<div class="tp-key">' +
        '<span><i class="dot g"></i>leicht</span>' +
        '<span><i class="dot y"></i>mittel</span>' +
        '<span><i class="dot r"></i>schwer</span>' +
      '</div>' +
      '<button class="tp-finish' + (e.done ? ' undo' : '') + '" id="fin"' +
        (!st.hasAnySet() && !e.done ? ' disabled' : '') + '>' +
        (e.done ? 'Eintrag zurücknehmen' : 'Training abschließen') + '</button>' +
    '</div></div>' +
    (st.lastError() ? '<div class="tp-err">' + esc(st.lastError()) + '</div>' : '') +
    '<div class="tp-pw"><span>Eine Platte wiegt</span>' +
      '<button data-pw="4.5" class="' + (st.S.pw === 4.5 ? 'sel' : '') + '">4,5 kg</button>' +
      '<button data-pw="5" class="' + (st.S.pw === 5 ? 'sel' : '') + '">5 kg</button></div>' +
    '<div class="tp-note">Nach dem Abschließen springt der Vorschlag auf die nächste Einheit. ' +
    'Du kannst jederzeit eine andere wählen — die gelbe Umrandung zeigt, was dran wäre. ' +
    'Wenn du in allen Sätzen die obere Wiederholungszahl schaffst, eine Platte höher.</div>';

  document.getElementById('nt').addEventListener('click', () => st.toggleNight());
  document.getElementById('fin').addEventListener('click', () => { haptic('medium'); st.finish(); });
  on('[data-pick]', ev => st.selectPlan(ev.currentTarget.dataset.pick));
  on('[data-pw]', ev => st.setPlateWeight(parseFloat(ev.currentTarget.dataset.pw)));
  on('[data-kg]', ev => {
    ev.stopPropagation();
    st.bumpWeight(ev.currentTarget.dataset.kg, parseInt(ev.currentTarget.dataset.dir, 10));
  });
  on('[data-ex]', ev => { if (st.toggleExercise(ev.currentTarget.dataset.ex)) haptic('light'); });
  on('[data-ex]', ev => {
    if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); st.toggleExercise(ev.currentTarget.dataset.ex); }
  }, 'keydown');
}
