import axios from '@/axios'

const state = {
  questions: []
}

const getters = {
  questions: state => [...state.questions]
}

const mutations = {
  setQuestions (state, questions) {
    state.questions = questions
  }
}

const actions = {
  async fetchQuestions ({ commit }) {
    try {
      const { data } = await axios.get('/questions')
      commit('setQuestions', data.questions)
    } catch (e) {
      console.log(e.response)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
