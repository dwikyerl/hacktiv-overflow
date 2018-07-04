<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column hero-text">
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
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSignup from '@/components/Home/HomeSignup'

export default {
  name: 'home',
  components: {
    'v-home-signup': HomeSignup
  }
}
</script>

<style lang="scss">
.hero-text {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  color: #fff;
}
</style>
