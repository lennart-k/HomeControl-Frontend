<template lang="pug">
transition(name="fade", :duration="900")
  .loading-spinner
    .loader-wrapper
      .circles
        .circle(
          v-for="i in Array(4).keys()",
          :style="{ animationDelay: `${i / 8}s` }"
        )
      p.message(v-text="message", v-if="message")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'

@Component()
export default class extends Vue {
  @Prop() message?: string
}
</script>
<style lang="sass">
@import "/styles/vars"

@keyframes pulse
  0%
    transform: scale(0)
  50%
    transform: scale(1)
  100%
    transform: scale(0)

.loading-spinner
  width: 100%
  height: 100%
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  z-index: 9999
  @include app-background

  &.fade-leave-to
    background: none

  &.fade-leave-active .loader-wrapper
    position: relative

  &.fade-leave-to .loader-wrapper
    transform: translateY(-100vh)

  .message
    font-size: 1.4em
    font-weight: 400
    @include primary-accent-color

  .loader-wrapper
    display: flex
    flex-wrap: wrap
    flex-direction: column
    align-items: center

    .circles
      display: flex

      .circle
        margin: 10px
        opacity: 0.8
        width: 20px
        height: 20px
        position: relative
        border-radius: 40px
        animation-iteration-count: infinite
        animation-duration: 1s
        animation-name: pulse
        @include primary-accent-color-background
</style>
