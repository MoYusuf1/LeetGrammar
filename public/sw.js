/**
 * Service worker — offline access to lesson content.
 *
 * REWRITTEN BECAUSE THE OLD ONE PINNED THE APP TO A DEAD BUILD.
 *
 * The previous version was cache-first over everything, with a constant cache
 * name. Two consequences, both bad:
 *
 *   1. `/index.html` was precached and served from cache forever. That HTML
 *      names the hashed asset bundles, so a device that cached it once kept
 *      loading the old JS and CSS no matter how many times the site was
 *      redeployed. A whole UI rewrite shipped and nobody's phone could see it.
 *   2. The activate handler deleted caches whose name !== CACHE_NAME, and
 *      CACHE_NAME never changed, so nothing was ever purged.
 *
 * The rule now: HTML is network-first, hashed assets are cache-first.
 *
 * Vite emits assets under /assets/ with a content hash in the filename, so
 * those are safe to cache permanently — a change produces a new filename
 * rather than new content at the same one. HTML has no hash, so it must come
 * from the network whenever the network is available, falling back to cache
 * only when genuinely offline.
 *
 * BUMP CACHE_VERSION when changing anything in this file.
 */

const CACHE_VERSION = 'v2';
const CACHE_NAME = `leetgrammar-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  /* Nothing is precached. Precaching the shell is what created the stale-build
     trap; the first real navigation populates the cache instead. */
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))),
      )
      .then(() => self.clients.claim()),
  );
});

/** Content-hashed build output — safe to serve from cache indefinitely. */
function isHashedAsset(url) {
  return url.pathname.startsWith('/assets/');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Navigations and HTML: network first, so a deploy is picked up on the next
     load. Cache is the offline fallback only. */
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/index.html')),
        ),
    );
    return;
  }

  /* Hashed assets: cache first — the filename changes when the content does. */
  if (isHashedAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok && response.type === 'basic') {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          }),
      ),
    );
    return;
  }

  /* Everything else: network first, fall back to whatever was cached. */
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
