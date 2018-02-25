'use strict'

var CACHE_NAME = 'my-site-cache-v4';
var urlsToCache = [
    '/',
    '/css/style.css',
    '/bower_components/plyr/dist/plyr.css',
    '/bower_components/slick-carousel/slick/slick.css',
    '/bower_components/slick-carousel/slick/slick-theme.css',


    '/js/app.js',
    '/js/bundle.js',
    '/bower_components/corejs-typeahead/dist/typeahead.bundle.min.js',

    '/img/cover_woody.jpg',
    '/img/cover_18655295.jpg',
    '/img/cover_19828885.jpg',
    '/img/cover_bigBuckBunny.jpg',
    '/img/cover_bonVoyage.jpg',
    '/img/cover_caminandes1.jpg',
    '/img/cover_caminandes2.jpg',
    '/img/cover_caminandes3.jpg',
    '/img/cover_carnivalOfSouls.jpg',
    '/img/cover_charlotBrocanteur.JPG',
    '/img/cover_charlotGarconDeBanque.jpg',
    '/img/cover_copiadMalditos.jpg',
    '/img/cover_cosmosLaundromat.jpg',
    '/img/cover_cyranoDeBergerac.jpg',
    '/img/cover_daughter_dr_jekyll.png',
    '/img/cover_decay.jpg',
    '/img/cover_donCamillio.jpg',
    '/img/cover_faust.jpg',
    '/img/cover_garconDeTheatre.jpg',
    '/img/cover_glassHalf.jpg',
    '/img/cover_gulliver.jpg',
    '/img/cover_gulliverLilliput.jpg',
    '/img/cover_hisFavouritePastTime.jpg',
    '/img/cover_icon.jpg',
    '/img/cover_judex.jpg',
    '/img/cover_laFilleDuDocteurJekyll.jpg',
    '/img/cover_laGreve.jpg',
    '/img/cover_leBanni.jpg',
    '/img/cover_leBanni2.jpg',
    '/img/cover_leLivreDeLaJungle.jpg',
    '/img/cover_lHommeDeLaRue.jpg',
    '/img/cover_lOpinionPublique.jpeg',
    '/img/cover_lOpinionPublique2.jpg',
    '/img/cover_metropolis.png',
    '/img/cover_morganEtSesNymphes.jpg',
    '/img/cover_naissancedUneNation.jpg',
    '/img/cover_nanouk.jpg',
    '/img/cover_napoleon.jpg',
    '/img/cover_operationBarbershop.jpg',
    '/img/cover_originsOfTheHeir.jpg',
    '/img/cover_plusFortQueLeDiable.jpg',
    '/img/cover_popeyeCompilation.jpg',
    '/img/cover_popeyeVolume1.jpg',
    '/img/cover_popeyeVolume2.jpg',
    '/img/cover_popeyeVolume3.jpg',
    '/img/cover_rueeVersLor.jpg',
    '/img/cover_secretAgent.jpg',
    '/img/cover_secretAgent2.jpg',
    '/img/cover_sintel.jpg',
    '/img/cover_superman.jpg',
    '/img/cover_tearsOfSteel.jpg',
    '/img/cover_theKid.jpg',
    '/img/cover_tirezSurLePianiste.jpg',
    '/img/cover_uneFemmeDisparait.jpg',
    '/img/cover_valleeDeLaVengeance.jpg',
    '/img/cover_voyageDansLaLune.jpg',
    '/img/cover_12HommesEnColere.jpg',
    '/img/cover_39marches.jpg',
];

self.addEventListener('install', function(event) {
    // Preform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
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
                        console.log('cache new requests cumulatively');
                    });

                    return response;
                }
            );
        })
    );
});


