# PTapp

Trainings-App für Android. Aus dem früheren Einzeldokument `trainingsplan.html`
wurde ein richtiges Projekt: getrennte Quelldateien, echter App-Speicher,
Sicherungen als Datei, Android-Zurück-Taste, eigenes Icon — und eine
installierbare APK.

## Was die App kann

- **Start**: Überblick (Woche, Serie, Gesamtzahl, die letzten acht Wochen als
  Balken), Planwahl mit einem Tipp ins Training, und — sobald die KI verbunden
  ist — ein Chat mit dem virtuellen Trainer, der Geräte, Pläne und die letzten
  Einheiten kennt.
- **Training**: Sätze je Übung antippen (0 → 1 → 2 → 3 → wieder 0), Gewicht
  einstellen, Ampel für leicht / mittel / schwer. Wochenleiste, Zielanzahl je
  Woche, Vorschlag der nächsten Einheit, Umschalter für Nachtschichtwochen.
  Unter jeder Übung steht, was beim letzten Mal geschafft wurde; ★ markiert eine
  neue Bestleistung. Ein Tipp auf das Satz-Kästchen öffnet die **Wiederholungen
  je Satz** samt Verlauf und Bestwert. Nach jedem Satz läuft auf Wunsch eine
  **Pausen-Uhr**. Notiz und Dauer werden je Einheit mitgeschrieben.
- **Verlauf**: Monatskalender, Tag antippen zeigt Übungen und Gewichte von damals.
- **Menü** (der Knopf mit den drei Strichen):
  - Sprache Deutsch oder Englisch.
  - **Geräte** per Schnellauswahl gleich im Satz anlegen (Studio, Kraftstation,
    Power Rack …) oder einzeln aus einem Katalog von 83 Gerätetypen in neun
    Kategorien wählen, mit Suchfeld über beide Sprachen — oder frei benennen.
    Gewicht wird in Platten, in Kilogramm oder gar nicht gezählt; Plattengewicht
    und Schrittweite gehören zum einzelnen Gerät.
  - **Übungen** aus einem Katalog von 113 bekannten Übungen wählen, nach
    Muskelgruppe geordnet und auf die eigenen Geräte filterbar — fehlt das
    passende Gerät, wird es auf Wunsch gleich mit angelegt. Oder frei benennen.
  - **Übungen** lassen sich einzeln löschen oder über *Mehrere auswählen*
    anhaken und in einem Zug entfernen — ein Rückgängig holt die ganze
    Auswahl zurück.
  - **Pläne** selbst zusammenstellen: Übungen, Sätze, Wiederholungen,
    Reihenfolge, „je Bein / je Arm / im Wechsel", Kürzel für den Kalender,
    Intensität (leicht / mittel / schwer) — oder von der KI erstellen lassen.
  - **KI**: Anbieter, Zugang und Modell — reine Verwaltung. Gearbeitet wird
    damit auf der Startseite (Chat) und unter Pläne (Plan erstellen lassen).
    Ohne eigenen Zugang geht es über *Auftrag zum Kopieren*: Text in ein
    beliebiges KI-Chatfenster einfügen, Antwort zurück in die App.
  - **Pausen-Uhr**: an/aus und Länge. Hat der gewählte Plan eine Intensität,
    gilt deren Pause (leicht 45 s, mittel 90 s, schwer 180 s); auf der
    Startseite steht in einer Zeile, was üblich ist.
  - **Körpergewicht**: ein Wert je Tag, mit Verlauf.
  - **Erinnerungen**: an gewählten Wochentagen zur gewählten Zeit (nur App).
  - **Daten**: sichern, wiederherstellen, als CSV ausgeben, alles löschen.
  - **Hinweis und Verantwortung**: wofür die App gedacht ist und was an die KI geht.
  - **Aktualisierung**: neue Fassung suchen, laden und installieren. Beim
    Öffnen sieht die App von sich aus nach — beim Start und jedes Mal, wenn sie
    aus dem Hintergrund zurückkommt (nur mit Verbindung, nicht öfter als einmal
    je Minute); liegt etwas Neueres bereit, erscheint oben neben dem Datum ein
    Pfeil, der hierher führt.
- Läuft vollständig offline, auch die Schriften liegen in der App. Nur KI und
  Aktualisierung brauchen eine Verbindung.

