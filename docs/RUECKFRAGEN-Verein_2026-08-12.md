# Rückfragen an den Verein — Stand 21.08.2026

Offene Punkte aus der Umsetzung von Wolfgang Schneidts Korrekturliste (Mail vom
27.07.2026). Alles andere ist eingearbeitet; diese Punkte kann nur der Verein
beantworten. Die Fragen sind so formuliert, dass sie sich direkt in eine Mail kopieren
lassen.

> **Änderung am 21.08.2026:** Ein Abgleich mit atg-grasbrunn.de hat die Preisfrage
> gedreht. Die frühere Fassung dieses Dokuments hielt den niedrigeren Wert für einen
> Aktionspreis. Tatsächlich ist der höhere, rot ausgezeichnete Wert ein befristeter
> Spritzuschlag. Herleitung siehe Punkt 1.

---

## 1. Gilt der saisonale Spritzuschlag noch?

Auf der Preisseite steht je Klasse ein Wertepaar, der höhere rot ausgezeichnet, darunter
„Die roten Preise gelten mindestens bis 30.06.2026".

Die Vereinsmeldung vom 15.04.2026 („Teure Spritpreise") erklärt, was die roten Werte
sind: ein **saisonaler Aufschlag für das laufende Quartal**, 3 Cent pro km für Benziner
und 5 Cent für den Trafic, mit der Zusage, ihn im Folgequartal zurückzunehmen, falls die
Spritpreise sinken. Die Rechnung geht auf:

| Klasse | regulär | + Zuschlag | = rot |
|---|---|---|---|
| PKW 1 | 0,40 €/km | 3 ct | 0,43 €/km |
| PKW 2 | 0,45 €/km | 3 ct | 0,48 €/km |
| Trafic | 0,60 €/km | 5 ct | 0,65 €/km |

Der Staffelpreis ab 301 km hat nur einen Wert (0,32 / 0,37 / 0,52 €/km), ist also vom
Zuschlag nicht betroffen.

Das genannte Enddatum ist verstrichen. Die Preisseite wurde zuletzt am 21.07.2026
geändert, ohne den Zuschlag zu entfernen.

**Frage:** Ist der Zuschlag ausgelaufen? Die neue Website zeigt aktuell die regulären
Preise ohne Zuschlag (0,40 / 0,45 / 0,60 €/km).

*Umstellung ist eine Zeile:* `SPRITZUSCHLAG_GILT = true` in `src/data/tarife.ts`.

## 2. Die ZOE beim Zuschlag

Neben dem Wertepaar von PKW 2 steht, ebenfalls rot, „Renault ZOE keine Änderung!". Ein
Spritzuschlag trifft ein Elektroauto nicht — die ZOE bliebe also bei 0,45 €/km, während
der Sandero mit Zuschlag 0,48 €/km kostet.

**Frage:** Stimmt diese Lesart? Solange kein Zuschlag gilt, spielt es keine Rolle, beide
kosten 0,45 €/km. Wird er wieder aktiviert, braucht die ZOE einen eigenen Satz, weil der
Zuschlag am Antrieb hängt und nicht an der Preisklasse.

## 3. Wie wird die Staffel ab 301 km gerechnet?

Der Kostenrechner rechnet gestaffelt: die ersten 300 km zum normalen Satz, jeder weitere
Kilometer zum reduzierten. Beispiel 420 km im Corsa: 300 × 0,40 € + 120 × 0,32 €.

**Frage:** Stimmt das so — oder gilt der reduzierte Satz ab 301 km rückwirkend für die
ganze Strecke (420 × 0,32 €)? Der Unterschied sind hier 24,00 €.

## 4. Was gilt oberhalb von 1.000 km?

Die Preisliste endet bei „ab km 301 – km 1.000". Der Rechner ist deshalb bei 1.000 km
gedeckelt, mit dem Hinweis, längere Fahrten beim Vorstand zu erfragen.

**Frage:** Gibt es für längere Fahrten einen eigenen Satz?

## 5. Stimmen die Fahrzeugklassen?

Laut Preisseite: **PKW 1** = Toyota Yaris, Opel Corsa, Renault Clio Grandtour ·
**PKW 2** = Dacia Sandero, Renault ZOE. Danach ist der Clio der günstigere und der
Sandero der teurere — auf der alten Entwurfsseite war das vertauscht, jetzt ist es nach
der Preisliste eingetragen.

**Frage:** Passt das? (Der Yaris ist raus, den gibt es nicht mehr — die Preisseite führt
ihn noch.)

## 6. Stellplätze bestätigen

Alle fünf Koordinaten hat Andreas am 21.08.2026 über `/pins` gesetzt. Gegenprobe über
OpenStreetMap:

| Fahrzeug | Koordinate | Gegenprobe |
|---|---|---|
| Clio | 48.09676, 11.76716 | 6 m neben dem OSM-Eintrag „ATG - Renault Clio Grandtour", Dianastraße 14-16 |
| Trafic | 48.09641, 11.76126 | 16 m neben dem OSM-Eintrag „ATG - Renault Trafic", Winklerring |
| Sandero | 48.09581, 11.76101 | 9 m neben dem OSM-Eintrag „ATG - Dacia", Ecke Waldstraße |
| ZOE | 48.09589, 11.76123 | 7 m neben einer Wirelane-Ladesäule |
| Corsa | 48.09708, 11.75879 | Finkenstraße auf Höhe Nr. 14 |

**Bitte:** Die Seite **/pins** öffnen (nicht öffentlich verlinkt, am Handy bedienbar),
jeden Pin gegenprüfen und bei Bedarf ziehen, auf **Liste kopieren** tippen und den Text
zurückschicken. Danach stehen die Punkte auf `geprueft: true`.

Vorschau-Adresse: `…/atg-vorschau/pins/`

**Offen dabei:** Die ZOE steht laut Beschreibung „Am Rathaus (Ladepunkt)". Die gesetzte
Koordinate liegt an einer Ladesäule rund 20 m neben dem Sandero. Beides kann stimmen,
sollte aber bestätigt werden.

---

## Nebenbefund ohne Rückfrage

Die Preisseite nennt außerdem Grobverschmutzung 60 €, Fahrten außerhalb der Buchungszeit
10 €, Zusatz-Transponderkarte 5 €. Diese Positionen stehen in `src/data/tarife.ts`
bereit, sind auf der Website aber bewusst nicht ausgestellt — sie gehören eher in die
Nutzungsordnung als auf eine Startseite. Falls gewünscht, nehmen wir sie in die
Tarif-Tabelle auf.

Ebenfalls abgeglichen und unverändert korrekt: Zeittarife (1,00 €/h tags, 0,20 €/h
nachts), Aufnahmebeitrag 50 €, Einlage 600 €, monatlicher Beitrag 0 €, Selbstbeteiligung
200 € Haftpflicht / 600 € Kasko, Vereinsdaten (Winklerring 12, VR 207138 AG München,
Vorstand Böhme / Graf von Buxhoeveden / Schneidt).

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
