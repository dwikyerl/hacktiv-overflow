<template>
  <div class="h-questions section">
    <div class="h-questions__header tile is-ancestor">
      <div class="tile is-parent is-8">
        <h1 class="is-size-4 is-child">All Questions</h1>
      </div>
      <div v-if="isLoggedIn" class="ask-button-container tile is-parent">
        <div class="is-child is-pull-right">
          <router-link :to="{ name: 'ask' }" class="button is-info">
            <b-icon icon="message-text"></b-icon>
            <span>Ask Question</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="h-questions__list">
      <vh-question-card
        v-for="question in questions"
        :key="question._id"
        :question="question">
      </vh-question-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeQuestionCard from '@/components/Home/HomeQuestionCard'

export default {
  name: 'HomeQuestionList',
  components: {
    'vh-question-card': HomeQuestionCard
  },
  computed: {
    ...mapGetters('questions', ['questions']),
    ...mapGetters('auth', ['isLoggedIn'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.h-questions {
  background-color: $light;
  min-height: 100vh;

  &__list {
    border-top: 1px solid #9e9e9e;
  }
}

.ask-button-container {
  justify-content: flex-end;
}
</style>
