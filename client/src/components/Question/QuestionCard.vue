<template>
  <div class="question-card">
    <div class="question-card__vote">
      <a @click="upvote" class="question-card__vote-arrow">
        <b-icon
          custom-size="mdi-48px"
          custom-class="question-card__vote-arrow-icon"
          icon="menu-up"></b-icon>
      </a>
      <p class="question-card__vote-total">{{ question.totalVotes }}</p>
      <a @click="downvote" class="question-card__vote-arrow">
        <b-icon
          custom-size="mdi-48px"
          custom-class="question-card__vote-arrow-icon"
          icon="menu-down"></b-icon>
      </a>
    </div>
    <div class="question-card__question">
      <div class="question-card__content" v-html="question.content"></div>
      <div class="question-card__extras">
        <a class="is-pulled-right">Edit</a>
        <div class="question-card__info is-pulled-right">
          <span class="has-text-weight-light">asked at {{ formattedTime }} </span>
          <span class="question-card__author">by {{ question.author[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Question',
  computed: {
    ...mapGetters('questions', ['question']),
    formattedTime () {
      return moment(this.question.createdAt).format('MMM D YYYY, h:mm a')
    }
  },
  methods: {
    upvote () {

    },
    downvote () {

    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.question-card {
  display: flex;
  padding: 1rem;

  &__content {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  &__question {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
  }

  &__extras {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }

  &__vote {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-right: 1rem;

    &-arrow {
      height: 2rem;
      color: #000;
      transition: color 0.2s;

      &:hover {
        color: $primary;
      }

      &-icon:before {
        font-size: 72px !important;
      }
    }

    &-total {
      margin-right: 0.25rem;
      font-size: 1.6rem;
    }
  }
}
</style>
