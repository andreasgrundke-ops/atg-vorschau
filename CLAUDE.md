# CLAUDE.md — Website ATG Grasbrunn

> Teil des Workspace `00_KI_Work` · Strang **02_GIT** · Router + globaler Kontext: Root-Master `00_KI_Work\CLAUDE.md` (§0 Projekt-Router).

## Zweck
Kunden-Website Auto-Teiler Grasbrunn e.V. (atg-grasbrunn.de) — Neuentwurf als Ablösung der
bestehenden WordPress-Seite. Vorschau läuft über GitHub Pages, Abstimmung mit dem Vorstand.

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
| Flyer / Visitenkarte | `src/pages/flyer.astro`, `flyer-quer.astro`, `visitenkarte.astro` |

**Fallstricke:**
- Astro komprimiert HTML — ein Zeilenumbruch direkt nach `</b>` frisst das Leerzeichen.
  Inline-Tags und Folgetext in dieselbe Zeile schreiben.
- Per JS erzeugte Elemente tragen kein `data-astro-cid` → Scoped-CSS greift nicht.
  Für solche Knoten `:global(...)` verwenden (siehe Kostenrechner-Zeilen).
- Der Service Worker cacht die Shell: beim Testen von Änderungen abmelden oder Cache leeren,
  sonst prüft man den alten Stand.
- Zahlen nie roh ins Markup (`{ZEIT.tag}`) — JavaScript formatiert ohne Locale englisch,
  aus 1,5 würde „1.5". Über `zahlKurz()`, `proKm()`, `proStd()` oder `eur()` gehen.
- Die schwebenden Aktions-Buttons stehen fest über dem Inhalt. Der Inhalt ist 1200 px breit
  und mittig, daneben passt eine beschriftete Leiste erst ab rund 1565 px Fensterbreite.
  Wer dort etwas verbreitert, prüft Breiten zwischen 1024 und 1680 px gegen.

## Stand / offen / nächster Schritt
- **Stand:** 21.08.2026 — Version 1.2 auf der Vorschau (GitHub Pages). Enthält die
  Korrekturliste von Wolfgang Schneidt (Mail vom 27.07.2026, eingearbeitet am 12.08.) und
  zwei Nachzüge: Die schwebenden Aktions-Buttons zeigen unterhalb 1680 px nur noch ihre
  Icons (48 px, Beschriftung klappt bei Hover/Fokus auf) — vorher lagen sie 83 px über dem
  Kostenrechner und verdeckten den Betrag, und zwar auf jeder Breite ab 768 px, nicht nur
  bei 1400. Außerdem holen Flyer, Querflyer und Visitenkarte ihre Beträge aus `tarife.ts`;
  dort standen sie als fester Text, eine Preisumstellung hätte sie stumm veralten lassen.
  Gegenprobe mit `AKTIONSPREISE_GELTEN = false`: Website und beide Flyer stellen gemeinsam
  um. Soll/Ist je Punkt in `docs/SOLL-IST_Korrekturliste-Schneidt.md`.
- **Offen — Verein:** sechs Rückfragen, Herleitung in
  `docs/RUECKFRAGEN-Verein_2026-08-12.md`, Mailtext in `docs/MAIL-Rueckfragen_2026-08-12.md`.
  Am 21.08. dazugekommen: Die Preisseite des Vereins vermerkt bei PKW 2 hinter
  „0,48 / 0,45 € pro km" den Zusatz „Renault ZOE keine Änderung!" — der Aktionspreis gilt
  also vermutlich nicht für die ZOE. `tarife.ts` führt Sandero und ZOE bisher unter einem
  gemeinsamen Klassenpreis von 0,45 €/km; bestätigt der Verein die Lesart, braucht die ZOE
  einen eigenen Satz. Weiter offen: geltende Kilometerpreise seit dem 30.06.2026, Lesart
  der Staffel ab 301 km, Satz oberhalb 1.000 km, Klassenzuordnung Clio/Sandero und die
  Bestätigung der fünf Stellplätze über `/pins` (alle stehen auf `geprueft: false`).
- **Offen — vor dem Livegang:** Der Vorstand soll Preisliste und Dokumente selbst
  austauschen können, also Login und Upload (Anforderung Andreas, 21.08.2026). Das sprengt
  den heutigen Aufbau: Astro baut statisch, die Seite liegt auf GitHub Pages — dort gibt es
  weder Anmeldung noch Schreibzugriff. Braucht eigenes Hosting mit Backend. Konzeptionell
  offen, noch nicht begonnen.
- **Nächster Schritt:** Antworten des Vereins einarbeiten (Preise = Konstanten in
  `tarife.ts`, Koordinaten = `fahrzeuge.ts` + `geprueft: true`), danach Login/Upload
  konzipieren.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
