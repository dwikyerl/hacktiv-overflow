<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppHeader from '@/components/AppHeader'

export default {
  name: 'App',
  components: {
    'v-header': AppHeader
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('user', ['getUserInfo'])
  },
  created () {
    if (this.isLoggedIn) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="scss">
</style>
