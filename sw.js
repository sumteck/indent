// Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // ബ്രൗസർ നോട്ടിഫിക്കേഷൻ വരാൻ ഈ ഫെച്ച് ഇവന്റ് അത്യാവശ്യമാണ്
  event.respondWith(fetch(event.request));
});
