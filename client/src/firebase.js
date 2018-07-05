import firebase from 'firebase/app'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'h8-overflow-d4417.firebaseapp.com',
  projectId: 'h8-overflow-d4417'
}

const fireabaseApp = firebase.initializeApp(config)

export default fireabaseApp
