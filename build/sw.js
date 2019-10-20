if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
 
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "d2bb7b9a74495e342f026fcab75a592c"
  },
  {
    "url": "logo192.png",
    "revision": "581fa1d82b7152e685510b51d48edd3e"
  },
  {
    "url": "logo512.png",
    "revision": "260d57586012b0ed1ae78accc0bf7083"
  },
  {
    "url": "precache-manifest.10c474f99e6102c7cec5fac2208c04a9.js",
    "revision": "10c474f99e6102c7cec5fac2208c04a9"
  },
  {
    "url": "service-worker.js",
    "revision": "5a494e7a6bf0f659bc1a363b6ae2cf82"
  },
  {
    "url": "static/css/main.a2b7b0b6.chunk.css",
    "revision": "b6c6789baba000a55b36a0ce22671f39"
  },
  {
    "url": "static/js/2.8ad10f9c.chunk.js",
    "revision": "5524387c1fdcd272c9748dd45adaf97a"
  },
  {
    "url": "static/js/main.1a3f7eb1.chunk.js",
    "revision": "2b6c0becb75f1142bf8a10ac0b075335"
  },
  {
    "url": "static/js/runtime-main.71865b48.js",
    "revision": "6053b1de9ab4716fb8426971ee611741"
  }
]);
 
/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });
 
workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
 
} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}