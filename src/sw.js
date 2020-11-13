import { registerRoute, NavigationRoute } from 'workbox-routing'
import { precacheAndRoute, createHandlerBoundToURL, precache } from 'workbox-precaching'
import * as strategies from 'workbox-strategies'
import * as workbox from 'workbox-core'

const manifest = self.__WB_MANIFEST
const NAVIGATION_ROUTE = '/frontend/index.html'

self.addEventListener('activate', () => {
  console.log(manifest)
})

precache([{ url: NAVIGATION_ROUTE }])

registerRoute(
  new RegExp(/\/frontend\/index.html/),
  new strategies.StaleWhileRevalidate())

console.log(self.__WB_MANIFEST)

precacheAndRoute(manifest)

registerRoute(new NavigationRoute(
  createHandlerBoundToURL(NAVIGATION_ROUTE, {
    allowlist: [new RegExp(/frontend/)],
    denylist: [new RegExp(/frontend\/static/)]
  })
))

self.addEventListener("message", (message) => {
  if (message.data.type === "skipWaiting") {
    self.skipWaiting()
  }
})
