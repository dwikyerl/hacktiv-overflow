<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <b-icon icon="chart-bar-stacked"></b-icon>
        <span>Hacktiv Overflow</span>
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleBurger"
        :class="{ 'is-active': isBurgerActive }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isBurgerActive }">
      <div v-if="!isLoggedIn" class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <router-link :to="{ name: 'login' }" class="button is-link is-outlined">
                <b-icon icon="login"></b-icon>
                <span>Login</span>
              </router-link>
            </p>
            <p class="control">
              <router-link :to="{ name: 'signup' }" class="button is-info">
                <b-icon icon="account-plus"></b-icon>
                <span>Sign Up</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>

      <div v-else class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Account
          </a>
          <div class="navbar-dropdown is-right">
            <div class="navbar-item">
              <p>Logged in as <strong>{{ username }}</strong></p>
            </div>
            <hr class="navbar-divider">
            <a @click.prevent="logout" class="navbar-item">
              <b-icon icon="logout"></b-icon>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('user', ['username']),
    ...mapGetters(['isBurgerActive'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions(['toggleBurger'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.navbar {
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba($black, .2);
}
</style>
