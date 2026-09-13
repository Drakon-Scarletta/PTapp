import * as st from '../state.js';
import { exportBackup, listBackups, readBackup, parseBackup, isNative, DEFAULT_STATE } from '../store.js';
import { esc, on, toast, confirmBox } from '../ui.js';

let backups = [];

function stats() {
  const entries = Object.values(st.S.log).filter(e => e && e.done);
  const per = { A: 0, B: 0, C: 0 };
  entries.forEach(e => { per[e.k] = (per[e.k] || 0) + 1; });
  const first = Object.keys(st.S.log).sort()[0];
  return { total: entries.length, per, first };
}

export async function refresh() {
  backups = await listBackups();
}

export function render(head, mount) {
  const s = stats();

  mount.innerHTML = head() +
    '<div class="set-sec">' +
      '<h2>Überblick</h2>' +
      '<div class="set-stat">' +
        '<div><b>' + s.total + '</b>Einheiten gesamt</div>' +
        '<div><b>' + s.per.A + ' · ' + s.per.B + ' · ' + s.per.C + '</b>A · B · C</div>' +
      '</div>' +
      (s.first ? '<p>Erster Eintrag: ' + esc(s.first.split('-').reverse().join('.')) + '</p>' : '') +
    '</div>' +

    '<div class="set-sec">' +
      '<h2>Gewicht einer Platte</h2>' +
      '<p>Gilt für die Umrechnung aller Geräte im Studio.</p>' +
      '<div class="tp-pw"><span></span>' +
        '<button data-pw="4.5" class="' + (st.S.pw === 4.5 ? 'sel' : '') + '">4,5 kg</button>' +
        '<button data-pw="5" class="' + (st.S.pw === 5 ? 'sel' : '') + '">5 kg</button></div>' +
    '</div>' +

    '<div class="set-sec">' +
      '<h2>Sicherung</h2>' +
      '<p>' + (isNative()
        ? 'Legt eine JSON-Datei unter Dokumente/PTapp an und öffnet das Teilen-Menü.'
        : 'Lädt eine JSON-Datei herunter.') + '</p>' +
      '<button class="set-btn" id="exp">Daten sichern</button>' +
      (backups.length
        ? '<p>Vorhandene Sicherungen — Antippen stellt wieder her:</p><div class="set-list">' +
          backups.slice(0, 12).map(b => '<button data-imp="' + esc(b.name) + '">' + esc(b.name) + '</button>').join('') +
          '</div>'
        : '') +
      '<button class="set-btn" id="paste">Sicherung aus Text einfügen</button>' +
    '</div>' +

    '<div class="set-sec">' +
      '<h2>Zurücksetzen</h2>' +
      '<p>Löscht Verlauf, Gewichte und Einstellungen unwiderruflich.</p>' +
      '<button class="set-btn warn" id="wipe">Alle Daten löschen</button>' +
    '</div>' +

    '<div class="tp-note">PTapp 1.0 · Daten liegen nur auf diesem Gerät.</div>';

  on('[data-pw]', ev => st.setPlateWeight(parseFloat(ev.currentTarget.dataset.pw)));

  document.getElementById('exp').addEventListener('click', async () => {
    try {
      const r = await exportBackup(st.S);
      toast('Gesichert: ' + r.name);
      await refresh();
      document.dispatchEvent(new CustomEvent('rerender'));
    } catch (e) {
      toast('Sicherung fehlgeschlagen: ' + e.message, true);
    }
  });

  on('[data-imp]', async ev => {
    const name = ev.currentTarget.dataset.imp;
    if (!confirmBox('Sicherung "' + name + '" laden? Die aktuellen Daten werden ersetzt.')) return;
    try {
      const next = await readBackup(name);
      await st.replaceState(next);
      toast('Wiederhergestellt.');
    } catch (e) {
      toast('Konnte nicht gelesen werden: ' + e.message, true);
    }
  });

  document.getElementById('paste').addEventListener('click', async () => {
    const text = window.prompt('Inhalt der Sicherungsdatei hier einfügen:');
    if (!text) return;
    try {
      await st.replaceState(parseBackup(text));
      toast('Wiederhergestellt.');
    } catch (e) {
      toast('Kein gültiger Sicherungstext.', true);
    }
  });

  document.getElementById('wipe').addEventListener('click', async () => {
    if (!confirmBox('Wirklich alle Trainingsdaten löschen? Das lässt sich nicht rückgängig machen.')) return;
    await st.replaceState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    toast('Alles gelöscht.');
  });
}
