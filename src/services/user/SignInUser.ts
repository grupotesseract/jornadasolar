import { auth } from '../../components/firebase/firebase.config'

interface ISignInUser {
  call(email: string, password: string): Promise<boolean>
}

export default class SignInUser implements ISignInUser {
  async call(email: string, password: string): Promise<boolean> {
    await auth.signInWithEmailAndPassword(email, password)
    return true
  }
}
