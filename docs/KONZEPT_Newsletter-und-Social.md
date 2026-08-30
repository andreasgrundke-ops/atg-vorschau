# Konzept — Mitglieder informieren und zum Fahren bewegen

Stand 30.08.2026 · Entwurf zur Abstimmung mit Andreas, danach mit dem Vorstand.

Zwei Ziele, die zusammengehören: Die Mitglieder sollen mitbekommen, was im Verein
passiert — und sie sollen wieder öfter ein Auto buchen. Ein Carsharing-Verein lebt
davon, dass die Fahrzeuge laufen. Wer ein halbes Jahr nicht gebucht hat, vergisst,
dass es den Wagen um die Ecke gibt.

---

## 1. Zwei Dinge müssen vorher geklärt sein

### 1.1 Es fehlen die Adressen

Die Beitrittserklärung des Vereins erfasst weitere fahrberechtigte Personen **nur mit
Vor- und Nachname** — kein eigenes Feld für E-Mail oder Telefon. Angeschrieben wird
deshalb heute nur der Hauptkontakt des Haushalts.

Das erklärt die Ausgangslage und bestätigt Andreas' Vermutung: Eine Adressbasis für alle
Fahrberechtigten existiert nicht. Sie muss aufgebaut werden.

**Bevor dafür etwas Neues gebaut wird, ist eine Frage zu klären:** Was weiß ELKATO? Dort
ist jede fahrberechtigte Person mit Transponderkarte und PIN geführt, es gibt also
bereits Personendatensätze. Ob dazu E-Mail-Adressen gespeichert sind und ob sich eine
Liste exportieren lässt, muss der Vorstand nachsehen. Zwei Fälle:

- **ELKATO hat die Adressen und kann exportieren** → Export als Quelle nutzen, im
  Newsletter-Werkzeug pflegen, kein dritter Datenbestand.
- **ELKATO hat sie nicht** → einmalig erheben, siehe unten, und künftig im
  Aufnahmeformular gleich mitfragen.

Ein eigener Datenbestand ohne diese Prüfung wäre die dritte Wahrheit über dieselben
Personen. Genau das haben wir beim Onboarding-Konzept schon vermieden.

### 1.2 Ohne Einwilligung kein Newsletter

Vereinsinformationen an Mitglieder sind unproblematisch — Einladung zur
Mitgliederversammlung, Preisänderung, Wartungshinweis. Das gehört zum
Mitgliedschaftsverhältnis.

„Fahr doch mal wieder zum See" ist etwas anderes. Das ist Werbung, und dafür braucht es
in Deutschland die vorherige Einwilligung des Empfängers (§ 7 Abs. 2 UWG). Die Ausnahme
für Bestandskunden (§ 7 Abs. 3 UWG) ist bei einem Verein wacklig und die Abgrenzung
zwischen Information und Werbung im laufenden Betrieb kaum sauber zu halten.

**Deshalb: sauberes Opt-in.** Jede Person, die den Newsletter bekommt, hat vorher
zugestimmt — mit Bestätigungslink (Double Opt-in), dokumentiert mit Zeitpunkt und
IP-Adresse. Jede Mail hat einen funktionierenden Abmeldelink. Das ist kein Papierkram um
seiner selbst willen: Es schützt den Vorstand persönlich, denn Abmahnungen wegen
unerlaubter Werbe-Mails treffen den Verein.

**Zwei Listen führen, das macht es einfach:**

| Liste | Inhalt | Grundlage |
|---|---|---|
| **Vereinsinfo** | Mitgliederversammlung, Preise, Nutzungsordnung, Störungen, Fahrzeugwechsel | Mitgliedschaft, kein Opt-in nötig |
| **Newsletter** | Ausflugsideen, Tipps, Aktionen, Vorstellungen | Double Opt-in, jederzeit abbestellbar |

---

## 2. Wer wird angeschrieben

**Heute:** ein Kontakt je Haushalt.

**Künftig:** jede fahrberechtigte Person mit eigener Adresse. Wer fahren darf, soll auch
erfahren, dass sich das Fahren lohnt. In einem Haushalt mit vier Fahrberechtigten
erreicht die heutige Regelung eine Person; die anderen drei hören es beim Abendessen
oder gar nicht.

