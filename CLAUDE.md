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

## Hosting und DNS der bestehenden Seite (Stand 21.08.2026)

Ermittelt über DNS, RIPE und die Anbieterseite — nicht vom Verein bestätigt.

| | |
|---|---|
| Hoster / DNS | **InternetWerk GmbH**, Frankenstr. 2A, 04932 Hirschfeld · Tel. 035343-668800 · info@internetwerk.de · HRB 9096 AG Cottbus |
| Nameserver | `ns1.internetwerk.de`, `ns2.internetwerk.de` |
| Webserver | `91.210.225.28` (Apache), IP-Netz von IP-Projects, als InternetWerk GmbH eingetragen |
| Mail | MX `mail.atg-grasbrunn.de` → **dieselbe IP**, SPF `include:spf.internetwerk.de` |

Andreas hat den WordPress-Login, aber keinen Hoster-Zugang — der ist für die DNS-Einträge
nötig und beim Verein anzufragen.

**Beim Umschalten aufpassen:** Website und Vereins-Mail liegen auf derselben Maschine.
Für den Livegang nur den A-Record (und ggf. `www`) umhängen. MX und SPF unangetastet
lassen, sonst reißt die E-Mail des Vereins ab. Ein Nameserver-Wechsel würde beides auf
einmal verschieben und muss die MX-Einträge mitnehmen.

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
- **Preise (21.08.2026):** Die Website zeigt die Preise **mit saisonalem Spritzuschlag**,
  also so, wie sie auf atg-grasbrunn.de als geltend markiert sind: 0,43 €/km PKW 1,
  0,48 €/km Sandero, 0,45 €/km ZOE, 0,65 €/km Trafic (Staffel unverändert 0,32/0,37/0,52).
  Der Zuschlag stammt aus der Vereinsmeldung vom 15.04.2026 (Benziner 3 ct, Trafic 5 ct,
  „mindestens bis 30.06.2026") und ist nie zurückgenommen worden. Die ZOE hat eine eigene
  Klassenzeile bekommen, weil ein Spritzuschlag ein E-Auto nicht trifft („Renault ZOE
  keine Änderung!") — Tabelle, Kostenrechner und Fahrzeugkarte führen sie getrennt vom
  Sandero. Rücknahme = `SPRITZUSCHLAG_GILT = false` in `tarife.ts`.
- **Offen — Verein:** sechs Rückfragen, Herleitung und Belege in
  `docs/RUECKFRAGEN-Verein_2026-08-12.md`: Gilt der Zuschlag noch? Ist die ZOE davon
  ausgenommen? Lesart der Staffel ab 301 km, Satz oberhalb 1.000 km, Klassenzuordnung
  Clio/Sandero, Bestätigung der Stellplätze über `/pins`.
- **Offen — Rechtsseiten:** Der Footer zeigte auf eigene `/impressum/`, `/datenschutz/`
  und `/barrierefreiheit/` — die es nicht gibt, alle drei liefen auf 404. Sie verweisen
  jetzt auf die Seiten des Vereins. Eigene müssen vor dem Livegang her, weil die
  WordPress-Datenschutzerklärung die Technik dieser Seite nicht beschreibt (OpenStreetMap-
  Kacheln, Service Worker, lokale Schriften, keine Cookies).
- **Stellplätze:** Alle fünf Koordinaten am 21.08.2026 über `/pins` gesetzt und gegen
  OpenStreetMap geprüft (Clio 6 m, Trafic 16 m, Sandero 9 m neben den dort eingetragenen
  ATG-Punkten, ZOE 7 m neben einer Ladesäule, Corsa Finkenstraße Höhe 14). Stehen bis zur
  Abnahme durch den Verein weiter auf `geprueft: false`.
- **Offen — vor dem Livegang:** Der Vorstand soll Preisliste und Dokumente selbst
  austauschen können, also Login und Upload (Anforderung Andreas, 21.08.2026). Das sprengt
  den heutigen Aufbau: Astro baut statisch, die Seite liegt auf GitHub Pages — dort gibt es
  weder Anmeldung noch Schreibzugriff. Braucht eigenes Hosting mit Backend. Konzeptionell
  offen, noch nicht begonnen.
- **Nächster Schritt:** Antworten des Vereins einarbeiten (Preise = Konstanten in
  `tarife.ts`, Koordinaten = `fahrzeuge.ts` + `geprueft: true`), danach Login/Upload
  konzipieren.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
