<template>
   <form @submit.prevent="submitAnswer">
      <quill-editor
        v-model="content">
      </quill-editor>
      <button class="button is-info answer-button">Post Answer</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AnswerForm',
  data () {
    return {
      content: '',
      slug: this.$route.params.slug
    }
  },
  components: {
    quillEditor
  },
  methods: {
    ...mapActions('questions', ['postAnswer']),
    submitAnswer () {
      if (this.content.trim() === '') {
        return this._vm.$toast.open({
          duration: 1000,
          message: 'Content cannot be empty',
          type: 'is-danger'
        })
      }

      const answerData = {
        content: this.content
      }

      this.$dialog.confirm({
        title: 'Post Answer',
        message: 'Do you want <b>post</b> this answer?',
        confirmText: 'Yes',
        type: 'is-info',
        hasIcon: true,
        onConfirm: () => {
          this.postAnswer({
            slug: this.slug,
            answerData
          })
          this.content = ''
        }
      })
    }
  }
}
</script>
