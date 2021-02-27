var cacheName = "petstore-v1";
var cacheFiles = [
    'group.html',
    'index.html',
    'products.js',
    'afterschool.webmanifest',
    'images/product-math.jpg',
    'images/icon.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cachee) => {
            console.log('[Service worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function(cachee) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});