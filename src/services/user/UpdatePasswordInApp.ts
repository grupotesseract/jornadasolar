import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import {
  auth,
  emailAuthProvider
} from '../../components/firebase/firebase.config'

interface IUpdatePassword {
  call(senhaAntiga: string, senhaNova: string): Promise<void>
}

export default class UpdatePassword implements IUpdatePassword {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(senhaAntiga: string, senhaNova: string): Promise<void> {
    const user = auth.currentUser
    const credential = emailAuthProvider.credential(user.email, senhaAntiga)
    await user.reauthenticateWithCredential(credential)
    await user.updatePassword(senhaNova)
  }
}
