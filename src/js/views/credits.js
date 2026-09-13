// Meldet der Anbieter zu wenig Guthaben, ist ein Hinweis zu wenig: die App
// bietet gleich den Weg zur Aufladeseite an.
import { Browser } from '@capacitor/browser';
import { t } from '../i18n.js';
import { providerOf } from '../ai-meta.js';
import { dialog, toast } from '../ui.js';

export function isCreditProblem(e) { return !!(e && e.kind === 'credits'); }

export function creditsDialog(providerId) {
  const prov = providerOf(providerId);
  dialog({
    title: t('credits.title'),
    text: t('credits.text', { host: prov.billingHost }),
    actions: [
      { label: t('credits.close') },
      {
        label: t('credits.buy'),
        primary: true,
        run: async () => {
          try { await Browser.open({ url: prov.billingUrl }); }
          catch (e) { window.open(prov.billingUrl, '_blank'); }
        }
      }
    ]
  });
}

// Fehler anzeigen: Guthaben als Fenster, alles andere als kurze Meldung.
export function showAiError(e, providerId) {
  if (isCreditProblem(e)) creditsDialog(providerId);
  else toast(t('ai.failed', { msg: e.message }), true);
}
