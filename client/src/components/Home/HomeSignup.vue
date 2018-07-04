<template>
  <div class="home-signup">

    <b-field>
      <button @click.prevent="authenticateFb" class="button is-info is-hoverable is-fullwidth">
        <b-icon icon="facebook"></b-icon>
        <span>Facebook</span>
      </button>
    </b-field>

    <b-field>
      <p class="is-size-6 has-text-centered">Or</p>
    </b-field>
    <form @submit.prevent="submitSignup" class="home-form">
      <b-field label="Username">
        <input
          v-model="username"
          name="username"
          class="input home-form__input is-primary"
          type="text"
          placeholder="e.g john@example.com">
      </b-field>

      <b-field label="Email">
        <input
          v-model="email"
          name="email"
          class="input home-form__input is-primary"
          type="email"
          placeholder="e.g john@example.com">
      </b-field>

      <b-field label="Password">
        <input
          v-model="password"
          name="password"
          class="input home-form__input is-primary"
          type="password"
          placeholder="*******">
      </b-field>

      <b-field label="Password Confirm">
        <input
          v-model="confirmPassword"
          name="passwordConfirm"
          class="input home-form__input is-primary"
          type="password"
          placeholder="*******">
      </b-field>

      <b-field>
        <button class="button is-info is-outlined">
          <b-icon icon="account-plus"></b-icon>
          <span>Sign Up</span>
        </button>
      </b-field>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomeSignup',
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: ''
    }
  },
  methods: {
    ...mapActions('user', ['signup']),
    ...mapActions('auth', ['authenticateFb']),
    async submitSignup () {
      const signupData = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      this.signup(signupData)
    }
  }
}
</script>

<style lang="scss">
</style>
