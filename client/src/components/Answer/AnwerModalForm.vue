<template>
  <form @submit.prevent="submitNewTask" class="task-form">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Task</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
            <b-input
            v-model="title"
            placeholder="Task Title"
            required>
            </b-input>
        </b-field>

        <b-field label="Description (optional)">
          <b-input
            type="textarea"
            placeholder="Task Description"
            v-model="description">
          </b-input>
        </b-field>

        <b-field label="Points">
          <b-input placeholder="Task Points"
            type="number"
            min="0"
            v-model="points">
          </b-input>
        </b-field>

        <b-field label="Assigned To">
            <b-input
              v-model="assignedTo"
              placeholder="Assigned To">
            </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Save</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'ModalForm',
  data () {
    return {
      title: '',
      description: '',
      points: 0,
      assignedTo: ''
    }
  },
  firebase: {
    tasks: {
      source: db.ref('tasks'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  methods: {
    submitNewTask () {
      let points = ('' + this.points).replace(/^0+/, '')
      const newTask = {
        title: this.title,
        description: this.description,
        points: +points || 0,
        assignedTo: this.assignedTo,
        status: 0
      }

      this.$firebaseRefs.tasks.push(newTask)
      this.$parent.close()
      this.$toast.open({
        duration: 1500,
        message: 'Successfully added new task',
        type: 'is-success'
      })
    }
  }
}
</script>

<style lang="scss">
.task-form {
  min-width: 60vw;
}
</style>

// this.$modal.open({
//         parent: this,
//         component: TaskDetail,
//         hasModalCard: true,
//         props: {
//           task: this.task
//         }
//       })