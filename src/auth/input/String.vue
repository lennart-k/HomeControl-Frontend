<template lang="pug">
mwc-textfield(type="text", @input="onInput", :value="value", :label="label")
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'

@Component({
  model: {
    prop: 'value',
    event: 'input'
  }
})
export default class extends Vue {
  @Prop() value!: string
  @Prop() label?: string = undefined

  onInput(event: any) {
    this.$emit('input', event.target.value)
  }
}
</script>
