import { auth } from '../../components/firebase/firebase.config'

interface ISendPasswordResetEmail {
  call(email: string): Promise<boolean>
}

export default class SendPasswordResetEmail implements ISendPasswordResetEmail {
  async call(email: string): Promise<boolean> {
    await auth.sendPasswordResetEmail(email)
    return true
  }
}
