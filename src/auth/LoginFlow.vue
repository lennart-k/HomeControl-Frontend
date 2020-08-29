<template lang="pug">
.login-flow
  h2 Login
  form(
    v-if="currentStep && currentStep.stepType == 'form'",
    ref="form",
    @submit.prevent="submit",
    @keypress="onKeypress"
  )
    .input(v-for="fieldData in currentStep.data")
      component(
        :is="formInputs[fieldData.type || 'String']",
        v-model="inputData[fieldData.field]",
        :label="fieldData.field"
      )
    mwc-button(type="submit", raised, @click="submit", label="Log In")
  p(v-else) Loading
</template>
<script lang="ts">
import Vue from "vue"

import { Component, Prop, Watch } from "vue-typed"
import { AuthContext, LoginFlow, FlowStep } from "homecontrol-js"
import formInputs from "/auth/input/"

@Component()
export default class extends Vue {
  @Prop() provider!: string
  loginFlow?: LoginFlow = undefined
  formInputs: any = formInputs
  inputData: object = {}
  $refs!: {
    form: HTMLFormElement
  }

  focusForm() {
    if (this.$refs.form) this.$refs.form.querySelector("mwc-textfield")!.focus()
  }

  onKeypress(e: KeyboardEvent) {
    if (e.key == 'Enter') this.submit()
  }

  async mounted() {
    this.loginFlow = await this.$authContext.createLoginFlow(this.provider)
    await this.$nextTick()
    this.focusForm()
  }
  get currentStep(): FlowStep | undefined {
    return this.loginFlow?.currentStep
  }
  async submit() {
    this.loginFlow!.submitData(this.inputData)
    this.inputData = {}
  }
  @Watch('provider')
  async onProviderChange() {
    this.loginFlow = await this.$authContext.createLoginFlow(this.provider)
  }
  @Watch('currentStep.authCode')
  async onAuthCode() {
    if (this.currentStep?.authCode) {
      this.$emit("success", this.currentStep.authCode)
    }
  }
  @Watch('currentStep')
  async onStep() {
    if (this.currentStep?.stepType == 'form') this.$nextTick(this.focusForm)
  }
}
</script>
<style lang="sass" scoped>
@import "/styles/vars"

.login-flow
  width: 400px
  height: 300px
  border-radius: 8px
  padding: 20px
  box-sizing: border-box
  display: flex
  flex-direction: column
  margin: auto
  @include light-shadow
  @include secondary-background

  form

    .input
      display: flex
      flex-direction: column
      margin: 8px 0
</style>
