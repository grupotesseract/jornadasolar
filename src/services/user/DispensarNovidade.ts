import { IUser } from 'src/entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IDispensarNovidade {
  call(slug: string, user: IUser): boolean
}

export default class DispensarNovidade implements IDispensarNovidade {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(slug: string, user: IUser): boolean {
    const id = user?.id
    const novidadesDispensadas = [...user.novidadesDispensadas, slug]

    return this.usersRepository.update({
      id,
      attributes: { novidadesDispensadas: novidadesDispensadas }
    })
  }
}
