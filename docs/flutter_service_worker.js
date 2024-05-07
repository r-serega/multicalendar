'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7dacba3d31cbfc81bbc679a6c204ffe3",
"assets/AssetManifest.json": "072a54941651117e1bbaf39202aea3da",
"assets/assets/ca/lets-encrypt-r3.pem": "9b8740c5387a2fd70006d3cbf2229a0c",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "39c99d748050cc168820862865834ba9",
"assets/images/calendar_bahai.png": "4e94d313d9a93751e462e8ce34708208",
"assets/images/calendar_buddhist.png": "2eff1006c40316ccf12cd421acadd7bc",
"assets/images/calendar_coptic.png": "938748645aacf5135ccffbdbebcc1783",
"assets/images/calendar_east.png": "580ea08a4260388ab3739e9a83260e5e",
"assets/images/calendar_ephiop.png": "83c489a00b4f5a9061179cf7c476f588",
"assets/images/calendar_france.png": "5b80425379b89be4a6f885503f0e8e1a",
"assets/images/calendar_gregorian.png": "8664dfff23f412a707ab2a575acd4e45",
"assets/images/calendar_hc.png": "43e2ae2bfe462360509f21c067088de0",
"assets/images/calendar_hebrew.png": "05736e63a450a738bd7cbc292b0f8f9d",
"assets/images/calendar_hijiri.png": "19591eecf1865f1df8b787c89dc7e9b3",
"assets/images/calendar_japan.png": "97abc4684e4305236ced8b5c91b7ce9e",
"assets/images/calendar_julian.png": "21fe0669ecd02ce53db1a6e0898935e0",
"assets/images/calendar_lite.png": "01e3bc071fee4e4114d818823d39101d",
"assets/images/calendar_logo.png": "acb1be82e83887484511fd3f0988c321",
"assets/images/calendar_next.png": "5435f5e64cd9225147be6dc19547f678",
"assets/images/calendar_persian.png": "f9e8530e12b0bfe9fe7b47231b754096",
"assets/images/calendar_plus.png": "b627bd648e15bededeb390cd91d8d637",
"assets/images/icon.png": "01e3bc071fee4e4114d818823d39101d",
"assets/images/multicalendar512.png": "dd0f29e9af6d58dc48fbc05e90302c3c",
"assets/NOTICES": "d46c28cdda438e2b50ee98e8856c94ae",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "82c6bf88a7b88f0128204698f12d996f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "a9c243a3004f72274f20035520cfc4e1",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "04f83c01dded195a11d21c2edf643455",
"assets/packages/window_manager/images/ic_chrome_close.png": "75f4b8ab3608a05461a31fc18d6b47c2",
"assets/packages/window_manager/images/ic_chrome_maximize.png": "af7499d7657c8b69d23b85156b60298c",
"assets/packages/window_manager/images/ic_chrome_minimize.png": "4282cd84cb36edf2efb950ad9269ca62",
"assets/packages/window_manager/images/ic_chrome_unmaximize.png": "4a90c1909cb74e8f0d35794e2f61d8bf",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "ca59da2320b020a99cfbbcb56aacca4a",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "be1fe0f3728f9126307971b1b3c3ffa1",
"icons/Icon-512.png": "a9c344430cbd0479001a005498174eb9",
"icons/Icon-maskable-192.png": "be1fe0f3728f9126307971b1b3c3ffa1",
"icons/Icon-maskable-512.png": "a9c344430cbd0479001a005498174eb9",
"index.html": "40906c856d803f583d83dfdf6c1cfc90",
"/": "40906c856d803f583d83dfdf6c1cfc90",
"main.dart.js": "48f842b0c68cc2e44dc8e15c2d51f37d",
"manifest.json": "c32c37d7beb8db4c02502952422d7d04",
"version.json": "7554061afc3ce2a38b1938f14d301468"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
