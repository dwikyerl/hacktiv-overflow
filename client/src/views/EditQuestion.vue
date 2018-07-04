<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Edit Question</h1>
          <h2 class="subtitle">{{ question && question.title }}</h2>
        </div>
      </div>
    </section>
    <vq-form v-if="question"></vq-form>
  </div>
</template>

<script>
import QuestionForm from '@/components/Question/QuestionForm'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: {
    'vq-form': QuestionForm
  },
  computed: {
    ...mapGetters('questions', ['question']),
    ...mapGetters('user', ['username'])
  },
  methods: {
    ...mapActions('questions', ['setQuestion', 'fetchQuestionBySlug'])
  },
  async created () {
    const { slug } = this.$route.params
    await this.fetchQuestionBySlug(slug)
    if (this.question.author[0] !== this.username) {
      this.$router.push({ name: 'home' })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setQuestion(null)
    next()
  }
}
</script>
