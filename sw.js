// Cache ID
var staticCacheName = 'static-v1';
// Array containing all relevant file-URLs that need to be downloaded
var urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'css/responsive.css',
    'data/restaurants.json',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
    'sw_registration.js'
];

self.addEventListener('install', event => {
    console.log('static-v1 installing...', caches.open);
    event.waitUntil(
        caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('static-v1 now ready to handle fetches!', event)
})

self.addEventListener('fetch', event => {
    console.log('fetch', event.request);
    const isLocal = event.request.url.startsWith(self.location.origin);
    const isLeaflet = event.request.url.startsWith('https://unpkg.com/leaflet@1.3.1/dist');
    if (isLocal || isLeaflet) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                fetch(event.request).then(response => {
                    caches.open(staticCacheName).then(cache => {
                        cache.add(event.request, response.clone());
                        return response;
                    })
                })
            })
        );
    }
});