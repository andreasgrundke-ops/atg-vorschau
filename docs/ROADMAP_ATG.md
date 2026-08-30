# ATG — Projektübersicht und Reihenfolge

Stand 30.08.2026 · intern, Grundke IT-Service

Aus der Website ist ein mehrteiliges Projekt geworden. Diese Seite hält fest, welche
Bausteine es gibt, in welcher Reihenfolge sie drankommen und was jeweils zu klären ist.
Manches läuft nebeneinander, manches baut aufeinander auf.

**Das Ziel hinter allem:** mehr Mitglieder, mehr Buchungen. Alles andere ist Mittel zum
Zweck.

---

## Reihenfolge

| Prio | Baustein | Stand |
|---|---|---|
| **1** | Website abstimmen und live bringen | Version 1.3 auf der Vorschau, Rückmeldung läuft |
| **2** | Abrechnung vereinfachen | noch nicht begonnen, Ist-Aufnahme steht aus |
| **3** | Mitgliederverwaltung ablösen | noch nicht begonnen |
| **4** | Vereins-Backend und Aufnahmestrecke | Konzept liegt vor |
| **5** | Mitglieder informieren und aktivieren | Konzept liegt vor |
| — | Nebenthemen: MVV-Karten, Parken in München | Prüfaufträge |

---

## Offene Punkte (Stand 30.08.2026)

| # | Thema | Was offen ist | Wer | Prio |
|---|---|---|---|---|
| **Website — Livegang** ||||
| 1 | Kilometerstaffel | Nutzungsordnung Ziff. 5 bestätigen (301–1000, 1301–2000 …) | Wolfgang | hoch |
| 2 | Abrechnung ELKATO | Rechnet ELKATO wie unser Kostenrechner? | Wolfgang | hoch |
| 3 | Hoster-Zugang | Kundennummer, Passwort, hinterlegte E-Mail-Adresse | Dirk | hoch |
| 4 | Hosting-Paket | Vertragsunterlagen — verkleinern oder auf den VPS | Dirk | hoch |
| 5 | Fahrzeugfotos | Originalgrößen, aktuell von WordPress gehotlinkt | Dirk | hoch |
| 6 | Rechtstexte | Freigabe, dann als Astro-Seiten anlegen | Vorstand → Andreas | hoch |
| 7 | Buchen-Dialog | Sind ZKneu-Hinweis und Kartenausgabe noch aktuell? | Vorstand | mittel |
| **Backend und Aufnahmestrecke** ||||
| 8 | AVV | Unterschrift; Löschfrist und Backup-Ziel entscheiden | Vorstand | hoch |
| 9 | Vereinspostfach | `noreply@atg-grasbrunn.de`, DKIM und DMARC | Dirk | mittel |
| 10 | Formularvorlagen | Beitrittserklärung und SEPA-Mandat | Vorstand | mittel |
| 11 | Zuständigkeit Aufnahmen | Wer bekommt die Meldung, wer ruft an | Vorstand | mittel |
| **Marketing und Kommunikation** ||||
| 12 | Konzept freigeben | Andreas' Freigabe für Newsletter- und Social-Plan | **Andreas** | hoch |
| 13 | Grundsatzentscheidung | Will der Vorstand das? Alle Fahrberechtigten ansprechen? | Vorstand | hoch |
| 14 | Adressbasis | Hat ELKATO E-Mail-Adressen der Fahrberechtigten, exportierbar? | Vorstand | hoch |
| 15 | Versandwerkzeug | CleverReach oder Listmonk, Konto anlegen, AVV | Andreas | mittel |
| 16 | Anmeldeseite | Double Opt-in auf der Website | Andreas | mittel |
| 17 | HTML-Vorlage | Newsletter-Vorlage im Vereinsdesign, einmalig | Andreas | mittel |
| 18 | Aussendung 0 | Adressen der Mitfahrenden einsammeln | Vorstand + Andreas | mittel |
| 19 | Ehrenamtliche | Ein bis zwei Mitglieder für die Kanäle finden | Vorstand | niedrig |
| 20 | Wer schreibt | Person im Vorstand mit dem Hut auf | Vorstand | mittel |
| 21 | TikTok | Aufnehmen oder weglassen — Entscheidung Andreas | **Andreas** | niedrig |
| **Weitere Bausteine** ||||
| 22 | Abrechnungstermin | Wann Andreas beim nächsten Lauf dabei ist | Wolfgang | mittel |
| 23 | Mitgliederverwaltung | Wirklich Excel? ELKATO-Schnittstelle? sharePAD wann? | Vorstand | mittel |
| 24 | Carsharing-Vignette | Anfrage an carsharing.mor@muenchen.de, fünf Fragen | Andreas | niedrig |
| 25 | Karte der Plätze | Erst nach Antwort der Stadt | Andreas | niedrig |
| 26 | MVV-Karten | Ist-Aufnahme Abrechnungsmodus, Briefkasten. Nicht bewerben | Vorstand | niedrig |
| 27 | Sonstige Entgelte | Service-Pauschale 25 €, Sonderreinigung 100 € ausstellen? | Vorstand | niedrig |

