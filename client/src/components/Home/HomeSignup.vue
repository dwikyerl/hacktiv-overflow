<template>
  <div class="home-signup">
    <div class="columns">
      <div class="column">
        <button class="button is-inverted is-hoverable is-fullwidth">
          <span class="icon">
            <img src="@/assets/google_logo.svg" alt="google-logo">
          </span>
          <span>Google</span>
        </button>
      </div>

      <div class="column">
        <button class="button is-info is-hoverable is-fullwidth">
          <b-icon icon="facebook"></b-icon>
          <span>Facebook</span>
        </button>
      </div>
    </div>

    <b-field>
      <p class="is-size-6 has-text-centered">Or</p>
    </b-field>
    <form class="home-form">
      <b-field>
        <p class="control">
          <span class="home-form__label button is-link">Username</span>
        </p>
        <input class="input home-form__input" type="text" placeholder="e.g johndoe">
      </b-field>

      <b-field>
        <p class="control">
          <span class="home-form__label button is-link">Email</span>
        </p>
        <input class="input home-form__input is-primary" type="email" placeholder="e.g john@example.com">
      </b-field>

      <b-field>
        <p class="control">
          <span class="home-form__label button is-link">Password</span>
        </p>
        <input class="input home-form__input is-primary" type="password" placeholder="*******">
      </b-field>

      <b-field>
        <p class="control">
          <span class="home-form__label button is-link">Password Confirm</span>
        </p>
        <input class="input home-form__input is-primary" type="password" placeholder="*******">
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
export default {
  name: 'HomeSignup'
}
</script>


<style lang="scss">
.home-form {
  &__input {
    border-radius: 0 4px 4px 0;
  }

  &__label {
    justify-content: flex-start;
    width: 157px;
  }
}
</style>
