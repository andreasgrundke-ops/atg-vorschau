// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// ATG Carsharing — Astro-Konfiguration
// Phase 1: statischer Build → GitHub Pages. site = finale Domain (Custom Domain → base '/').
// Phase 2: bei Bedarf SSR-Adapter (Node) + API-Endpoints auf Hetzner ergänzen (Upload/Buchung).
export default defineConfig({
  site: 'https://www.atg-grasbrunn.de',
  vite: {
    plugins: [tailwindcss()],
  },
});
