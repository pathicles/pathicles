// /**
//  * Welcome to your Workbox-powered service worker!
//  *
//  * You'oll need to register this file in your web app and you should
//  * disable HTTP caching for this file too.
//  * See https://goo.gl/nhQhGp
//  *
//  * The rest of the code is auto-generated. Please don't update this file
//  * directly; instead, make changes to your Workbox build configuration
//  * and re-run your build process.
//  * See https://goo.gl/2aRDsh
//  */
//
// importScripts('workbox-v4.3.1/workbox-sw.js')
// workbox.setConfig({ modulePathPrefix: 'workbox-v4.3.1' })
//
// workbox.core.skipWaiting()
//
// /**
//  * The workboxSW.precacheAndRoute() method efficiently caches and responds to
//  * requests for URLs in the manifest.
//  * See https://goo.gl/S9QRab
//  */
// self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
//
// workbox.precaching.cleanupOutdatedCaches()
// addEventListener('message', (event) => {
//   const replyPort = event.ports[0]
//   const message = event.data
//   if (replyPort && message && message.type === 'skip-waiting') {
//     event.waitUntil(
//       self.skipWaiting().then(
//         () => replyPort.postMessage({ error: null }),
//         (error) => replyPort.postMessage({ error })
//       )
//     )
//   }
// })
