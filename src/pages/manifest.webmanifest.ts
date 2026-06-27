/**
 * Web-App-Manifest (PWA) — base-bewusst generiert.
 *
 * Als Astro-Endpoint (statisch prerendert) statt statischer public/-Datei, damit
 * start_url/scope/Icon-Pfade den jeweiligen base-Pfad tragen (Vorschau: /atg-vorschau/,
 * live: /). So ist die Seite als App installierbar — egal unter welchem Pfad.
 *
 * Autor: Grundke IT-Service · Datum: 2026-06-28
 */
import type { APIRoute } from 'astro';

const base = import.meta.env.BASE_URL; // endet mit '/'

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'Auto-Teiler Grasbrunn e.V. — Carsharing dahoam',
      short_name: 'ATG Carsharing',
      description:
        'Carsharing in Grasbrunn: Mitglied werden, Fahrzeug & MVV-Karte buchen, losfahren. Kein Monatsbeitrag.',
      lang: 'de',
      dir: 'ltr',
      start_url: base,
      scope: base,
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#f3f5f6',
      theme_color: '#d42a22',
      categories: ['travel', 'lifestyle'],
      icons: [
        { src: base + 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: base + 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: base + 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
