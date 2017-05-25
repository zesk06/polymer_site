/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","94ede3dc63de55939ae9dce3e04adcbd"],["bower_components/app-layout/app-drawer/app-drawer.html","af5d8168d3e995391377e72c7204912c"],["bower_components/app-layout/app-header-layout/app-header-layout.html","69d2e94dce2e8cd5aecfc50131f071f4"],["bower_components/app-layout/app-header/app-header.html","611b00b75388e2a548c3656087e9b4ec"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","354cc13dae18b154ae055036e959e2ae"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","387b0a58c54afa617265a50ab25c792c"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","f9af3b19ba0df5aea027b835f0d4e766"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","0d375fa44800f0d196034e6a6240a5c3"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","f3f0a1ef72443548681e08410ef8cac2"],["bower_components/app-layout/app-scroll-effects/effects/material.html","45ac7838ae5551c41616a25f7a1f1ae6"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","db1405dd5694b43cfce35d2522ab9825"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","48795db4cf5b8a18cc66a976e1337a87"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","0de52d9136a8274e0229a5b429cd7aa0"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","a50af0d3b7b87d87f13aeb8abf049815"],["bower_components/app-layout/app-toolbar/app-toolbar.html","40628b2aaf9a599891097923c5de5a10"],["bower_components/app-layout/helpers/helpers.html","33fa00d106b9bc07ab162dbe88d1b664"],["bower_components/app-route/app-location.html","3c3901880d5988a13176f5fbe51cd7ab"],["bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["bower_components/app-route/app-route.html","087cdb23ddbadae3fa3d7f94e5521763"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","db18aab5d2e81d8e9d9268e6ecf72bfa"],["bower_components/iron-behaviors/iron-button-state.html","9fb410eb4dd2cf074011b4d7565fe520"],["bower_components/iron-behaviors/iron-control-state.html","26408b231f3184ed4c861a77090782d0"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","308cda98232643a0bbfe3caffeb5fedf"],["bower_components/iron-flex-layout/iron-flex-layout.html","ff9477722c978e3fdd3fbf292cc3f2fc"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8ea5b57ab9067df1c61dc124c496120b"],["bower_components/iron-icon/iron-icon.html","d4b7a82c9ccbbeca2b0c89f4e53ffb05"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","7877da831e69b35918c219f1dc303416"],["bower_components/iron-location/iron-location.html","74d25cc458b9d0dea3abd98d93512157"],["bower_components/iron-location/iron-query-params.html","202ab9d2102acc73b019107ceb09d6c3"],["bower_components/iron-media-query/iron-media-query.html","5fb17283155ca3ad912dafebc9f06a74"],["bower_components/iron-meta/iron-meta.html","c4214b55b5f4bdeee84c0caa675bb9d5"],["bower_components/iron-pages/iron-pages.html","6eb057080296abef128e6fac44d202f3"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","eb6f1817ebbfaa4b5bf9d8d079237d1d"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","33c023f229cd353ec7d21b5a3b9e137b"],["bower_components/iron-selector/iron-multi-selectable.html","d4765be6d51eb9e5e170b7191b222aec"],["bower_components/iron-selector/iron-selectable.html","033c526023ee6429bb66dab8407497f5"],["bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["bower_components/iron-selector/iron-selector.html","fd5fa9e6f3bf894b065f43d2711bba45"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","3fb306c07a03ea899a4a29b582e75567"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","09e7946122f1403d25ba8489acf210f9"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","ea41e4250bc3ea30e659071b61e0df33"],["bower_components/paper-behaviors/paper-ripple-behavior.html","ed51cc379e55570173529cd58ca00b59"],["bower_components/paper-checkbox/paper-checkbox.html","b6ff5afdb4a0b9c4fa28cc01039f82b4"],["bower_components/paper-icon-button/paper-icon-button.html","a0d061662b61cc3a515f7a53c3573704"],["bower_components/paper-ripple/paper-ripple.html","12d5f76561faf18b359fd909833f5206"],["bower_components/paper-styles/color.html","2b6b926e5bd4005bdbdcd15a34a50b95"],["bower_components/paper-styles/default-theme.html","9480969fcd665e90201b506a4737fa1a"],["bower_components/polymer/lib/elements/array-selector.html","76795ff2fb9aa8a158593896c4ab9932"],["bower_components/polymer/lib/elements/custom-style.html","b53cfc0076f0ecf00dc085f37bfbc115"],["bower_components/polymer/lib/elements/dom-bind.html","06633e6255127c6d39f9be371679c60d"],["bower_components/polymer/lib/elements/dom-if.html","42ffc412d545727f3de48ccd4fca741f"],["bower_components/polymer/lib/elements/dom-module.html","fd86800656c22674753f8b0b337d3e9f"],["bower_components/polymer/lib/elements/dom-repeat.html","e98e3ddcb866a5e9e279be9ce7b0e4ee"],["bower_components/polymer/lib/legacy/class.html","d3a207b2f872ae857b7db5e9d5ebfd81"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","ff864d9a4443bc1cdde84c9cb0beb3e6"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","219f20e24c7657cfd3d0672b1ee4c94e"],["bower_components/polymer/lib/legacy/polymer-fn.html","af1e8d5c6d5932154ded79a94c6ef15b"],["bower_components/polymer/lib/legacy/polymer.dom.html","622cd4cdd0a2aecaa1a7f04dab818268"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","5f6455c42f1f81b88611d9091a80b51f"],["bower_components/polymer/lib/mixins/element-mixin.html","ca34f9502190aee81e4654204ca86ddf"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","ec4cce6813390dba9c9aeeb986d42803"],["bower_components/polymer/lib/mixins/mutable-data.html","b42e9fd5a0d21d0ea6d7e50837967424"],["bower_components/polymer/lib/mixins/property-accessors.html","6318e0c3d6824bffbe1c6368017b74cc"],["bower_components/polymer/lib/mixins/property-effects.html","57e19d3f1fb18bde177a011445077164"],["bower_components/polymer/lib/mixins/template-stamp.html","e9b5e3b58329dc5038857892f9ab7ae2"],["bower_components/polymer/lib/utils/array-splice.html","922f105e9326b3ebf23aca1029d8ad3c"],["bower_components/polymer/lib/utils/async.html","3b3dcc5b21c647d59ab4a491e81299ba"],["bower_components/polymer/lib/utils/boot.html","dc5e951d6528704115a29054bff2af6c"],["bower_components/polymer/lib/utils/case-map.html","61c3f85b8314adf2d309fdf3e97fddba"],["bower_components/polymer/lib/utils/debounce.html","b0b62601369d6a3aa7ec6d7e1cfd5e57"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","7ea457f79bf15ccd439edc0a5fb45509"],["bower_components/polymer/lib/utils/flush.html","2b4324e1cab5c4388ea129e7b17c11c9"],["bower_components/polymer/lib/utils/gestures.html","3dc1af8677716aaa0aba154a8c3a3b1d"],["bower_components/polymer/lib/utils/import-href.html","8728c208c7aca91d2f316d36bc712563"],["bower_components/polymer/lib/utils/mixin.html","fb1660a2c823d8c257022365291e69a2"],["bower_components/polymer/lib/utils/path.html","cdff0976cf841e50c7236a6c1b32a8a0"],["bower_components/polymer/lib/utils/render-status.html","9a929f20dbe0cb11548c404f1d1a6f55"],["bower_components/polymer/lib/utils/resolve-url.html","6baaaa13b817dad19102148d51a894ec"],["bower_components/polymer/lib/utils/style-gather.html","e0c98e6237a3cb3905e4a125545f18dc"],["bower_components/polymer/lib/utils/templatize.html","48b525a256281f1f677e6ab8c866e48f"],["bower_components/polymer/lib/utils/unresolved.html","a1ede4a050418cf897d096dcc8b3bc01"],["bower_components/polymer/polymer-element.html","9619497e9a7e27277c73e31cdb5f2301"],["bower_components/polymer/polymer.html","b20eb4dd015d93b8153cc6c3d79662c4"],["bower_components/shadycss/apply-shim.html","f220299c2be1b5040111843d640b70a5"],["bower_components/shadycss/apply-shim.min.js","fad5622d07f9301799bbc9773e51d324"],["bower_components/shadycss/custom-style-interface.html","0a68ea0f3af7bcb1ca6617e512f720cb"],["bower_components/shadycss/custom-style-interface.min.js","8aacb093f4dc252152854ab9aaabb39c"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","68bc22bcb5543e6caabd1d66dc9e1ca9"],["bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["bower_components/webcomponentsjs/webcomponents-lite.js","c89f66cb63a098895f4b1b42eb371673"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","c5f6fe397db634cde89f66c2f1bc2f62"],["index.html","e24cb64e22c005622aac18a8c8e37564"],["manifest.json","62d0b92ea7d20e267106030424282712"],["src/my-app.html","b5d53c31b6f1a8a211ac54e6ae7edb2d"],["src/my-icons.html","9172796e408905a534f6db392f073232"],["src/my-new-view.html","ba98036f76d8ccff99b3e7e5a9e3d0b5"],["src/my-view1.html","932aa583b0b63579fe7a3cb97130eba6"],["src/my-view2.html","48dbb869ab1d0d29d5ba303f2e3f5011"],["src/my-view3.html","1e715e0e2df55d240458aff2969f30c6"],["src/my-view404.html","2d625d6b569e20cebb04c93e38ead881"],["src/shared-styles.html","83bfe9c5420e8faa06a4d97d34a1647c"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







