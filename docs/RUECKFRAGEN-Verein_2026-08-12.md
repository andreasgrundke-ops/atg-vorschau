# Rückfragen an den Verein — Stand 12.08.2026

Offene Punkte aus der Umsetzung von Wolfgang Schneidts Korrekturliste (11.08.2026).
Alles andere ist eingearbeitet; diese fünf Punkte kann nur der Verein beantworten.
Die Fragen sind bewusst so formuliert, dass sie sich direkt in eine Mail kopieren lassen.

---

## 1. Welche Kilometerpreise gelten heute? (blockiert die Preisangabe)

Auf eurer Preisseite stehen je Klasse zwei Werte, dazu der Hinweis
**„Die roten Preise gelten mindestens bis 30.06.2026"**. Das Datum ist vorbei, die Seite
unverändert. Auf der neuen Website stehen aktuell die roten (günstigeren) Preise:

| Klasse | bis 300 km | 301–1.000 km |
|---|---|---|
| PKW 1 — Corsa, Clio Grandtour | 0,40 €/km | 0,32 €/km |
| PKW 2 — Sandero, ZOE | 0,45 €/km | 0,37 €/km |
| Transporter — Trafic | 0,60 €/km | 0,52 €/km |

**Frage:** Gelten diese Preise weiter, oder sind es wieder 0,43 / 0,48 / 0,65 €/km?

*Umstellung ist eine Zeile:* `AKTIONSPREISE_GELTEN = false` in `src/data/tarife.ts`.

## 2. Wie wird die Staffel ab 301 km gerechnet?

Der Kostenrechner rechnet gestaffelt: die ersten 300 km zum normalen Satz, jeder
weitere Kilometer zum reduzierten. Beispiel 420 km im Corsa: 300 × 0,40 € + 120 × 0,32 €.

**Frage:** Stimmt das so — oder gilt der reduzierte Satz ab 301 km rückwirkend für die
ganze Strecke (420 × 0,32 €)? Der Unterschied sind hier 24,00 €.

## 3. Was gilt oberhalb von 1.000 km?

Die Preisliste endet bei „ab km 301 – km 1.000". Der Rechner ist deshalb bei 1.000 km
gedeckelt, mit dem Hinweis, längere Fahrten beim Vorstand zu erfragen.

**Frage:** Gibt es für längere Fahrten einen eigenen Satz?

## 4. Stimmen die Fahrzeugklassen?

Laut Preisseite: **PKW 1** = Toyota Yaris, Opel Corsa, Renault Clio Grandtour ·
**PKW 2** = Dacia Sandero, Renault ZOE. Danach ist der Clio der günstigere und der
Sandero der teurere — auf der alten Entwurfsseite war das vertauscht, jetzt ist es
nach eurer Preisliste eingetragen.

**Frage:** Passt das? (Der Yaris ist raus, den gibt es nicht mehr — die Preisseite
führt ihn noch.)

## 5. Wo genau stehen die Fahrzeuge?

Der Trafic ist eingetragen wie beschrieben: Parkplatz gegenüber Winklerring 12,
westlich vom Rathaus. Corsa, Clio und ZOE sind aus Adressdaten abgeleitet und
metergenau noch nicht bestätigt.

**Bitte:** Die Seite **/pins** öffnen (nicht öffentlich verlinkt, am Handy bedienbar),
jeden Pin auf den echten Stellplatz ziehen, auf **Liste kopieren** tippen und den Text
zurückschicken. Dann sitzen alle fünf Punkte exakt.

Vorschau-Adresse: `…/atg-vorschau/pins/`

---

## Nebenbefund ohne Rückfrage

Die alte Preisseite nennt außerdem Grobverschmutzung 60 €, Fahrten außerhalb der
Buchungszeit 10 €, Zusatz-Transponderkarte 5 €. Diese Positionen stehen in
`src/data/tarife.ts` bereit, sind auf der Website aber bewusst nicht ausgestellt —
sie gehören eher in die Nutzungsordnung als auf eine Startseite. Falls gewünscht,
nehmen wir sie in die Tarif-Tabelle auf.

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
