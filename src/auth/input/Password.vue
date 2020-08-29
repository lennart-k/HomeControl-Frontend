<template lang="pug">
mwc-textfield(
  type="password",
  @input="onInput",
  :value="value",
  :label="label"
)
</template>
<script lang="ts">
import { Component, Prop } from 'vue-typed'
import String from './String.vue'

@Component()
export default class extends String { }

</script>