---

## 1. Website (läuft)

Neuentwurf als Ablösung der WordPress-Seite. Stand und offene Punkte: `../CLAUDE.md`.

**Vor dem Livegang:** Rechtstexte freigeben, Fahrzeugfotos lokal ablegen, Zugang zur
Domainverwaltung. Danach DNS umhängen — nur den A-Record, MX und SPF bleiben.

---

## 2. Abrechnung vereinfachen (Prio 2 nach der Website)

**Ist-Zustand, wie ihn Andreas verstanden hat** — beim gemeinsamen Termin mit Wolfgang
zu prüfen:

1. CSV-Export aus ELKATO
2. Eine Access-Datenbank bereitet daraus die Abrechnung auf
3. Daraus entstehen die Lastschriften, die eingezogen werden

Das läuft quartalsweise (Nutzungsordnung Ziff. 5) und hängt an einer Person.

**Was zu klären ist, bevor irgendetwas gebaut wird:**

- Wie sieht der ELKATO-Export genau aus — Felder, Format, Zeitraum?
- Was macht die Access-Datenbank fachlich? Welche Regeln stecken darin (Staffel,
  Nacht-/Tagstunden, Sonderfälle, Mahnstufen)?
- Wie entsteht die SEPA-Datei, mit welchem Programm wird eingezogen?
- Wo passieren heute Handgriffe, die wehtun?

**Andreas ist beim nächsten Abrechnungslauf dabei** und sieht sich den Vorgang an. Erst
danach lässt sich sagen, ob eine Ablösung sinnvoll ist oder ob ein paar gezielte
Handgriffe reichen. Eine gewachsene Access-Lösung, die funktioniert, ist nicht
automatisch schlecht — sie ist nur verwundbar, weil sie an einer Person hängt.

**Wichtig:** Solange sharePAD noch nicht da ist, wird gegen ELKATO gebaut. Was auch immer
entsteht, muss den Wechsel überleben — also die Abrechnungslogik von der Datenquelle
trennen.

---

## 3. Mitgliederverwaltung (Prio 3)

**Vermutung:** eine Excel-Tabelle. Zu bestätigen.

**Wohin es soll:** in die Website beziehungsweise das Vereins-Backend, mit Anmeldung und
Rollen, sauber gesichert. Von dort per Schnittstelle an ELKATO und später an sharePAD,
damit Daten einmal gepflegt und nicht dreimal getippt werden.

**Der wunde Punkt:** Genau hier droht die dritte Wahrheit über dieselben Mitglieder.
ELKATO führt Personen samt Transponderkarten, eine Excel-Tabelle führt sie vermutlich
noch einmal, und ein neues Backend wäre die dritte Stelle. Bevor gebaut wird, muss
feststehen, **welches System führend ist**. Meine Empfehlung: Ein System führt, die
anderen bekommen die Daten über eine Schnittstelle — und wenn ELKATO keine hat, führt es
weiter allein, bis sharePAD kommt.

Zu klären: Hat ELKATO eine Schnittstelle? Was kann sharePAD, wann kommt es?

---

## 4. Vereins-Backend und Aufnahmestrecke

Konzept: `KONZEPT_Backend-und-Onboarding.md`. Kern: Der Vorstand pflegt Preise,
Fahrzeuge und Dokumente selbst; Interessenten melden sich online und bekommen die
vorausgefüllte Beitrittserklärung. Unterschrieben wird beim persönlichen Termin.

Blocker: Auftragsverarbeitungsvertrag, Hosting-Entscheidung, Vereinspostfach für
Systemmails.

---

## 5. Mitglieder informieren und aktivieren

Konzept: `KONZEPT_Newsletter-und-Social.md`, Vorstandsfassung als Seite unter
`/kommunikation` (nicht verlinkt, noindex).

Kern: alle Fahrberechtigten ansprechen statt nur den Hauptkontakt, ein Newsletter im
Monat, Jahresplan mit festen Themen, Social Media nur so viel, wie ehrenamtlich
getragen wird.

**Ehrenamtliche für die Kanäle suchen.** Der Vorstand soll das nicht nebenbei
mitmachen. Wer Facebook, Instagram oder TikTok gern bespielt, findet sich eher unter
den jüngeren Mitgliedern — die Suche danach ist selbst ein guter Newsletter-Inhalt.
Abstimmung mit dem Vorstand, damit nichts Falsches nach außen geht.

