'use strict'

var CACHE_NAME = 'my-site-cache-v21';
var urlsToCache = [
    '/',
    '/bootstrap-4.0.0-dist/bootstrap.min.css',
    '/css/style.css',
    '/bower_components/plyr/dist/plyr.css',
    '/bower_components/slick-carousel/slick/slick.css',
    '/bower_components/slick-carousel/slick/slick-theme.css',


    '/js/app.js',
    '/bootstrap-4.0.0-dist/bootstrap.bundle.min.js',
    '/js/bundle.js',
    '/bower_components/corejs-typeahead/dist/typeahead.bundle.min.js',
    '/js/carousel.js'
];


// Cache busting on install event
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => Promise.all(
            urlsToCache.map(url => {
                // cache-bust using a random query string
                return fetch(`${url}?${Math.random()}`).then(response => {
                    // fail on 404, 500 etc
                    if (!response.ok) throw Error('Not ok');
                    return cache.put(url, response);
                })
          })
        ))
    );
});


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

    // If the request is not an image, serve from the cache first, then update the cache from network
    if (!event.request.url.endsWith('.jpg')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    var fetchPromise = fetch(event.request).then(function (networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    return response || fetchPromise;
                })
            })
        );
    }
    // Serve from the cache or fetch it and cache it
    else {
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
    
                        // Clone again
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
    }
});
