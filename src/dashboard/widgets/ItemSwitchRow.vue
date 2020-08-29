<template lang="pug">
li.state-item
  span.item-name(v-text="item.name", :class="{ disabled: !online }")
  mwc-switch(
    :checked="states.get('on')",
    @change="on = $event.target.checked",
    :disabled="!online"
  )
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Mixin, Prop } from 'vue-typed'
import ItemComponent, { syncStates } from '../../api/itemComponent'

@Component({ computed: syncStates('on') })
export default class extends Mixin(ItemComponent) {
  @Prop() configuration = null

}
</script>
<style lang="sass" scoped>
@import '/styles/vars'

.disabled
  @include secondary-font-color
</style>
