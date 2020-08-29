<template lang="pug">
.main-view(:class="{ mobileLayout }")
  .main-layout(
    v-if="!($homeControl && $homeControl.loading)",
    :class="{ drawerExpanded, fullscreen, mobileLayout }"
  )
    .topbar-slot(v-if="!fullscreen")
      Topbar(v-slot="topbar")
    .drawer-slot(v-if="!fullscreen")
      Drawer(v-slot="drawer", :floating="mobileLayout")
    .drawer-scrim(
      @click="collapseDrawer",
      v-if="drawerExpanded && mobileLayout"
    )
    .content-slot
      slot
      router-view
  LoadingSpinner(v-else, message="Connecting")
</template>

<script lang="ts">
import Vue from 'vue'
import Topbar from '/components/Topbar.vue'
import Drawer from '/components/Drawer.vue'
import { sync, get } from "vuex-pathify"
import { Component } from 'vue-typed'

import LoadingSpinner from '/components/LoadingSpinner.vue'

@Component({
  components: { Topbar, Drawer, LoadingSpinner },
  computed: {
    drawerExpanded: sync('drawerExpanded')
  }
})
export default class extends Vue {
  mobileLayout: boolean = false
  fullscreen: boolean = false
  drawerExpanded?: boolean

  onWindowResize() {
    this.mobileLayout = document.documentElement.offsetWidth < 600
  }
  collapseDrawer() {
    this.drawerExpanded = false
  }

  mounted() {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
    this.fullscreen = 'fullscreen' in this.$route.query
  }
}
</script>
<style lang="sass" scoped>
.main-layout
  width: 100%
  height: 100vh
  display: flex
  justify-content: start
  box-sizing: border-box

  &.fullscreen .content-slot
    margin-top: 0

  .topbar-slot
    position: fixed
    top: 0
    width: 100%
    z-index: 4

  .drawer-slot
    min-width: 60px
    margin-right: 16px
    transition: min-width .2s ease-out
    height: 100%
    overflow: hidden

  &.mobileLayout .drawer-slot
    position: fixed
    top: 0
    z-index: 3
    left: -360px
    margin-right: 0
    overflow-x: hidden
    min-width: 360px
    transition: left .2s ease-out

  &.mobileLayout.drawerExpanded .drawer-slot
    left: 0

  &.drawerExpanded .drawer-slot
    min-width: 260px

  .content-slot
    margin-top: 60px
    flex: 1 1 auto

  .drawer-scrim
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden
    background: #00000090
    z-index: 2
    contain: strict
</style>
