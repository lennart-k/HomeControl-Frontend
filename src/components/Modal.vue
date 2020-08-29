<template lang="pug">
transition(name="fade")
  .modal-wrapper(@click="onWrapperClick" v-if="show" ref="modalWrapper")
    .modal(ref="modal" @pointerdown="onPointerdown" @pointermove="onPointermove" @pointercancel="onPointerup" @pointerup="onPointerup")
      slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-typed'

@Component()
export default class extends Vue {
  @Prop() show: boolean = false

  pointerPosition: number = 0
  pointerPositions: { [key: string]: number | undefined } = {}

  close() {
    console.log("CLOSING")
    this.$emit('close')
  }
  onWrapperClick(e: MouseEvent) {
    if (e.target != this.$refs.modalWrapper) return
    this.close()
  }
  onPointerdown(e: PointerEvent) {
    this.pointerPositions[e.pointerId] = e.y
    let modal = this.$refs.modal as HTMLElement
    modal.setPointerCapture(e.pointerId)
  }
  onPointermove(e: PointerEvent) {
    if (this.pointerPositions[e.pointerId] === undefined) return
    this.pointerPosition -= this.pointerPositions[e.pointerId]! - e.y
    this.pointerPositions[e.pointerId] = e.y
  }
  async onPointerup(e: PointerEvent) {
    let modal = this.$refs.modal as HTMLElement
    modal.releasePointerCapture(e.pointerId)
    delete this.pointerPositions[e.pointerId]
    if (!Object.keys(this.pointerPositions).length) {
      modal.style.transform = null
      modal.style.transition = null

      let modalPosition = 0.9 * Math.max(this.pointerPosition, 0) + 0.2 * this.pointerPosition
      if (modalPosition > document.documentElement.clientHeight / 6) {
        this.close()
      }
      this.pointerPosition = 0
    }
  }
  @Watch('show')
  watchShow() {
    if (!this.show) {
      this.pointerPositions = {}
      this.pointerPosition = 0
      let modal = this.$refs.modal as HTMLElement
      modal.style.transform = null
      modal.style.transition = null
    }
  }

  @Watch('pointerPosition')
  ye() {
    if (!this.pointerPosition) return
    let modal = this.$refs.modal as HTMLElement
    let modalPosition = 0.9 * Math.max(this.pointerPosition, 0) + 0.2 * this.pointerPosition
    modal.style.transition = 'none'
    modal.style.transform = `translateY(${modalPosition}px)`
  }

}

</script>
<style lang="sass" scoped>
@import '/styles/vars'

.modal-wrapper
  position: fixed
  width: 100%
  height: 100%
  z-index: 100
  display: flex
  justify-content: center
  align-items: center
  top: 0
  left: 0
  background: #00000030
  pointer-events: all

  .modal
    min-width: 500px
    min-height: 300px
    width: fit-content
    height: fit-content
    background: white
    transition: transform .2s cubic-bezier(0,.73,.31,1)
    touch-action: none
    @include rounded-corners

.fade-enter-active, .fade-leave-active
  transition: background .3s ease-out

.fade-enter-active .modal
  transition: transform .3s cubic-bezier(0,.73,.31,1)

.fade-leave-active .modal
  transition: transform .3s ease-in

.fade-enter, .fade-leave-to
  background: #00000000

  .modal
    transform: translateY(100vh)
</style>
