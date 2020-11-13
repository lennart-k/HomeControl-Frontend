<template lang="pug">
table.data-table(ref="table")
  tr
    th(
      v-for="(column, index) in columns",
      @click="onHeaderClick",
      :column="index",
      :class="{ sorting: sort && sort.column == column }"
    )
      MaterialIcon arrow_upwards
      span(v-text="column.label")
  tr(v-if="order", v-for="index in order")
    slot(name="row", :dataset="data[index]")
      td(v-for="column in columns")
        slot(:name="`col(${column.field})`", :dataset="data[index]") {{ renderCell(column, data[index]) }}

  slot(v-else, name="placeholder")
    tr
      td(:colspan="columns.length") No data to view...
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-typed'
import MaterialIcon from '/components/MaterialIcon.vue'

export interface Getter {
  (dataset: any): any
}

export interface Column {
  label: string
  field?: string
  getter?: Getter
  render?: Getter
}

interface Sort {
  column: Column
  reverse: boolean
}

@Component({ components: { MaterialIcon } })
export default class extends Vue {
  @Prop()
  columns: Array<any> = []

  @Prop()
  data: Array<any> = []

  @Prop()
  template?: Vue

  order?: Array<number> = undefined
  sort?: Sort = undefined

  async mounted() {
    this.order = [...new Array(this.data.length).keys()]
  }
  onHeaderClick(event: MouseEvent) {
    if (!(event.target as HTMLElement)?.hasAttribute('column')) return
    let column = this.columns[Number.parseInt((event.target! as HTMLElement).getAttribute('column')!)]
    let reverse = this.sort && !this.sort.reverse
    console.log(this.sort, reverse)
    this.sortRows(column, reverse)
  }
  sortRows(column: Column, reverse: boolean = false) {
    let reverseMod = reverse ? -1 : 1
    this.order!.sort((a: number, b: number) => {
      let aValue = this.getValueForColumn(column, this.data[a])
      let bValue = this.getValueForColumn(column, this.data[b])
      if (aValue < bValue) return -1 * reverseMod
      if (aValue > bValue) return 1 * reverseMod
      return 0
    })
    this.sort = { column, reverse }
  }
  getValueForColumn(column: Column, dataset: any): any {
    if (column.field) {
      return dataset[column.field]
    }
    if (column.getter) {
      return column.getter(dataset)
    }
  }
  renderCell(column: Column, dataset: any): any {
    let value = this.getValueForColumn(column, dataset)
    if (!column.render) return value
    return column.render(dataset)
  }
}

</script>
<style lang="sass" scoped>
@import '/styles/vars'

.data-table
  border: 1px solid #00000050
  border-spacing: 0
  font-size: 0.9em
  @include rounded-corners
  @include secondary-background
  @include font-color

  tr
    td, th
      padding: 6px
      padding-left: 20px
      padding-right: 20px

    th
      height: 56px
      font-weight: 600
      user-select: none

      *
        pointer-events: none

    td
      height: 52px
      border-top: 1px solid #00000030
      text-overflow: ellipsis
      transition: background #{$theme-transition-duration}

    &:hover td
      transition: none
      background: var(--highlight-background)
</style>
