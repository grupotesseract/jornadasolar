import React, { ElementType, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Alert from '../Alert'
import { auth } from '../firebase/firebase.config'
import { useRouter } from 'next/router'
import SplashScreen from '../SplashScreen'

enum AuthType {
  User = 'user',
  Guest = 'guest'
}

interface withAuthParams {
  type: AuthType
}

const withAuth = ({ type }: withAuthParams) => (
  WrappedComponent: ElementType
): NextPage => {
  const ComponentWithAuth = props => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          setUser(user)
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
    }, [])

    if (type === AuthType.Guest && user) {
      router.push('/diario')
      return <SplashScreen />
    }

    if (type === AuthType.User && !loading && !user) {
      router.push('/')
      return <SplashScreen />
    }

    if (loading) {
      return <SplashScreen />
    }

    return (
      <>
        <Alert />
        <WrappedComponent
          userId={user?.uid}
          userName={user?.displayName}
          isSignedIn={Boolean(user)}
          loadingAuth={loading}
          {...props}
        />
      </>
    )
  }

  return ComponentWithAuth
}

export const withUser = withAuth({ type: AuthType.User })
export const withGuest = withAuth({ type: AuthType.Guest })

export default withAuth
