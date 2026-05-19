/* ==========================================================
   EduHub — Service Worker  (sw.js)
   À placer à la RACINE du domaine, au même niveau que index.html
   ========================================================== */
'use strict';

var CACHE_NAME = 'eduhub-v2';
var ASSETS_TO_PRECACHE = [
  './',
  './index.html'
];

// ── INSTALL : mise en cache des ressources essentielles ──
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_PRECACHE);
    })
  );
  self.skipWaiting(); // Active immédiatement sans attendre la fermeture des onglets
});

// ── ACTIVATE : suppression des anciens caches ──
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// ── FETCH : stratégie Network-first avec fallback cache ──
self.addEventListener('fetch', function (event) {
  // Ignorer les requêtes non-GET et les appels Supabase (données dynamiques)
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.hostname.includes('supabase.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // Ne mettre en cache que les réponses valides
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(function () {
        // Réseau indisponible → fallback sur le cache
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('./index.html');
        });
      })
  );
});
