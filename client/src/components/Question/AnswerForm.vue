<template>
   <form>
      <quill-editor
        v-model="answerContent"
        >
      </quill-editor>
      <button class="button is-info answer-button">Post Answer</button>
    </form>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AnswerForm',
  components: {
    'vq-question-card': QuestionCard,
    'vq-answer-card': AnswerCard,
    quillEditor
  }
}
</script>

