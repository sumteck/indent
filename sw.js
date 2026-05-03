self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pattiam ayurdhara keralasree order form').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHSnlk07dlUxrQlDkKsXnIYq7k8BwFDGX9pg&s'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});