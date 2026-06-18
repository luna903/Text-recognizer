// sw.js — Service Worker
// Cache shell + CDN libs for offline use

const CACHE = 'text-scanner-v1';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json'
];

// On install: cache app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting();
});

// On activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for shell, network-first for CDN
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // CDN libs: stale-while-revalidate
  if (url.hostname.includes('cdn.jsdelivr.net') || url.hostname.includes('cdnjs')) {
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const cached = await c.match(e.request);
        const fresh = fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; });
        return cached || fresh;
      })
    );
    return;
  }

  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});