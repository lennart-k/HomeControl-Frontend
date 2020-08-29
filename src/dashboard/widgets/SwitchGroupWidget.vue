<template lang="pug">
BaseWidget.state-list-widget
  .header
    h3(v-text="title")
  ul.state-list
    ItemSwitchRow(
      v-for="(item, index) in switches",
      v-bind="item",
      :key="index"
    )
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Mixin } from 'vue-typed'
import BaseWidget from './BaseWidget.vue'
import ItemSwitchRow from './ItemSwitchRow.vue'
import MaterialIcon from '/components/MaterialIcon.vue'
import { Item } from 'homecontrol-js'
import ItemComponent from '/api/itemComponent'

@Component({ components: { BaseWidget, MaterialIcon, ItemSwitchRow } })
export default class StateListWidget extends Vue {
  @Prop() switches?: Array<any> = undefined
  @Prop() title?: string = undefined
}
</script>
<style lang="sass" scoped>
ul.state-list
  list-style: none
  padding-left: 20px
  margin: 0

  li.state-item
    display: flex
    align-items: center
    height: 40px
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
    justify-content: space-between

    &:last-of-type
      border-bottom: none

.header
  display: flex
  align-items: center
  height: 1.2em
  margin-bottom: 20px

  .status-icon
    color: #F44336
    font-size: 1.1em
    margin-right: 6px

    &.online
      color: #66BB6A
</style>
