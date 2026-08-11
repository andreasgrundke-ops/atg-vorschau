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
| Preise, Klassen, Rechenlogik | `src/data/tarife.ts` — **einzige Quelle**, nicht in Seiten hartkodieren |
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

## Stand / offen / nächster Schritt
- **Stand:** 12.08.2026 — Korrekturliste Wolfgang Schneidt (11.08.2026) eingearbeitet:
  Anhängerkupplung nur beim Trafic, Trafic-Stellplatz benannt und Pin korrigiert,
  Standort-Klick scrollt die Karte in den Blick und zoomt, feste Kilometerpreise mit
  Staffel 301–1.000 km, Kostenrechner rechnet Tag/Nacht getrennt und weist jede Position
  aus, eigene Kontakt-Sektion (`#kontakt` zeigte vorher auf den Footer). Nebenbefund:
  Clio und Sandero standen in den falschen Preisklassen — nach Preisliste des Vereins
  korrigiert. Build grün, im Browser geprüft (Desktop + 390 px).
- **Offen:** fünf Rückfragen an den Vorstand → `docs/RUECKFRAGEN-Verein_2026-08-12.md`.
  Wichtigste: Welche Kilometerpreise gelten seit dem 30.06.2026? Wie ist die Staffel
  gemeint? Stellplätze über `/pins` bestätigen lassen.
  Beobachtung: Die schwebenden Aktions-Buttons rechts überdecken bei Fensterbreiten um
  1400 px die rechte Kante der Inhalte (Beträge im Kostenrechner) — Entscheidung offen.
- **Nächster Schritt:** Antworten des Vereins einarbeiten (Preise = eine Konstante in
  `tarife.ts`, Koordinaten = `fahrzeuge.ts` + `geprueft: true`), dann Version 1.2 zur
  Abstimmung schicken.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
