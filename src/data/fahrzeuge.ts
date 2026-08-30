/**
 * Fahrzeuge ATG — eine Quelle der Wahrheit für Flotte, Standorte-Karte und Pin-Picker.
 *
 * Titel:        ATG Carsharing — Fahrzeug- und Standortdaten
 * Version:      1.2
 * Autor:        Grundke IT-Service
 * Datum:        2026-08-30
 * Beschreibung: Die fünf ATG-Fahrzeuge mit Klasse, Ausstattung und Stellplatz.
 *               Standorttext und Koordinaten standen bisher doppelt (Flotte in
 *               index.astro, Karte in StandorteKarte.astro) und liefen auseinander —
 *               der Trafic hieß in der Flotte schlicht „Neukeferloh".
 *
 *               `standort.geprueft` sagt, ob der Punkt vom Verein bestätigt ist. Die
 *               Koordinaten hat Andreas am 21.08.2026 vor Ort über /pins gesetzt;
 *               Wolfgang Schneidt hat sie am 30.08.2026 abgenommen, die ZOE an der
 *               Ladesäule eingeschlossen. Alle fünf stehen deshalb auf `geprueft: true`.
 *               Zieht ein Fahrzeug um: Seite /pins öffnen, Pin ziehen, Liste kopieren,
 *               hier eintragen.
 *
 * Änderungshistorie:
 *   2026-08-12  1.0  Erstausgabe — zusammengeführt aus index.astro + StandorteKarte.astro
 *                    nach Korrekturliste Wolfgang Schneidt vom 11.08.2026:
 *                    Trafic-Stellplatz benannt und Pin korrigiert (lag ~250 m daneben),
 *                    Corsa-Pin auf Finkenstraße 14 gezogen, Anhängerkupplung erfasst,
 *                    Clio/Sandero in die richtige Preisklasse gerückt.
 *   2026-08-21  1.1  Alle fünf Stellplätze über /pins nachjustiert (Andreas, vor Ort).
 *                    Größter Versatz beim Clio (rund 300 m nach Osten), kleinster beim
 *                    Trafic. Gegenprobe über OpenStreetMap: Clio 6 m und Trafic 16 m
 *                    neben den dort eingetragenen ATG-Stellplätzen, Sandero 9 m neben
 *                    „ATG - Dacia", ZOE 7 m neben einer Wirelane-Ladesäule, Corsa in
 *                    der Finkenstraße auf Höhe Nr. 14. Bestätigung durch den Verein
 *                    stand noch aus.
 *   2026-08-30  1.2  Stellplätze vom Verein abgenommen (Wolfgang Schneidt) — alle fünf
 *                    auf `geprueft: true`. Der Sandero trägt auf der Fahrzeugkarte jetzt
 *                    „Mittelklasse" statt „Kleinwagen": Er gehört zur teureren Klasse
 *                    PKW 2, stand aber mit demselben Badge da wie der Corsa.
 */
import type { KlasseId } from './tarife';

export interface Standort {
  /** Kurzform für enge Stellen (Fahrzeugkarte, Chip). */
  kurz: string;
  /** Vollständige Beschreibung für Karten-Popup und Detailzeile. */
  lang: string;
  lat: number;
  lng: number;
  /** true = vom Verein bestätigt, false = abgeleitet und noch zu prüfen. */
  geprueft: boolean;
}

export interface Fahrzeug {
  slug: string;
  name: string;
  /** Fließtext-Untertitel auf der Fahrzeugkarte. */
  typ: string;
  /** Kurzlabel auf dem Foto. */
  badge: string;
  /** Klasse laut Preisliste des Vereins — steuert den Kilometerpreis. */
  klasse: KlasseId;
  sitze: string;
  /** Zusatz auf der Fahrzeugkarte, z. B. „großer Kofferraum". */
  extra?: string;
  antrieb: string;
  schaltung: string;
  isofix: boolean;
  fuehrerschein: string;
  /** Anhängerkupplung — laut Verein nur der Trafic (Wolfgang Schneidt, 11.08.2026). */
  ahk: boolean;
  standort: Standort;
  img: string;
}

const FOTO_ZOE =
  'https://www.atg-grasbrunn.de/wp-content/uploads/2024/09/WhatsApp-Bild-2024-09-01-um-12.45.09_ef67264d-1.jpg';

