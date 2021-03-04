import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../theme'
import { AppProps } from 'next/app'
import store from '../redux/store'
import AuthProvider from '../components/firebase/AuthProvider'
import StoreProvider from '../components/firebase/FirestoreProvider'
import { firebaseCloudMessaging } from '../webPush'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { config } from 'src/components/firebase/firebase.config'
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    console.log('load app')
    function getMessage() {
      if (!firebase.apps.length) {
        console.log('config', config)
        firebase.initializeApp(config)
      }
      const messaging = firebase.messaging()
      console.log('set messaging', messaging)
      messaging.onMessage(message => {
        const { title, body } = JSON.parse(message.data.notification)
        const options = {
          body
        }
        console.log('message', title, options)
        self.registration.showNotification(title, options)
      })
    }
    async function setToken() {
      try {
        console.log('init token')
        const token = await firebaseCloudMessaging.init()
        console.log('token', token)
        if (token) {
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }
    setToken()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jornada Solar</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <StoreProvider>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
