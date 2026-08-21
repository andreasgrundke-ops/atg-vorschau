# Mail an den Vorstand — Rückfragen zur neuen Website

Versandfertiger Text zum Kopieren. Inhaltliche Herleitung der Fragen steht in
`RUECKFRAGEN-Verein_2026-08-12.md`. Anrede ggf. auf den tatsächlichen Verteiler anpassen.

---

**Betreff:** Neue Website — fünf Punkte, die ich von euch brauche

---

Hallo Wolfgang,

deine Korrekturen vom 11. August sind eingearbeitet. Die Anhängerkupplung steht jetzt nur
noch beim Trafic, der Stellplatz des Trafic ist benannt und der Pin auf der Karte sitzt
richtig, ein Klick auf einen Standort holt die Karte in den Blick, und der Kostenrechner
rechnet Tag- und Nachtstunden getrennt und weist jede Position einzeln aus. Die
Kilometerpreise stehen als feste Sätze da, nicht mehr als „ab".

Beim Einarbeiten sind fünf Punkte aufgetaucht, die ich nicht selbst entscheiden kann.

**1. Welche Kilometerpreise gelten heute?**

Auf eurer Preisseite stehen je Klasse zwei Werte, dazu der Vermerk „Die roten Preise gelten
mindestens bis 30.06.2026". Das Datum ist vorbei, die Seite unverändert. Ich habe vorerst
die roten, also günstigeren Preise eingetragen:

- PKW 1 (Corsa, Clio Grandtour): 0,40 €/km, ab 301 km 0,32 €/km
- PKW 2 (Sandero, ZOE): 0,45 €/km, ab 301 km 0,37 €/km
- Transporter (Trafic): 0,60 €/km, ab 301 km 0,52 €/km

Gelten die weiter, oder sind es wieder 0,43 / 0,48 / 0,65 €/km? Solange das offen ist,
kann die Seite nicht online — falsche Preise sind das Einzige, was auf so einer Seite
wirklich weh tut.

**2. Wie ist die Staffel ab 301 km gemeint?**

Ich rechne aktuell gestaffelt: die ersten 300 km zum normalen Satz, jeden weiteren
Kilometer zum reduzierten. Bei 420 km im Corsa also 300 × 0,40 € plus 120 × 0,32 €,
zusammen 158,40 €.

Oder gilt der reduzierte Satz ab 301 km rückwirkend für die ganze Strecke? Dann wären es
420 × 0,32 €, also 134,40 €. Der Unterschied sind hier 24 €.

**3. Was gilt oberhalb von 1.000 km?**

Eure Preisliste endet bei „ab km 301 – km 1.000". Der Rechner ist deshalb bei 1.000 km
gedeckelt und verweist für längere Fahrten auf den Vorstand. Gibt es dafür einen eigenen
Satz?

**4. Stimmen die Fahrzeugklassen?**

Nach eurer Preisliste ist PKW 1 = Yaris, Corsa, Clio Grandtour und PKW 2 = Sandero, ZOE.
Der Clio ist damit der günstigere, der Sandero der teurere. In meinem ersten Entwurf war
das vertauscht, jetzt steht es wie bei euch. Passt das so? Den Yaris habe ich weggelassen,
den gibt es ja nicht mehr — auf eurer Preisseite steht er noch.

**5. Wo genau stehen die Fahrzeuge?**

Den Trafic habe ich wie beschrieben eingetragen: Parkplatz gegenüber Winklerring 12,
westlich vom Rathaus. Bei Corsa, Clio und ZOE habe ich die Punkte aus den Adressen
abgeleitet, metergenau sind sie also noch nicht.

Dafür gibt es eine kleine Hilfsseite, die auch am Handy funktioniert:

https://andreasgrundke-ops.github.io/atg-vorschau/pins/

Dort jeden Pin auf den echten Stellplatz ziehen, unten auf „Liste kopieren" tippen und mir
den Text zurückschicken. Dann sitzen alle fünf Punkte exakt.

Die aktuelle Vorschau liegt hier: https://andreasgrundke-ops.github.io/atg-vorschau/

Sobald die Antworten da sind, ziehe ich alles nach und schicke euch die Fassung zur
Abstimmung.

Viele Grüße
Andreas Grundke

---

## Randnotiz, keine Frage

Eure alte Preisseite nennt außerdem Grobverschmutzung 60 €, Fahrten außerhalb der
Buchungszeit 10 € und eine Zusatz-Transponderkarte für 5 €. Die Beträge liegen in
`src/data/tarife.ts` bereit, stehen aber bewusst nicht auf der Startseite — sie gehören
eher in die Nutzungsordnung. Falls der Verein sie doch auf der Seite haben will, sind sie
in wenigen Minuten in der Tarif-Tabelle.

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
