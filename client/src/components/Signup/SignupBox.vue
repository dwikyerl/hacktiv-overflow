<template>
  <div class="signup-box box">
    <div class="field has-text-centered">
      <router-link :to="{ name: 'home' }">
        <span class="icon">
          <b-icon icon="chart-bar-stacked"></b-icon>
        </span>
        <span class="is-size-4 link-primary">Hacktiv Overflow</span>
      </router-link>
    </div>

    <form @submit.prevent="submitSignup">
      <b-field>
        <p class="is-size-4 has-text-centered">Sign Up</p>
      </b-field>

      <b-field label="Username">
        <b-input
          icon="account"
          placeholder="e.g johndoe"
          minLength="6"
          v-model="username"
          required>
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input
          placeholder="e.g johndoe@mail.com"
          type="email"
          icon="email"
          v-model="email"
          required>
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password"
          placeholder="Password"
          password-reveal
          icon="lock"
          v-model="password"
          required>
        </b-input>
      </b-field>

      <b-field label="Password Confirmation">
        <b-input type="password"
          placeholder="Password Confirmation"
          password-reveal
          icon="lock"
          v-model="confirmPassword"
          required>
        </b-input>
      </b-field>

      <b-field>
        <button class="button is-info is-fullwidth">
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
  name: 'SignupBox',
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
.signup-box {
  box-shadow: 5px 5px 15px rgba(#000, .4);
  border: 2px solid #e5e5e5;
  min-width: 50%;
}
</style>
