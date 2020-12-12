import React, { FC } from 'react'
import firebase from 'firebase/app'
import { config } from './firebase.config'
import 'firebase/auth'
import { FirebaseAuthProvider } from '@react-firebase/auth'

type Props = Record<string, unknown>

const AuthProvider: FC<Props> = ({ children }) => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      {children}
    </FirebaseAuthProvider>
  )
}

export default AuthProvider
