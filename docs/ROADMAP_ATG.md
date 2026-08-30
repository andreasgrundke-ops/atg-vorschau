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

**Was die erste Recherche ergeben hat** (Stand 30.08.2026, nicht bei der Stadt bestätigt):

- München hat über 300 Stellplätze für Carsharing im öffentlichen Raum.
- Bei **allgemeinen Carsharing-Stellplätzen** darf nach dem Carsharinggesetz jedes
  Fahrzeug parken, das eine **amtliche Kennzeichnung nach CsgG** trägt — die
  Berechtigung hängt also am Fahrzeug, nicht am Anbieternamen.
- Kommunen können solche Stellplätze zusätzlich von Parkgebühren befreien.
- Die Stadt veröffentlicht die Standorte als offene Daten.

**Was das bedeuten würde:** Nicht nur die ZOE, sondern die ganze Flotte könnte in
München privilegiert parken. Für ein Vereinsmitglied, das zum Einkaufen oder ins Museum
fährt, ist das bares Geld und ein echter Grund, das Vereinsauto statt das eigene zu
nehmen.

**Was zu tun ist:** Beim Kreisverwaltungsreferat der Stadt München nachfragen, welche
Voraussetzungen ein stationsbasierter Verein für die Kennzeichnung erfüllen muss und wer
sie erteilt. Der Bundesverband CarSharing hat dazu einen Leitfaden. **Erst fragen, dann
werben** — solange das nicht schriftlich bestätigt ist, darf es in keinem Newsletter
stehen.

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
