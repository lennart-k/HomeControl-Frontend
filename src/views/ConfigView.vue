<template lang="pug">
.config-view
  h1 Configuration
  section
    h2 Core
    mwc-button(@click="restartCore", outlined) Restart
    mwc-button(@click="shutdownCore", outlined) Shutdown
  section
    h2 Theme
      mwc-select(
        v-model="theme",
        :value="theme",
        @selected="theme = $event.target.value"
      )
        mwc-list-item(
          :value="themeId",
          v-text="themeName",
          v-for="(themeName, themeId) in themes",
          :key="themeId"
        )

  section
    h2 Licenses

    router-link(to="/licenses", href="/frontend/licenses") Licenses
</template>
<script lang="ts">
import Vue from "vue"
import { Component } from "vue-typed"
import { sync, get } from 'vuex-pathify'

@Component({
  computed: {
    theme: sync('theme'),
    themes: get('themes')
  },
})
export default class extends Vue {
  theme!: string

  restartCore() {
    this.$homeControl.restartCore()
  }
  shutdownCore() {
    this.$homeControl.shutdownCore()
  }
}
</script>
