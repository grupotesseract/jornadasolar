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
import { firebaseCloudMessaging } from '../utils/webPush'
import firebase from 'firebase/app'
import 'firebase/messaging'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    function getMessage() {
      const messaging = firebase.messaging()
      messaging.onMessage(message => {
        console.log('on message ativado, message:', message)
        const { title, body } = JSON.parse(message.data.notification)
        const options = {
          body
        }
        console.log('message', title, options)
        // self.registration.showNotification(title, options)
      })
    }

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          getMessage()
        }
      } catch (error) {
        console.log('setToken error', error)
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
