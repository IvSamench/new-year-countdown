const CACHE_NAME = 'new-year-countdown-v1';
const urlsToCache = [
  '/',
  '/Index.html',
  '/styles.css',
  '/manifest.json',
  '/scripts/script.js',
  '/scripts/userTime.js',
  '/scripts/countDown.js',
  '/images/99px_ru_wallpaper_354617_novogodnjaja_elka_na_puti_k_cerkvi.jpg',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-96x96.png',
  '/icons/web-app-manifest-192x192.png',
  '/icons/web-app-manifest-512x512.png',
  '/icons/favicon.svg',
  '/icons/favicon.ico'
];

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Service Worker: Cache error', err))
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кэша или загружаем из сети
        return response || fetch(event.request);
      })
      .catch(() => {
        // Офлайн fallback
        return caches.match('/Index.html');
      })
  );
});
