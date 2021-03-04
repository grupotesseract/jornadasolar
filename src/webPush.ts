import localforage from 'localforage'
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseCloudMessaging = {
  // checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcmToken')
  },

  // initializing firebase app
  init: async function () {
    try {
      console.log('init')
      const tokenInLocalForage = await this.tokenInlocalforage()

      // if FCM token is already there just return the token
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage
      }

      // requesting notification permission from browser
      const status = await Notification.requestPermission()
      console.log('status', status)
      if (status && status === 'granted') {
        // getting token from FCM
        const messaging = firebase.messaging()
        const fcmToken = await messaging.getToken({
          vapidKey:
            'BPS78lJ69bDC3d2hoiY3IWCF00E_PMNxLoxMviV_WwndY9gyC8BcRH44f7cmGFGiqMK7wiw97cvw6JvSeWpokWo'
        })
        console.log('fcmToken', fcmToken)
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
