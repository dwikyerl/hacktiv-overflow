<template>
  <div class="h-question-card tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child">
        <div class="h-question-card__stat level is-mobile">
          <div class="h-question-card__item level-item has-text-centered">
            <div>
              <p class="heading is-size-5">{{ question.votes }}</p>
              <p class="is-size-7">Votes</p>
            </div>
          </div>
          <div class="h-question-card__item level-item has-text-centered">
            <div>
              <p class="heading is-size-5">{{ question.answers }}</p>
              <p class="is-size-7">Answers</p>
            </div>
          </div>
          <router-link class="item-link" :to="{ name: 'question', params: { slug: question.slug }}"></router-link>
        </div>
      </div>
    </div>
    <div class="tile is-9 is-vertical is-parent">
      <div class="tile is-child">
        <h3 class="is-size-5">
          <router-link :to="{ name: 'question', params: { slug: question.slug }}">
            {{ question.title }}
          </router-link>
        </h3>
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
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.h-question-card {
  padding: 1rem;

  &__stat {
    position: relative;
  }

  border-bottom: .5px solid #e0e0e0;

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
