<template>
  <div v-if="answer" class="answer-card">
    <div class="answer-card__vote">
      <a
        @click="() => vote('upvote')"
        class="answer-card__vote-arrow"
        :class="{ disabled: isThisAnswerOwner }">
        <b-icon
          custom-size="mdi-48px"
          custom-class="answer-card__vote-arrow-icon"
          icon="menu-up"></b-icon>
      </a>
      <p class="answer-card__vote-total">{{ totalVotes }}</p>
      <a
        @click="() => vote('downvote')"
        class="answer-card__vote-arrow"
        :class="{ disabled: isThisAnswerOwner }">
        <b-icon
          custom-size="mdi-48px"
          custom-class="answer-card__vote-arrow-icon"
          icon="menu-down"></b-icon>
      </a>
    </div>
    <div class="answer-card__answer">
      <div class="answer-card__content" v-html="answer.content"></div>
      <div class="answer-card__extras">
        <div v-if="isThisAnswerOwner" class="level is-mobile question-card__options">
          <div class="level-item">
            <a @click.prevent="submitDeleteAnswer">Delete</a>
          </div>
          <div class="level-item">
            <router-link
              :to="{ name: 'edit-question', params: { slug: this.slug }}" class="is-pulled-right">Edit</router-link>
          </div>
        </div>
        <div class="answer-card__info is-pulled-right">
          <span class="has-text-weight-light">answered at {{ formattedTime }} by </span>
          <span class="answer-card__author">{{ answer.author.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from '@/axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AnswerCard',
  props: {
    answerId: String
  },
  data () {
    return {
      answer: null,
      answerVotes: null,
      slug: this.$route.params.slug
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'id']),
    formattedTime () {
      return moment(this.answer.createdAt).format('MMM D YYYY, h:mm a')
    },
    totalVotes () {
      return this.answerVotes.reduce((acc, vote) => {
        acc += +vote.value
        return acc
      }, 0)
    },
    isThisAnswerOwner () {
      return this.answer.author.username === this.username
    }
  },
  methods: {
    ...mapActions('questions', ['deleteAnswer']),
    submitDeleteAnswer () {
      this.$dialog.confirm({
        title: 'Deleting Answer',
        message: 'Are you sure you want to <b>delete</b> this Answer? This action cannot be undone.',
        confirmText: 'Delete answer',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteAnswer({
          slug: this.slug,
          answerId: this.answerId
        })
      })
    },
    addNewVote (newVote) {
      this.answerVotes = [...this.answerVotes, newVote]
    },
    removeVote (voter) {
      this.answerVotes = this.answerVotes.filter((vote) => {
        return vote.voter !== voter
      })
    },
    updateVote (updatedVote) {
      this.answerVotes = this.answerVotes.map((vote) => {
        if (vote._id === updatedVote._id) return updatedVote
        return vote
      })
    },
    async vote (mode) {
      try {
        const url = `/questions/${this.slug}/answers/${this.answerId}/${mode}`
        const { data } = await axios.post(url)
        if (data.updatedVote) {
          this.updateVote(data.updatedVote)
        } else if (data.newVote) {
          this.addNewVote(data.newVote)
        } else if (data.deletedVote) {
          this.removeVote(data.deletedVote.voter)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response)
      }
    }
  },
  async created () {
    const { slug } = this.$route.params
    const url = `/questions/${slug}/answers/${this.answerId}`
    const { data } = await axios.get(url)
    this.answer = data.answer
    this.answerVotes = data.answer.votes
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
