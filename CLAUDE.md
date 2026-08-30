# CLAUDE.md — Website ATG Grasbrunn

> Teil des Workspace `00_KI_Work` · Strang **02_GIT** · Router + globaler Kontext: Root-Master `00_KI_Work\CLAUDE.md` (§0 Projekt-Router).

## Zweck
Kunden-Website Auto-Teiler Grasbrunn e.V. (atg-grasbrunn.de) — Neuentwurf als Ablösung der
bestehenden WordPress-Seite. Vorschau läuft über GitHub Pages, Abstimmung mit dem Vorstand.

Aus der Website ist ein mehrteiliges Projekt geworden. Reihenfolge, Bausteine und
Prüfaufträge stehen in **`docs/ROADMAP_ATG.md`** — Website (Prio 1), Abrechnung
vereinfachen (Prio 2), Mitgliederverwaltung ablösen, Backend mit Aufnahmestrecke,
Mitgliederkommunikation. Ziel hinter allem: mehr Mitglieder, mehr Buchungen.

## Stack / Technik
- **Astro 7** (statischer Build) + Tailwind-Vite-Plugin, Vanilla-CSS in Scoped-Styles.
- **Leaflet + OpenStreetMap** für die Standorte-Karte (kein Google, datensparsam).
- Fonts lokal via Fontsource · PWA (Manifest + Service Worker) · Lenis für Smooth-Scroll.
- Formulare **frontend-only**: „Absenden" öffnet eine vorausgefüllte E-Mail (kein Backend).
- Build: `npm run build` → `dist/` · Vorschau: `npm run preview` (Port 4321).
- `PUBLIC_BASE` / `PUBLIC_SITE` steuern Live (`/`) vs. Pages-Vorschau (`/atg-vorschau/`).

### Wo was liegt
| Thema | Datei |
|---|---|
| Preise, Klassen, Rechenlogik | `src/data/tarife.ts` — **einzige Quelle**, nicht in Seiten hartkodieren. Startseite, Flyer, Querflyer und Visitenkarte hängen alle daran; für die Kurzform auf den Druckstücken gibt es `kmSpanne()` / `kmStaffelSpanne()` |
| Fahrzeuge, Stellplätze, Koordinaten | `src/data/fahrzeuge.ts` |
| Startseite (alle Sektionen) | `src/pages/index.astro` |
| Standorte-Karte | `src/components/StandorteKarte.astro` |
| Stellplätze nachjustieren (intern, noindex) | `src/pages/pins.astro` → `/pins` |
| Kommunikationsvorschlag für den Vorstand (intern, noindex) | `src/pages/kommunikation.astro` → `/kommunikation`. Rechnet seine Beispiele aus `tarife.ts`, veraltet also nicht. **Nicht verlinkt heißt nicht geheim** — wer die Adresse hat, sieht sie. Vereinsinterna wie der MVV-Abrechnungsmodus gehören nicht dorthin, sondern in `docs/` |
| Flyer / Visitenkarte | `src/pages/flyer.astro`, `flyer-quer.astro`, `visitenkarte.astro` |

**Fallstricke:**
- Astro komprimiert HTML — ein Zeilenumbruch frisst das Leerzeichen, wenn danach ein
  `{Ausdruck}` folgt oder davor ein Inline-Tag wie `</b>` steht. Aus „Kilometer:\n
  {STAFFEL.volleKm} km" wird „Kilometer:300 km". Zwischen zwei Textstücken passiert das
  nicht. Also: Satzzeichen, Inline-Tag und der folgende Ausdruck gehören in dieselbe
  Zeile. Gegenprobe im gebauten `dist/`, nicht im Quelltext.
- Per JS erzeugte Elemente tragen kein `data-astro-cid` → Scoped-CSS greift nicht.
  Für solche Knoten `:global(...)` verwenden (siehe Kostenrechner-Zeilen).
- Der Service Worker cacht die Shell: beim Testen von Änderungen abmelden oder Cache leeren,
  sonst prüft man den alten Stand.
- Zahlen nie roh ins Markup (`{ZEIT.tag}`) — JavaScript formatiert ohne Locale englisch,
  aus 1,5 würde „1.5". Über `zahlKurz()`, `proKm()`, `proStd()` oder `eur()` gehen.
- Die schwebenden Aktions-Buttons stehen fest über dem Inhalt. Der Inhalt ist 1200 px breit
  und mittig, daneben passt eine beschriftete Leiste erst ab rund 1565 px Fensterbreite.
  Wer dort etwas verbreitert, prüft Breiten zwischen 1024 und 1680 px gegen.

