<template lang="pug">
i.material-icons
  slot
</template>
<script lang="ts">
import 'material-design-icons/iconfont/material-icons.css'
import Vue from 'vue'
import { Component } from 'vue-typed'

@Component()
export default class extends Vue { }
</script>
