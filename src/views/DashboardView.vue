<template>
  <Dashboard v-if="dashboard" :configuration="dashboard"></Dashboard>
</template>
<script lang="ts">
import Vue from 'vue'
import Dashboard from '/dashboard/Dashboard.vue'
import { Dashboard as DashboardType } from 'homecontrol-js'
import { Component } from 'vue-typed'

@Component({ components: { Dashboard } })
export default class extends Vue {
  get dashboard(): DashboardType {
    return this.$homeControl.dashboards.get(this.$route.params.id || 'main')!
  }
}
</script>