**Was beim Hauptkontakt bleibt:** Rechnung, Lastschrift, alles Finanzielle, die
Vertretung in der Mitgliederversammlung. Daran ändert sich nichts — das steht so in der
Satzung und in der Nutzungsordnung.

**So kommen die Adressen zusammen:**

1. **Im neuen Aufnahmeformular** je fahrberechtigter Person ein Feld für E-Mail plus
   eine eigene Einwilligung. Kostet nichts, weil das Formular ohnehin neu gebaut wird.
2. **Für Bestandsmitglieder eine einmalige Aktion:** eine Mail an die Hauptkontakte mit
   der Bitte, die Adressen der Mitfahrenden nachzutragen — über einen Link, der ohne
   Anmeldung funktioniert. Wer lieber weiterleitet, leitet weiter; jede Person trägt
   sich dann selbst ein. Das ist zugleich die sauberste Form der Einwilligung.
3. **Beim Aufnahmegespräch** ohnehin abfragen, da sitzt man sowieso zusammen.

Realistisch: Aus rund 100 Haushalten werden so vielleicht 150 bis 200 Empfänger. Für
einen Ortsverein ist das eine gute Reichweite.

---

## 3. Womit versendet wird

Der Versand über das normale Postfach scheidet aus: kein Abmeldelink, keine
Nachvollziehbarkeit, und ab etwa 30 Empfängern im Verteiler landet die Mail zuverlässig
im Spam.

| Werkzeug | Für uns | Dagegen |
|---|---|---|
| **CleverReach** (Rastede, DE) | deutscher Anbieter, AVV im Standard, einfacher Editor, kostenlos bis 250 Empfänger und 1.000 Mails im Monat | bei Wachstum kostenpflichtig |
| **Brevo** (Paris, EU) | großzügiger Gratisrahmen, gute Zustellung | Oberfläche überladener, Support englisch |
| **Listmonk** (selbst betrieben) | läuft auf dem VPS, volle Datenhoheit, keine Grenze bei Empfängern, kein weiterer Auftragsverarbeiter | braucht trotzdem einen Versanddienst für die Zustellung, und der Vorstand muss damit zurechtkommen |
| Mailchimp | verbreitet | US-Anbieter, für Mitgliederdaten unnötiger Ärger — **nicht empfohlen** |

**Empfehlung: CleverReach für den Start.** Der Vorstand soll den Newsletter selbst
schreiben und verschicken können, ohne dass jemand mit Serverzugang danebensitzt. Der
Gratisrahmen reicht für die ersten ein bis zwei Jahre, ein Auftragsverarbeitungsvertrag
liegt fertig vor, und die Anmeldung mit Double Opt-in ist eingebaut.

**Listmonk bleibt die Option**, sobald das Vereins-Backend steht und die Adressen dort
gepflegt werden — dann liegt alles an einem Ort. Zu bedenken: Auch Listmonk versendet
nicht selbst zuverlässig, es braucht einen Versanddienst als Relais. Der Vorteil ist die
Datenhoheit, nicht der Wegfall des Dienstleisters.

---

## 4. Wie der Newsletter aussieht

**Aufbau, immer gleich** — Wiedererkennung schlägt Abwechslung:

1. **Betreff** — konkret, kein „Newsletter 03/2026". Besser: „Zum Ammersee und zurück:
   32 Euro" oder „Neue Website ist da — und der Trafic hat wieder frei".
2. **Vorschautext** — die Zeile, die im Postfach neben dem Betreff steht. Wird fast immer
   vergessen und entscheidet mit über das Öffnen.
3. **Ein Bild** — ein Fahrzeug, ein Ziel, eine Jahreszeit. Keine Bildergalerie.
4. **Kurzer Einstieg** — drei, vier Sätze. Wer nur die liest, hat das Wichtigste.
5. **Ein Hauptteil** — genau ein Thema, nicht fünf.
6. **Eine Handlung** — ein großer Knopf: „Fahrzeug buchen". Nicht drei konkurrierende.
7. **Kurzer Vereinsblock** — zwei bis drei Zeilen Neuigkeiten.
8. **Fußzeile** — Verein, Kontakt, Abmeldelink, Datenschutzhinweis.

