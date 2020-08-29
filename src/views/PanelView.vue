<template lang="pug">
MainLayout.main-layout
  iframe(:src="panel.iframe", v-if="panel")
  h1(v-else) Panel not found
</template>
<script lang="ts">
import Vue from 'vue'
import MainLayout from '/layouts/MainLayout.vue'
import { Component } from 'vue-typed'
// @ts-ignore
import { Panel } from 'homecontrol-js'

@Component({ components: { MainLayout } })
export default class extends Vue {
  panels?: { [key: string]: Panel } = undefined

  mounted() {
    this.panels = this.$homeControl.panels
  }
  get panel() {
    for (let panel of this.$homeControl.panels) {
      if (panel.route == this.$route.params.id) {
        return panel
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.main-layout
  iframe
    width: 100%
    height: 100%
    border: none
</style>
