import { registerRoute, NavigationRoute, RegExpRoute } from 'workbox-routing'
import { precacheAndRoute, createHandlerBoundToURL, precache } from 'workbox-precaching'
import * as strategies from 'workbox-strategies'
import * as workbox from 'workbox-core'

const manifest = self.__WB_MANIFEST
const INDEX_ROUTE = '/frontend/index.html'

self.addEventListener('activate', () => {
  console.log(manifest)
})

precache([{ url: INDEX_ROUTE }])

registerRoute(
  new RegExp(INDEX_ROUTE),
  new strategies.StaleWhileRevalidate()
)

precacheAndRoute(manifest)

console.log(manifest)

const indexHandler = createHandlerBoundToURL(INDEX_ROUTE)
const indexRoute = new RegExpRoute(/\/frontend(?!\/static).*/, indexHandler)
registerRoute(indexRoute)


self.addEventListener("message", (message) => {
  if (message.data.type === "skipWaiting") {
    self.skipWaiting()
  }
})
