self.addEventListener("install", event => {
  //Cool!!!!!
  var urlsToCache = [
    "/",
    "/static/js/main.24567533.js",
    "/static/css/main.65027555.css",
    "/index.html" 
  ]

  event.waitUntil(
    caches.open("nyt-static-v8").then(cache => {
      return cache.addAll(urlsToCache);
    })
  )
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.delete("nyt-static-v7")
  );
});

self.addEventListener("message", message => {
  if(message.data.update){
    self.skipWaiting();
  }
})


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      if(res) return res;
      return fetch(event.request);
    })
  );
});