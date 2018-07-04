import firebase from 'firebase/app'

const config = {
  apiKey: process.env.VUE_APP_ROOT_API_KEY,
  authDomain: 'fancy-todo-96a22.firebaseapp.com'
}

const fireabaseApp = firebase.initializeApp(config)

export default fireabaseApp
