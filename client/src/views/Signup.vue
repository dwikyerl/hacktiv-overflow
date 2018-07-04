<template>
  <div class="signup hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <v-signup-box></v-signup-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupBox from '@/components/Signup/SignupBox'

export default {
  name: 'Signup',
  components: {
    'v-signup-box': SignupBox
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

// .register {
//   background: linear-gradient(
//     to right bottom,
//     rgba($info, .8),
//     rgba($info-invert, .8)),
//   url('../assets/images/typing.jpg');
//   background-size: cover;
//   background-position: center;
// }
</style>
