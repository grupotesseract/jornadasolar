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

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
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
