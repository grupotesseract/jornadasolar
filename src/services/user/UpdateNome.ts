import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IUpdateNome {
  call(userId: string, novoNome: string): boolean
}

export default class UpdateNome implements IUpdateNome {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(userId: string, novoNome: string): boolean {
    return this.usersRepository.update({
      id: userId,
      attributes: { nome: novoNome }
    })
  }
}
