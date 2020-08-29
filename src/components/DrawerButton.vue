<template lang="pug">
component.drawer-button(
  :is="type",
  :class="{ collapsed, expanded: !collapsed }",
  :to="to",
  :href="href",
  :target="this.newTab ? '_blank' : undefined",
  ripple
)
  MaterialIcon.icon(v-text="icon")
  span
    slot
  MaterialIcon.new-tab-indicator(v-if="newTab") launch
</template>
<script lang="ts">
import Vue from 'vue'
import MaterialIcon from '/components/MaterialIcon.vue'
import { Component, Prop } from 'vue-typed'

@Component({ components: { MaterialIcon } })
export default class extends Vue {
  @Prop()
  icon: string = 'home'
  @Prop()
  collapsed: boolean = false
  @Prop()
  href: string = '#'
  @Prop()
  to?: { [key: string]: any }

  get type(): string {
    return this.to ? 'router-link' : 'a'
  }
  get newTab(): boolean {
    return this.type == 'a' && this.href != '#'
  }
}
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.drawer-button
  width: 100%
  padding: 8px
  height: 40px
  display: flex
  align-items: center
  margin: 8px 0
  border-radius: 6px
  font-weight: 600
  font-size: 0.9em
  user-select: none
  text-decoration: none
  cursor: pointer
  @include font-color

  &.collapsed
    justify-content: center

  &.expanded
    padding-left: 20px

  &:hover
    @include highlight-background

  &.collapsed span
    display: none

  .icon
    text-align: center
    width: 24px
    margin-right: 6px

  &.collapsed .icon
    margin-right: 0

  .new-tab-indicator
    margin-left: auto
    font-size: 1.3em
    opacity: 0
    transition: opacity .2s ease-out

  &.collapsed .new-tab-indicator
    display: none

  &.expanded:hover .new-tab-indicator
    opacity: 0.8

  &.router-link-exact-active
    @include color-on-primacy-accent-color
    @include primary-accent-color-background
</style>
