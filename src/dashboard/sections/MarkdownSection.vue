<template>
  <section class="markdown-section">
    <Markdown :source="configuration.source"></Markdown>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Mixin } from 'vue-typed'
import Markdown from '/components/Markdown.vue'

@Component({ components: { Markdown } })
export default class extends Vue {
  @Prop() configuration = undefined
}
</script>
<style lang="sass" scoped>
section.markdown-section
  margin: 12px 0
  contain: content
</style>