## Hosting und DNS der bestehenden Seite (Stand 21.08.2026)

Ermittelt über DNS, RIPE und die Anbieterseite — nicht vom Verein bestätigt.

| | |
|---|---|
| Hoster / DNS | **InternetWerk GmbH**, Frankenstr. 2A, 04932 Hirschfeld · Tel. 035343-668800 · info@internetwerk.de · HRB 9096 AG Cottbus |
| Nameserver | `ns1.internetwerk.de`, `ns2.internetwerk.de` |
| Webserver | `91.210.225.28` (Apache), IP-Netz von IP-Projects, als InternetWerk GmbH eingetragen |
| Mail | MX `mail.atg-grasbrunn.de` → **dieselbe IP**, SPF `include:spf.internetwerk.de` |

**Kundenportal:** `https://verwaltung.internetwerk.de/login` — Eigenentwicklung des
Anbieters, kein Plesk oder cPanel. Anmeldung mit **Kundennummer und Passwort**, eine
Zwei-Faktor-Anmeldung gibt es nicht. Passwort zurücksetzen unter `/login/password`; die
Mail geht an die dort hinterlegte Adresse — wenn das ein früherer Verantwortlicher ist,
wird es zäh, deshalb gleich mit abfragen.

Andreas hat den WordPress-Login, aber keinen Hoster-Zugang — der ist für die DNS-Einträge
nötig und beim Verein anzufragen. Konkret gebraucht werden **Kundennummer, Passwort und
die im Konto hinterlegte E-Mail-Adresse**. Zugangsdaten nicht per Mail und nicht in den
Chat: KeePassXC, Kundeneintrag im MSP Manager. Nach der Übergabe Passwort ändern, weil
ohne zweiten Faktor das Passwort der einzige Schutz ist.

**Beim Umschalten aufpassen:** Website und Vereins-Mail liegen auf derselben Maschine.
Für den Livegang nur den A-Record (und ggf. `www`) umhängen. MX und SPF unangetastet
lassen, sonst reißt die E-Mail des Vereins ab. Ein Nameserver-Wechsel würde beides auf
einmal verschieben und muss die MX-Einträge mitnehmen.

## Stand / offen / nächster Schritt

- **Stand:** 30.08.2026 — **Version 1.3 ist auf der Vorschau veröffentlicht** und live
  gegengeprüft. Sie arbeitet die Mail von Wolfgang Schneidt vom 30.08.2026 ein: alle
  sechs Rückfragen beantwortet, dazu der Sandero als Mittelklasse, die zyklische
  Kilometerstaffel, der Buchen-Dialog vor ELKATO und zwei Korrekturen (fehlendes
  Leerzeichen in der Rechner-Fußnote, unlesbarer Pflichtfeld-Hinweis unter dem
  Formular).
