# Auto-Teiler Grasbrunn e.V. — Webauftritt (Entwurf)

Neuer Webauftritt für die **Auto-Teiler Grasbrunn e.V.** („Carsharing dahoam") —
Website, Flyer und Visitenkarte. Statisch gebaut mit **Astro + Tailwind**, deployt
über **GitHub Pages**.

> **Status: Entwurf / Vorschau.** Noch nicht öffentlich beworben, von Suchmaschinen
> per `noindex` ausgeschlossen. Geht erst nach Freigabe live.

## Vorschau / Freigabe-Hub

Zentrale Übersicht zum Prüfen (Website am PC/Tablet/Handy, Flyer, Visitenkarte):

**→ `/atg-vorschau/vorschau/`**

## Seiten

| Route | Inhalt |
|-------|--------|
| `/` | Startseite der Website (Carsharing-Verein) |
| `/vorschau/` | Präsentations-Hub mit Geräte-Vorschau + Bausteinen |
| `/flyer/` | Flyer A4 (druckfertig, mit QR) |
| `/visitenkarte/` | Visitenkarte Vorder-/Rückseite (mit vCard-QR) |

## Entwicklung

```bash
npm install
npm run dev              # lokale Vorschau (http://localhost:4321/)
npm run build            # statischer Build → dist/
node scripts/gen-qr.mjs  # QR-Codes (Website + vCard) neu erzeugen
```

### Live vs. Vorschau (base-Path)

Der Build ist über ENV steuerbar (eine Codebasis, zwei Ziele):

| | `PUBLIC_BASE` | `PUBLIC_SITE` |
|-|---------------|---------------|
| **Live** (Default) | `/` | `https://www.atg-grasbrunn.de` |
| **Vorschau** (Pages) | `/atg-vorschau/` | `https://andreasgrundke-ops.github.io` |

Bei `PUBLIC_BASE != /` wird automatisch `noindex` gesetzt.

## Deployment

`git push` auf `main` → GitHub Actions (`.github/workflows/deploy.yml`) baut und
veröffentlicht nach GitHub Pages.

---

*Erstellt von **Grundke IT-Service** · CI 2026.01 · www.grundke-it.de*
