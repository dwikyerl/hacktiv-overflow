import axios from '@/axios'

const state = {
  id: '',
  username: '',
  email: ''
}

const getters = {
  username: state => state.username,
  email: state => state.email,
  id: state => state.id
}

const mutations = {
  setId (state, id) {
    state.id = id
  },
  setUsername (state, username) {
    state.username = username
  },
  setEmail (state, email) {
    state.email = email
  }
}

const actions = {
  async getUserInfo ({ rootState, commit }) {
    const { data } = await axios.get('/users/me')

    commit('setId', data.user.id)
    commit('setUsername', data.user.username)
    commit('setEmail', data.user.email)
  },
  resetUserData ({ commit }) {
    commit('setId', '')
    commit('setUsername', '')
    commit('setEmail', '')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
