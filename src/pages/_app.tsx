import React, { FC, Fragment, useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../theme'
import { AppProps } from 'next/app'
import store from '../redux/store'
import AuthProvider from '../components/firebase/AuthProvider'
import StoreProvider from '../components/firebase/FirestoreProvider'
import AdminBase from '../components/templates/AdminBase'

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  const isAreaAdmin = router.pathname.startsWith('/admin')

  const ComponentWrapper = isAreaAdmin ? AdminBase : Fragment

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
              <ComponentWrapper>
                <Component {...pageProps} />
              </ComponentWrapper>
            </Provider>
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
