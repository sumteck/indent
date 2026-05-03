/**
 * sw.js — Ayurvedic Order Form Service Worker
 * Strategy: Network-first with cache fallback.
 * Primary purpose: satisfy the PWA installability criteria.
 */

const CACHE_NAME   = 'indent-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
];

// ── Install: pre-cache shell assets ──────────────────────────
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: purge stale caches ─────────────────────────────
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first, cache as fallback ───────────────────
self.addEventListener('fetch', (evt) => {
  // Pass through non-GET and cross-origin API calls without caching
  if (evt.request.method !== 'GET') return;

  const url = new URL(evt.request.url);

  // Let CDN requests (Tailwind, jsPDF, XLSX, Fonts) pass through uncached
  const passthroughHosts = [
    'cdn.tailwindcss.com',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];
  if (passthroughHosts.some(h => url.hostname.includes(h))) {
    evt.respondWith(fetch(evt.request));
    return;
  }

  // Network-first for everything else (price list XLSXs, index.html, etc.)
  evt.respondWith(
    fetch(evt.request)
      .then(networkRes => {
        // Cache a fresh copy of successful same-origin responses
        if (networkRes.ok && url.origin === self.location.origin) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(evt.request, clone));
        }
        return networkRes;
      })
      .catch(() => caches.match(evt.request))
  );
});
