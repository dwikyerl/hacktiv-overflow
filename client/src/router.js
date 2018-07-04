import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const Signup = resolve => {
  require.ensure(['./views/Signup.vue'], () => {
    resolve(require('./views/Signup.vue'))
  }, 'signup')
}

const Login = resolve => {
  require.ensure(['./views/Login.vue'], () => {
    resolve(require('./views/Login.vue'))
  }, 'login')
}

const Question = resolve => {
  require.ensure(['./views/Question.vue'], () => {
    resolve(require('./views/Question.vue'))
  }, 'question')
}

const Ask = resolve => {
  require.ensure(['./views/Ask.vue'], () => {
    resolve(require('./views/Ask.vue'))
  }, 'ask')
}

const EditQuestion = resolve => {
  require.ensure(['./views/EditQuestion.vue'], () => {
    resolve(require('./views/EditQuestion.vue'))
  }, 'edit-question')
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('hoverflow_token')) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('hoverflow_token')) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/questions/ask',
      name: 'ask',
      component: Ask,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('hoverflow_token')) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/questions/:slug',
      name: 'question',
      component: Question
    },
    {
      path: '/questions/:slug/edit',
      name: 'edit-question',
      component: EditQuestion,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('hoverflow_token')) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    }
  ],
  linkExactActiveClass: 'is-active'
})
