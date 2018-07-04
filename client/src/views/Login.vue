<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <vl-login-box></vl-login-box>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBox from '@/components/Login/LoginBox'

export default {
  name: 'Login',
  components: {
    'vl-login-box': LoginBox
  }
}
</script>
