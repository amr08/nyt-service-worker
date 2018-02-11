self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).then(res => {
      if(res.status === 404) {
        return new Response("Not found")
      }
      return res;
    }).catch(err => {
      return new Response("page offline")
    })
  );
});