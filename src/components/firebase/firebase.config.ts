import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/analytics'
import 'firebase/storage'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let analytics = null

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  if (typeof window !== 'undefined' && 'measurementId' in config) {
    analytics = firebase.analytics()
  }
}
const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const setupMessaging = (): any => {
  return firebase.messaging()
}

if (process.browser) {
  firestore.enablePersistence()
}

const emailAuthProvider = firebase.auth.EmailAuthProvider

export {
  config,
  auth,
  firestore,
  analytics,
  storage,
  setupMessaging,
  emailAuthProvider
}
