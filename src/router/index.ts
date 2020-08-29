import VueRouter, { Route } from 'vue-router'
import Vue from 'vue'

import LoginView from '/auth/LoginView.vue'
import ItemListView from '/views/ItemListView.vue'
import ItemView from '/views/ItemView.vue'
import ModuleListView from '/views/ModuleListView.vue'
import RedirectView from '/auth/RedirectView.vue'
import ConfigView from '/views/ConfigView.vue'
import PanelView from '/views/PanelView.vue'
import LicensesView from '/views/LicensesView.vue'
import UsersView from '/views/UsersView.vue'
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
        { path: '/dashboard/:id', name: 'dashboard', component: DashboardView },
        { path: '/authorize', name: 'authorize', redirect: { name: 'loginView' } },
        { path: '/modules', name: 'modules', component: ModuleListView },
        { path: '/items', name: 'items', component: ItemListView },
        { path: '/item/:id', name: 'item', component: ItemView, props: (route) => ({ identifier: route.params.id }) },
        { path: '/users', name: 'users', component: UsersView },
        { path: '/config', component: ConfigView },
        { path: '/panel/:id', name: 'panel', component: PanelView },
        { path: '/licenses', name: 'licenses', component: LicensesView },
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
    let accessToken = await authContext.getAccessToken()
    if (accessToken) {
      await homeControl.connect(accessToken)
      return next()
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
