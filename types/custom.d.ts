import Vue from 'vue'
import { HomeControlVue, AuthContextVue } from '/api/homeControl'

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    homeControl?: HomeControlVue
    authContext?: AuthContextVue
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $homeControl: HomeControlVue
    $authContext: AuthContextVue
  }
}

declare global {
  interface Window {
    app: Vue,
    homeControl: HomeControlVue
  }
}

declare module "*.txt" {
  const value: string
  export default value
}

declare module "*.svg" {
  const value: string
  export default value
}

