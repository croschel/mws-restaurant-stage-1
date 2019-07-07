var staticCacheName = 'restaurant';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/style.css',
        'img/*.png',
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjkUnxuYPGTxhF5Zmbu65IN_8RbdRUg3Y&libraries=places&callback=initMap",
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjkUnxuYPGTxhF5Zmbu65IN_8RbdRUg3Y&libraries=places&callback=initMap"
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('res') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});