// Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // ബ്രൗസർ നോട്ടിഫിക്കേഷൻ വരാൻ ഈ ഫെച്ച് ഇവന്റ് അത്യാവശ്യമാണ്
  event.respondWith(fetch(event.request));
});


### 3. index.html-ൽ ചേർക്കേണ്ടത്
നിങ്ങളുടെ index.html ഫയലിൽ താഴെ പറയുന്ന കാര്യങ്ങൾ മാത്രം ചെയ്താൽ മതി:
*A. <head> സെക്ഷനിൽ ഇത് ചേർക്കുക:*
html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#14532d">
