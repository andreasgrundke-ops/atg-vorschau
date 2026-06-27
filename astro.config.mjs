// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// ATG Carsharing — Astro-Konfiguration
// Phase 1: statischer Build → GitHub Pages. site = finale Domain (Custom Domain → base '/').
// Phase 2: bei Bedarf SSR-Adapter (Node) + API-Endpoints auf Hetzner ergänzen (Upload/Buchung).
//
// site/base sind ENV-überschreibbar, damit derselbe Code zwei Ziele bedient:
//  - LIVE (Default):     base '/'  · site = atg-grasbrunn.de
//  - VORSCHAU (Pages):   PUBLIC_BASE=/<repo>/  · PUBLIC_SITE=https://<user>.github.io
//    (Pages-Deploy liegt im Unterordner /<repo>/ → base muss passen, sonst brechen Asset-/Link-Pfade)
const SITE = process.env.PUBLIC_SITE || 'https://www.atg-grasbrunn.de';
const BASE = process.env.PUBLIC_BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  vite: {
    plugins: [tailwindcss()],
  },
});
