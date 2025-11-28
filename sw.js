const CACHE_NAME = 'new-year-countdown-v1';
const urlsToCache = [
  '/new-year-countdown/',
  '/new-year-countdown/Index.html',
  '/new-year-countdown/styles.css',
  '/new-year-countdown/manifest.json',
  '/new-year-countdown/scripts/script.js',
  '/new-year-countdown/scripts/userTime.js',
  '/new-year-countdown/scripts/countDown.js',
  '/new-year-countdown/images/99px_ru_wallpaper_354617_novogodnjaja_elka_na_puti_k_cerkvi.jpg',
  '/new-year-countdown/icons/apple-touch-icon.png',
  '/new-year-countdown/icons/favicon-96x96.png',
  '/new-year-countdown/icons/web-app-manifest-192x192.png',
  '/new-year-countdown/icons/web-app-manifest-512x512.png',
  '/new-year-countdown/icons/favicon.svg',
  '/new-year-countdown/icons/favicon.ico'
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
        return caches.match('/new-year-countdown/Index.html');
      })
  );
});
