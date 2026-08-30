# Konzept — Vereins-Backend und digitales Onboarding

Stand 30.08.2026 · Entwurf zur Abstimmung mit Andreas, danach mit dem Vorstand.

Grundlage: die Entscheidungen vom 30.08.2026 (ohne sharePAD planen, Unterschrift und
Ausweisvorlage beim Termin, keine Ausweis-Uploads vorab) sowie die Quellen in
`QUELLEN-Vereinsseite_2026-08-30.md`.

---

## 1. Was erreicht werden soll

1. **Der Vorstand pflegt Preise, Fahrzeuge und Dokumente selbst** — ohne Andreas, ohne
   Git, ohne HTML. Eine Änderung schlägt automatisch überall durch: Tarif-Tabelle,
   Kostenrechner, Fahrzeugkarten, Standorte-Karte, FAQ, Flyer, Querflyer, Visitenkarte.
2. **Interessenten können sich online melden** und bekommen sofort alles, was sie für
   das Aufnahmegespräch brauchen. Der Vorstand sieht den Vorgang mit Status statt einer
   losen E-Mail.
3. Beides ohne Bruch mit dem, was heute schon funktioniert: ELKATO bleibt das
   Buchungssystem, das Aufnahmegespräch bleibt persönlich.

**Ausdrücklich nicht Ziel:** Mitgliederverwaltung, Buchungen, Abrechnung. Das liegt bei
ELKATO und bleibt dort. Sonst entstehen zwei Wahrheiten über dieselben Mitglieder.

---

## 2. Warum die heutige Seite das nicht kann

Die Seite ist ein statischer Astro-Build auf GitHub Pages. Kein Server, keine Datenbank,
kein Login — genau deshalb ist sie schnell und praktisch nicht angreifbar. Für Pflege
und Formulare braucht es einen Server. Der Umbau ist überschaubar, weil die Inhalte
schon heute an einer Stelle liegen (`tarife.ts`, `fahrzeuge.ts`) statt im Markup
verstreut. Diese Struktur wandert in eine Datenbank, alles andere bleibt.

---

## 3. Architektur

Drei Bausteine, bewusst getrennt:

| Baustein | Aufgabe | Sichtbarkeit |
|---|---|---|
| **Website** (Astro, statisch) | alles Öffentliche | `www.atg-grasbrunn.de` |
| **Backend** (Directus auf dem VPS) | Datenpflege, Dokumente, Anfragen, Login | `intern.atg-grasbrunn.de`, nicht verlinkt |
| **Aufnahmestrecke** | Formular, PDF-Erzeugung, Mails | Teil der Website, schreibt ins Backend |

**Warum die Website statisch bleibt und nicht serverseitig rendert:** Sie läuft weiter,
auch wenn Backend oder Datenbank stehen. Sie ist schnell, und es gibt keine Angriffs-
fläche auf der öffentlichen Seite. Der Preis: Nach dem Speichern im Backend dauert es
ein bis zwei Minuten, bis die Änderung draußen ist — bei Preisen und Fahrzeugen egal.
Der Rebuild erzeugt außerdem Flyer und Visitenkarte gleich mit; bei einem
Live-Rendering müsste man die Druckstücke gesondert behandeln.

**Warum Directus und kein Eigenbau:** Login, Rollen, Rechte, Dateiverwaltung,
Versionierung und eine brauchbare Oberfläche sind darin fertig und werden gepflegt. Ein
selbstgebautes Admin hieße, Authentifizierung und Datei-Uploads selbst abzusichern —
für fünf Fahrzeuge und vier Tarifzeilen ein schlechtes Geschäft. Alternative bliebe ein
minimales Eigenbau-Admin, wenn wir jede fremde Abhängigkeit vermeiden wollen; das ist
eine bewusste Entscheidung, keine Nebensache.

