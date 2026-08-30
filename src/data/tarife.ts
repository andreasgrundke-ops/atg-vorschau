/**
 * Tarife ATG — eine Quelle der Wahrheit für Website, Kostenrechner, Flyer und Visitenkarte.
 *
 * Titel:        ATG Carsharing — Tarifdaten
 * Version:      1.4
 * Autor:        Grundke IT-Service
 * Datum:        2026-08-30
 * Beschreibung: Zeittarife, Kilometerpreise je Fahrzeugklasse inklusive Staffel und die
 *               Rechenlogik des Kostenrechners. Vorher standen dieselben Preise an rund
 *               20 Stellen im Code — dabei sind Clio und Sandero in die falschen Klassen
 *               gerutscht. Preis ändern heißt jetzt: genau hier ändern.
 *
 *               Quelle ist die Preisübersicht des Vereins (atg-grasbrunn.de/preise),
 *               gelesen und am 30.08.2026 von Wolfgang Schneidt bestätigt. Dort stehen je
 *               Klasse zwei Werte, etwa „0,43 / 0,40". Der rot ausgezeichnete höhere ist
 *               kein Aktionspreis, sondern der saisonale Spritzuschlag vom 15.04.2026:
 *               3 ct/km für Benziner, 5 ct/km für den Trafic (0,40+0,03=0,43 ·
 *               0,45+0,03=0,48 · 0,60+0,05=0,65). Er gilt weiterhin, obwohl die
 *               Ankündigung nur „mindestens bis 30.06.2026" sagte. Nimmt der Verein ihn
 *               zurück: `SPRITZUSCHLAG_GILT` auf false setzen, dann greifen die regulären
 *               Preise (`km`) auf Website und Druckstücken gleichzeitig.
 *
 *               Sonderfall ZOE: Ein Spritzuschlag trifft ein E-Auto nicht — „Renault ZOE
 *               keine Änderung!" steht dazu auf der Preisseite, bestätigt am 30.08.2026.
 *               Sandero und ZOE liegen beide in der Klasse PKW 2, die ZOE hat deshalb eine
 *               eigene Zeile mit eigenem Kilometerpreis. Fällt der Zuschlag weg, zeigen
 *               beide wieder denselben Betrag.
 *
 *               Staffel: Sie wiederholt sich je 1.000 Kilometer. Die Nutzungsordnung
 *               (Ziff. 5, Fassung 01.01.2025) sagt es wörtlich: „Werden pro zusammen-
 *               hängenden Buchungszeitraum mehr als 300 km gefahren, gilt jeweils für
 *               km 301 bis 1000, 1301 bis 2000 usw. der km-Tarif II." Also 300 km zum
 *               Grundtarif, 700 zum Staffelpreis, dann von vorn. Der Verein hat das am
 *               30.08.2026 in Kurzform bestätigt („ab 1000 km gilt wieder der normale
 *               Satz") — die Nutzungsordnung ergänzt, dass der Grundtarif dort nur
 *               300 km lang gilt.
 *
 * Änderungshistorie:
 *   2026-08-12  1.0  Erstausgabe — herausgelöst aus index.astro nach der Korrekturliste
 *                    von Wolfgang Schneidt (feste Preise statt „ab", Staffel).
 *   2026-08-21  1.1  Abgleich mit atg-grasbrunn.de: Der rote Wert ist der Spritzuschlag,
 *                    nicht ein Aktionspreis — die Bedeutung war umgekehrt hinterlegt.
 *                    `AKTIONSPREISE_GELTEN` heißt jetzt `SPRITZUSCHLAG_GILT` (Logik
 *                    gedreht), `kmRegulaer` heißt `kmMitZuschlag`.
 *   2026-08-21  1.2  Spritzuschlag scharf geschaltet, ZOE mit eigener Klassenzeile.
 *   2026-08-30  1.3  Antworten des Vereins eingearbeitet (Wolfgang Schneidt, 30.08.2026):
 *                    Zuschlag gilt weiter, ZOE bleibt ausgenommen, die abschnittsweise
 *                    Staffelung ist richtig, ab 1.001 km gilt wieder der Grundtarif.
 *                    Der Deckel bei 1.000 km im Kostenrechner entfällt.
 *   2026-08-30  1.4  Gegenprobe an der Nutzungsordnung (Ziff. 5): Die Staffel läuft
 *                    zyklisch je 1.000 km — ab 1.301 km gilt wieder der Staffelpreis.
 *                    `kmKosten` rechnet deshalb in 1.000er-Blöcken statt mit einem
 *                    einmaligen dritten Abschnitt; ab 1.301 km war die Rechnung sonst
 *                    zu teuer.
 */

/**
 * Gilt der saisonale Spritzuschlag? `false` = reguläre Preise (schwarz in der Preisliste),
 * `true` = Zuschlagspreise (rot). Vom Verein am 30.08.2026 bestätigt: gilt weiter.
 */
