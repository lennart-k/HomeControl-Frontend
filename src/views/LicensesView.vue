<template lang="pug">
.licenses-view
  h1 Licenses
  ul
    li(v-for="(license, name) in texts")
      a(:href="license", v-text="name", target="_blank")
</template>
<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import InterLicense from 'typeface-inter/LICENSE.txt'

import { Component } from 'vue-typed'

@Component()
export default class extends Vue {
  texts: { [key: string]: string } = {
    "Inter Font": InterLicense
  }
}
</script>
