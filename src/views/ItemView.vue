<template lang="pug">
.item-view
  h1(v-text="item.name")
  h2(v-text="item.identifier")
  .card-container
    BaseWidget.states
      h2 States
      ul
        li(v-for="[state, value] in states" v-key="state")
          span(v-text="state")
          span(v-text="value")
    BaseWidget.config
      h2 Configuration

    BaseWidget.actions
      h2 Actions
      mwc-button(v-text="action" v-for="action of item.actions" v-key="action" @click="executeAction(action)")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Mixin } from 'vue-typed'
import itemComponent from '/api/itemComponent'
import BaseWidget from '/dashboard/widgets/BaseWidget.vue'

@Component({ components: { BaseWidget } })
export default class extends Mixin(itemComponent) {

}
</script>
<style lang="sass" scoped>
.card-container
  display: flex
</style>
