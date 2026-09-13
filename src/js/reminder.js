// Erinnerungen an Trainingstagen. Nur in der App; im Browser tut die
// Benachrichtigung nichts, deshalb bleibt die Seite dort ein Hinweis.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export const canRemind = () => Capacitor.isNativePlatform();

// Android zaehlt Sonntag als 1. In der App ist Montag der Tag 0.
const toAndroidWeekday = tag => ((tag + 1) % 7) + 1;

export async function ensurePermission() {
  if (!canRemind()) return false;
  const jetzt = await LocalNotifications.checkPermissions();
  if (jetzt.display === 'granted') return true;
  const gefragt = await LocalNotifications.requestPermissions();
  return gefragt.display === 'granted';
}

export async function clearAll() {
  if (!canRemind()) return;
  try {
    const offen = await LocalNotifications.getPending();
    const meine = (offen.notifications || []).filter(n => n.id >= 900 && n.id < 910);
    if (meine.length) await LocalNotifications.cancel({ notifications: meine });
  } catch (e) { /* nichts geplant */ }
}

// Legt je gewaehltem Wochentag eine wiederkehrende Erinnerung an.
export async function apply(reminder, texte) {
  if (!canRemind()) return false;
  await clearAll();
  if (!reminder.on || !reminder.days.length) return true;
  if (!await ensurePermission()) return false;

  const notifications = reminder.days.map((tag, i) => ({
    id: 900 + i,
    title: texte.title,
    body: texte.body,
    schedule: {
      on: {
        weekday: toAndroidWeekday(tag),
        hour: reminder.hour,
        minute: reminder.minute
      },
      allowWhileIdle: true
    }
  }));
  await LocalNotifications.schedule({ notifications });
  return true;
}
