<template>
  <section class="section">
    <div class="container">
      <form @submit.prevent="submitQuestion">
        <b-field label="Title">
            <b-input
              v-model="title"
              required>
            </b-input>
        </b-field>
        <b-field>
          <quill-editor
            v-model="content"
          >
        </quill-editor>
        </b-field>

        <b-field>
          <button
            class="button is-primary is-fullwidth">
            {{ mode }} Question
          </button>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppEditor',
  components: {
    quillEditor
  },

  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters('questions', ['question']),
    mode () {
      return this.question ? 'Edit' : 'Ask'
    }
  },
  methods: {
    ...mapActions('questions', ['postQuestion', 'editQuestion']),
    submitQuestion () {
      if (this.title.trim() === '' || this.content.trim() === '') {
        return this._vm.$toast.open({
          duration: 1000,
          message: 'Title or Content cannot be empty',
          type: 'is-danger'
        })
      }

      const questionData = {
        title: this.title,
        content: this.content
      }

      if (this.question) {
        this.$dialog.confirm({
          title: 'Updating Question',
          message: 'Are you finished <b>updating</b> this question?',
          confirmText: 'Yes',
          type: 'is-info',
          hasIcon: true,
          onConfirm: () => this.editQuestion({
            updateData: questionData,
            questionSlug: this.question.slug
          })
        })
      } else {
        this.$dialog.confirm({
          title: 'Post Question',
          message: 'Do you want <b>post</b> this question?',
          confirmText: 'Yes',
          type: 'is-primary',
          hasIcon: true,
          onConfirm: () => this.postQuestion(questionData)
        })
      }
    }
  },
  created () {
    if (this.question) {
      this.title = this.question.title
      this.content = this.question.content
    }
  }
}
</script>
