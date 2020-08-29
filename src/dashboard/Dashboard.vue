<template>
  <div class="dashboard">
    <component
      :is="sectionTypes[section.type]"
      :configuration="section.configuration"
      v-for="(section, index) in configuration.sections"
      :key="index"
    ></component>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'
import DashboardSection from './Section.vue'
import sectionTypes from './sections/index'


export interface Widget {
  type: string
  configuration: { [key: string]: any }
}

export interface Column {
  title?: string
  widgets: Array<Widget>
}

@Component()
export default class extends Vue {
  @Prop() configuration = undefined

  sectionTypes = sectionTypes
}
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.dashboard
  width: 100%
  min-height: 100%
  contain: content
</style>
