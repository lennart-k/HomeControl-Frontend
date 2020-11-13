<template>
  <section class="widget-table">
    <div class="widget-column" v-for="(column, index) in columns" :key="index">
      <h2 v-if="column.title" v-text="column.title"></h2>
      <component
        v-for="(widget, index) in column.widgets"
        :is="widgetTypes[widget.type]"
        v-bind="widget"
        :key="index"
      ></component>
    </div>
  </section>
</template>
<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Prop } from 'vue-typed'
import widgetTypes from '/dashboard/widgets'

export interface Widget {
  type: string
  configuration: { [key: string]: any }
}

export interface Column {
  title?: string
  widgets: Array<Widget>
}
export interface Configuration {
  columns: Array<Column>
}

@Component({})
export default class extends Vue {
  @Prop() configuration?: Configuration = undefined

  get columns() {
    return this.configuration!.columns
  }

  widgetTypes: { [key: string]: VueConstructor<Vue> } = widgetTypes
}
</script>
<style lang="sass" scoped>
section.widget-table
  display: flex
  flex-wrap: wrap
  flex-direction: row
  justify-content: center
  margin: 12px 10px
  overflow-x: hidden
  contain: content

  .widget-column
    display: flex
    flex-direction: column
    height: fit-content
    flex: 1 0
    min-width: 360px
    max-width: 420px
    padding: 6px

    div
      height: fit-content

    h2
      margin: 8px

@media (max-width: 500px)
  section.widget-table
    margin: 12px 0

    .widget-column
      padding: 6px 0

      .widget
        margin: 8px 0
</style>