- **Neu in 1.3:**
  - Der Dacia Sandero heißt in der Fahrzeugübersicht **Mittelklasse** statt Kleinwagen.
    Er stand mit demselben Badge da wie der Corsa, gehört aber in die teurere Klasse
    PKW 2. Das Badge kommt aus `fahrzeuge.ts` und zieht Fahrzeugkarte, Standorte-Chip
    und Querflyer gemeinsam nach.
  - **Die Kilometerstaffel läuft zyklisch.** Die Nutzungsordnung (Ziff. 5, Fassung
    01.01.2025) sagt es wörtlich: „gilt jeweils für km 301 bis 1000, 1301 bis 2000 usw.
    der km-Tarif II". Je angefangene 1.000 km zählen also 300 km zum Grundtarif und 700
    zum Staffelpreis. Wolfgangs Kurzform („ab 1000 km wieder der normale Satz") stimmt,
    gilt aber nur für 300 km. `kmKosten()` zählt deshalb ganze Zyklen; der Deckel bei
    1.000 km im Rechner ist weg (`RECHNER_MAX` = 2.000). Kontrollwerte Corsa: 420 km =
    167,40 € · 1.000 km = 353,00 € · 1.300 km = 482,00 € · 1.500 km = 546,00 € ·
    2.000 km = 706,00 €.
  - Preise, ZOE-Ausnahme, Staffel-Lesart und Klassenzuordnung sind bestätigt und bleiben
    wie in 1.2. Die Stellplätze sind abgenommen — alle fünf auf `geprueft: true`.
- **Preise (bestätigt 30.08.2026):** mit saisonalem Spritzuschlag, wie auf
  atg-grasbrunn.de ausgewiesen: 0,43 €/km PKW 1, 0,48 €/km Sandero, 0,45 €/km ZOE,
  0,65 €/km Trafic; Staffel 0,32/0,37/0,52. Rücknahme = `SPRITZUSCHLAG_GILT = false` in
  `tarife.ts`, das stellt Website und Druckstücke gemeinsam um. Herleitung und Antworten
  je Punkt: `docs/RUECKFRAGEN-Verein_2026-08-12.md`.
- **Lesart der Staffel (geklärt 30.08.2026):** Abgerechnet wird abschnittsweise, nie
  rückwirkend — wer die 1.000er-Grenze überfährt, behält den Rabatt auf die Kilometer
  301 bis 1.000 (Andreas). Die Zyklen darüber stehen in der Nutzungsordnung Ziff. 5.
  Beide Quellen decken sich; die Nutzungsordnung ist die genauere und liegt als
  Volltext-Auszug in `docs/QUELLEN-Vereinsseite_2026-08-30.md`.
- **Rechtsseiten — Entwürfe liegen vor:** `docs/recht/RECHTSTEXTE_neue-Seite.md`
  (Impressum, Datenschutzerklärung, Barrierefreiheit) und `docs/recht/AVV_ATG-Grundke-IT.md`.
  Offen: Freigabe durch den Vorstand, dann als Astro-Seiten anlegen — der Footer zeigt
  bis dahin auf die Seiten des Vereins. Zwei Punkte, die dabei geprüft wurden: Der Link
  zur EU-Streitbeilegungsplattform entfällt (Plattform am 20.07.2025 eingestellt,
  Verordnung aufgehoben), und eine förmliche Barrierefreiheitserklärung ist nicht
  Pflicht (§ 3 Abs. 3 BFSG, Kleinstunternehmen im Dienstleistungsbereich) — die dritte
  Seite ist deshalb bewusst freiwillig gehalten.
- **Backend und Onboarding — Konzept liegt vor:**
  `docs/KONZEPT_Backend-und-Onboarding.md` (30.08.2026). Der Vorstand soll Preise,
  Fahrzeuge und Dokumente selbst pflegen, Interessenten sollen sich online melden.
  Vorgesehen: Directus auf dem Hetzner-VPS, Website bleibt statisch und wird beim
  Speichern neu gebaut, Aufnahmestrecke erzeugt eine vorausgefüllte Beitrittserklärung.
  Ohne sharePAD, ELKATO bleibt unangetastet (Entscheidung Andreas, 30.08.2026).
  **Digital unterschrieben wird nicht** — Satzung § 4.2 verlangt Schriftform, der
  Vorstand entscheidet über die Aufnahme; unterschrieben wird beim Aufnahmegespräch,
  Ausweis und Führerschein im Original für jede fahrende Person. Voraussetzung für
  jeden Betrieb auf dem VPS: AVV zwischen Verein und Grundke IT-Service.
- **Offen — Domainzugang:** Für die DNS-Umstellung wird der Kundenzugang bei der
  InternetWerk GmbH gebraucht; angefragt in der Mail vom 21.08.2026. Andreas hat nur den
  WordPress-Login. Beim Umschalten nur den A-Record umhängen, MX und SPF stehen lassen.
- **Offen — Fahrzeugfotos:** Die Seite lädt sie per Hotlink von `www.atg-grasbrunn.de`.
  Wird WordPress nach dem Umzug abgeschaltet oder das Paket verkleinert, brechen die
  Bilder. Vor dem Livegang lokal ablegen.
- **Alle offenen Punkte als Tabelle:** `docs/ROADMAP_ATG.md`, Abschnitt „Offene Punkte" —
  27 Zeilen mit Zuständigkeit und Priorität. Das ist der Wiedereinstieg.
- **Nächster Schritt:** Die zusammengeführte Mail an alle drei Vorstandsmitglieder
  rausschicken (Entwurf liegt im Chatverlauf vom 30.08.2026, Aufbau: ein Teil je Person,
  Antworten direkt im Text). Parallel Punkt 12 der offenen Liste klären — Andreas gibt
  den Kommunikationsplan frei oder ändert ihn, daran hängt der ganze Marketing-Block.
  Danach Rechtsseiten und Livegang, erst dann das Backend.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
