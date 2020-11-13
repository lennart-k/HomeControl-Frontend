import VueRouter, { Route } from 'vue-router'
import Vue from 'vue'

import LoginView from '/auth/LoginView.vue'
import ModuleListView from '/views/ModuleListView.vue'
import RedirectView from '/auth/RedirectView.vue'
import PanelView from '/views/PanelView.vue'
import DashboardView from '/views/DashboardView.vue'
import MainLayout from '/layouts/MainLayout.vue'

import { homeControl, authContext } from '../api/homeControl'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{

    path: '/',
    component: MainLayout,
    children:
      [
        { path: '/', alias: '/home', name: 'home', redirect: { name: 'dashboard', params: { id: 'main' } } },
        { path: '/dashboard/:id?', name: 'dashboard', component: DashboardView },
        { path: '/map', name: 'map', component: () => import('/views/MapView.vue') },
        { path: '/authorize', name: 'authorize', redirect: { name: 'loginView' } },
        { path: '/modules', name: 'modules', component: ModuleListView },
        { path: '/items', name: 'items', component: () => import('/views/ItemListView.vue') },
        { path: '/item/:id', name: 'item', component: () => import('/views/ItemView.vue'), props: (route) => ({ identifier: route.params.id }) },
        { path: '/users', name: 'users', component: () => import('/views/UsersView.vue') },
        { path: '/config', component: () => import('/views/ConfigView.vue') },
        { path: '/panel/:id', name: 'panel', component: PanelView },
        { path: '/licenses', name: 'licenses', component: () => import('/views/LicensesView.vue') },
      ]
  }
  ],
  mode: 'history',
  base: '/frontend'
})


// Auth routes
router.addRoutes([
  { path: '/login', name: 'loginView', component: LoginView, meta: { noAuth: true } },
  { path: '/login/:provider', name: 'login', component: LoginView, meta: { noAuth: true } },
  { path: '/redirect_callback', name: 'redirect', component: RedirectView, meta: { noAuth: true } },
])

router.beforeEach(async (to, from, next) => {
  if (!homeControl.ready && !to.meta.noAuth) {
    try {
      let accessToken = await authContext.getAccessToken()
      if (accessToken) {
        await homeControl.connect(accessToken)
        return next()
      }
    } catch (e) {
      console.warn(e)
    }

    next({
      name: 'loginView', query: {
        redirect_uri: '/frontend/redirect_callback?' + new URLSearchParams({
          next: to.fullPath
        }).toString()
      }
    })
  } else next()
})

export default router
