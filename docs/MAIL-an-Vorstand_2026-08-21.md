# Mail an den Vorstand — Stand 21.08.2026

Versandfertiger Text zum Kopieren, Antwort im Thread „Version 1.1 der Website ist zum
Prüfen und diskutieren bereit." an Wolfgang Schneidt, mit Dirk Böhme und Klaus Graf von
Buxhoeveden im Verteiler. Herleitung und Belege der Fragen:
`RUECKFRAGEN-Verein_2026-08-12.md`.

Vorgeschichte: Die frühere Fassung dieser Datei (12.08.) ging von einem Aktionspreis aus
und kannte weder den Spritzuschlag noch die beiden Merker zum Livegang. Sie ist über die
Git-Historie erreichbar.

---

**Betreff:** AW: Version 1.1 der Website ist zum Prüfen und diskutieren bereit.

---

Hallo Wolfgang,
hallo zusammen,

wir sind gerade in Frankreich mit dem Camper unterwegs und kommen zum 1.9. zurück, darum
passiert hier mit der Website gerade nicht so schnell was.

Die Anregungen von Wolfgang habe ich eingearbeitet. Was jetzt drin ist:

- Anhängerkupplung: steht nur noch beim Trafic, bei den anderen Fahrzeugen fällt der
  Hinweis weg.
- Trafic-Stellplatz benannt: Parkplatz gegenüber Winklerring 12, westlich vom Rathaus.
- Standorte: Ein Klick auf einen Standort holt die Karte in den Blick und zoomt auf das
  Fahrzeug. Zurück geht es über „Alle Standorte zeigen".
- Alle fünf Stellplätze neu gesetzt und über OpenStreetMap gegengeprüft.
- Kilometerpreise: feste Sätze statt „ab", je Klasse zwei Zeilen (bis 300 km und 301 bis
  1.000 km).
- Kostenrechner: rechnet die Reduktion ab 301 km mit, trennt Tag- und Nachtstunden und
  weist jede Position einzeln aus. Die Strecke lässt sich per Regler oder als Zahl
  eingeben.
- Kontakt: eigener Abschnitt mit Formular, der Menüpunkt springt dorthin und nicht mehr in
  die Dokumente.
- Flyer und Visitenkarte holen ihre Preise aus derselben Quelle wie die Website und
  bleiben bei einer Preisänderung nicht stehen.

Zu den Preisen habe ich eure Seite genauer angesehen, weil dort je Klasse zwei Werte
stehen. Aufgelöst hat es eure Meldung vom 15.04.2026: Der rote Wert ist der saisonale
Spritzuschlag, 3 Cent für Benziner und 5 Cent für den Trafic. Die Rechnung geht auf:
0,40 + 3 ct = 0,43, 0,45 + 3 ct = 0,48, 0,60 + 5 ct = 0,65. Ich habe die Website auf diese
Werte gestellt, also so, wie eure Preisseite sie ausweist.

Fünf, sechs Punkte kann ich nicht selbst entscheiden:

1. Gilt der Spritzuschlag noch? Dabei steht „mindestens bis 30.06.2026", und die
   Preisseite wurde am 21.07. zuletzt bearbeitet, ohne ihn zu entfernen. Wenn er
   ausgelaufen ist, stelle ich in einer Minute auf 0,40 / 0,45 / 0,60 € pro km zurück.

2. Die ZOE: Neben dem Wertepaar von PKW 2 steht „Renault ZOE keine Änderung!". Ein
   Spritzuschlag trifft ein E-Auto ja nicht. Ich habe es so umgesetzt, dass die ZOE bei
   0,45 € pro km bleibt und der Sandero mit Zuschlag 0,48 € kostet. Stimmt das so?

3. Wie ist die Staffel ab 301 km gemeint? Der Rechner staffelt: die ersten 300 km zum
   normalen Satz, jeden weiteren Kilometer zum reduzierten. Bei 420 km im Corsa also
   300 x 0,43 € plus 120 x 0,32 €, zusammen 167,40 €. Oder gilt der reduzierte Satz ab
   301 km für die ganze Strecke? Dann wären es 420 x 0,32 €, also 134,40 €.

4. Was gilt über 1.000 km? Die Preisliste endet bei „ab km 301 - km 1.000". Der Rechner
   ist deshalb bei 1.000 km gedeckelt und verweist für längere Fahrten auf den Vorstand.
   Gibt es dafür einen eigenen Satz?

5. Stimmen die Fahrzeugklassen? Nach eurer Liste ist PKW 1 = Yaris, Corsa, Clio Grandtour
   und PKW 2 = Sandero, ZOE. Der Clio ist damit der günstigere, der Sandero der teurere.
   In meinem ersten Entwurf war das vertauscht, jetzt steht es wie bei euch. Passt das?
   Den Yaris habe ich weggelassen, den gibt es ja nicht mehr, auf eurer Preisseite steht
   er noch.

6. Stellplätze: Ich habe alle fünf Pins neu gesetzt. Wolfgang, schaust du bitte nochmal
   drüber und ziehst sie bei Bedarf zurecht?

   https://andreasgrundke-ops.github.io/atg-vorschau/pins/

   Pin ziehen, unten auf „Liste kopieren" tippen und mir den Text zurückschicken. Bei der
   ZOE bin ich unsicher: Sie ist mit „Am Rathaus (Ladepunkt)" beschriftet, mein Pin liegt
   an der Ladesäule rund 20 m neben dem Sandero. Stimmt das?

Zwei Dinge baue ich noch ein, bevor die Seite live geht — als Merker, damit sie nicht
untergehen:

- Impressum und Datenschutzerklärung: Die neue Seite braucht eigene. Die jetzige
  Datenschutzerklärung beschreibt die WordPress-Installation, die neue Seite arbeitet
  technisch anders (Karte über OpenStreetMap, keine Cookies, kein Tracking, Schriften
  liegen lokal). Bis dahin verweisen die Links im Fußbereich auf eure bestehenden Seiten.

- Login mit Upload für den Vorstand: Ihr sollt Preisliste und Dokumente selbst austauschen
  können, ohne mich. Das braucht ein Hosting mit Anmeldung, die reine Vorschau kann das
  nicht. Wie wir das lösen, bespreche ich gerne mit euch, wenn ich zurück bin.

Und eine Bitte: Für den Livegang brauche ich Zugang zur Domainverwaltung. Die Domain und
die Website liegen bei der InternetWerk GmbH (Hirschfeld, Tel. 035343-668800), meinen
WordPress-Zugang habe ich ja schon. Nötig ist der Kundenzugang beim Hoster, um den
DNS-Eintrag umzustellen. Wer von euch hat den, oder soll ich ihn dort anfragen? Die
E-Mail-Postfächer des Vereins bleiben davon unberührt, die fasse ich nicht an.

Die aktuelle Vorschau liegt wie gehabt hier:
https://andreasgrundke-ops.github.io/atg-vorschau/

Die Antworten könnt ihr in Ruhe sammeln, ich arbeite sie ab dem 1. September ein und
schicke euch dann die nächste Fassung.

Viele Grüße
Andreas Grundke

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