Der Startbestand (drei Pläne, sechzehn Übungen, zwei Geräte) wird beim ersten
Start angelegt und ist danach genauso bearbeitbar wie alles Selbstgemachte.

## Projektaufbau

```
dachboden/
  src/js/              Quellcode
    data.js            Startbestand: Geräte, Übungen, Pläne
    i18n.js            alle Texte auf Deutsch und Englisch
    store.js           Speichern, Laden, Migration, Sicherungen
    state.js           Zustand und Regeln, kennt kein DOM
    ui.js              DOM-Helfer, Meldungen, Formularbausteine
    ai.js              Aufruf der KI-Anbieter (wird erst bei Bedarf geladen)
    ai-meta.js         Anbieterliste, ohne schwere Abhängigkeiten
    prompt.js          die Vorgabe an die KI und das Antwortschema
    update.js          Versionsabgleich, Download, Installationsaufruf
    rest.js            Pausen-Uhr, lebt außerhalb der Ansicht
    reminder.js        geplante Benachrichtigungen
    app.js             Einstieg, Ansichtswechsel, Zurück-Taste
    catalog.js         Gerätetypen und Kombigeräte
    ex-catalog.js      Übungskatalog nach Muskelgruppe
    views/             home.js, plan.js, log.js, options.js, editors.js,
                       aiview.js, planner.js, manual.js, planform.js,
                       updateview.js, sets.js, misc.js, credits.js,
                       onboarding.js
  www/                 was die App wirklich lädt
    index.html
    css/app.css        Gestaltung
    css/fonts.css      eingebettete Barlow-Schriften
    fonts/             die Schriftdateien selbst
    js/                erzeugt aus src/js - nicht von Hand ändern
  build.mjs            bündelt src/js samt Capacitor-Plugins nach www/js
  build-site.mjs       baut docs/ für GitHub Pages inkl. version.json
  release-notes.json   was in welcher Fassung neu ist
  resources/           icon.png, splash.png und das Skript, das sie erzeugt
  android/             das native Android-Projekt (von Capacitor erzeugt)
  dev-server.mjs       kleiner Server zum Ausprobieren am PC
  build-apk.cmd        baut die APK
```

Der Startbestand in `src/js/data.js` gilt nur für eine frische Installation —
danach liegen Geräte, Übungen und Pläne in den Daten und werden in der App
bearbeitet.

`www/js/app.js` ist das Ergebnis des Bündelns: dort stecken neben dem eigenen
Code auch die Capacitor-Plugins für App-Speicher, Dateien, Teilen und Vibration.
Ohne diesen Schritt hätte die App im APK keinen Zugriff darauf.

## APK bauen

```
build-apk.cmd
```

Ergebnis: `android\app\build\outputs\apk\release\app-release.apk` — signiert und
direkt installierbar. `build-apk.cmd debug` baut stattdessen die Debug-Variante.

## Auf dem Handy installieren

1. `app-release.apk` aufs Handy kopieren (USB, Cloud, Messenger an sich selbst).
2. Datei am Handy öffnen.
3. Android fragt nach der Erlaubnis, Apps aus dieser Quelle zu installieren —
   erlauben, dann installieren.

Die App ist mit einem eigenen Schlüssel signiert, nicht aus dem Play Store.
Android zeigt deshalb beim ersten Mal eine Warnung; das ist bei selbst
gebauten Apps normal.

## Web-Seite (GitHub Pages)

```
npm run site
```

Baut `docs/`: eine Startseite mit APK-Download, daneben unter `docs/app/` die App
selbst — im Browser lauffähig, über *Zum Startbildschirm hinzufügen*
installierbar und dank Service Worker offline nutzbar. Die APK wird aus dem
letzten Release-Build übernommen, also vorher `build-apk.cmd` laufen lassen.

Vor dem Veröffentlichen lokal ansehen:

```
ROOT=docs PORT=5174 node dev-server.mjs
```

GitHub Pages muss einmalig auf *Branch `main`, Ordner `/docs`* stehen
(Repository → Settings → Pages).

## Am PC ausprobieren

```
npm run serve
```

Dann `http://localhost:5173` öffnen. Dort läuft dieselbe Oberfläche, nur
speichert sie im Browser statt im App-Speicher. `npm run watch` baut in einem
zweiten Fenster bei jeder Änderung neu.

