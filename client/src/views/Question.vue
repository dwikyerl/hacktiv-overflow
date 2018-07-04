<template>
  <div v-if="question" class="question">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8-tablet is-8-desktop">
          <div class="qa-area section">
            <div class="question__header">
              <h2 class="question__title">{{ question.title }}</h2>
            </div>
            <div class="question__q-section">
              <vq-question-card></vq-question-card>
            </div>
            <div class="question__a-section">
              <h3 class="question__subtitle">
                {{ totalAnswers }} Answers
              </h3>
              <vq-answer-card
                v-if="renderAnswer"
                v-for="answer in this.questionAnswers"
                :key="answer._id"
                :answerId="answer._id"></vq-answer-card>
            </div>
            <div class="question__post-answer-section">
              <h3 class="question__subtitle">
                Your Answer
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QuestionCard from '@/components/Question/QuestionCard'
import AnswerCard from '@/components/Question/AnswerCard'

export default {
  name: 'Question',
  data () {
    return {
      answerContent: ''
    }
  },
  components: {
    'vq-question-card': QuestionCard,
    'vq-answer-card': AnswerCard
  },
  computed: {
    ...mapGetters('questions', ['question', 'questionAnswers']),
    renderAnswer () {
      return this.question.answers[0].author.length > 0
    },
    totalAnswers () {
      if (this.renderAnswer) return this.question.answers.length
      return 0
    }
  },
  methods: {
    ...mapActions('questions', ['fetchQuestionBySlug', 'setQuestion'])
  },
  created () {
    const { slug } = this.$route.params
    this.fetchQuestionBySlug(slug)
  },
  beforeRouteLeave (to, from, next) {
    this.setQuestion(null)
    next()
  }
}
</script>

<style lang="scss">
.question {
  min-height: 100vh;
  background-color: #a2120a;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-weight: 700;
    font-size: 1.4rem;
  }

  &__item-container {
    display: flex;
    justify-content: flex-end;
  }

  &__q-section {
    border-top: 1px solid #9e9e9e;
    border-bottom: 1px solid #9e9e9e;
  }

  &__a-section {
    padding-bottom: 1rem;
    margin-top: 1rem;
    border-bottom: 1px solid #9e9e9e;
  }

  &__subtitle {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  &__post-answer-section {
    padding-bottom: 1rem;
    margin-top: 1rem;
    border-bottom: 1px solid #9e9e9e;
  }
}

.answer-button {
  margin: 1rem 0 1rem;
}

.qa-area {
  min-height: 100vh;
  background-color: #fff;
}
</style>
