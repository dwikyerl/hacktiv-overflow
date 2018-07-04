import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isBurgerActive: false
  },
  getters: {
    isBurgerActive: state => state.isBurgerActive
  },
  mutations: {
    setIsBurgerActive (state, isActive) {
      state.isBurgerActive = isActive
    }
  },
  actions: {
    toggleBurger ({ commit, state }) {
      const isActive = !state.isBurgerActive
      commit('setIsBurgerActive', isActive)
    }
  },
  modules: {
    auth,
    user
  }
})
