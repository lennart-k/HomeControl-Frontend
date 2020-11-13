<template lang="pug">
i.material-icons
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-typed'

@Component()
export default class extends Vue { }
</script>
<style lang="css">
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url("/assets/material-design-icons-4.0.0/font/MaterialIconsOutlined-Regular.otf");
  /* src: url("/assets/material-design-icons-4.0.0/font/MaterialIcons-Regular.ttf"); */
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
