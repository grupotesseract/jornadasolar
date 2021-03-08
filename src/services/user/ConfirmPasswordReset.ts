import { auth } from '../../components/firebase/firebase.config'

interface IConfirmPasswordReset {
  call(oobCode: string, password: string): Promise<boolean>
}

export default class ConfirmPasswordReset implements IConfirmPasswordReset {
  async call(oobCode: string, password: string): Promise<boolean> {
    await auth.confirmPasswordReset(oobCode, password)
    return true
  }
}
