const STATIC_CACHE_NAME = 'mws-static-v9';
const urlsToCache = [
    "/",
    "/statics/css/main.a2b7b0b6.chunk.css",
    "/static/js/main.1aba1958.chunk.js",
    "/static/js/2.8ad10f9c.chunk.js",
    "static/js/runtime-main.71865b48.js",
    "/index.html" 
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => (
      cache.addAll(urlsToCache)
    ))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.delete("nyt-static-v7")
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => (
      response || fetch(event.request)
    )).catch(error => {
      console.log("ERROR", error)
    })
  );
});

self.addEventListener("message", message => {
  if(message.data.update){
    self.skipWaiting();
  }
})


