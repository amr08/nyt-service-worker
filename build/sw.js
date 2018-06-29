const STATIC_CACHE_NAME = 'mws-static-v8';
const urlsToCache = [
    "/",
    "/static/js/main.f800c325.js",
    "/static/css/main.65027555.css",
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


