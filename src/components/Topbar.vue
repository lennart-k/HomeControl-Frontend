<template lang="pug">
.topbar
  .justify-left
    button(@click="toggleDrawer" ripple).hamburger-button
      MaterialIcon menu
  .justify-right
</template>
<script lang="ts">
import Vue from "vue"
import { Component } from 'vue-typed'
import MaterialIcon from '/components/MaterialIcon.vue'
import { call } from "vuex-pathify"

@Component({
  methods: {
    toggleDrawer: call('toggleDrawer')
  },
  components: { MaterialIcon }
})
export default class extends Vue { }
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
  display: flex
  align-items: center
  background: var(--topbar-background)
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, .2)

  span
    font-size: 1.2em
    font-weight: 450

  .justify-left, .justify-right
    display: flex
    align-items: center
    height: 100%

  .justify-right
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
