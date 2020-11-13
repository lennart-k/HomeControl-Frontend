<template lang="pug">
.login-view
  img.logo(:src="logo", width="400px", height="400px")
  h1.title HomeControl
  div(v-if="!selectedProvider")
    router-link(
      v-for="(provider, index) in loginFlowProviders",
      :key="index",
      v-text="provider",
      :to="{ name: 'login', params: { provider: provider }, query: $route.query }"
    )
  div(v-else)
    LoginFlow(:provider="selectedProvider", @success="onLogin")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-typed'
import LoginFlow from './LoginFlow.vue'
// @ts-ignore
import Logo from '/assets/branding/logo.svg'

@Component({ components: { LoginFlow } })
export default class extends Vue {
  loginFlowProviders: Array<string> = []
  currentStep?: string

  async fetchLoginFlowProviders() {
    this.loginFlowProviders = await this.$authContext.listFlowTypes()
  }
  async onLogin(authCode: string) {
    let url = new URL(this.redirectUri, document.location.origin)
    url.searchParams.set('code', authCode)
    window.location.replace(url.toString())
  }
  async beforeMount() {
    this.fetchLoginFlowProviders()
  }
  get selectedProvider() {
    return this.$route.params.provider
  }
  get redirectUri(): string {
    return (this.$route.query.redirect_uri as string) || '/frontend/redirect_callback'
  }
  get logo(): string {
    return Logo
  }
}

</script>
<style lang="sass" scoped>
.login-view
  display: flex
  align-items: center
  flex-direction: column

  .logo
    display: block
    margin: auto
    width: 200px
    height: 200px

  h1.title
    font-weight: 400
    margin-top: 0
</style>
