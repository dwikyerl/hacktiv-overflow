<template>
  <div class="answer-card">
    <div class="answer-card__vote">
      <a @click="upvote" class="answer-card__vote-arrow">
        <b-icon
          custom-size="mdi-48px"
          custom-class="answer-card__vote-arrow-icon"
          icon="menu-up"></b-icon>
      </a>
      <p class="answer-card__vote-total">{{ answer.totalVotes }}</p>
      <a @click="downvote" class="answer-card__vote-arrow">
        <b-icon
          custom-size="mdi-48px"
          custom-class="answer-card__vote-arrow-icon"
          icon="menu-down"></b-icon>
      </a>
    </div>
    <div class="answer-card__answer">
      <div class="answer-card__content" v-html="answer.content"></div>
      <div class="answer-card__extras">
        <a class="is-pulled-right">Edit</a>
        <div class="answer-card__info is-pulled-right">
          <span class="has-text-weight-light">answered at {{ formattedTime }} by </span>
          <span class="answer-card__author">{{ answer.author[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerCard'
}
</script>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Question',
  props: {
    answer: Object
  },
  computed: {
    formattedTime () {
      return moment(this.answer.createdAt).fromNow()
    },
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

.answer-card {
  display: flex;
  padding: 1rem;

  &__content {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  &__answer {
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
