import { IUser } from '../../entities/User'
import { auth } from '../../components/firebase/firebase.config'

interface ISignInUser {
  call(user: IUser): boolean
}

export default class SignInUser implements ISignInUser {
  call(user: IUser): boolean {
    auth.signInWithEmailAndPassword(user.email, user.password)
    return true
  }
}
