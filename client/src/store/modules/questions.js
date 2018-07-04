import axios from '@/axios'
import cloneDeep from 'lodash.clonedeep'
import router from './../../router'

const state = {
  questions: [],
  question: null
}

const getters = {
  questions: state => [...state.questions],
  question: state => cloneDeep(state.question)
}

const mutations = {
  setQuestions (state, questions) {
    state.questions = questions
  },
  setQuestion (state, question) {
    state.question = question
  },
  addQuestion (state, question) {
    state.questions = [...state.questions, question]
  },
  updateQuestion (state, addedQuestion) {
    state.questions = state.questions.map((question) => {
      if (question.slug === addedQuestion.slug) return addedQuestion
      return question
    })
  },
  deleteQuestion (state, questionslug) {
    state.questions = state.questions.filter((question) => {
      return question.slug !== questionslug
    })
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
  },
  async fetchQuestionBySlug ({ commit }, slug) {
    try {
      const { data } = await axios.get(`/questions/${slug}`)
      commit('setQuestion', data.question)
    } catch (e) {
      console.log(e.response)
    }
  },
  setQuestion ({ commit }, question) {
    commit('setQuestion', question)
  },
  async postQuestion ({ commit }, questionData) {
    try {
      const { data } = await axios.post('/questions', questionData)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Question created successfully',
        type: 'is-success'
      })
      commit('addQuestion', data.question)
      router.push({ name: 'home' })
    } catch (e) {
      console.log(e.response)
    }
  },
  async editQuestion ({ commit }, { updateData, questionSlug }) {
    try {
      const { data } = await axios.put(`/questions/${questionSlug}`, updateData)
      commit('updateQuestion', data.question)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Question updated successfully',
        type: 'is-success'
      })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to delete question',
        type: 'is-danger'
      })
    }
    router.push({ name: 'question', params: { slug: questionSlug } })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
