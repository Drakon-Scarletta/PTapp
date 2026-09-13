# PTapp

Trainings-App für Android. Aus dem früheren Einzeldokument `trainingsplan.html`
wurde ein richtiges Projekt: getrennte Quelldateien, echter App-Speicher,
Sicherungen als Datei, Android-Zurück-Taste, eigenes Icon — und eine
installierbare APK.

## Was die App kann

- **Training**: Sätze je Übung antippen (0 → 1 → 2 → 3 → wieder 0), Gewicht
  einstellen, Ampel für leicht / mittel / schwer. Wochenleiste, Zielanzahl je
  Woche, Vorschlag der nächsten Einheit, Umschalter für Nachtschichtwochen.
- **Verlauf**: Monatskalender, Tag antippen zeigt Übungen und Gewichte von damals.
- **Optionen**:
  - Sprache Deutsch oder Englisch.
  - **Geräte** selbst anlegen — mit Platten, in Kilogramm oder Körpergewicht.
    Jedes Gerät bringt sein eigenes Plattengewicht bzw. seine Schrittweite mit.
  - **Übungen** selbst anlegen, einem Gerät zuordnen, Ampelbereiche setzen.
  - **Pläne** selbst zusammenstellen: Übungen, Sätze, Wiederholungen,
    Reihenfolge, „je Bein / je Arm / im Wechsel", Kürzel für den Kalender.
  - **KI-Trainingsplan**: aus den eigenen Geräten einen Plan erzeugen lassen
    (siehe unten).
  - **Daten**: sichern, wiederherstellen, alles löschen.
- Läuft vollständig offline, auch die Schriften liegen in der App. Nur die
  KI-Funktion braucht eine Verbindung.

Der Startbestand (drei Pläne, sechzehn Übungen, zwei Geräte) wird beim ersten
Start angelegt und ist danach genauso bearbeitbar wie alles Selbstgemachte.

## Projektaufbau

```
dachboden/
  src/js/              Quellcode
    data.js            Pläne, Übungen, Ampelbereiche  <- hier Übungen ändern
    store.js           Speichern, Laden, Sicherungen
    state.js           Zustand und Regeln, kennt kein DOM
    ui.js              kleine DOM-Helfer, Meldungen, Vibration
    app.js             Einstieg, Ansichtswechsel, Zurück-Taste
    views/             plan.js, log.js, settings.js
  www/                 was die App wirklich lädt
    index.html
    css/app.css        Gestaltung
    css/fonts.css      eingebettete Barlow-Schriften
    fonts/             die Schriftdateien selbst
    js/app.js          erzeugt aus src/js - nicht von Hand ändern
  build.mjs            bündelt src/js samt Capacitor-Plugins nach www/js
  resources/           icon.png, splash.png und das Skript, das sie erzeugt
  android/             das native Android-Projekt (von Capacitor erzeugt)
  dev-server.mjs       kleiner Server zum Ausprobieren am PC
  build-apk.cmd        baut die APK
```

Übungen, Wiederholungen oder Ampelbereiche ändert man ausschließlich in
`src/js/data.js`. Danach `build-apk.cmd` ausführen.

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

## KI-Trainingsplan

Unter *Optionen → KI-Trainingsplan* gibt man Ziel, Erfahrung, Einheiten pro
Woche und Besonderheiten an; die App schickt das zusammen mit der Geräteliste an
den gewählten Anbieter und zeigt den Vorschlag zur Ansicht, bevor er übernommen
wird. Übernommene Pläne und neue Übungen sind danach ganz normal bearbeitbar.

Nötig ist ein **API-Schlüssel**, nicht ein Chat-Abo:

- Anthropic: `console.anthropic.com`
- OpenAI: `platform.openai.com`

Ein ChatGPT-Plus- oder Claude-Abo funktioniert dafür nicht — das sind Konten für
die Chat-Oberfläche. Ein API-Schlüssel ist ein eigenes Konto, das nach Verbrauch
abgerechnet wird; ein Plan kostet Bruchteile eines Cents. Der Schlüssel wird nur
im App-Speicher abgelegt und geht an niemanden außer den gewählten Anbieter.

*Verfügbare Modelle laden* holt die Liste beim Anbieter, statt sich auf fest
eingebaute Namen zu verlassen — so funktioniert die Auswahl auch, wenn es später
neue Modelle gibt.

Das funktioniert nur in der **installierten App**: Aufrufe laufen dort über die
native HTTP-Schicht von Capacitor (`CapacitorHttp`), weshalb die
Browser-Beschränkungen der Anbieter nicht greifen. In der Web-Fassung ist die
Seite sichtbar, der Aufruf scheitert aber — darauf weist sie auch hin.

Der Anthropic-Teil nutzt das offizielle SDK, der OpenAI-Teil einen direkten
HTTP-Aufruf. Beide erzwingen ein festes Antwortformat, damit die Antwort ohne
Raten in die Datenstruktur der App passt. Weil das SDK knapp ein halbes Megabyte
wiegt, liegt der ganze KI-Teil in einem eigenen Stück und wird erst beim Öffnen
der Seite nachgeladen.

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
