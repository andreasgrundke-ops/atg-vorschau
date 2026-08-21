# Soll/Ist — Korrekturliste Wolfgang Schneidt (11.08.2026)

Stand 12.08.2026. Jeder Punkt wurde nachgeprüft, nicht aus dem Commit abgeschrieben:
Website im Browser bei 1400 px und 390 px, Druckstücke im gebauten `dist/`, Verhalten
im Quelltext.

Die Originalliste kam per Mail und liegt nicht im Repo. Die Soll-Spalte ist deshalb aus
der Umsetzungsdokumentation rekonstruiert — bitte gegen die Mail vom 11.08. gegenlesen,
falls ein Punkt fehlt.

## Flotte

| Soll | Ist | Beleg |
|---|---|---|
| Anhängerkupplung nur beim Trafic, nicht bei den anderen vier | Erfüllt. Das Wort steht genau einmal im Dokument, in der Trafic-Karte. Bei den übrigen fällt der Chip weg, statt „ohne AHK" zu zeigen | `fahrzeuge.ts` Feld `ahk`, nur Trafic `true` |
| Trafic-Stellplatz benennen | Erfüllt: „Parkplatz gegenüber Winklerring 12, westlich vom Rathaus" | `fahrzeuge.ts:164` |

## Standorte

| Soll | Ist | Beleg |
|---|---|---|
| Klick auf einen Standort soll die Karte in den Blick holen und aufs Fahrzeug zoomen | Erfüllt. Liegt die Karte zu weniger als der Hälfte im Bild, wird sie herangescrollt; danach Zoom auf den Punkt | `StandorteKarte.astro:173–192` und `:152` |
| Trafic-Pin korrigieren (lag rund 250 m daneben) | Verschoben auf 48.09637 / 11.76119. **Noch nicht bestätigt** — die Beschreibung stammt vom Verein, die Koordinate ist daraus abgeleitet | `fahrzeuge.ts:165`, `geprueft: false` |
| Corsa-Pin auf Finkenstraße 14 | Verschoben auf 48.09727 / 11.7587. **Noch nicht bestätigt** | `fahrzeuge.ts:101`, `geprueft: false` |
| Rücksprung zur Übersicht | Erfüllt: Button „Alle Standorte zeigen", blendet sich nach dem Klick aus | `StandorteKarte.astro:194` |
| Interne Seite zum Pins-Setzen | Erfüllt: `/pins`, per Drag verschiebbar, „Liste kopieren", `noindex, nofollow`, nirgends verlinkt | `pins.astro:47` |

Alle fünf Koordinaten stehen auf `geprueft: false`. Bestätigt sind sie erst, wenn der
Verein die Pins über `/pins` gezogen und zurückgemeldet hat.

## Preise

| Soll | Ist | Beleg |
|---|---|---|
| Feste Kilometerpreise statt „ab", plus Staffel 301–1.000 km | Erfüllt. Tabelle zeigt je Klasse zwei Spalten: bis 300 km und 301–1.000 km | Startseite, Abschnitt „Was kostet mich das?" |
| Kostenrechner: Tag- und Nachtstunden getrennt | Erfüllt, zwei getrennte Regler | `index.astro:312–316` |
| Jede Position einzeln ausweisen | Erfüllt, Zeilen je Posten plus Summe | `index.astro:327–328` |
| Strecke exakt eingebbar | Erfüllt: Regler plus Zahlenfeld, beide gekoppelt | `index.astro:319–325` |
| Clio und Sandero in die richtige Preisklasse | Erfüllt und im Browser geprüft: Corsa und Clio zeigen 0,40 / 0,32 €/km, Sandero und ZOE 0,45 / 0,37 €/km, Trafic 0,60 / 0,52 €/km | Fahrzeugkarten, Werte aus `tarife.ts` |
| Flyer und Visitenkarte auf dieselben Preise nachziehen | **War nur halb erfüllt.** Die Beträge stimmten, standen aber fest im Text der Druckstücke statt aus `tarife.ts` zu kommen. Heute nachgezogen — siehe unten | `flyer.astro`, `flyer-quer.astro`, `visitenkarte.astro` |

## Kontakt

