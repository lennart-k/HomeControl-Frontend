<script lang="ts">
import Vue from 'vue'
import LoadingSpinner from '/components/LoadingSpinner.vue'
import { Component } from 'vue-typed'
import store from '/store'
import { RawLocation } from 'vue-router'

interface RedirectRouteQuery {
  code: string
}

@Component()
export default class extends LoadingSpinner {
  async created() {
    if (!this.$route.query.code) {
      return await this.$router.push({ name: 'loginView' })
    }
    let accessToken = await this.$authContext.tokenFromCode(this.$route.query.code as string)
    await this.$homeControl.connect(accessToken)
    this.$router.push((this.$route.query.next || { name: 'home' }) as RawLocation)
  }
}
</script>
