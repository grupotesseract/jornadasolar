import { IGruposDeHabitos } from 'src/entities/Registro'
import { IUser } from 'src/entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import TemLivroOptions from '../../enums/user/TemLivroOptions'

type Parameters = {
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGruposDeHabitos>
}

interface ICreate {
  call(params: Parameters): Promise<IUser>
}

export default class Create implements ICreate {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(params: Parameters): Promise<IUser> {
    return this.usersRepository.add(params)
  }
}
