import React, { FC } from 'react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { NextPage } from 'next'

const withAuth = <T extends unknown>(WrappedComponent: FC<T>): NextPage => {
  const ComponentWithAuth = (props: T) => (
    <FirebaseAuthConsumer>
      {({ user }) => <WrappedComponent userId={user?.uid} {...props} />}
    </FirebaseAuthConsumer>
  )

  return ComponentWithAuth
}

export default withAuth
