import localforage from 'localforage'
import 'firebase/messaging'
import { setupMessaging } from '../components/firebase/firebase.config'

const firebaseCloudMessaging = {
  // checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcmToken')
  },

  // initializing firebase app
  init: async function () {
    try {
      const tokenInLocalForage = await this.tokenInlocalforage()
      // if FCM token is already there just return the token
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage
      }

      // requesting notification permission from browser
      const status = await Notification.requestPermission()
      console.log('NOtification status', status)
      if (status && status === 'granted') {
        // getting token from FCM
        const fcmToken = await setupMessaging().getToken()
        if (fcmToken) {
          // setting FCM token in indexed db using localforage
          localforage.setItem('fcmToken', fcmToken)
          // return the FCM token after saving it
          return fcmToken
        }
      }
    } catch (error) {
      console.error('webpush err', error)
      return null
    }
  }
}
export { firebaseCloudMessaging }