**Wo es läuft:** Hetzner-VPS, eigener Stack, additiv nach
`NEUES_PROJEKT_ONBOARDING.md`. MySQL und Caddy sind dort vorhanden. Die Website würde
dann sinnvollerweise ebenfalls vom VPS ausgeliefert statt von GitHub Pages — ein Ort,
ein Zertifikat, ein Backup. GitHub Pages bleibt die Vorschau für Abstimmungen.

---

## 4. Was der Vorstand pflegen kann

| Bereich | Felder |
|---|---|
| **Tarife** | Zeittarif Tag/Nacht und Zeitfenster · je Klasse Grundpreis, Preis mit Spritzuschlag, Staffelpreis · Schalter „Spritzuschlag gilt" · Staffelgrenzen · Aufnahmebeitrag, Einlage, Selbstbeteiligungen, sonstige Entgelte · Preisstand |
| **Fahrzeugklassen** | Bezeichnung, welche Fahrzeuge dazugehören |
| **Fahrzeuge** | Name, Typ, Badge, Klasse, Sitze, Antrieb, Schaltung, Isofix, Führerscheinklasse, Anhängerkupplung, Foto |
| **Stellplätze** | Kurz- und Langtext, Koordinaten (Karte zum Ziehen), Häkchen „bestätigt" |
| **Dokumente** | Nutzungsordnung, Satzung, MVV-Regeln, Fahrzeuganleitungen — hochladen, benennen, sortieren, aus- und einblenden |
| **Aufnahmeanfragen** | eingegangene Anfragen mit Status und Notizfeld |

Der Schalter für den Spritzuschlag ist der Beleg dafür, dass das Konzept trägt: Heute
ist das eine Zeile Code, künftig ein Häkchen — und Website, Rechner und alle drei
Druckstücke stellen gemeinsam um.

**Absicherung gegen Tippfehler:** Preise werden als Zahl mit Wertebereich geprüft, der
Kostenrechner rechnet weiter mit derselben Funktion wie heute. Ein Rebuild, der
fehlschlägt, lässt die alte Seite online stehen und meldet sich per Mail.

---

## 5. Der Aufnahmeweg

### Heute

Formular auf der Vereinsseite (inklusive IBAN im Klartext) → E-Mail an den Vorstand →
Führerscheinkopien per E-Mail → Rückruf → Termin → Überweisung → Gespräch mit
Unterschrift und Karte → ELKATO-Zugang.

### Künftig

| Schritt | Wer | Was passiert |
|---|---|---|
| 1 | Interessent | Klickt „Mitglied werden", füllt das Formular aus: Anrede, Name, Mitgliedschaftsart (Haushalt / Einzel / juristische Person), Anschrift, Telefon, E-Mail, alle fahrberechtigten Personen im Haushalt, Wunsch zur Quernutzung VAT, Einwilligungen, Rückruf-Zeitfenster |
| 2 | System | Legt den Vorgang an, schickt dem Interessenten eine Bestätigung mit **vorausgefüllter Beitrittserklärung als PDF**, SEPA-Formular, Nutzungsordnung, Satzung, Datenschutzerklärung und einer Checkliste für den Termin |
| 3 | System | Meldet den Vorgang an die zuständige Person im Vorstand — E-Mail und Eintrag im Backend mit Status „neu" |
| 4 | Vorstand | Ruft an, vereinbart den Termin, setzt den Status |
| 5 | Interessent | Überweist 650 € (600 € Einlage + 50 € Aufnahme) mindestens zwei Werktage vorher, bringt die ausgefüllten und **unterschriebenen** Formulare, die Ausweiskopie sowie Ausweis und Führerschein **im Original für jede fahrende Person** mit |
| 6 | Vorstand | Aufnahmegespräch, Prüfung der Originale, Einweisung, Transponderkarte, Aufnahmebeschluss |
| 7 | Vorstand | ELKATO-Zugang und Fahrzeug-Code, Status „aufgenommen" |

### Warum nicht digital unterschrieben wird