**Gestaltung:** Die Farben der Website übernehmen — Rot `#d42a22`, Gelb `#ffc400`, Text
`#181513` auf Weiß. Eine Spalte, mindestens 16 Pixel Schriftgröße, große Knöpfe (auch
mit unsicherer Hand auf dem Handy zu treffen), echter Text statt Text im Bild, jedes
Bild mit Alternativtext. Das ist keine Kür: Ein erheblicher Teil der Mitglieder liest am
Handy, ein anderer mit Lesebrille am Tablet.

**Ton:** So wie auf der Website — Du, direkt, ohne Werbesprech. Konkrete Zahlen statt
Superlative: „Tegernsee und zurück, ein Nachmittag: rund 38 Euro" wirkt besser als
„günstig unterwegs".

**Rechnen statt behaupten.** Der stärkste Inhalt, den dieser Verein hat, ist der
Kostenrechner. Jede Ausflugsidee bekommt eine Beispielrechnung mit echten Zahlen und
einen Link, der den Rechner passend vorbelegt.

---

## 5. Rhythmus, Wochentag, Uhrzeit

**Ein Newsletter im Monat.** Mehr hält kein ehrenamtlicher Vorstand durch, und mehr
verträgt das Thema auch nicht. Dazu kommen anlassbezogene Kurzmails (Störung,
Preisänderung, Mitgliederversammlung) — die dürfen jederzeit raus.

**Der feste Termin: Donnerstag, 10:00 Uhr.**

Warum: Donnerstag ist der Tag, an dem das Wochenende geplant wird, und um zehn ist der
Posteingang vom Morgen abgearbeitet. Montagvormittag geht in der Wochenpost unter,
Freitagnachmittag liest niemand mehr, am Wochenende konkurriert die Mail mit dem
Wochenende selbst.

**Für die jüngeren Mitglieder ein zweiter Versuch:** Wer nach 48 Stunden nicht geöffnet
hat, bekommt dieselbe Mail am Sonntag um 18:30 Uhr noch einmal mit anderem Betreff. Das
kostet nichts und holt erfahrungsgemäß einen spürbaren Teil nach. Jedes brauchbare
Werkzeug kann das automatisch.

**Wichtig, damit es kein Ratespiel bleibt:** Diese Zeiten sind Erfahrungswerte, keine
Naturgesetze. Nach drei Aussendungen sieht man in der Auswertung, wann die eigenen
Mitglieder wirklich öffnen — dann wird der Termin darauf angepasst. Bei rund 150
Empfängern ist die Öffnungsrate aussagekräftig genug, um das zu erkennen.

---

## 6. Der Jahresplan

Zwölf Ausgaben, jede mit einem Thema und einem konkreten Ziel in Reichweite. Die Preise
sind Beispiele, die aus dem Kostenrechner kommen und beim Erstellen frisch berechnet
werden.

| Monat | Versand | Thema | Aufhänger |
|---|---|---|---|
| Januar | Do 10:00, 2. Woche | Winter und Wintersport | Spitzingsee oder Sudelfeld, Ski im Trafic, Schneeketten im Fahrzeug |
| Februar | Do 10:00, 2. Woche | Kultur bei schlechtem Wetter | Museen in München, Therme Erding — parken ist teurer als das Auto |
| März | Do 10:00, 2. Woche | Frühjahrsputz und Garten | Dehner, Baumarkt, Wertstoffhof — der Trafic als Anhängerersatz |
| April | Do 10:00, 2. Woche | Saisonstart und Mitgliederversammlung | Einladung, Jahresrückblick, Preise |
| Mai | Do 10:00, 2. Woche | Erster Ausflug ins Grüne | Wörthsee, Ammersee, Wildpark Poing |
| Juni | Do 10:00, 2. Woche | Seen und Baden | Starnberger See, Chiemsee — mit Familienrechnung |
| Juli | Do 10:00, 1. Woche | Urlaub und lange Strecken | die Staffel erklärt: ab 301 km wird es günstiger, mit Beispiel |
| August | Do 10:00, 2. Woche | Berge | Tegernseer Berge, Wendelstein, Wanderparkplätze |
| September | Do 10:00, 2. Woche | Zurück in den Alltag | Einkauf, Sperrmüll, Umzugshilfe, Studienstart |
| Oktober | Do 10:00, 2. Woche | Herbst und Reifenwechsel | Wartung, was der Verein alles selbst erledigt |
| November | Do 10:00, 2. Woche | Rechnen statt besitzen | Vergleich mit dem eigenen Zweitwagen, Werbung um neue Mitglieder |
| Dezember | Do 10:00, 1. Woche | Weihnachtsmarkt und Besuche | Christkindlmarkt, Verwandtenbesuch, Feiertagsbuchung rechtzeitig |

