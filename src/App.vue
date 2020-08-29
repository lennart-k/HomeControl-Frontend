<template lang="pug">
.app(:theme="theme")
  router-view
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-typed'
import { sync } from 'vuex-pathify'
import '/styles/theme'

@Component({
  computed: {
    theme: sync('theme')
  }
})
export default class App extends Vue {
  theme!: string

  mounted() {
    this.updateDocumentTheme()
    window.matchMedia("(prefers-color-scheme: dark)").addListener((event) => {
      if (event.matches) { this.theme = 'dark' }
      else { this.theme = 'light' }
    })
  }
  @Watch('theme')
  updateDocumentTheme() {
    document.documentElement.setAttribute("theme", this.theme)
    this.updateThemeColor()
  }
  updateThemeColor() {
    let themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-background").trim()
    document.querySelector('meta[name=theme-color]')!
      .setAttribute('content', themeColor)
  }

}
</script>