export const SPRITZUSCHLAG_GILT = true;

/** Zeittarif — gilt für alle Fahrzeuge gleich, unabhängig von der Klasse. */
export const ZEIT = {
  tagVon: 8,
  tagBis: 20,
  tag: 1.0,
  nacht: 0.2,
} as const;

/**
 * Kilometerstaffel einer Fahrt, zyklisch je `zyklus` Kilometer: die ersten `volleKm`
 * zum Grundtarif, der Rest bis `bis` zum Staffelpreis, danach beginnt die Staffel von
 * vorn (Nutzungsordnung Ziff. 5).
 */
export const STAFFEL = {
  ab: 301,
  bis: 1000,
  /** Kilometer je Zyklus, die zum Grundtarif zählen (1–300, dann 1.001–1.300, …). */
  volleKm: 300,
  /** Länge eines Staffelzyklus. */
  zyklus: 1000,
} as const;

/**
 * Obergrenze für Regler und Zahlenfeld im Kostenrechner. Kein Tarifwert, sondern eine
 * Anzeigegrenze: Die Staffel endet bei 1.000 km, der Rechner soll aber zeigen können,
 * was darüber passiert. 2.000 km decken jede Urlaubsfahrt ab.
 */
export const RECHNER_MAX = 2000;

/**
 * Die Preisliste kennt drei Klassen. Die ZOE steht darin unter PKW 2, zahlt aber als
 * E-Auto keinen Spritzuschlag — solange der gilt, hat sie einen eigenen Kilometerpreis
 * und deshalb hier eine eigene Zeile. Fällt der Zuschlag weg, kostet sie wieder dasselbe
 * wie der Sandero; die Zeile bleibt dann bestehen und zeigt denselben Betrag.
 */
export type KlasseId = 'pkw1' | 'pkw2' | 'zoe' | 'transporter';

export interface Klasse {
  id: KlasseId;
  /** Bezeichnung wie in der Preisliste des Vereins. */
  label: string;
  /** Klartext für Website-Besucher, die die Klassennamen nicht kennen. */
  beschreibung: string;
  /** Regulärer Preis pro km bis 300 km (schwarz in der Preisliste). */
  km: number;
  /** Preis pro km bis 300 km mit saisonalem Spritzuschlag (rot in der Preisliste). */
  kmMitZuschlag: number;
  /** Reduzierter Preis pro km für 301–1000 km. */
  kmStaffel: number;
}

export const KLASSEN: Record<KlasseId, Klasse> = {
  pkw1: {
    id: 'pkw1',
    label: 'PKW 1',
    beschreibung: 'Opel Corsa · Renault Clio Grandtour',
    km: 0.4,
    kmMitZuschlag: 0.43,
    kmStaffel: 0.32,
  },
  pkw2: {
    id: 'pkw2',
    label: 'PKW 2',
    beschreibung: 'Dacia Sandero',
    km: 0.45,
    kmMitZuschlag: 0.48,
    kmStaffel: 0.37,
  },
  zoe: {
    id: 'zoe',
    label: 'PKW 2',
    beschreibung: 'Renault ZOE (E-Auto)',
    km: 0.45,
    // Kein Spritzuschlag für das E-Auto — „Renault ZOE keine Änderung!" auf der
    // Preisseite des Vereins. Der Wert ist absichtlich gleich `km`.
    kmMitZuschlag: 0.45,
    kmStaffel: 0.37,
  },
  transporter: {
    id: 'transporter',
    label: 'Transporter',
    beschreibung: 'Renault Trafic (9 Sitze)',
    km: 0.6,
    kmMitZuschlag: 0.65,
    kmStaffel: 0.52,
  },
};

/** Einmalige Beträge beim Eintritt. */
export const EINMALIG = { aufnahme: 50, einlage: 600 } as const;

/** Selbstbeteiligung im Schadenfall. */
export const SB = { haftpflicht: 200, kasko: 600 } as const;

/** Weitere Entgelte aus der Preisliste. */
export const SONSTIGES = { zusatzkarte: 5, grobverschmutzung: 60, ausserhalbBuchung: 10 } as const;

/** Stand der hinterlegten Preise — erscheint als Fußnote unter der Tarif-Tabelle. */
export const PREIS_STAND = '08/2026';

/** Kilometerpreis der Klasse, der bis 300 km gilt. */
export const kmSatz = (id: KlasseId): number =>
  SPRITZUSCHLAG_GILT ? KLASSEN[id].kmMitZuschlag : KLASSEN[id].km;

/** Zahl deutsch mit zwei Nachkommastellen: 1.234,56. */
const zahl = (n: number): string =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Euro-Betrag deutsch formatiert: 1.234,56 €. */
export const eur = (n: number): string => zahl(n) + ' €';

