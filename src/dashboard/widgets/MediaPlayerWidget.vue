<template lang="pug">
BaseWidget.media-player-widget(v-if="online")
  .header
    MaterialIcon.cast cast
    span(v-text="item.name")
  .info-container
    span.title(v-text="title", :title="title")
    span.artist(v-text="artist", :title="artist")
  .button-group
    mwc-icon-button(@click="previous()", icon="skip_previous")
    mwc-icon-button(
      @click="playing = true",
      icon="play_arrow",
      v-if="!playing"
    )
    mwc-icon-button(@click="pause()", icon="pause", v-if="playing")
    mwc-icon-button(@click="next()", icon="skip_next")
  .seekbar
    mwc-linear-progress(type="range", :progress="progress")
  img.cover.blur(:src="cover", :title="cover")
  img.cover(:src="cover", :title="album")
BaseWidget.media-player-widget(v-else)
  span Item offline
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Mixin } from "vue-typed"
import BaseWidget from "./BaseWidget.vue"
import MaterialIcon from "/components/MaterialIcon.vue"
import { Item } from "homecontrol-js"
import ItemComponent, { syncStates, mapActions } from '/api/itemComponent'



@Component({
  components: { BaseWidget, MaterialIcon },
  computed: {
    ...syncStates('playing', 'volume', 'artist', 'album', 'title', 'cover', 'duration', 'position')
  },
  methods: {
    ...mapActions('play', 'pause', 'next', 'previous')
  }
})
export default class MediaPlayerWidget extends Mixin(ItemComponent) {
  position!: number
  duration!: number

  get progress(): number {
    return this.position / this.duration
  }
}
</script>
<style lang="sass" scoped>
.media-player-widget
  display: grid
  grid-template-columns: auto 120px
  grid-template-rows: 20px 10px 50px 40px 6px auto
  grid-template-areas: "header cover" ". cover" "info-container cover" "button-group cover" ". cover" "seekbar seekbar"

  .header
    grid-area: header
    font-size: 0.7em
    font-weight: 600
    display: flex
    align-items: center

    .cast
      font-size: 1.2em
      margin-right: 6px

  .info-container
    grid-area: info-container
    display: flex
    flex-direction: column
    overflow: hidden
    font-size: 0.95em

    span
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    .title
      font-weight: 600
      margin: 2px
    .artist
      font-size: 0.95em
      font-weight: 400
      margin: 2px

    .album
      margin: 2px

  .button-group
    grid-area: button-group
    display: flex

    .volume
      margin: 0 4px 0 auto

  .seekbar
    grid-area: seekbar
    padding-top: 6px

    input
      width: 100%

  img.cover
    grid-area: cover
    width: 100%
    user-select: none
    @include rounded-corners

    &.blur
      position: relative
      z-index: -1
      opacity: 0.6
      filter: blur(16px) saturate(5)
</style>
