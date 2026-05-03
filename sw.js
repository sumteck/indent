const CACHE_NAME = 'order-form-v1';

// Install Event
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Fetch Event (Network First Strategy - എക്സൽ ഫയലുകൾ അപ്ഡേറ്റ് ആവാൻ ഇത് സഹായിക്കും)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});