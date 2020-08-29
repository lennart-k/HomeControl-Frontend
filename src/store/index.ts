import Vue from 'vue'
import Vuex, { GetterTree, ActionTree } from 'vuex'
import VuexPersist from 'vuex-persist'
import pathify from 'vuex-pathify'


Vue.use(Vuex)

class State {
  theme: string = 'light'
  themes: object = {
    light: 'Light',
    dark: 'Dark'
  }
  drawerExpanded: boolean = false
}

let mutations = {
  SET_THEME(state: State, theme: string) {
    state.theme = theme
  },
  SET_DRAWER_EXPANDED(state: State, expanded: boolean) {
    state.drawerExpanded = expanded
  },
  TOGGLE_DRAWER(state: State) {
    state.drawerExpanded = !state.drawerExpanded
  }
}
let getters = <GetterTree<State, any>>{
  theme: (state: State) => state.theme,
  drawerExpanded: (state: State) => state.drawerExpanded
}
let actions = <ActionTree<State, any>>{
  setTheme(store, theme: string) {
    store.commit("SET_THEME", theme)
  },
  toggleDrawer(store) {
    store.commit("TOGGLE_DRAWER")
  },
  setDrawerExpanded(store, expanded: boolean) {
    store.commit("SET_DRAWER_EXPANDED", expanded)
  }
}

let vuexLocalStorage = new VuexPersist<State>({
  key: "vuex",
  storage: window.localStorage,
  reducer: (state: State) => ({
    theme: state.theme,
    drawerExpanded: state.drawerExpanded
  })
})

export default new Vuex.Store({
  state: new State(),
  mutations,
  getters,
  actions,
  plugins: [pathify.plugin, vuexLocalStorage.plugin]
})
