<template lang="pug">
.users-view
  h1 Users
  DataTable(v-if="users", :columns="columns", :data="users")
  h3(v-else) Fetching users
</template>
<script lang="ts">
import Vue from 'vue'
import DataTable from '/components/ui/DataTable.vue'
import { Component } from 'vue-typed'
import { User } from 'homecontrol-js'

@Component({ components: { DataTable } })
export default class extends Vue {
  users?: Array<User> = undefined
  columns: Array<{ [key: string]: any }> = [
    { label: 'Name', field: 'name', render: (user: User) => user.name },
    { label: 'Identifier', field: 'identifier' },
    { label: 'Owner', getter: (user: User) => user.owner ? 'yes' : '' },
    { label: 'System Generated', field: 'systemGenerated' }
  ]

  async mounted() {
    this.users = await this.$homeControl.getUsers()
  }
}
</script>
<style lang="sass" scoped>
@import "/styles/vars"

.item-list-view
  padding: 12px
  width: 100%
  min-height: 300vh

  table.user-table
    @include font-color

    tr
      height: 40px
      border-radius: 3px
</style>
