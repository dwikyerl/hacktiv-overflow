<template>
  <div class="box">
    <div class="field has-text-centered">
      <router-link :to="{ name: 'home' }">
        <span class="icon">
          <b-icon icon="chart-bar-stacked"></b-icon>
        </span>
        <span class="is-size-4 link-primary">Hacktiv Overflow</span>
      </router-link>
    </div>

    <div class="field">
      <button class="button is-inverted is-fullwidth is-hoverable">
        <span class="icon">
          <img src="@/assets/google_logo.svg" alt="google-logo">
        </span>
        <span>Login with Google</span>
      </button>
    </div>

    <div class="field">
      <button @click.prevent="authenticateFb" class="button is-info is-fullwidth is-hoverable">
        <b-icon icon="facebook"></b-icon>
        <span>Login with Facebook</span>
      </button>
    </div>

    <form @submit.prevent="submitLogin">

      <div class="field has-text-centered">
        <p class="is-5">Or</p>
      </div>

      <b-field label="Username or Email">
          <b-input placeholder="Username or Email" v-model="username"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password"
            placeholder="Password"
            password-reveal
            v-model="password">
        </b-input>
      </b-field>

      <div class="field">
        <button class="button is-success is-fullwidth is-hoverable">
          <b-icon icon="login-variant"></b-icon>
          <span>Login</span>
        </button>
      </div>

      <div class="field has-text-centered">
        <span>Not registered yet ? </span>
        <router-link class="is-primary" :to="{ name: 'signup' }">
          <span class="link-primary">Signup</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginBox',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitLogin () {
      const loginData = {
        username: this.username,
        password: this.password
      }
      this.login(loginData)
    }
  }
}
</script>
