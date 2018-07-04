<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">You can ask anything here</h1>
          <h2 class="subtitle">Be on-topic, Be specific, Make it relevant to others</h2>
        </div>
      </div>
    </section>
    <vq-form></vq-form>
  </div>
</template>

<script>
import QuestionForm from '@/components/Question/QuestionForm'

export default {
  name: 'ask',
  components: {
    'vq-form': QuestionForm
  }
}
</script>
