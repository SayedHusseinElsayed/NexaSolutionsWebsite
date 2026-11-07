// Clean-up service worker. The Storexa store app used to live on nexamasr.com and installed a service worker
// here that serves /assets/* from its cache forever. Browsers that visited the old site check /sw.js for updates,
// get this file, and it removes the old caches, unregisters itself and reloads open pages once, so visitors always
// get the current company website. This site does not register a service worker of its own.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const pages = await self.clients.matchAll({ type: 'window' });
    pages.forEach((page) => { if ('navigate' in page) page.navigate(page.url); });
  })());
});

// No fetch handler: every request goes straight to the network.
