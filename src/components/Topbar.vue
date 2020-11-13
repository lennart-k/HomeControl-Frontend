<template lang="pug">
.topbar(:class="{ drawerExpanded }")
  .left
    button.hamburger-button(@click="toggleDrawer", ripple)
      MaterialIcon menu

  PortalTarget.middle(v-if="renderPortal", name="tab-nav")
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from 'vue-typed'
import MaterialIcon from '/components/MaterialIcon.vue'
import { call, get } from "vuex-pathify"

@Component({
  methods: {
    toggleDrawer: call('toggleDrawer')
  },
  computed: { drawerExpanded: get('drawerExpanded') },
  components: { MaterialIcon }
})
export default class extends Vue {
  @Prop() mobileLayout?: boolean = true
  renderPortal?: boolean = false

  mounted() {
    this.renderPortal = !this.mobileLayout
  }
  @Watch('mobileLayout')
  onLayoutChange() {
    this.renderPortal = !this.mobileLayout
  }
}
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.topbar
  box-sizing: border-box
  top: 0
  width: 100%
  height: 60px
  z-index: 100
  padding: 0 10px
  align-items: center
  background: var(--topbar-background)
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .2)
  display: flex
  gap: 6px

  span
    font-size: 1.2em
    font-weight: 450

  &.drawerExpanded .left
    min-width: 244px

  .left, .middle, .right
    display: flex
    align-items: center
    height: 100%
    min-width: 44px

  .right
    margin-left: auto

  .hamburger-button
    transition: background .3s
    padding: 0
    background: none
    width: 40px
    height: 40px
    border: none
    border-radius: 18px
    @include font-color

    &:hover
      @include selected-background
</style>
