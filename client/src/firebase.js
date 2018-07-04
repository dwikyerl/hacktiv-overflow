import firebase from 'firebase/app'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'hacktiv-overflow-8f779.firebaseapp.com',
  projectId: 'hacktiv-overflow-8f779'
}

const fireabaseApp = firebase.initializeApp(config)

export default fireabaseApp
