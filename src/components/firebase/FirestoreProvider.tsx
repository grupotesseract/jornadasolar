import React, { FC } from 'react'
import firebase from 'firebase/app'
import { config } from './firebase.config'
import 'firebase/firestore'
import { FirestoreProvider } from '@react-firebase/firestore'

type Props = Record<string, unknown>

const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      {children}
    </FirestoreProvider>
  )
}

export default StoreProvider