Die Satzung sagt in § 4.2: **„Die Mitgliedschaft ist schriftlich zu beantragen. Über die
Aufnahme entscheidet der Vorstand."** Schriftform heißt im Zweifel eigenhändige
Unterschrift; ersetzen ließe sie sich nur durch eine qualifizierte elektronische
Signatur. Dazu kommt das SEPA-Mandat, bei dem der Verein im Streitfall das Mandat
nachweisen muss. Da ohnehin ein persönliches Gespräch mit Ausweiskontrolle stattfindet,
wird dort unterschrieben. Die digitale Strecke nimmt dem Interessenten das Suchen und
Abtippen ab und dem Vorstand das Nachfassen — den rechtlichen Kern lässt sie in Ruhe.

### Was das konkret besser macht

- Keine IBAN mehr per unverschlüsselter E-Mail.
- Keine Führerscheinkopien mehr in einem Mailpostfach; Vorlage im Original beim Termin,
  Kopie erst dort und nur nach § 21 StVG.
- Der Vorstand sieht auf einen Blick, welcher Vorgang wo steht, statt in Mails zu suchen.
- Der Interessent bekommt sofort alles Nötige, statt es sich von der Downloadseite
  zusammenzusuchen.

---

## 6. Rollen und Rechte

| Rolle | Darf |
|---|---|
| Vorstand | alles: Tarife, Fahrzeuge, Dokumente, Anfragen, Benutzer |
| Redaktion | Fahrzeuge, Dokumente, Texte — keine Anfragen, keine Benutzer |
| Aufnahme | nur Aufnahmeanfragen sehen und bearbeiten |
| Betrieb (Grundke IT) | technischer Zugang, kein Zugriff auf Anfragen im Alltag |

Zwei-Faktor-Anmeldung für alle Konten mit Zugriff auf personenbezogene Daten.

---

## 7. Datenschutz — was geregelt sein muss

| Punkt | Regelung |
|---|---|
| **Auftragsverarbeitung** | Sobald Anfragen auf dem Hetzner-VPS liegen, ist der Verein Verantwortlicher und Grundke IT-Service Auftragsverarbeiter. AVV nach Art. 28 DSGVO ist Voraussetzung, nicht Formsache. |
| **Löschkonzept** | Aufnahmeanfragen werden nach Abschluss oder Absage automatisch gelöscht — Vorschlag: 6 Monate. Wer Mitglied wird, ist danach in ELKATO geführt, nicht mehr hier. |
| **Datensparsamkeit** | Keine Bankdaten online. Keine Ausweis- oder Führerscheindaten online. Nur was für Rückruf und Terminvereinbarung nötig ist. |
| **Technisch** | TLS über Caddy, Datenbank nicht von außen erreichbar, verschlüsseltes Backup nach Wasabi, Zugriff nur über 2FA, Protokollierung der Zugriffe auf Anfragen. |
| **Transparenz** | Entwürfe für Impressum, Datenschutzerklärung und Barrierefreiheit liegen in `recht/RECHTSTEXTE_neue-Seite.md`, der AVV in `recht/AVV_ATG-Grundke-IT.md`. Beim Backend kommt der Abschnitt zur Aufnahmestrecke hinzu. |
| **Kartenkacheln** | Die Karte lädt beim Heranscrollen Kacheln von OpenStreetMap, dabei geht die IP-Adresse des Besuchers dorthin. Sobald der VPS steht, können wir die Kacheln über den eigenen Server spiegeln — dann verlässt kein Besucherdatum mehr das Haus. Kleiner Aufwand, sauberste Lösung. |
| **Verzeichnis** | Der Verein führt ein Verarbeitungsverzeichnis; die neue Verarbeitung „Aufnahmeanfrage" gehört ergänzt. Zuarbeit können wir liefern. |

---

## 8. Zugänge und Voraussetzungen

**Für den Livegang der Website (unabhängig vom Backend):**

