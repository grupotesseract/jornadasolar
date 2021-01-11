import React, { FC } from 'react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { NextPage } from 'next'
import Alert from '../Alert'

const withAuth = <T extends unknown>(WrappedComponent: FC<T>): NextPage => {
  const ComponentWithAuth = (props: T) => (
    <FirebaseAuthConsumer>
      {({ user, isSignedIn }) => (
        <>
          <Alert />
          <WrappedComponent
            userId={user?.uid}
            userName={user?.displayName}
            isSignedIn={isSignedIn}
            {...props}
          />
        </>
      )}
    </FirebaseAuthConsumer>
  )

  return ComponentWithAuth
}

export default withAuth
