import axios from '@/axios'
import cloneDeep from 'lodash.clonedeep'
import router from './../../router'

const state = {
  questions: [],
  question: null,
  questionVotes: null,
  questionAnswers: null
}

const getters = {
  questions: state => [...state.questions],
  question: state => cloneDeep(state.question),
  questionVotes: state => cloneDeep(state.questionVotes),
  questionAnswers: state => cloneDeep(state.questionAnswers)
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
  deleteQuestion (state, slug) {
    state.questions = state.questions.filter((question) => {
      return question.slug !== slug
    })
  },
  setQuestionVotes (state, questionVotes) {
    state.questionVotes = questionVotes
  },
  setQuestionAnswers (state, questionAnswers) {
    state.questionAnswers = questionAnswers
  },
  addAnswer (state, answer) {
    state.questionAnswers = [...state.questionAnswers, answer]
  },
  updateAnswer (state, addedAnswer) {
    state.questionAnswers = [
      ...state.questionAnswers.filter((answer) => {
        return answer._id !== addedAnswer._id
      }),
      addedAnswer
    ]
  },
  deleteAnswer (state, answerId) {
    state.questionAnswers = state.questionAnswers.filter((answer) => {
      return answer._id !== answerId
    })
  },
  addNewVote (state, newVote) {
    state.questionVotes = [...state.questionVotes, newVote]
  },
  removeVote (state, voter) {
    state.questionVotes = state.questionVotes.filter((vote) => {
      return vote.voter !== voter
    })
  },
  updateVote (state, updatedVote) {
    state.questionVotes = state.questionVotes.map((vote) => {
      if (vote._id === updatedVote._id) return updatedVote
      return vote
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
      commit('setQuestionVotes', data.question.votes)
      commit('setQuestionAnswers', data.question.answers)
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
      router.push({ name: 'question', params: { slug: data.question.slug } })
    } catch (e) {
      console.log(e.response)
    }
  },
  async editQuestion ({ commit }, { updateData, slug }) {
    try {
      const { data } = await axios.put(`/questions/${slug}`, updateData)
      commit('updateQuestion', data.question)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Question updated successfully',
        type: 'is-info'
      })
      router.push({ name: 'question', params: { slug: data.question.slug } })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to edit question',
        type: 'is-danger'
      })
      router.push({ name: 'question', params: { slug } })
    }
  },
  async deleteQuestion ({ commit }, slug) {
    try {
      const { data } = await axios.delete(`/questions/${slug}`)
      commit('deleteQuestion', data.deletedQuestion.slug)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Question Deleted successfully',
        type: 'is-info'
      })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to delete question',
        type: 'is-danger'
      })
    }
    router.push({ name: 'home' })
  },
  async postAnswer ({ commit }, { slug, answerData }) {
    try {
      const { data } = await axios.post(`/questions/${slug}/answers`, answerData)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Answer posted',
        type: 'is-success'
      })
      commit('addAnswer', data.answer)
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to post answer',
        type: 'is-danger'
      })
    }
  },
  async editAnswer ({ commit }, { slug, updateData, answerId }) {
    try {
      const url = `/questions/${slug}/answers/${answerId}`
      const { data } = await axios.put(url, updateData)
      commit('updateAnswer', data.answer)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Answer updated successfully',
        type: 'is-info'
      })
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to update answer',
        type: 'is-danger'
      })
    }
  },
  async deleteAnswer ({ commit }, { slug, answerId }) {
    try {
      const url = `/questions/${slug}/answers/${answerId}`
      const { data } = await axios.delete(url)
      commit('deleteAnswer', data.deletedAnswer._id)
      this._vm.$toast.open({
        duration: 1000,
        message: data.message,
        type: 'is-info'
      })
    } catch (e) {
      console.log(e)
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: 'Failed to delete answer',
        type: 'is-danger'
      })
    }
    router.push({ name: 'question', params: { slug } })
  },
  async upvoteQuestion ({ commit }, slug) {
    try {
      const { data } = await axios.post(`/questions/${slug}/upvote`)
      if (data.updatedVote) {
        commit('updateVote', data.updatedVote)
      } else if (data.newVote) {
        commit('addNewVote', data.newVote)
      } else if (data.deletedVote) {
        console.log('hit')
        commit('removeVote', data.deletedVote.voter)
      }
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: e.response.data.message,
        type: 'is-danger'
      })
    }
  },
  async downvoteQuestion ({ commit }, slug) {
    try {
      const { data } = await axios.post(`/questions/${slug}/downvote`)
      if (data.updatedVote) {
        commit('updateVote', data.updatedVote)
      } else if (data.newVote) {
        commit('addNewVote', data.newVote)
      } else if (data.deletedVote) {
        console.log('hit')
        commit('removeVote', data.deletedVote.voter)
      }
    } catch (e) {
      console.log(e.response)
      this._vm.$toast.open({
        duration: 1000,
        message: e.response.data.message,
        type: 'is-danger'
      })
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
