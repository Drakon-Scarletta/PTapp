// Kleinere Seiten des Menüs: Pausen-Uhr, Körpergewicht, Erinnerungen, Hinweis.
import * as st from '../state.js';
import { t, locale, num, weekdayShort } from '../i18n.js';
import { APP_NAME } from '../store.js';
import { canRemind, apply as applyReminder } from '../reminder.js';
import { esc, on, byId, val, toast, confirmBox, field, numIn, checkIn } from '../ui.js';

const rerender = () => document.dispatchEvent(new CustomEvent('rerender'));

// ---------- Pausen-Uhr ----------
export function restPrefs(mount, head, backBar, goHub) {
  mount.innerHTML = head() + backBar(t('rest.title')) +
    checkIn('f-on', t('rest.on'), st.S.prefs.restOn) +
    field(t('rest.sec'), numIn('f-sec', st.S.prefs.restSec, '5', 5));

  byId('back').addEventListener('click', goHub);
  byId('f-on').addEventListener('change', ev => st.setPref('restOn', ev.target.checked));
  byId('f-sec').addEventListener('change', ev =>
    st.setPref('restSec', Math.max(5, Math.min(600, parseInt(ev.target.value, 10) || 90))));
}

// ---------- Körpergewicht ----------
export function bodyWeight(mount, head, backBar, goHub) {
  const liste = st.S.body.slice().reverse();
  const werte = st.S.body.map(b => b.kg);
  const hoch = Math.max(1, ...werte), tief = Math.min(...werte, hoch);
  const spanne = Math.max(0.5, hoch - tief);

  const balken = st.S.body.slice(-20).map(b =>
    '<div class="bar-col" title="' + esc(b.d) + '">' +
      '<div class="bar-v full" style="height:' +
      Math.max(6, Math.round(((b.kg - tief) / spanne) * 90) + 10) + '%"></div>' +
    '</div>').join('');

  const zeilen = liste.slice(0, 20).map(b =>
    '<div class="lst"><div class="lst-m">' +
      '<div class="lst-n">' + esc(num(b.kg)) + ' kg</div>' +
      '<div class="lst-s">' + esc(b.d.split('-').reverse().join('.')) + '</div></div>' +
      '<div class="row-act"><button class="mini warn" data-delbody="' + esc(b.d) + '">×</button></div>' +
    '</div>').join('');

  const diff = st.S.body.length > 1
    ? Math.round((st.S.body[st.S.body.length - 1].kg - st.S.body[0].kg) * 10) / 10
    : null;

  mount.innerHTML = head() + backBar(t('body.title')) +
    '<p class="intro">' + esc(t('body.intro')) + '</p>' +
    '<div class="add-row">' +
      '<input class="in" id="f-kg" type="number" inputmode="decimal" step="0.1" min="1" ' +
        'placeholder="' + esc(t('body.value')) + '">' +
      '<button class="mini" id="addbody">' + esc(t('body.add')) + '</button>' +
    '</div>' +
    (st.S.body.length
      ? '<div class="bars">' + balken + '</div>' +
        (diff != null ? '<p class="intro">' +
          esc(t('body.change', { n: (diff > 0 ? '+' : '') + num(diff) })) + '</p>' : '') +
        zeilen
      : '<p class="intro">' + esc(t('body.empty')) + '</p>');

  byId('back').addEventListener('click', goHub);
  byId('addbody').addEventListener('click', () => {
    if (st.addBodyWeight(val('f-kg'))) rerender();
  });
  byId('f-kg').addEventListener('keydown', ev => {
    if (ev.key === 'Enter' && st.addBodyWeight(val('f-kg'))) rerender();
  });
  on('[data-delbody]', ev => st.removeBodyWeight(ev.currentTarget.dataset.delbody));
}

// ---------- Erinnerungen ----------
export function reminders(mount, head, backBar, goHub) {
  const r = st.S.prefs.reminder;

  if (!canRemind()) {
    mount.innerHTML = head() + backBar(t('rem.title')) +
      '<p class="intro">' + esc(t('rem.webOnly')) + '</p>';
    byId('back').addEventListener('click', goHub);
    return;
  }

  const tage = Array.from({ length: 7 }, (_, i) =>
    '<button class="mini' + (r.days.includes(i) ? ' on' : '') + '" data-day="' + i + '">' +
    esc(weekdayShort(i)) + '</button>').join('');

  mount.innerHTML = head() + backBar(t('rem.title')) +
    '<p class="intro">' + esc(t('rem.intro')) + '</p>' +
    checkIn('f-on', t('rem.on'), r.on) +
    '<label class="fld"><span class="fld-l">' + esc(t('rem.days')) + '</span>' +
      '<span class="days">' + tage + '</span></label>' +
    field(t('rem.time'),
      '<input class="in" id="f-time" type="time" value="' +
      String(r.hour).padStart(2, '0') + ':' + String(r.minute).padStart(2, '0') + '">') +
    '<button class="set-btn go" id="save">' + esc(t('common.save')) + '</button>';

  byId('back').addEventListener('click', goHub);
  on('[data-day]', ev => {
    const tag = Number(ev.currentTarget.dataset.day);
    const neu = r.days.includes(tag) ? r.days.filter(d => d !== tag) : r.days.concat(tag).sort();
    st.setPref('reminder', { ...r, days: neu });
  });
  byId('save').addEventListener('click', async () => {
    const [h, m] = val('f-time').split(':').map(Number);
    const neu = { ...r, on: byId('f-on').checked, hour: h || 0, minute: m || 0 };
    st.setPref('reminder', neu);
    const ok = await applyReminder(neu, {
      title: t('rem.notifyTitle'), body: t('rem.notifyBody')
    });
    toast(ok ? t('rem.saved') : t('rem.denied'), !ok);
  });
}

// ---------- Hinweis und Verantwortung ----------
export function legal(mount, head, backBar, goHub) {
  mount.innerHTML = head() + backBar(t('legal.title')) +
    '<p class="intro">' + esc(t('ob.healthText', { app: APP_NAME })) + '</p>' +
    '<h3 class="sec">' + esc(t('ai.helpH5')) + '</h3>' +
    '<p class="intro">' + esc(t('ai.helpP5')) + '</p>' +
    '<p class="intro">' + esc(t('legal.chat')) + '</p>';
  byId('back').addEventListener('click', goHub);
}
