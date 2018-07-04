<template>
  <div class="home">
    <vh-hero v-if="!isLoggedIn"></vh-hero>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8-tablet is-8-desktop">
          <vh-questions></vh-questions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
import HomeHero from '@/components/Home/HomeHero'
import HomeQuestionsList from '@/components/Home/HomeQuestionsList'

export default {
  name: 'home',
  components: {
    'vh-hero': HomeHero,
    'vh-questions': HomeQuestionsList
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('questions', ['fetchQuestions'])
  },
  created () {
    this.fetchQuestions()
  }
}
</script>

<style lang="scss">
.home {
  background-color: #e0e0e0;
  min-height: 100vh;
}
.hero-text {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  color: #fff;
}
</style>
