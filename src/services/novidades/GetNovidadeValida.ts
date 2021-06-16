import { INovidade } from 'src/entities/Novidade'
import { IUser } from 'src/entities/User'
import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface IGetNovidadesValida {
  call(user: IUser, path: string): Promise<INovidade>
}

export default class GetNovidadesValida implements IGetNovidadesValida {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(user: IUser, path: string): Promise<INovidade> {
    const date = new Date()
    const novidadesHoje = await this.novidadesRepository.getByDateAndPath(
      date,
      path
    )
    const novidadesValida = novidadesHoje.find(
      novidade =>
        !user.novidadeDispensada(novidade.id) && novidade.dataFinal >= date
    )
    return novidadesValida
  }
}
