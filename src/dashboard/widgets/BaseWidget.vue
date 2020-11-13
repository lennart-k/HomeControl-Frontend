<template lang="pug">
.widget
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-typed'

@Component()
export default class extends Vue { }
</script>
<style lang="sass" scoped>
@import "/styles/vars"

.widget
  display: flex
  box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, .05)
  margin: 8px
  min-height: 100px
  border-radius: 6px
  padding: 16px
  flex-direction: column
  flex: 1 1
  box-sizing: border-box
  contain: content
  @include secondary-background
</style>
