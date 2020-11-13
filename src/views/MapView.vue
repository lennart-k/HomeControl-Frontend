<template lang="pug">
.map-view
  LMap(ref="map", @ready="onMapReady")
    template(inline-template v-for="[_, item] of $homeControl.items", v-if="item.implements.includes('location.Location') && item.status === 'online' && item.states.get('latitude') && item.states.get('longitude')")
      LMarker(:lat-lng="[item.states.get('latitude'), item.states.get('longitude')]",
              @click="$event.target._openPopup()")
        LPopup(:content="item.name")
      LCircle(:lat-lng="[item.states.get('latitude'), item.states.get('longitude')]",
              :radius="item.states.get('radius')"
              :color="color", :fillColor="color")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-typed'
import { LMap, LTileLayer, LMarker, LCircle, LPopup } from 'vue2-leaflet'
import { get } from 'vuex-pathify'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { Icon } from 'leaflet'

type D = Icon.Default & {
  _getIconUrl?: string
}

delete (Icon.Default.prototype as D)._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
})

@Component({
  components: { LMap, LMarker, LCircle, LPopup },
  computed: { theme: get('theme') }
})
export default class extends Vue {
  map?: leaflet.Map = undefined
  tileLayer?: leaflet.TileLayer = undefined
  color?: string = undefined
  theme?: string

  onMapReady() {
    this.map = this.$refs.map.mapObject as leaflet.Map
    this.updateTileLayer()
  }

  @Watch('theme')
  onThemeUpdate() {
    this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent-color')
    this.updateTileLayer()
  }

  updateTileLayer() {
    if (this.tileLayer) this.tileLayer.remove()
    this.tileLayer = leaflet.tileLayer(
      `https://{s}.basemaps.cartocdn.com/${this.theme == 'dark' ? "dark_all" : "light_all"
      }/{z}/{x}/{y}${leaflet.Browser.retina ? "@2x.png" : ".png"}`,
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        minZoom: 3,
        maxZoom: 20,
      }
    )
    if (this.map) this.tileLayer.addTo(this.map)
  }
}
</script>
<style lang="sass" scoped>
.map-view
  height: 100%

  .leaflet-container
    contain: content
    @include app-background

    .leaflet-bar a
      @include secondary-background
      @include font-color
</style>
