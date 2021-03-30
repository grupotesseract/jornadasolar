import { auth } from '../../components/firebase/firebase.config'

interface ISignOutUser {
  call(): Promise<boolean>
}

export default class SignOutUser implements ISignOutUser {
  async call(): Promise<boolean> {
    await auth.signOut()
    return true
  }
}
