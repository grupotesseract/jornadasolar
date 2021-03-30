import { IUser } from 'src/entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IGetUserById {
  call(id: string): Promise<IUser>
}

export default class GetUserById implements IGetUserById {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(id: string): Promise<IUser> {
    return await this.usersRepository.getById(id)
  }
}
