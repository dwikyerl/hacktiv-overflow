<template>
  <section class="home-hero hero is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column home-hero__text is-flex section">
            <h1 class="title">
              Learn, Share, Build
            </h1>
            <h2 class="subtitle">
              Hacktiv Overflow is a place to learn, share, build your knowledge
            </h2>
          </div>
          <div class="column">
            <v-home-signup></v-home-signup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HomeSignup from '@/components/Home/HomeSignup'

export default {
  name: 'HomeHero',
  components: {
    'v-home-signup': HomeSignup
  }
}
</script>

<style lang="scss">
.home-hero {

  &__text {
    justify-content: center;
    flex-flow: column nowrap;
    color: #fff;
  }
}
</style>
