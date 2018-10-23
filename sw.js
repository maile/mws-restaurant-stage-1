var cacheID = "mws-restaurant-stage-1";

const cacheFiles = [
  "/",
  "/index.html",
  "/restaurant.html",
  "/css/styles.css",
  "/css/styles-medium.css",
  "/css/styles-large.css",
  "/data/restaurants.json",
  "/js/",
  "/js/dbhelper.js",
  "/js/secret.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/register.js",
  "/img/1-large.jpg",
  "/img/1-medium.jpg",
  "/img/1-small.jpg",
  "/img/2-large.jpg",
  "/img/2-medium.jpg",
  "/img/2-small.jpg",
  "/img/3-large.jpg",
  "/img/3-medium.jpg",
  "/img/3-small.jpg",
  "/img/4-large.jpg",
  "/img/4-medium.jpg",
  "/img/4-small.jpg",
  "/img/5-large.jpg",
  "/img/5-medium.jpg",
  "/img/5-small.jpg",
  "/img/6-large.jpg",
  "/img/6-medium.jpg",
  "/img/6-small.jpg",
  "/img/7-large.jpg",
  "/img/7-medium.jpg",
  "/img/7-small.jpg",
  "/img/8-large.jpg",
  "/img/8-medium.jpg",
  "/img/8-small.jpg",
  "/img/9-large.jpg",
  "/img/9-medium.jpg",
  "/img/9-small.jpg",
  "/img/10-large.jpg",
  "/img/10-medium.jpg",
  "/img/10-small.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache.addAll(cacheFiles);
    })
      .catch(error => {
        console.log("Caches open failed: " + error);
      })
  );
});

/* test without
self.addEventListener("fetch", event => {
  let cacheRequest = event.request;
  let cacheUrlObj = new URL(event.request.url);
  if (event.request.url.indexOf("restaurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheRequest = new Request(cacheURL);
  }
  if (cacheUrlObj.hostname !== "localhost") {
    event.request.mode = "no-cors";
  }

  event.respondWith(
    caches.match(cacheRequest).then(response => {
      return {
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            return caches.open(cacheID).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(error => {
            console.log("Not connected to internet");
          })
      );
    })
  );
});
*/

self.addEventListener('fetch',function(evt) {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        console.log(`Found ${evt.request} in cache`);
        return response;
      } else {
        console.log(`Could not find ${evt.request} in cache, FETCHING!`);
        return fetch(evt.request)
          .then(function (response) {
            const clonedResponse = response.clone();
            caches.open(cacheID).then(function (cache) {
              cache.put(evt.request, clonedResponse);
            })
            return response;
          })
          .catch(function (error) {
            console.log(`Failed to with: ${error}`);
          });
      }
    })
  );
});
