<template>
  <form @submit.prevent="submitEditAnswer" class="edit-form">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Answer</p>
      </header>
      <section class="modal-card-body">
        <quill-editor
          v-model="content">
        </quill-editor>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary is-outlined">Save</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AnswerModalForm',
  props: {
    answer: Object
  },
  data () {
    return {
      content: this.answer.content,
      slug: this.$route.params.slug
    }
  },
  components: {
    quillEditor
  },
  methods: {
    ...mapActions('questions', ['editAnswer']),
    submitEditAnswer () {
      const updateData = {
        content: this.content
      }

      this.$dialog.confirm({
        title: 'Updating Answer',
        message: 'Are you finished <b>updating</b> this answer?',
        confirmText: 'Yes',
        type: 'is-info',
        hasIcon: true,
        onConfirm: () => {
          this.editAnswer({
            answerId: this.answer._id,
            updateData,
            slug: this.slug
          })
          this.$parent.close()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.edit-form {
  min-width: 60vw;
}
</style>
