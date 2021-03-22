import React, { FC, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Alert from '../Alert'
import { auth } from '../firebase/firebase.config'

const withAuth = <T extends unknown>(WrappedComponent: FC<T>): NextPage => {
  const ComponentWithAuth = (props: T) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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

export default withAuth
