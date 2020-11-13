<template lang="pug">
.dashboard-view
  Portal(to="tab-nav")
    mwc-tab-bar.tab-bar
      Tab(
        v-for="[id, dashboard] of dashboards",
        :to="{ name: 'dashboard', params: { id } }",
        :label="dashboard.name || id",
        :icon="dashboard.icon"
        stacked
      )
  Dashboard(v-if="dashboard", :configuration="dashboard")
</template>
<script lang="ts">
import Vue from 'vue'
import Dashboard from '/dashboard/Dashboard.vue'
import Tab from '/components/Tab.vue'
import { Dashboard as DashboardType } from 'homecontrol-js'
import { Component } from 'vue-typed'

@Component({ components: { Dashboard, Tab } })
export default class extends Vue {
  get dashboard(): DashboardType {
    return this.$homeControl.dashboards.get(this.$route.params.id || 'main')!
  }
  get dashboards(): Map<string, DashboardType> {
    return this.$homeControl.dashboards
  }
}
</script>
<style lang="sass" scoped>
.dashboard-view
  padding: 12px

  .tab-bar
    max-width: 100%
</style>