---

## Nebenthemen und Prüfaufträge

### A. Parken in München — möglicherweise ein starkes Argument

**Die Frage:** Dürfen ATG-Fahrzeuge auf den ausgewiesenen Carsharing-Stellplätzen in
München parken, und fallen dort Gebühren an?

**Recherchiert am 30.08.2026** (Quellen: muenchenunterwegs.de, Rathaus-Umschau der
Stadt München, Bundesverband CarSharing; nicht bei der Stadt rückbestätigt).

München kennt **zwei verschiedene Arten** von Carsharing-Flächen. Der Unterschied ist
für uns entscheidend:

| | Allgemeine Carsharing-Stellfläche | Stationsbasierter Stellplatz |
|---|---|---|
| Beschilderung | Zeichen 314 mit Carsharing-Sinnbild (vier Personen, geteiltes Fahrzeug), grüne Umrandung und weißes Piktogramm auf dem Boden | dasselbe, **zusätzlich ein Schild mit dem Namen des Anbieters** |
| Wer darf parken | jedes Carsharing-Fahrzeug mit gültiger Vignette — Münchner oder Bundesvignette nach § 39 Abs. 11 StVO | **nur** das eine Fahrzeug des benannten Anbieters |
| Anzahl in München | Teil der über 300 Carsharing-Plätze | 108 Standorte, aktuell STATTAUTO und CarVia |
| Falschparker | nicht berechtigt | der berechtigte Anbieter **lässt abschleppen** |

Seit Juli 2026 hängt an den 108 stationsbasierten Plätzen ein zusätzliches Klarstellungs-
schild. Grund laut Stadt: Es kam wiederholt vor, dass dort abgestellte Privat- **und
fremde Carsharing-Fahrzeuge** abgeschleppt wurden.

**Für den ATG heißt das im Ist-Zustand:**

- **Nein, die Fahrzeuge dürfen dort nicht parken.** Ohne Vignette ist ein ATG-Auto auf
  einer Carsharing-Fläche ein Falschparker wie jedes Privatfahrzeug. Auf den 108
  stationsbasierten Plätzen kommt das Risiko dazu, abgeschleppt zu werden.
- In Parklizenzgebieten gilt für ATG-Fahrzeuge das normale Regime: Parkschein oder
  Parkscheibe.
- Die grüne Markierung allein sagt also nichts darüber, ob **wir** dort stehen dürfen —
  entscheidend ist die Vignette am Fahrzeug und das Zusatzschild am Mast.

**Wo die Chance liegt:** Mit einer Vignette dürfte die **ganze Flotte** die allgemeinen
Flächen nutzen, nicht nur die ZOE — die Berechtigung hängt am Fahrzeug, nicht am
Anbieternamen. Die Münchner Vignette erlaubt darüber hinaus das kostenfreie Abstellen in
Parklizenzgebieten; belegt ist das bisher für Freefloating-Anbieter, für stationsbasierte
ist es zu klären.

**Die entscheidende Frage, die nur die Stadt beantworten kann:** Bekommt ein Verein aus
dem Umland ohne eigene Station in München eine Vignette? Das ist der Punkt, an dem es
scheitern kann — die Regelungen sind erkennbar auf Anbieter mit Angebot in der Stadt
zugeschnitten.

#### Zwei Vignetten, zwei Reichweiten

| | Münchner Vignette | Bundesvignette (§ 39 Abs. 11 StVO) |
|---|---|---|
| Carsharing-Stellflächen | ja | ja |
| Parken im übrigen öffentlichen Raum | auf allen Parkplätzen, auch Bewohnerparken und Kurzzeitzonen | nein — dort gilt Parkschein oder Parkscheibe wie für alle |
| Wer sie typischerweise hat | Anbieter mit Angebot in München | Anbieter von außerhalb |

Für den ATG ist damit die **Bundesvignette der realistische Weg**: Sie öffnet die
allgemeinen Carsharing-Flächen, aber nicht das volle Münchner Privileg. Genau das reicht
für den Zweck — ein Mitglied, das ins Museum oder zum Einkaufen fährt, sucht einen Platz,
kein Bewohnerparkrecht.

#### Wo diese Flächen liegen — Stand 30.08.2026

Das Mobilitätsreferat veröffentlicht die allgemeinen Carsharing-Parkplätze als offene
Daten (Datenlizenz Deutschland Namensnennung 2.0, tägliche Aktualisierung). Abruf über
den WFS-Dienst des Geoportals:

```
https://geoportal.muenchen.de/geoserver/mor_wfs/ows?service=WFS&version=1.0.0
  &request=GetFeature&typeName=mor_wfs:ruhver_carsharing&outputFormat=csv
```

