<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'App',
  components: {
    'v-header': AppHeader
  }
}
</script>

<style lang="scss">
</style>
