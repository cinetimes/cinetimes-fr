'use strict'

var CACHE_NAME = 'my-site-cache-v9';
var urlsToCache = [
    '/',
    '/css/style.css',
    '/bower_components/plyr/dist/plyr.css',
    '/bower_components/slick-carousel/slick/slick.css',
    '/bower_components/slick-carousel/slick/slick-theme.css',


    '/js/app.js',
    '/js/bundle.js',
    '/bower_components/corejs-typeahead/dist/typeahead.bundle.min.js',
    '/js/carousel.js'
];

// self.addEventListener('install', function(event) {
//     // Preform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(function(cache) {
//             console.log('Opened cache');
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

self.addEventListener('install', function(event) {
    // Preform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll([
            new Request('/', { cache: 'no-cache' }),
            new Request('/css/style.css', { cache: 'no-cache' }),
            new Request('/bower_components/plyr/dist/plyr.css', { cache: 'no-cache' }),
            new Request('/bower_components/slick-carousel/slick/slick.css', { cache: 'no-cache' }),
            new Request('/bower_components/slick-carousel/slick/slick-theme.css', { cache: 'no-cache' }),
            new Request('/js/app.js', { cache: 'no-cache' }),
            new Request('/js/bundle.js', { cache: 'no-cache' }),
            new Request('/bower_components/corejs-typeahead/dist/typeahead.bundle.min.js', { cache: 'no-cache' }),
            new Request('/js/carousel.js', { cache: 'no-cache' }),
        ]))
    );
});


// self.addEventListener("activate", function (e) {
//     var t = new Set(urlsToCacheKeys.values());
//     e.waitUntil(caches.open(cacheName).then(function (e) {
//         return e.keys().then(function (n) {
//             return Promise.all(n.map(function (n) {
//                 if (!t.has(n.url)) return e.delete(n)
//             }))
//         })
//     }).then(function () {
//         return self.clients.claim()
//     }))
// })

self.addEventListener('activate', function(event) {
    // Delete any cache that is not in the whitelist
    var cacheWhiteList = CACHE_NAME;

    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(key) {
                if (!cacheWhiteList.includes(key)) {
                    return caches.delete(key);
                }
            }));
        }).then(function() {
            console.log(`${CACHE_NAME} takes over from now`);
        })
    );
});


// Retrieve results cached by our service worker &&
// Cache new request cumulatively (dynamic caching)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            
            // IMPORTANT Clone request. A request is a stream and
            // can only be consumed ONCE. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();
            
            return fetch(fetchRequest).then(
                function(response) {
                    //check if we recieved a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response as the response is 
                    // a stream and because we want the browser to consume
                    // the response as well as the cache consuming the response,
                    // we need to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                        // console.log('cache new requests cumulatively');
                    });

                    return response;
                }
            );
        })
    );
});


