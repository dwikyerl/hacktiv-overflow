import axios from 'axios'
import store from './store/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})

instance.interceptors.request.use(config => {
  if (store.state.auth.token) {
    config.headers['Authorization'] = `Bearer ${store.state.auth.token}`
  }
  return config
})

export default instance
