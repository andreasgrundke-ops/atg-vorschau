/**
 * gen-qr.mjs — QR-Codes für Flyer & Visitenkarte erzeugen (self-hosted, DSGVO).
 *
 * Titel:        ATG Carsharing — QR-Generator
 * Version:      1.0
 * Autor:        Grundke IT-Service
 * Datum:        2026-06-27
 * Beschreibung: Erzeugt zwei SVG-QR-Codes in public/img/ — kein externer Dienst,
 *               keine Tracking-Pixel. Wird einmalig/ bei Datenänderung ausgeführt:
 *                 node scripts/gen-qr.mjs
 *               Die erzeugten SVGs werden eingecheckt, damit der Build selbst
 *               keine QR-Lib braucht.
 *
 * Ablauf:
 *   1. Website-QR (Flyer „Jetzt informieren / Mitglied werden") → atg-grasbrunn.de
 *   2. vCard-QR (Visitenkarte-Rückseite) → Kontakt direkt ins Telefonbuch
 *
 * Änderungshistorie:
 *   2026-06-27  1.0  Erstausgabe (Website + vCard).
 */
import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'img');

// Markenfarbe: dunkles Ink auf transparent — maximal scanbar, passt zur CI.
const opts = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: { dark: '#181513ff', light: '#00000000' },
};

const WEBSITE = 'https://www.atg-grasbrunn.de/';

// vCard 3.0 — verbindliche, öffentliche Vereins-NAP (Impressum atg-grasbrunn.de).
const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'FN:Auto-Teiler Grasbrunn e.V.',
  'ORG:Auto-Teiler Grasbrunn e.V.',
  'TEL;TYPE=work,voice:+498921541339',
  'EMAIL;TYPE=work:info@atg-grasbrunn.de',
  'ADR;TYPE=work:;;Winklerring 12;Grasbrunn;Bayern;85630;Deutschland',
  'URL:https://www.atg-grasbrunn.de/',
  'NOTE:Carsharing dahoam — gemeinnütziges Carsharing in Grasbrunn.',
  'END:VCARD',
].join('\r\n');

await mkdir(outDir, { recursive: true });

const website = await QRCode.toString(WEBSITE, opts);
await writeFile(join(outDir, 'qr-website.svg'), website, 'utf8');

const vcard = await QRCode.toString(VCARD, opts);
await writeFile(join(outDir, 'qr-vcard.svg'), vcard, 'utf8');

console.log('QR-Codes geschrieben:');
console.log('  public/img/qr-website.svg  →', WEBSITE);
console.log('  public/img/qr-vcard.svg    → vCard Auto-Teiler Grasbrunn e.V.');