**710 Flächen im Datensatz, davon 685 in Betrieb** und 25 stillgelegt. Alle sind vom Typ
„allgemein/freefloating" und tragen **keinen Anbieternamen** — es sind also genau die
Plätze, die jedes gekennzeichnete Carsharing-Fahrzeug nutzen darf. Die 108
stationsbasierten Plätze von STATTAUTO und CarVia stecken nicht in diesem Datensatz.

Die zehn stärksten Bezirke:

| Bezirk | Plätze | | Bezirk | Plätze |
|---|---|---|---|---|
| Maxvorstadt | 60 | | Schwabing-Freimann | 44 |
| Schwabing-West | 57 | | Milbertshofen-Am Hart | 38 |
| Ludwigsvorstadt-Isarvorstadt | 50 | | Schwanthalerhöhe | 37 |
| Neuhausen-Nymphenburg | 49 | | Untergiesing-Harlaching | 33 |
| Au-Haidhausen | 46 | | Bogenhausen | 30 |
| Altstadt-Lehel | 46 | | Berg am Laim | 21 |

Der Osten, aus dem unsere Mitglieder kommen, ist ebenfalls versorgt: Trudering-Riem 18,
Ramersdorf-Perlach 16, dazu Bogenhausen und Berg am Laim. Standortnamen aus dem
Datensatz, die für Ausflüge zählen: **Pinakotheken**, St.-Jakobs-Platz, Maximiliansplatz,
Oberanger, Marstallstraße, Königinstraße/Veterinärstraße, Arabellapark, Innsbrucker Ring,
Messe West, ZOB.

#### Was es kostet

Für die Nutzung zahlt der Fahrer nichts. Die Stadt lässt sich stattdessen von den
Anbietern eine **Pauschale je Fahrzeug** zahlen. Die Höhe steht nicht öffentlich und ist
mit der Anfrage zu erfragen — bei fünf Fahrzeugen ist das die Rechnung, die über Ja oder
Nein entscheidet.

#### Die Anfrage

Zuständig ist das Mobilitätsreferat, und es gibt eine eigene Adresse dafür:
**carsharing.mor@muenchen.de** (aus den Metadaten des Datensatzes).

Zu fragen ist:

1. Kann ein stationsbasierter Carsharing-Verein mit Sitz im Landkreis München, dessen
   Fahrzeuge in Grasbrunn stehen, eine Kennzeichnung als Carsharing-Fahrzeug erhalten?
2. Welche Voraussetzungen und Nachweise sind nötig, welches Verfahren, welche Dauer?
3. Was kostet es je Fahrzeug und Jahr?
4. Berechtigt die Kennzeichnung zum Parken auf allen 685 allgemeinen Flächen?
5. Gibt es eine Variante nur fürs Zielparken, ohne eigene Station in München?

Der Bundesverband CarSharing hat zusätzlich einen Leitfaden zum Carsharinggesetz, der
die bundesrechtlichen Voraussetzungen erklärt.

**Erst fragen, dann werben.** Solange keine schriftliche Bestätigung vorliegt, darf das
in keinem Newsletter, keinem Beitrag und auf keiner Seite stehen. Ein Mitglied, das sich
darauf verlässt und abgeschleppt wird, kostet den Verein mehr als die Aktion bringt.

### B. MVV-Karten in Neukeferloh

Im Vorstand wird diskutiert, am Bürgerhaus Neukeferloh einen Briefkasten anzubringen,
über den MVV-Karten registriert und abgeholt werden können. Heute liegen die Karten in
Vaterstetten.

**Warum das gut wäre:** Vom Bürgerhaus beziehungsweise Rathaus fährt der Bus direkt los.
Wer die Karte erst in Vaterstetten holen muss, fährt zum Bahnhof, bevor er losfährt —
das nimmt dem Angebot den Sinn.

**Der Abrechnungsmodus ist zu klären.** Nach dem, was Andreas beim Vorstandstreffen
verstanden hat, wird quartalsweise geschaut, wer die Karten am häufigsten genutzt hat;
die Vielnutzer zahlen dann die nächste Karte. Falls das so stimmt, gehört es geändert —
ein solches Verfahren ist für die Betroffenen nicht vorhersehbar und schreckt genau die
ab, die das Angebot tragen. Denkbar wäre ein kleiner fester Beitrag je Nutzung oder je
Monat. Vor jedem Vorschlag steht die Ist-Aufnahme: Wie läuft es wirklich?

**Nicht bewerben.** Das Thema wird auf keiner öffentlichen Seite, in keinem Newsletter
und in keinem Social-Media-Beitrag angefasst, bis der Vorstand die Lage geklärt hat.

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
