import axios from '@/axios'
import router from './../../router'

const state = {
  token: window.localStorage.getItem('hoverflow_token') || null
}

const getters = {
  isLoggedIn: state => state.token !== null
}

const mutations = {
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  logout ({ commit, dispatch }) {
    commit('setToken', null)
    window.localStorage.removeItem('hoverflow_token')
    dispatch('user/resetUserData', null, { root: true })
    commit('setIsBurgerActive', false, { root: true })
    this._vm.$toast.open({
      duration: 1000,
      message: 'Logout successfully',
      type: 'is-info'
    })
    router.push({ name: 'home' })
  },
  async login ({ commit, dispatch }, loginData) {
    try {
      const { data } = await axios.post('/login', loginData)
      commit('setToken', data.token)
      window.localStorage.setItem('hoverflow_token', data.token)

      await dispatch('user/getUserInfo', null, { root: true })
      router.push({ name: 'home' })
      this._vm.$toast.open({
        duration: 1000,
        message: 'Login in successfully!',
        type: 'is-info'
      })
    } catch (e) {
      console.log(e.response)
      if (e.response) {
        this._vm.$toast.open({
          duration: 1000,
          message: 'Invalid username or password',
          type: 'is-danger'
        })
      }
    }
    // commit('setIsLoginLoading', false, { root: true })
    commit('setIsBurgerActive', false, { root: true })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
