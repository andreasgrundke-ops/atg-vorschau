/**
 * Tarife ATG — eine Quelle der Wahrheit für Website, Kostenrechner, Flyer und Visitenkarte.
 *
 * Titel:        ATG Carsharing — Tarifdaten
 * Version:      1.2
 * Autor:        Grundke IT-Service
 * Datum:        2026-08-12
 * Beschreibung: Zeittarife, Kilometerpreise je Fahrzeugklasse inkl. Staffel ab 301 km,
 *               Einmalbeträge und die Rechenlogik des Kostenrechners. Vorher standen
 *               dieselben Preise an rund 20 Stellen im Code — dabei sind Clio und
 *               Sandero in die falschen Klassen gerutscht. Preis ändern heißt jetzt:
 *               genau hier ändern.
 *
 *               Quelle: Preisübersicht des Vereins (atg-grasbrunn.de/preise).
 *               Dort stehen je Klasse ZWEI Werte, z. B. „0,43 / 0,40". Rot ausgezeichnet
 *               ist der HÖHERE. Das ist kein Aktionspreis, sondern ein saisonaler
 *               Spritzuschlag: angekündigt am 15.04.2026 („Teure Spritpreise"), Benziner
 *               3 ct/km, Trafic 5 ct/km, „gilt mindestens bis 30.06.2026", Rücknahme im
 *               Folgequartal, wenn die Spritpreise sinken. Der niedrigere Wert ist also
 *               der reguläre Preis. Rechnerisch bestätigt: 0,40+0,03=0,43 · 0,45+0,03=0,48
 *               · 0,60+0,05=0,65.
 *
 *               Das Enddatum ist verstrichen; die Preisseite wurde zuletzt am 21.07.2026
 *               geändert, ohne den Zuschlag zu entfernen. Wir zeigen deshalb die regulären
 *               Preise (`km`), der Zuschlagspreis steht als `kmMitZuschlag` daneben.
 *               Umstellen = `SPRITZUSCHLAG_GILT` auf true setzen.
 *
 *               Sonderfall ZOE: Ein Spritzuschlag trifft ein E-Auto nicht, die Preisseite
 *               vermerkt dazu „Renault ZOE keine Änderung!". Sandero und ZOE liegen aber
 *               in derselben Klasse. Solange kein Zuschlag gilt, kosten beide 0,45 €/km
 *               und der Unterschied fällt nicht an; wird der Zuschlag wieder aktiviert,
 *               braucht die ZOE einen eigenen Satz — er hängt am Antrieb, nicht an der
 *               Preisklasse.
 *
 * Änderungshistorie:
 *   2026-08-12  1.0  Erstausgabe — herausgelöst aus index.astro nach der Korrekturliste
 *                    von Wolfgang Schneidt (feste Preise statt „ab", Staffel).
 *   2026-08-21  1.2  Spritzuschlag scharf geschaltet (`SPRITZUSCHLAG_GILT = true`) — die
 *                    Preise gelten laut Andreas bis auf weiteres so, wie sie auf
 *                    atg-grasbrunn.de stehen, und dort sind die roten Zuschlagspreise
 *                    nicht zurückgenommen. Die ZOE hat dafür eine eigene Klassenzeile
 *                    bekommen, weil sie als E-Auto beim regulären Satz bleibt.
 *   2026-08-21  1.1  Abgleich mit atg-grasbrunn.de: Der rote Wert ist der Spritzuschlag,
 *                    nicht ein Aktionspreis — die Bedeutung war umgekehrt hinterlegt.
 *                    `AKTIONSPREISE_GELTEN` heißt jetzt `SPRITZUSCHLAG_GILT` (Logik
 *                    gedreht), `kmRegulaer` heißt `kmMitZuschlag`. Die angezeigten
 *                    Beträge bleiben unverändert.
 */

/**
 * Gilt der saisonale Spritzuschlag? `false` = reguläre Preise (schwarz in der Preisliste),
 * `true` = Zuschlagspreise (rot). Siehe Kopfkommentar; vom Verein zu bestätigen.
 */
export const SPRITZUSCHLAG_GILT = true;

/** Zeittarif — gilt für alle Fahrzeuge gleich, unabhängig von der Klasse. */
export const ZEIT = {
  tagVon: 8,
  tagBis: 20,
  tag: 1.0,
  nacht: 0.2,
} as const;

/** Ab diesem Kilometer greift der reduzierte Satz; darüber hinaus endet die Staffel. */
export const STAFFEL = {
  ab: 301,
  bis: 1000,
  /** Kilometer, die noch voll berechnet werden (1–300). */
  volleKm: 300,
} as const;

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
 * Kilometerkosten mit Staffel: die ersten 300 km zum vollen Satz, jeder weitere
 * Kilometer zum reduzierten. Die Preisliste nennt die Staffel „ab km 301 – km 1.000",
 * ohne die Berechnungsweise zu erklären — diese (gestaffelte) Lesart ist die
 * vorsichtigere, weil sie nicht zu wenig ausweist. Vom Verein zu bestätigen.
 */
export function kmKosten(id: KlasseId, km: number): KmKosten {
  const volleSatz = kmSatz(id);
  const staffelSatz = KLASSEN[id].kmStaffel;
  const volleKm = Math.min(km, STAFFEL.volleKm);
  const staffelKm = Math.max(0, km - STAFFEL.volleKm);
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
