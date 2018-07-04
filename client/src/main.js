import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import '@/assets/scss/main.scss'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
