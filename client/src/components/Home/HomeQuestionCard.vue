<template>
  <div class="h-question-card tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child">
        <div class="h-question-card__stat">
          <div class="h-question-card__stat-item is-flex">
            <p class="heading is-size-5">{{ question.votes }}</p>
            <p class="title is-size-7 has-text-weight-light">votes</p>
          </div>
          <div class="h-question-card__stat-item">
            <p class="heading is-size-5">{{ question.answers }}</p>
            <p class="title is-size-7 has-text-weight-light">answers</p>
          </div>
          <router-link class="item-link" :to="{ name: 'question', params: { slug: question.slug }}"></router-link>
        </div>
      </div>
    </div>
    <div class="tile is-10 is-vertical is-parent">
      <div class="tile is-child">
        <h3 class="is-size-5">
          <router-link :to="{ name: 'question', params: { slug: question.slug }}">
            {{ question.title }}
          </router-link>
        </h3>
        <p class="is-size-7">{{ formattedContent }}</p>
      </div>
      <div class="tile is-child">
        <p class="is-pulled-right is-size-7">
          <span class="has-text-weight-light">asked {{ formattedTime }} ago by </span>
          <span>{{ question.author.username }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HomeQuestionCard',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedTime () {
      return moment(this.question.createdAt).fromNow()
    },
    formattedContent () {
      const formattedContent = this.question.content.replace(/(<([^>]+)>)/ig, '')
      return `${formattedContent.slice(0, 200)}...`
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.h-question-card {
  padding: 1rem;

  &__stat {
    position: relative;
    display: flex;
    flex-flow: column nowrap;

    @include respond(tab-port) {
      flex-flow: row nowrap;
    }

    &-item {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      text-align: center;

      @include respond(tab-port) {
        flex-flow: row nowrap;
        align-items: center;

        &:not(:last-child) {
          margin-right: 0.5rem;
        }

        .heading {
          font-size: 1rem !important;
          margin-bottom: 0;
        }

        .title {
          display: inline;
        }
      }
    }
  }

  border-bottom: 0.5px solid #e0e0e0;

  &:last-child {
    border-bottom: 1px solid #9e9e9e;
  }
}

.item-link {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
