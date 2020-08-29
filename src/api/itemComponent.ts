import { Prop, Options, Virtual } from "vue-typed"

@Options()
export default class ItemComponent extends Virtual<Vue>() {
  @Prop() identifier!: string
  updateHack: number = 1
  statusUpdateHack: number = 1

  get item() {
    return this.$homeControl.items.get(this.identifier)!
  }
  async mounted() {
    this.item?.addEventListener("state_change", () => this.updateHack++)
    this.item?.addEventListener("status_change", () => this.statusUpdateHack++)
  }
  get states(): Map<string, any> {
    return (this.updateHack && this.item?.states || new Map) as Map<string, any>
  }
  get status(): string {
    return (this.statusUpdateHack && this.item?.status) as string
  }
  get online(): boolean {
    return this.status == "online"
  }
  async executeAction(name: string, data?: { [key: string]: any }) {
    return await this.item.executeAction(name, data)
  }
}

export function syncStates(...states: string[]) {
  return Object.assign({}, ...states.map(state => ({
    [state]: {
      get() {
        return (this as unknown as ItemComponent).states?.get(state)
      },
      set(value: any) {
        (this as unknown as ItemComponent).item.setState(state, value)
      }
    }
  })))
}

export function mapActions(...actions: string[]) {
  return Object.assign({}, ...actions.map(action => ({
    [action]: async function (args?: { [key: string]: any }) {
      console.log(action, args)
      return await (this as unknown as ItemComponent).item.executeAction(action, args)
    }
  })))
}