**Zwei Regeln für den Plan:** Er darf abweichen, wenn etwas Aktuelles ansteht — ein
neues Fahrzeug schlägt jedes geplante Thema. Und er darf ausfallen: Eine Ausgabe
weniger ist besser als eine lieblose.

---

## 7. Die ersten vier Aussendungen

Der Start hängt an der neuen Website. Reihenfolge und Zweck:

| # | Wann | An wen | Inhalt |
|---|---|---|---|
| **0** | vor dem Livegang | Hauptkontakte, Vereinsinfo-Liste | Adressen der Mitfahrenden nachtragen und zum Newsletter anmelden. Ehrlich begründet: „Wir wollen künftig alle erreichen, die fahren dürfen." |
| **1** | Livegang, Do 10:00 | alle | **Die neue Website ist da.** Was sie kann: Preise auf einen Blick, Kostenrechner, Standorte auf der Karte, Buchung mit einem Klick. Knopf: „Fahrzeug buchen". |
| **2** | 2 Wochen später, Do 10:00 | Newsletter-Liste | **Der Kostenrechner.** Drei durchgerechnete Fahrten — Einkauf, Ausflug, Wochenende. Zeigt, wie wenig eine typische Fahrt kostet. |
| **3** | 4 Wochen nach Start, Do 10:00 | Newsletter-Liste | **Die Fahrzeuge im Porträt.** Welches Auto wofür, wo es steht, was hineinpasst. Besonders für Mitglieder, die immer denselben Wagen buchen. |

Danach greift der Jahresplan.

### Die kurze Aufweckmail

Neben dem Monatsnewsletter eine zweite Sorte: kurz, spontan, an der Lage orientiert.
Donnerstagnachmittag, das Wochenende steht an, das Wetter wird gut, die Fahrzeuge sind
frei. Drei Sätze, ein Bild, ein Knopf — kein Erklärstück, sondern ein Anlass.

> „Am Samstag werden es 26 Grad — und vier Autos stehen noch frei. Wie wäre es mit dem
> Wörthsee? Hin und zurück, ein Nachmittag: rund 40 Euro, Sprit und Versicherung
> inklusive. Wenn es doch regnet: Deutsches Museum, parken ist teurer als das Auto."

Versandzeit: Donnerstag 17:30 Uhr, wenn die Wochenendplanung ansteht. **Höchstens einmal
im Monat zusätzlich zum Newsletter** — sonst kippt die Einladung in Belästigung und die
Abmeldungen steigen. Welche Fahrzeuge frei sind, steht in ELKATO; der Blick dauert eine
Minute.

**Eine Sonderaussendung lohnt sich außerdem:** an Mitglieder, die seit mehr als sechs
Monaten nicht gebucht haben. Kein Vorwurf, sondern eine Einladung — „Wir haben lange nichts von
dir gehört, hier sind drei Ideen für den nächsten Samstag." Die Liste dafür kommt aus
ELKATO. Das ist die Mail mit dem größten Hebel im ganzen Plan.

---

## 8. Social Media

**Ehrlich vorweg:** Ein Verein mit ehrenamtlichem Vorstand pflegt keine drei Kanäle. Ein
gepflegter Kanal schlägt drei verwaiste, und ein verwaister Account schadet mehr als
kein Account.

