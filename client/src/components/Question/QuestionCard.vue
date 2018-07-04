<template>
  <div class="question-card">
    <div class="question-card__vote">
      <a
        @click="upvote"
        class="question-card__vote-arrow"
        :class="{ disabled: isThisQuestionOwner }">
        <b-icon
          custom-size="mdi-48px"
          custom-class="question-card__vote-arrow-icon"
          icon="menu-up"></b-icon>
      </a>
      <p class="question-card__vote-total">{{ totalVotes }}</p>
      <a
        @click="downvote"
        class="question-card__vote-arrow"
        :class="{ disabled: isThisQuestionOwner }">
        <b-icon
          custom-size="mdi-48px"
          custom-class="question-card__vote-arrow-icon"
          icon="menu-down"></b-icon>
      </a>
    </div>
    <div class="question-card__question">
      <div class="question-card__content" v-html="question.content"></div>
      <div class="question-card__extras">
        <div v-if="isThisQuestionOwner" class="level is-mobile question-card__options">
          <div class="level-item">
            <a @click.prevent="submitDeleteQuestion">Delete</a>
          </div>
          <div class="level-item">
            <router-link
              :to="{ name: 'edit-question', params: { slug: this.question.slug }}" class="is-pulled-right">Edit</router-link>
          </div>
        </div>
        <div class="question-card__info is-pulled-right">
          <span class="has-text-weight-light">asked at {{ formattedTime }} </span>
          <span class="question-card__author">by {{ question.author[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'QuestionCard',
  computed: {
    ...mapGetters('questions', ['question', 'questionVotes']),
    ...mapGetters('user', ['username', 'id']),
    formattedTime () {
      return moment(this.question.createdAt).format('MMM D YYYY, h:mm a')
    },
    isThisQuestionOwner () {
      return this.question.author[0] === this.username
    },
    totalVotes () {
      return this.questionVotes.reduce((acc, vote) => {
        acc += +vote.value
        return acc
      }, 0)
    }
  },
  methods: {
    ...mapActions('questions', ['deleteQuestion', 'upvoteQuestion', 'downvoteQuestion']),
    submitDeleteQuestion () {
      this.$dialog.confirm({
        title: 'Deleting Question',
        message: 'Are you sure you want to <b>delete</b> this question? This action cannot be undone.',
        confirmText: 'Delete Question',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteQuestion(this.question.slug)
      })
    },
    upvote () {
      this.upvoteQuestion(this.question.slug)
    },
    downvote () {
      this.downvoteQuestion(this.question.slug)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.disabled {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: #ccc !important;
}

.question-card {
  display: flex;
  padding: 1rem;

  &__options {
    margin-bottom: .5rem !important;
  }

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