export const FAHRZEUGE: Fahrzeug[] = [
  {
    slug: 'zoe',
    name: 'Renault ZOE',
    typ: 'Elektro · emissionsfrei',
    badge: 'E-Auto',
    // Eigene Tarifzeile statt PKW 2: Der Spritzuschlag gilt für das E-Auto nicht.
    klasse: 'zoe',
    sitze: '5 Sitze',
    antrieb: 'Elektro',
    schaltung: 'Automatik',
    isofix: true,
    fuehrerschein: 'Klasse B (alt: 3)',
    ahk: false,
    standort: {
      kurz: 'Am Rathaus, Neukeferloh',
      lang: 'Am Rathaus, Neukeferloh (Ladepunkt)',
      lat: 48.09589,
      lng: 11.76123,
      geprueft: true,
    },
    img: FOTO_ZOE,
  },
  {
    slug: 'corsa',
    name: 'Opel Corsa',
    typ: 'Wendiger Stadtflitzer',
    badge: 'Kleinwagen',
    klasse: 'pkw1',
    sitze: '5 Sitze',
    antrieb: 'Benzin',
    schaltung: 'Schaltgetriebe',
    isofix: true,
    fuehrerschein: 'Klasse B (alt: 3)',
    ahk: false,
    standort: {
      kurz: 'Finkenstraße, hinter der Kirche',
      lang: 'Finkenstraße, hinter der Kirche (gegenüber Nr. 14)',
      lat: 48.09708,
      lng: 11.75879,
      geprueft: true,
    },
    img: 'https://www.atg-grasbrunn.de/wp-content/uploads/2025/07/Opel-Corsa-NEU.jpg',
  },
  {
    slug: 'sandero',
    name: 'Dacia Sandero',
    typ: 'Günstig & praktisch',
    // „Mittelklasse" statt „Kleinwagen" — Wolfgang Schneidt, 30.08.2026. Der Sandero
    // liegt in der teureren Klasse PKW 2, das Badge stellte ihn neben den Corsa.
    badge: 'Mittelklasse',
    klasse: 'pkw2',
    sitze: '5 Sitze',
    antrieb: 'Benzin',
    schaltung: 'Schaltgetriebe',
    isofix: true,
    fuehrerschein: 'Klasse B (alt: 3)',
    ahk: false,
    standort: {
      kurz: 'Ecke Waldstraße / Saarlandstraße',
      lang: 'Ecke Waldstraße / Saarlandstraße, Neukeferloh',
      lat: 48.09581,
      lng: 11.76101,
      geprueft: true,
    },
    img: 'https://www.atg-grasbrunn.de/wp-content/uploads/2025/07/Dacia-Sandero-NEU-1.jpg',
  },
  {
    slug: 'clio',
    name: 'Renault Clio Grandtour',
    typ: 'Kombi mit großem Kofferraum',
    badge: 'Kombi',
    klasse: 'pkw1',
    sitze: '5 Sitze',
    extra: 'großer Kofferraum',
    antrieb: 'Benzin',
    schaltung: 'Schaltgetriebe',
    isofix: true,
    fuehrerschein: 'Klasse B (alt: 3)',
    ahk: false,
    standort: {
      kurz: 'Dianastraße (beim Orterer)',
      lang: 'Dianastraße (beim Orterer), Neukeferloh',
      lat: 48.09676,
      lng: 11.76716,
      geprueft: true,
    },
    img: 'https://www.atg-grasbrunn.de/wp-content/uploads/2022/12/20221204_151256.jpg',
  },
  {
    slug: 'trafic',
    name: 'Renault Trafic',
    typ: 'Kleinbus — 9 Sitze für Gruppen & Ausflüge',
    badge: 'Kleinbus · 9 Sitze',
    klasse: 'transporter',
    sitze: '9 Sitze',
    antrieb: 'Diesel',
    schaltung: 'Schaltgetriebe',
    isofix: true,
    fuehrerschein: 'Klasse B (alt: 3)',
    ahk: true,
    standort: {
      kurz: 'Parkplatz westlich vom Rathaus',
      lang: 'Parkplatz gegenüber Winklerring 12, westlich vom Rathaus',
      lat: 48.09641,
      lng: 11.76126,
      geprueft: true,
    },
    img: 'https://www.atg-grasbrunn.de/wp-content/uploads/2022/03/20220322_161630.jpg',
  },
];

/** Fahrzeug per slug holen — für Karte, Popup und Rechner-Vorauswahl. */
export const fahrzeug = (slug: string): Fahrzeug | undefined =>
  FAHRZEUGE.find((f) => f.slug === slug);
