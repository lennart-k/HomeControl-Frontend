import _Vue from 'vue'
import { HomeControl, AuthContext } from 'homecontrol-js'

export class UnauthorizedError extends Error { }

const apiUrl = `${document.location.origin}/api`

export class HomeControlVue extends HomeControl {
  loading: boolean = false

  constructor(apiUrl: string) {
    super(apiUrl)
  }

  async apiRequest(
    endpoint: string,
    { method = 'GET', frontend = false }: { method?: string, frontend?: boolean } = {}) {
    /**
     * Makes an authorized API request
     */
    let response = await fetch((frontend ? '/frontend' : '/api') + endpoint, {
      method: method,
      headers: {
        'Authorization': `Bearer ${this.accessToken.token}`
      }
    })
    if (response.status == 401) {
      throw new UnauthorizedError(response.statusText)
    }
    return await response.json()
  }

  install(Vue: typeof _Vue, options: object = {}): void {
    Vue.prototype.$homeControl = Vue.observable(this)
  }
}

export class AuthContextVue extends AuthContext {
  install(Vue: typeof _Vue, options: object = {}): void {
    Vue.prototype.$authContext = Vue.observable(this)
  }
}

const homeControl = new HomeControlVue(apiUrl)
_Vue.use(homeControl)
export { homeControl }

const authContext = new AuthContextVue(apiUrl)
_Vue.use(authContext)
export { authContext }


declare global {
  interface Vue {
    $homeControl: HomeControlVue,
    $authContext: AuthContextVue
  }
}
