<template lang="pug">
.bottombar(:class="{ visible: hasContent }")
  PortalTarget.middle(name="tab-nav", @change="onPortalChange", ref="portal")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-typed'

@Component()
export default class extends Vue {
  hasContent: boolean = false

  mounted() {
    // @ts-ignore
    this.hasContent = Boolean(this.$refs.portal.passengers.length)
  }

  onPortalChange(hasContent: boolean) {
    this.hasContent = hasContent
  }
}

</script>
<style lang="sass" scoped>
.bottombar
  width: 100%
  height: 60px
  display: none
  @include secondary-background

  &.visible
    display: block
</style>
