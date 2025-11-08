const CACHE_NAME = 'privacy-self-audit-v2';
const CACHE_NAME = 'privacy-self-audit-v1';

const getBasePath = () => {
  const scopePath = self.location.pathname.replace(/[^/]+$/, '');
  return scopePath.endsWith('/') ? scopePath : `${scopePath}/`;
};

const BASE_PATH = getBasePath();

const urlsToCache = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.webmanifest`,
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(`${BASE_PATH}index.html`, copy));
          return response;
        })
        .catch(() => caches.match(`${BASE_PATH}index.html`))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(networkResponse => {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return networkResponse;
        })
        .catch(error => {
          if (event.request.destination === 'document') {
            return caches.match(`${BASE_PATH}index.html`);
          }
          throw error;
        });
      return fetch(event.request).catch(error => {
        if (event.request.mode === 'navigate') {
          return caches.match(`${BASE_PATH}index.html`);
        }
        throw error;
      });
    })
  );
});
