/**
 * sw.js - Service Worker for Nature Compass (Zero-Server PWA)
 */

const CACHE_NAME = 'nature-compass-v1.0.0';

// 離線必備資產清單
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './NatureCompass192icon.png',
  './NatureCompass512icon.png',
  './css/style.css',
  './css/print.css',
  './js/app.js',
  './js/engine.js',
  './js/chart.js',
  './js/i18n.js',
  './js/locale-utils.js',
  './js/questions.js',
  './locales/zh-Hant/ui.js',
  './locales/zh-Hant/questions.js',
  './locales/zh-Hant/profiles.js',
  './locales/en/ui.js',
  './locales/en/questions.js',
  './locales/en/profiles.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 僅攔截 GET 請求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      // 離線回退
      if (event.request.headers.get('accept')?.includes('text/html')) {
        return caches.match('./index.html');
      }
    })
  );
});
