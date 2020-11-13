<template lang="pug">
router-link(
  :to="to",
  v-slot="{ href, route, navigate, isActive, isExactActive }"
)
  dummy-tab(inline-template, v-bind="{icon, label, route, stacked}")
    mwc-tab.tab(
      :label="label",
      :icon="icon",
      :stacked="stacked",
      @MDCTab:interacted="navigate",
      ref="tab"
    )
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-typed'
import { RawLocation, Route } from 'vue-router'

@Component()
class DummyTab extends Vue {
  @Prop() route: any = {}

  mounted() {
    this.$nextTick(() => this.onRoute())
  }
  @Watch('$route')
  async onRoute() {
    await this.$nextTick()
    if ((this.route as Route).fullPath === this.$route.fullPath) {
      let parentElement = (this.$parent.$el.parentElement as any)
      if (parentElement?.tagName === 'MWC-TAB-BAR') {
        parentElement.activeIndex = parentElement
          ._getTabs().indexOf(this.$refs.tab)
      }
    }
  }
}

@Component({ components: { DummyTab } })
export default class extends Vue {
  @Prop() label?: string = undefined
  @Prop() icon?: string = undefined
  @Prop() to?: RawLocation = undefined
  @Prop() stacked?: boolean = undefined
}
</script>
<style lang="sass" scoped>
.tab
  --mdc-tab-stacked-height: 60px
</style>
