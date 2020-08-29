<template lang="pug">
BaseWidget.state-list-widget(v-if="item", :class="{ disabled: !online }")
  .header
    h3(v-text="item.name")
  ul.state-list
    li.state-item(v-for="[state, value] in states")
      span.item-name(v-text="state")
      span.item-name(v-text="value")
BaseWidget.state-list-widget(v-else)
  h3 Yikes
  p Item '{{ identifier }}' does not exist`
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Mixin } from 'vue-typed'
import BaseWidget from './BaseWidget.vue'
import MaterialIcon from '/components/MaterialIcon.vue'
import { Item } from 'homecontrol-js'
import ItemComponent from '/api/itemComponent'

@Component({ components: { BaseWidget, MaterialIcon } })
export default class StateListWidget extends Mixin(ItemComponent) { }
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.state-list-widget.disabled
  @include secondary-font-color

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
</style>
