import { IUser } from 'src/entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IUpdateFlags {
  call(user: IUser): void
}

export default class UpdateFlags implements IUpdateFlags {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(user: IUser): void {
    this.usersRepository.updateAccessFlags(user)
  }
}
