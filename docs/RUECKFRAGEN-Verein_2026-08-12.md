# Rückfragen an den Verein — beantwortet am 30.08.2026

Sechs Punkte aus der Umsetzung von Wolfgang Schneidts Korrekturliste konnte nur der
Verein entscheiden. Wolfgang Schneidt hat sie am 30.08.2026 per Mail beantwortet, alle
sechs. Dieses Dokument hält Frage, Antwort und die Stelle im Code fest — es ist damit
die Herleitung für die Preise und Klassen, die auf der Seite stehen.

Zusätzlich aus derselben Mail: Der Dacia Sandero heißt in der Fahrzeugübersicht jetzt
**Mittelklasse** statt Kleinwagen.

---

## 1. Gilt der saisonale Spritzuschlag noch? → **Ja**

Auf der Preisseite steht je Klasse ein Wertepaar, der höhere rot ausgezeichnet, darunter
„Die roten Preise gelten mindestens bis 30.06.2026".

Die Vereinsmeldung vom 15.04.2026 („Teure Spritpreise") erklärt, was die roten Werte
sind: ein saisonaler Aufschlag, 3 Cent pro km für Benziner und 5 Cent für den Trafic,
mit der Zusage, ihn zurückzunehmen, falls die Spritpreise sinken. Die Rechnung geht auf:

| Klasse | regulär | + Zuschlag | = rot |
|---|---|---|---|
| PKW 1 | 0,40 €/km | 3 ct | 0,43 €/km |
| PKW 2 | 0,45 €/km | 3 ct | 0,48 €/km |
| Trafic | 0,60 €/km | 5 ct | 0,65 €/km |

Der Staffelpreis ab 301 km hat nur einen Wert (0,32 / 0,37 / 0,52 €/km), ist vom
Zuschlag also nicht betroffen.

**Antwort:** „Ja, der Zuschlag gilt noch." Die Website zeigt deshalb 0,43 €/km für
PKW 1, 0,48 €/km für den Sandero, 0,45 €/km für die ZOE und 0,65 €/km für den Trafic.

*Rücknahme ist eine Zeile:* `SPRITZUSCHLAG_GILT = false` in `src/data/tarife.ts` — sie
stellt Website, Flyer, Querflyer und Visitenkarte gemeinsam um.

## 2. Ist die ZOE vom Zuschlag ausgenommen? → **Ja**

Neben dem Wertepaar von PKW 2 steht, ebenfalls rot, „Renault ZOE keine Änderung!". Ein
Spritzuschlag trifft ein Elektroauto nicht.

**Antwort:** „Passt." Die ZOE hat eine eigene Zeile in Tarif-Tabelle und Kostenrechner
und steht bei 0,45 €/km, der Sandero bei 0,48 €/km. Fällt der Zuschlag weg, kosten beide
wieder gleich viel.

## 3. Wie wird die Staffel ab 301 km gerechnet? → **Abschnittsweise**

**Antwort:** „Die erste Variante ist richtig." Also die ersten 300 km zum normalen Satz,
jeder weitere zum reduzierten — nicht rückwirkend auf die ganze Strecke.

Beispiel 420 km im Corsa: 300 × 0,43 € + 120 × 0,32 € = **167,40 €**. Der Kostenrechner
weist genau diesen Wert aus, jede Position einzeln.

## 4. Was gilt oberhalb von 1.000 km? → **Wieder der normale Satz**

Die Preisliste endet bei „ab km 301 – km 1.000". Der Rechner war deshalb bei 1.000 km
gedeckelt und verwies auf den Vorstand.

**Antwort:** „Ab 1000 km gilt wieder der normale Satz."

**Präzisiert durch die Nutzungsordnung (Ziff. 5, Fassung 01.01.2025):** „Werden pro
zusammenhängenden Buchungszeitraum mehr als 300 km gefahren, gilt jeweils für km 301 bis
1000, **1301 bis 2000** usw. der km-Tarif II." Der Grundtarif ab Kilometer 1.001 gilt
also nur für 300 km, dann greift wieder der Staffelpreis. Die Staffel läuft zyklisch:
je angefangene 1.000 km sind 300 km Grundtarif und 700 km Staffelpreis.

So ist es umgesetzt. Der Deckel im Rechner ist weg, Regler und Zahlenfeld gehen bis
2.000 km; oberhalb 1.000 km nennen die Rechnerzeilen „Grundtarif" und „Staffelpreis",
weil die Kilometer dann nicht mehr an einem Stück liegen.

> **Abgerechnet wird abschnittsweise, nie rückwirkend** (Andreas, 30.08.2026): Wer die
> 1.000er-Grenze überfährt, behält den Rabatt auf die bereits gefahrenen Kilometer 301
> bis 1.000. Rückwirkend gerechnet spränge der Preis beim 1.001. Kilometer um über 70 €.

Kontrollwerte Corsa: 1.000 km = 353,00 € · 1.001 km = 353,43 € · 1.300 km = 482,00 € ·
1.500 km = 546,00 € · 2.000 km = 706,00 €.

## 5. Stimmen die Fahrzeugklassen? → **Ja**

Laut Preisseite: **PKW 1** = Toyota Yaris, Opel Corsa, Renault Clio Grandtour ·
**PKW 2** = Dacia Sandero, Renault ZOE. Danach ist der Clio der günstigere und der
Sandero der teurere — im ersten Entwurf war das vertauscht.

**Antwort:** „Passt so!" Der Yaris bleibt draußen, den gibt es nicht mehr; die Preisseite
des Vereins führt ihn noch.

Dazu passt die Nachmeldung vom 30.08.2026: Der Sandero trug in der Fahrzeugübersicht das
Badge „Kleinwagen" und stand damit neben dem Corsa, obwohl er in der teureren Klasse
liegt. Er heißt jetzt **Mittelklasse** — auf der Fahrzeugkarte, in der Standorte-Karte
und auf dem Querflyer.

## 6. Stimmen die Stellplätze? → **Ja, alle fünf**

Alle Koordinaten hat Andreas am 21.08.2026 über `/pins` gesetzt, Gegenprobe über
OpenStreetMap:

| Fahrzeug | Koordinate | Gegenprobe |
|---|---|---|
| Clio | 48.09676, 11.76716 | 6 m neben dem OSM-Eintrag „ATG - Renault Clio Grandtour", Dianastraße 14-16 |
| Trafic | 48.09641, 11.76126 | 16 m neben dem OSM-Eintrag „ATG - Renault Trafic", Winklerring |
| Sandero | 48.09581, 11.76101 | 9 m neben dem OSM-Eintrag „ATG - Dacia", Ecke Waldstraße |
| ZOE | 48.09589, 11.76123 | 7 m neben einer Wirelane-Ladesäule |
| Corsa | 48.09708, 11.75879 | Finkenstraße auf Höhe Nr. 14 |

**Antwort:** „Passt so!", die ZOE an der Ladesäule ausdrücklich eingeschlossen. Alle fünf
stehen jetzt auf `geprueft: true` in `src/data/fahrzeuge.ts`.

---

## Nebenbefunde

**Nicht ausgestellte Entgelte.** Die Preisseite nennt außerdem Grobverschmutzung 60 €,
Fahrten außerhalb der Buchungszeit 10 €, Zusatz-Transponderkarte 5 €. Sie stehen in
`src/data/tarife.ts` bereit, sind auf der Website aber bewusst nicht ausgestellt — sie
gehören eher in die Nutzungsordnung als auf eine Startseite. Auf Wunsch nehmen wir sie
in die Tarif-Tabelle auf.

**Rechtsseiten fehlen weiterhin.** Der Footer verwies auf eigene Seiten `/impressum/`,
`/datenschutz/` und `/barrierefreiheit/`, die es in diesem Projekt nicht gibt — alle drei
liefen ins Leere. Sie zeigen jetzt auf die bestehenden Seiten des Vereins. Vor dem
Livegang braucht die Seite eigene: Die WordPress-Datenschutzerklärung beschreibt die
Technik dieser Website nicht (Kartenkacheln von OpenStreetMap, Service Worker, lokale
Schriften, keine Cookies, kein Tracking).

**Abgeglichen und unverändert korrekt:** Zeittarife (1,00 €/h tags, 0,20 €/h nachts),
Aufnahmebeitrag 50 €, Einlage 600 €, monatlicher Beitrag 0 €, Selbstbeteiligung 200 €
Haftpflicht / 600 € Kasko, Vereinsdaten (Winklerring 12, VR 207138 AG München, Vorstand
Böhme / Graf von Buxhoeveden / Schneidt).

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
