/**
 * Service Worker — Auto-Teiler Grasbrunn e.V. (PWA).
 *
 * Strategie: Network-first mit Cache-Fallback. Besuchte Seiten/Assets werden
 * gecacht und stehen offline zur Verfügung (Offline-Shell). Scope/base ergeben
 * sich aus der Registrierung (self.registration.scope), daher pfad-unabhängig.
 *
 * Autor: Grundke IT-Service · Datum: 2026-06-28
 */
const CACHE = 'atg-carsharing-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Erfolgreiche, gleiche-Origin-Antworten in den Cache legen.
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match(req, { ignoreSearch: true }))),
  );
});
