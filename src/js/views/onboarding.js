// Erster Start: kurze Einführung und der Hinweis zur Verantwortung.
// Erscheint einmal; danach steht beides im Menü unter Hinweis.
import * as st from '../state.js';
import { t } from '../i18n.js';
import { APP_NAME } from '../store.js';
import { esc, dialog } from '../ui.js';

export function pending() { return !st.S.prefs.onboarded; }

export function show() {
  dialog({
    title: t('ob.title', { app: APP_NAME }),
    html:
      '<p>' + esc(t('ob.p1')) + '</p>' +
      '<p>' + esc(t('ob.p2')) + '</p>' +
      '<h4>' + esc(t('ob.health')) + '</h4>' +
      '<p>' + esc(t('ob.healthText', { app: APP_NAME })) + '</p>',
    actions: [
      { label: t('ob.skip'), run: fertig },
      {
        label: t('ob.equip'),
        primary: true,
        run: () => {
          fertig();
          document.dispatchEvent(new CustomEvent('goview', { detail: 'options' }));
          // Der Menü-Wechsel zeichnet neu; danach gleich zu den Geräten.
          setTimeout(() => document.dispatchEvent(
            new CustomEvent('gosub', { detail: 'equipment' })), 120);
        }
      }
    ]
  });
}

function fertig() { st.setPref('onboarded', true); }