## Werkzeuge

Auf diesem Rechner waren weder Java noch das Android-SDK vorhanden. Beides liegt
jetzt unter `%USERPROFILE%\android-toolchain`:

- `jdk21\` — Java 21 (Temurin), nur für dieses Projekt
- `sdk\` — Android-SDK (Plattform 35, Build-Tools 35.0.0, Plattform-Tools)

Android Studio ist nicht nötig. Wird es später installiert, kann man das Projekt
auch dort öffnen (`android\` als Projektordner).

Eine Besonderheit: Norton prüft auf diesem Rechner verschlüsselte Verbindungen
und tauscht dabei die Zertifikate aus. Java kannte dieses Zertifikat nicht und
brach jeden Download ab. Deshalb wurde das Norton-Zertifikat in den
Zertifikatspeicher genau dieses JDKs aufgenommen
(`android-toolchain\jdk21\lib\security\cacerts`, Alias `norton-ssl-scan`).
Das betrifft nur dieses JDK, nicht Windows und nicht andere Programme.

## Gerätekatalog

`src/js/catalog.js` enthält 83 Gerätetypen in neun Kategorien — Geräteklassen,
keine Hersteller und keine Modellnummern. Jeder Eintrag trägt seinen Namen
gleich zweisprachig und weiß, wie sein Gewicht gezählt wird (Platten,
Kilogramm mit Schrittweite, oder gar nicht). Die Namen stehen bewusst dort und
nicht in `i18n.js`: sie sind Daten, keine Oberflächentexte.

Das Suchfeld filtert über beide Sprachen gleichzeitig — „bench" findet auch die
Flachbank. Gefiltert wird im Browser durch Ein- und Ausblenden, nicht durch
Neuaufbau der Liste, sonst verlöre das Eingabefeld bei jedem Tastendruck den
Fokus.

Einen Gerätetyp ergänzen heißt: eine Zeile in die passende Kategorie eintragen,
mit `key`, `de`, `en`, `kind` und bei Kilogramm-Geräten `step`. Was Nutzer
selbst anlegen, landet in ihren Daten und nicht im Katalog.

Darüber steht die **Schnellauswahl**: sechs Aufbauten (`BUNDLES`), die mehrere
Geräte auf einmal anlegen — Studio, Kraftstation, Kabelzug-Station, Power Rack,
Hantelbank-Set, Körpergewicht. Ein Bündel ist nur eine Liste von
Katalogschlüsseln; beim Öffnen sind alle Teile angehakt, was der eigene Aufbau
nicht hat, wird abgewählt. Bereits vorhandene Geräte erkennt die App am Namen,
zeigt sie abgehakt und legt sie nicht doppelt an.

## Was im Verlauf steht

Ein Tag im Verlauf hält fest: welcher Plan, wie viele Sätze je Übung, die
**Wiederholungen je Satz**, das Gewicht zum Zeitpunkt der Einheit, Start- und
Endzeit sowie eine Notiz. Daraus entstehen „letztes Mal", die Bestleistung, die
Verlaufskurven und die CSV-Ausgabe — ohne dass irgendwo doppelt gespeichert
wird.

Der Zustand liegt in Fassung 5. Ältere Stände werden beim Laden ergänzt, nicht
ersetzt: fehlende Felder bekommen Vorgaben, Kennungen bleiben, der Verlauf
bleibt lesbar.

## Herkunft von Übungen und Plänen

Was der virtuelle Trainer angelegt hat, trägt `src: 'ai'` und wird in den
Listen mit ✦ markiert; alles andere bleibt ohne Zeichen. Die eingebauten
Start-Übungen zählen dabei wie selbst angelegte.

## Der virtuelle Trainer

Der Chat auf der Startseite schickt bei jeder Frage einen kurzen Abriss mit:
Geräteliste, Pläne mit ihren Übungen, die letzten acht Einheiten und den Stand
der laufenden Woche. Damit kann er zur Sache antworten, statt allgemein zu
bleiben. Der Gesprächsverlauf liegt im App-Speicher, die letzten vierzig
Nachrichten, und lässt sich löschen.

## Aktualisierung aus der App heraus

*Optionen → Aktualisierung* vergleicht die eigene Versionsnummer mit
`version.json` auf der Web-Seite, lädt bei Bedarf die APK herunter und übergibt
sie dem Android-Installer. Die Trainingsdaten bleiben dabei erhalten, weil die
neue Fassung mit demselben Schlüssel signiert ist.

Android verlangt dafür zweierlei: die Berechtigung `REQUEST_INSTALL_PACKAGES`
im Manifest **und** die Freigabe „Unbekannte Apps installieren" für diese App.
Fehlt die Freigabe, öffnet die App die passende Einstellung; danach genügt ein
erneuter Tipp auf *Jetzt installieren*. Den Installationsaufruf erledigt ein
kleines eigenes Capacitor-Plugin (`android/.../UpdaterPlugin.java`), registriert
in `MainActivity`.

Die Web-Fassung braucht das nicht — sie holt sich Neuerungen beim Öffnen selbst.

### Eine neue Fassung veröffentlichen

1. In `android/app/build.gradle` **`versionCode` um eins erhöhen** und
   `versionName` setzen. Am `versionCode` erkennt die App, dass es etwas Neues
   gibt — ohne Erhöhung sieht sie kein Update.
2. In `release-notes.json` einen Eintrag unter dem neuen `versionName` anlegen
   (Deutsch und Englisch); er erscheint in der App.
3. `build-apk.cmd` — baut die signierte APK.
4. `npm run site` — legt `docs/` neu an, inklusive `version.json` mit
   Versionsnummer, Dateiname, Größe und den Notizen.
5. Committen und pushen. Sobald GitHub Pages ausgeliefert hat, findet die
   installierte App die neue Fassung.

Reihenfolge beachten: erst die APK bauen, dann die Seite — sonst übernimmt
`npm run site` die vorige APK unter neuem Namen.

## KI-Trainingsplan

Unter *Optionen → KI-Trainingsplan* gibt man Ziel, Erfahrung, Einheiten pro
Woche und Besonderheiten an; die App schickt das zusammen mit der Geräteliste an
den gewählten Anbieter und zeigt den Vorschlag zur Ansicht, bevor er übernommen
wird. Übernommene Pläne und neue Übungen sind danach ganz normal bearbeitbar.

### Verbinden

*Verbinden* öffnet die Schlüsselseite des Anbieters, dort meldet man sich an und
erzeugt einen Schlüssel; zurück in der App holt *Einfügen* ihn aus der
Zwischenablage. Danach prüft die App den Schlüssel sofort, indem sie die
Modellliste abruft — steht die Verbindung, zeigt sie das mit Datum an und füllt
die Modellauswahl mit dem, was der Anbieter gerade anbietet. *Trennen* löscht
den Schlüssel wieder vom Gerät.

Einen Anmeldevorgang im Sinne von „Mit Google anmelden" gibt es hier nicht:
weder Anthropic noch OpenAI bieten fremden Apps einen Weg an, über eine
Anmeldung Zugriff auf das Konto des Nutzers zu bekommen. Der Schlüssel **ist**
der Mechanismus; mehr als das Öffnen der richtigen Seite und das Einfügen lässt
sich nicht automatisieren.

Nötig ist also ein **API-Schlüssel**, kein Chat-Abo:

- Anthropic: `console.anthropic.com`
- OpenAI: `platform.openai.com`

Ein ChatGPT-Plus- oder Claude-Abo funktioniert dafür nicht — das sind Konten für
die Chat-Oberfläche. Ein API-Schlüssel ist ein eigenes Konto, das nach Verbrauch
abgerechnet wird; ein Plan kostet mit einem großen Modell etwa fünf bis fünfzehn
Cent, mit einem kleinen ein Fünftel davon. Der Schlüssel geht an niemanden außer
den gewählten Anbieter.

Es funktioniert in beiden Fassungen. In der App laufen die Aufrufe über die
native HTTP-Schicht von Capacitor (`CapacitorHttp`); im Browser gehen sie
direkt, beide Anbieter lassen das zu (Anthropic über den Header
`anthropic-dangerous-direct-browser-access`). Unterschied ist der Speicherort
des Schlüssels: in der App der App-Speicher, im Browser dessen eigener Speicher
— auf einem geteilten Gerät also lieber die App.

Der Anthropic-Teil nutzt das offizielle SDK, der OpenAI-Teil einen direkten
HTTP-Aufruf. **Eine Falle dabei:** `CapacitorHttp` ersetzt in der App `fetch`
durch eine native Brücke, und das SDK bekommt dadurch kein vollwertiges
Response-Objekt — `models.list()` liefert dann `undefined`. Im Browser passiert
das nicht, in der App schon. Deshalb geht jeder Anthropic-Aufruf zuerst über das
SDK und fällt auf eine direkte Anfrage zurück, wenn dabei nichts Brauchbares
herauskommt (`viaSdkOrRaw` in `ai.js`). Echte Fehler des Anbieters — falscher
Schlüssel, kein Guthaben — werden vorher durchgereicht, damit sie nicht hinter
dem Rückfallweg verschwinden. Beide erzwingen ein festes Antwortformat, damit die Antwort ohne
Raten in die Datenstruktur der App passt. Weil das SDK knapp ein halbes Megabyte
wiegt, liegt der ganze KI-Teil in einem eigenen Stück und wird erst beim Öffnen
der Seite nachgeladen.

### Ohne eigenen Zugang: Kopieren und Einfügen

Es geht auch ganz ohne Schlüssel und Guthaben. *KI → Auftrag zum Kopieren*
(oder derselbe Knopf unter *Pläne → Plan erstellen lassen*) öffnet eine Seite,
auf der dieselben Angaben abgefragt werden wie beim eingebauten Weg. Daraus
schreibt die App einen Text: die Vorgabe, die Geräteliste mit Kennungen, die
Wünsche und das Antwortschema. Der Text wandert per *Auftrag kopieren* in die
Zwischenablage, von dort in ein beliebiges Chatfenster — ChatGPT, Claude, was
auch immer der Nutzer ohnehin offen hat. Die Antwort kommt unten wieder in die
App, *Antwort lesen* macht daraus denselben Vorschlag wie sonst, mit Vorschau
und Übernehmen.

Beide Wege benutzen dieselbe Vorgabe aus `prompt.js`; nur die Art der Zustellung
unterscheidet sich. Weil ein Chatfenster kein festes Antwortformat erzwingen
kann, steht das Schema im Text und die Auswertung ist nachsichtig: Codeblock
ringsum, ein Satz davor oder danach, Gerätename statt Kennung, `"4"` statt `4` —
all das wird gelesen (`manual.js`). Findet sich darin kein Plan, sagt die App
das, statt etwas zu raten.

## Icon

Vorlage ist `resources\source-icon.png`. Daraus baut `npm run icons` alle
Android-Größen: das Motiv verkleinert für den runden Zuschnitt, dahinter eine
weiche Fortführung derselben Farben als Hintergrundebene.

## Name und Kennung

Angezeigt wird **PTapp**. Die technische Kennung ist weiterhin
`at.dachboden.training`, und auch der Projektordner heißt noch `dachboden` — das
ist Absicht: Android erkennt eine App an dieser Kennung. Würde man sie ändern,
gälte die App als neue, die alte bliebe daneben stehen und der Verlauf käme
nicht mit. Sichtbar ist die Kennung nur in den Android-Einstellungen.

## Signaturschlüssel

`android\dachboden-release.keystore` mit den Zugangsdaten in
`android\keystore.properties`. Beide sind bewusst **nicht** im Repository —
sie liegen nur lokal. Ohne sie baut `build-apk.cmd` eine unsignierte APK.

**Beide Dateien sichern.** Gehen sie verloren, lässt sich eine spätere Version
der App nicht mehr über die installierte drüber-installieren — man müsste die
App samt Trainingsdaten erst löschen. Vor einer Neuinstallation in jedem Fall in
der App unter *Mehr → Daten sichern* eine Sicherung anlegen.

## Daten

Alles bleibt auf dem Gerät, kein Konto, keine Cloud, keine Berechtigungen außer
dem Schreiben der eigenen Sicherungsdateien. Der Verlauf liegt im App-Speicher;
*Mehr → Daten sichern* schreibt zusätzlich eine JSON-Datei nach
`Dokumente/PTapp` und bietet sie zum Teilen an. Dieselbe Ansicht listet
vorhandene Sicherungen zum Wiederherstellen auf.
