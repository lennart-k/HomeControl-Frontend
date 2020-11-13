<template lang="pug">
.item-list-view
  h1 Items
  DataTable(
    :columns="columns",
    :data="Array.from($homeControl.items.values())"
  )
    template(v-slot:col(name)="{ dataset: item }")
      router-link(
        :to="{ name: 'item', params: { id: item.uniqueIdentifier } }",
        v-text="item.name"
      )
</template>
<script lang="ts">
import Vue from 'vue'

import DataTable from '/components/ui/DataTable.vue'

import { Component } from 'vue-typed'

@Component({ components: { DataTable } })
export default class extends Vue {
  columns: Array<{ [key: string]: any }> = [
    { label: 'Name', field: 'name' },
    { label: 'Identifier', field: 'identifier' },
    { label: 'Unique Identifier', field: 'uniqueIdentifier' },
    { label: 'Type', field: 'type' },
    { label: 'Module', field: 'module' },
    { label: 'Status', field: 'status' },
  ]
}
</script>
<style lang="sass" scoped>
.item-list-view
  padding: 12px
  width: 100%
a
  @include font-color
</style>