| Kanal | Lohnt sich | Aufwand |
|---|---|---|
| **Facebook** — Seite plus lokale Gruppen (Grasbrunn, Neukeferloh, Vaterstetten) | Ja. Die Altersgruppe 45+ ist dort, und lokale Gruppen sind der wirksamste Weg zu neuen Mitgliedern | 2 Beiträge im Monat |
| **Gemeindeblatt und Aushänge** | Ja, unterschätzt. Erreicht genau die Zielgruppe, die keine App benutzt | 2 bis 4 Anzeigen im Jahr |
| **nebenan.de** | Ja, wenn jemand ohnehin dort ist. Nachbarschaft ist genau der Radius des Vereins | 1 Beitrag im Monat |
| **Instagram** | Nur mit einer Person, die es freiwillig macht. Bilder von Autos vor Bergkulisse funktionieren dort, aber ohne regelmäßige Pflege ist es verlorene Zeit | 4 Beiträge im Monat, sonst lassen |
| WhatsApp-Gruppe | Nein. Wird schnell zum Chat, und Telefonnummern aller Mitglieder in einer Gruppe ist datenschutzrechtlich unschön |

**Zeiten:** Facebook dienstags und donnerstags 18:00 bis 20:00, sonntags 10:00 bis
12:00. Instagram dienstags und donnerstags ab 19:00.

**Inhalte kommen aus dem Newsletter.** Jede Ausgabe liefert zwei Beiträge: das
Ausflugsziel mit Bild und Preis, und eine kurze Zahl („Ein Samstag am Ammersee: 32 Euro,
Sprit und Versicherung inklusive"). Kein eigener Redaktionsstrang, sonst schläft es ein.

**Die Kanäle brauchen Menschen, nicht den Vorstand.** Ein bis zwei Mitglieder, die
freiwillig einen Kanal übernehmen: Fotos machen, kurz etwas schreiben, auf Kommentare
antworten. Wer Instagram oder TikTok ohnehin nutzt, findet sich eher unter den jüngeren
Mitgliedern — und genau die erreicht man über diese Kanäle auch als Neumitglieder. Zwei
Bedingungen: Abstimmung mit dem Vorstand, was nach außen geht, und niemand macht es
allein. Der Aufruf dazu ist selbst ein guter Newsletter-Inhalt für die erste oder zweite
Ausgabe.

**Ein mögliches Argument, das noch geprüft werden muss:** Parken auf
Carsharing-Stellplätzen in München. Siehe `ROADMAP_ATG.md`, Nebenthema A. Solange die
Stadt das nicht bestätigt hat, taucht es in keinem Beitrag und keiner Mail auf.

---

## 9. Was gemessen wird

Vier Zahlen, mehr nicht:

- **Öffnungsrate** — bei einem Verein sind 40 bis 55 Prozent gut. Weniger als 25 Prozent
  heißt: falscher Betreff oder falscher Zeitpunkt.
- **Klicks auf den Buchen-Knopf** — die eigentliche Zielgröße.
- **Buchungen in den zehn Tagen nach dem Versand**, verglichen mit dem Zeitraum davor.
  Kommt aus ELKATO.
- **Abmeldungen** — mehr als ein Prozent je Ausgabe heißt: zu häufig oder zu belanglos.

---

## 10. Nächste Schritte

1. Klären, was ELKATO an Adressen der Fahrberechtigten hat und ob es exportieren kann.
2. Vorstandsbeschluss: alle Fahrberechtigten ansprechen, Rechnung bleibt beim
   Hauptkontakt.
3. Werkzeug auswählen, Konto anlegen, Auftragsverarbeitungsvertrag abschließen.
4. Anmeldeseite mit Double Opt-in bauen — gehört auf die neue Website.
5. Aussendung 0 vorbereiten und verschicken, Adressen einsammeln.
6. HTML-Vorlage im Vereinsdesign bauen, einmalig.
7. Mit dem Livegang der Website starten.

Aufwand nach dem Aufbau: rund eine Stunde je Ausgabe, wenn die Vorlage steht und der
Jahresplan die Themen vorgibt.

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