| Soll | Ist | Beleg |
|---|---|---|
| Eigene Kontakt-Sektion statt Sprung in den Footer | Erfüllt: Abschnitt „Noch eine Frage offen?" mit Formular, `#kontakt` zeigt darauf | Startseite, Sektion `#kontakt` |

## Heute zusätzlich erledigt

**Druckstücke hängen jetzt an der Preisquelle.** Der Befund beim Nachprüfen: In `flyer.astro`
und `flyer-quer.astro` standen Stundensätze, Kilometerspannen und Aufnahme/Einlage als
fester Text. Die Werte waren richtig, hätten eine Preisänderung aber nicht mitbekommen —
die Zusage „Umstellung ist eine Zeile" hätte für die Flyer nicht gestimmt. Beide Flyer und
die Visitenkarte beziehen die Beträge jetzt aus `tarife.ts`; für die Spannen gibt es dort
`kmSpanne()` und `kmStaffelSpanne()`.

Gegengeprüft mit einem Testlauf: `AKTIONSPREISE_GELTEN = false` gesetzt und gebaut — Website
(0,43 / 0,48 / 0,65 €/km) und beide Flyer (0,43–0,65 €/km) stellten gemeinsam um. Danach
zurück auf `true`, weil bis zur Antwort des Vereins die Aktionspreis-Darstellung gilt.

Zwei Punkte kamen dabei aus dem Code-Review und sind mit erledigt:

Die großen Kennzahlen auf Flyer und Visitenkarte („1 €/h") standen zuerst als `{ZEIT.tag}`
im Markup. Bei genau 1,00 sieht das richtig aus, bei einem krummen Satz hätte es `1.5`
mit englischem Punkt geschrieben — JavaScript formatiert eine Zahl ohne Locale-Angabe
nicht deutsch. Dafür gibt es jetzt `zahlKurz()`.

Die Reihenfolge der Preisklassen stand nach dem ersten Wurf an zwei Stellen: in
`index.astro` als Liste und in `tarife.ts` für die Flyer-Spanne. Ein Zusatz oder eine
Umsortierung hätte auffallen müssen, wäre aber leicht durchgerutscht. `index.astro`
leitet seine Liste jetzt aus `ALLE_KLASSEN` ab.

**Schwebende Aktions-Buttons überdeckten den Inhalt.** Gemessen bei 1400 px: Die Leiste war
185 px breit und lag 83 px über der Kostenrechner-Karte, der Betrag „Dein Preis" verschwand
darunter. Grund ist die Geometrie: Der Inhalt ist auf 1200 px begrenzt und mittig, daneben
bleibt erst ab rund 1565 px Fensterbreite genug Platz für beschriftete Pills. Betroffen war
also nicht nur 1400 px, sondern jede Breite von 768 px aufwärts — auch die verbreiteten
1366er und 1440er Laptops.

Ab 1680 px steht die Leiste unverändert mit Beschriftung da (57 px Abstand). Darunter zeigt
sie nur die Icons, 48 px breit wie der Scroll-nach-oben-Button darunter; die Beschriftung
klappt bei Mauszeiger oder Tastaturfokus nach links auf. Im DOM bleibt der Text stehen,
Screenreader lesen ihn also weiter. Mobil ist wie bisher nichts davon zu sehen, dort
übernimmt die Tab-Bar.

Nachgemessen: 1400 px → 54 px Abstand statt 83 px Überlappung · 1600 px → 154 px ·
1280 px → Betrag frei, die Leiste berührt nur noch die Kartenecke · 1024 px → Betrag frei
mit 9 px · 390 px unverändert.

## Was noch offen ist

Beim Verein, siehe `RUECKFRAGEN-Verein_2026-08-12.md` und die fertige Mail in
`MAIL-Rueckfragen_2026-08-12.md`:

1. Welche Kilometerpreise gelten seit dem 30.06.2026?
2. Wird die Staffel ab 301 km gestaffelt oder rückwirkend gerechnet?
3. Gibt es einen Satz oberhalb von 1.000 km?
4. Stimmen die Fahrzeugklassen (Clio in PKW 1, Sandero in PKW 2)?
5. Stellplätze über `/pins` bestätigen.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
