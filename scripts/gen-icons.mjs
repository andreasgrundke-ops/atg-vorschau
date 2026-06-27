/**
 * gen-icons.mjs — PWA-App-Icons aus einem ATG-Icon-SVG rendern.
 *
 * Titel:        ATG Carsharing — PWA-Icon-Generator
 * Version:      1.0
 * Autor:        Grundke IT-Service
 * Datum:        2026-06-28
 * Beschreibung: Erzeugt die App-Icons (192/512/maskable/apple-touch) aus einem
 *               eingebetteten SVG (rotes App-Icon, gelbes Auto + „ATG"). Vollflächiger
 *               roter Hintergrund → maskable-tauglich. Einmalig ausführen:
 *                 node scripts/gen-icons.mjs
 *               Generierte PNGs werden eingecheckt (Build braucht sharp dann nicht).
 * Änderungshistorie:
 *   2026-06-28  1.0  Erstausgabe (192/512/maskable/apple-touch).
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'icons');

// App-Icon: roter Vollhintergrund (maskable-safe), gelbes Auto (Lucide-Stil) zentral + „ATG".
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#d42a22"/>
  <g transform="translate(96 120) scale(13.3)" fill="none" stroke="#ffc400" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 1 12v4c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
  </g>
  <text x="256" y="430" font-family="Arial, sans-serif" font-weight="800" font-size="92" fill="#ffffff" text-anchor="middle" letter-spacing="4">ATG</text>
</svg>`;

const buf = Buffer.from(svg);
await mkdir(outDir, { recursive: true });

const targets = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 512, name: 'icon-maskable-512.png' }, // Vollfläche rot = maskable-safe
  { size: 180, name: 'apple-touch-icon.png' },
];

for (const t of targets) {
  await sharp(buf).resize(t.size, t.size).png().toFile(join(outDir, t.name));
  console.log('  public/icons/' + t.name, `(${t.size}×${t.size})`);
}
console.log('PWA-Icons geschrieben.');