/** Kilometerpreis kurz, ohne Nachkomma-Null-Ballast: 0,40 €/km. */
export const proKm = (n: number): string => zahl(n) + ' €/km';

/** Stundenpreis: 1,00 €/h. */
export const proStd = (n: number): string => zahl(n) + ' €/h';

/**
 * Zahl ohne Nachkomma-Ballast: „1" statt „1,00", aber „1,5" statt „1.5".
 * Für die Blickfang-Kennzahlen auf Flyer und Visitenkarte, die den Betrag groß und
 * kurz zeigen. Ein direkt eingesetztes `{ZEIT.tag}` sähe bei glatten Werten gleich
 * aus, würde bei krummen aber den englischen Punkt schreiben.
 */
export const zahlKurz = (n: number): string =>
  n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

/** Alle Klassen in der Reihenfolge der Preisliste. */
export const ALLE_KLASSEN: readonly KlasseId[] = ['pkw1', 'pkw2', 'zoe', 'transporter'] as const;

/**
 * Spanne über alle Klassen, z. B. „0,40–0,60 €/km".
 * Flyer und Visitenkarte haben keinen Platz für drei Klassen und nennen deshalb
 * nur die Spanne. Sie muss trotzdem aus denselben Werten kommen wie die Website —
 * sonst zeigt das gedruckte Blatt nach einer Preisänderung noch die alten Sätze.
 */
export const kmSpanne = (): string => {
  const werte = ALLE_KLASSEN.map(kmSatz);
  return `${zahl(Math.min(...werte))}–${zahl(Math.max(...werte))} €/km`;
};

/** Dasselbe für die Staffel ab 301 km: „0,32–0,52 €/km". */
export const kmStaffelSpanne = (): string => {
  const werte = ALLE_KLASSEN.map((id) => KLASSEN[id].kmStaffel);
  return `${zahl(Math.min(...werte))}–${zahl(Math.max(...werte))} €/km`;
};

export interface KmKosten {
  volleKm: number;
  volleSatz: number;
  volleSumme: number;
  staffelKm: number;
  staffelSatz: number;
  staffelSumme: number;
  summe: number;
}

/**
 * Kilometerkosten nach der Staffel der Nutzungsordnung (Ziff. 5): Je angefangene
 * 1.000 Kilometer zählen die ersten 300 zum Grundtarif und die übrigen 700 zum
 * Staffelpreis — „km 301 bis 1000, 1301 bis 2000 usw.".
 *
 * Abgerechnet wird abschnittsweise, nie rückwirkend: Wer die 1.000er-Grenze überfährt,
 * behält den Rabatt auf die bereits gefahrenen Kilometer 301 bis 1.000 (Andreas,
 * 30.08.2026). Deshalb ganze Zyklen zählen statt Schwellen vergleichen — bei 1.500 km
 * ergibt das 600 km Grundtarif und 900 km Staffelpreis.
 */
export function kmKosten(id: KlasseId, km: number): KmKosten {
  const volleSatz = kmSatz(id);
  const staffelSatz = KLASSEN[id].kmStaffel;
  const ganzeZyklen = Math.floor(km / STAFFEL.zyklus);
  const restStrecke = km % STAFFEL.zyklus;
  const volleKm = ganzeZyklen * STAFFEL.volleKm + Math.min(restStrecke, STAFFEL.volleKm);
  const staffelKm = km - volleKm;
  const volleSumme = volleKm * volleSatz;
  const staffelSumme = staffelKm * staffelSatz;
  return {
    volleKm,
    volleSatz,
    volleSumme,
    staffelKm,
    staffelSatz,
    staffelSumme,
    summe: volleSumme + staffelSumme,
  };
}

export interface Fahrtkosten {
  stdTag: number;
  stdNacht: number;
  zeitTagSumme: number;
  zeitNachtSumme: number;
  zeitSumme: number;
  km: KmKosten;
  gesamt: number;
}

/** Gesamtkosten einer Fahrt: Zeit (getrennt nach Tag/Nacht) + Kilometer inkl. Staffel. */
export function fahrtkosten(opts: {
  klasse: KlasseId;
  stdTag: number;
  stdNacht: number;
  km: number;
}): Fahrtkosten {
  const zeitTagSumme = opts.stdTag * ZEIT.tag;
  const zeitNachtSumme = opts.stdNacht * ZEIT.nacht;
  const km = kmKosten(opts.klasse, opts.km);
  return {
    stdTag: opts.stdTag,
    stdNacht: opts.stdNacht,
    zeitTagSumme,
    zeitNachtSumme,
    zeitSumme: zeitTagSumme + zeitNachtSumme,
    km,
    gesamt: zeitTagSumme + zeitNachtSumme + km.summe,
  };
}
