import React, { ElementType, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Alert from '../Alert'
import { auth } from '../firebase/firebase.config'
import { useRouter } from 'next/router'
import SplashScreen from '../SplashScreen'
import GetUserById from 'src/services/user/GetUserById'

enum AuthType {
  User = 'user',
  Guest = 'guest',
  Admin = 'admin'
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
          const getUser = async () => {
            try {
              const newUser = await new GetUserById().call(user.uid)
              setUser(newUser)
              setLoading(false)
            } catch {
              // Ignora erro se o usuário não foi criando na collection
            }
          }
          getUser()
        } else {
          setLoading(false)
        }
      })
    }, [])

    if (type === AuthType.Admin && !loading && user?.role !== AuthType.Admin) {
      router.replace('/')
      return <SplashScreen />
    }

    if (type === AuthType.Guest && user?.role === AuthType.Admin) {
      router.push('/admin')
      return <SplashScreen />
    }

    if (type === AuthType.Guest && user) {
      router.push('/app/diario')
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
        <WrappedComponent userId={user?.id} userName={user?.nome} {...props} />
      </>
    )
  }

  return ComponentWithAuth
}

export const withUser = withAuth({ type: AuthType.User })
export const withGuest = withAuth({ type: AuthType.Guest })
export const withAdmin = withAuth({ type: AuthType.Admin })

export default withAuth
