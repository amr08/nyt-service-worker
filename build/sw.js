self.addEventListener("install", event => {
  //Cool!!!!
  var urlsToCache = [
    "/",
    "/static/js/main.8db09a36.js",
    "/static/css/main.65027555.css",
    "/index.html" 
  ]

  event.waitUntil(
    caches.open("nyt-static-v9").then(cache => {
      return cache.addAll(urlsToCache);
    })
  )
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.delete("nyt-static-v8")
  );
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      if(res) return res;
      return fetch(event.request);
    })
  );
});