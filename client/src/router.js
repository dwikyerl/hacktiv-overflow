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

const AllQuestions = resolve => {
  require.ensure(['./views/AllQuestions.vue'], () => {
    resolve(require('./views/AllQuestions.vue'))
  }, 'all-questions')
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
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/questions',
      name: 'questions',
      component: AllQuestions,
      children: [
        {
          path: ':slug',
          name: 'question',
          component: Question
        },
        {
          path: 'ask',
          name: 'ask',
          component: Ask
        }
      ]
    }
  ],
  linkExactActiveClass: 'is-active'
})
