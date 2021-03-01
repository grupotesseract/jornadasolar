import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const auth = firebase.auth()
const firestore = firebase.firestore()

if (process.browser) {
  firestore.enablePersistence()
}

export { auth, firestore }
