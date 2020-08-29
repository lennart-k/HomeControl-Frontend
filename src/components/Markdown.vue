<template>
  <div class="markdown" v-html="rendered"></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'

import marked from 'marked'

@Component()
export default class extends Vue {
  @Prop() source: string = ""

  get rendered(): string {
    return marked(this.source)
  }
}
</script>
