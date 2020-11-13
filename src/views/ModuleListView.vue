<template lang="pug">
.module-list-view
  h1 Modules
  DataTable(
    :columns="columns",
    :data="Array.from($homeControl.modules.values())"
  )
</template>
<script lang="ts">
import Vue from 'vue'
import DataTable from '/components/ui/DataTable.vue'
import { Component } from 'vue-typed'
import { Module } from 'homecontrol-js'

@Component({ components: { DataTable } })
export default class extends Vue {
  columns: Array<{ [key: string]: any }> = [
    { label: 'Name', getter: (mod: Module) => mod.spec?.name || mod.name },
    { label: 'Description', getter: (mod: Module) => mod.spec?.description },
    { label: 'Identifier', field: 'name' },
    // { label: 'Path', field: 'path' }
  ]
}
</script>
<style lang="sass" scoped>
.module-list-view
  padding: 12px
  width: 100%
  min-height: 300vh
</style>