| Was | Wofür | Stand |
|---|---|---|
| Kundenzugang InternetWerk GmbH | A-Record und `www` umhängen | angefragt 21.08.2026 |
| Fahrzeugfotos in Originalgröße | heute von WordPress gehotlinkt — brechen, wenn dort abgeschaltet wird | offen |
| Freigabe der Rechtstexte | Impressum, Datenschutz, Barrierefreiheit | offen |

**Zusätzlich für das Backend:**

| Was | Wofür |
|---|---|
| Entscheidung Hosting-Ort | Hetzner-VPS (empfohlen) oder beim Hoster |
| **AVV Verein ↔ Grundke IT-Service** | Voraussetzung für jede Verarbeitung auf dem VPS |
| DNS-Eintrag für `intern.atg-grasbrunn.de` | Backend erreichbar machen — derselbe Hoster-Zugang |
| SMTP-Zugang eines Vereinspostfachs | Systemmails müssen von `@atg-grasbrunn.de` kommen, sonst Spam |
| DKIM und DMARC im DNS | Zustellbarkeit der Systemmails |
| Zuständige Person für Aufnahmen | wer die Benachrichtigung bekommt und anruft |
| Aktuelle Formulare als Vorlage | Beitrittserklärung und SEPA-Mandat, um die PDFs vorauszufüllen |
| Beschluss des Vorstands | dass Daten künftig dort verarbeitet werden |

ELKATO-Zugangsdaten brauchen wir **nicht** — es gibt keine Kopplung.

---

## 9. Umsetzung in Bausteinen

Nach Schema F: ein Baustein, ein Commit, danach Stopp und Abnahme.

| # | Baustein | KI-Zeit |
|---|---|---|
| 1 | Rechtsseiten: Impressum, Datenschutz, Barrierefreiheit; Fotos lokal | ~2 h |
| 2 | **Livegang der Website** — DNS, Auslieferung, Weiterleitungen, alte Seite still | ~1 h |
| 3 | VPS-Stack: Caddy-Route, Directus, Datenbank, Backup, 2FA | ~3 h |
| 4 | Datenmodell und Migration von `tarife.ts` / `fahrzeuge.ts`, Astro liest beim Build, JSON-Fallback | ~4 h |
| 5 | Rebuild-Automatik: Speichern löst Build und Auslieferung aus, Fehlermeldung per Mail | ~2 h |
| 6 | Dokumentenverwaltung, Downloadseite wird dynamisch | ~2 h |
| 7 | Aufnahmestrecke: Formular, Vorgang, PDF, Mails, Status | ~6 h |
| 8 | Einweisung des Vorstands, Kurzanleitung, Übergabedokument | ~2 h |

**Reihenfolge ist Absicht:** Die Website ist fertig und soll nicht auf das Backend
warten. Bausteine 1 und 2 bringen sie live, alles Weitere kommt danach und stört den
Betrieb nicht.

---

## 10. Offene Entscheidungen

1. Läuft es auf dem Hetzner-VPS von Grundke IT-Service? Dann AVV.
2. Directus oder minimales Eigenbau-Admin?
3. Wird die Website künftig vom VPS ausgeliefert statt von GitHub Pages? (Empfehlung: ja)
4. Werden Bankdaten weiterhin online erhoben? (Empfehlung: nein, erst beim Termin)
5. Löschfrist für Aufnahmeanfragen — Vorschlag 6 Monate.
6. Wer ist die zuständige Person für eingehende Anfragen?
7. Sollen Service-Pauschale und Sonderreinigung aus der Nutzungsordnung mit auf die
   Preisseite? Heute stehen dort nur 60 € grobe Verschmutzung, die Nutzungsordnung nennt
   zusätzlich mindestens 25 € Serviceeinsatz und mindestens 100 € Sonderreinigung.

---

*CI 2026.01 · Grundke IT-Service · www.grundke-it.de*
