<template lang="pug">
.drawer(:class="{ expanded, floating }")
  .top
    DrawerButton(
      icon="home",
      :collapsed="collapsed",
      :to="{ name: 'dashboard', params: { id: 'main' } }",
      href="/frontend"
    ) Home

    DrawerButton(
      v-for="(panel, index) in $homeControl.panels",
      :key="index",
      :icon="panel.icon",
      :to="`/panel/${panel.route}`",
      :href="`/frontend/panel/${panel.route}`",
      :collapsed="collapsed"
    ) {{ panel.name }}

    DrawerButton(
      icon="extension",
      :collapsed="collapsed",
      to="/modules",
      href="/frontend/modules"
    ) Modules
    DrawerButton(
      icon="device_hub",
      :collapsed="collapsed",
      to="/items",
      href="/frontend/items"
    ) Items
  .bottom
    DrawerButton(
      icon="people",
      :collapsed="collapsed",
      to="/users",
      href="/frontend/users"
    ) Users
    DrawerButton(
      icon="settings",
      :collapsed="collapsed",
      to="/config",
      href="/frontend/config"
    ) Settings
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-typed"
import { sync, get, call } from "vuex-pathify"
import DrawerButton from "./DrawerButton.vue"

@Component({
  components: { DrawerButton },
  computed: { expanded: sync('drawerExpanded') }
})
export default class extends Vue {
  expanded!: boolean

  get collapsed() {
    return !this.expanded
  }

  @Prop()
  floating: boolean = false

  collapse() {
    if (this.floating) {
      this.expanded = false
    }
  }
}
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.drawer
  height: 100%
  padding: 60px 8px 0 8px
  position: fixed
  z-index: 3
  min-width: inherit
  width: inherit
  background: var(--secondary-background)
  display: flex
  flex-direction: column

  .bottom
    margin-top: auto

  &.floating.expanded
    box-shadow: 2px 2px 12px -2px #00000060

  &.expanded
    transform: translateX(0)
</style>
