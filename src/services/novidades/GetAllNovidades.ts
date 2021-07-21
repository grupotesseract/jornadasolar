import { INovidade } from 'src/entities/Novidade'
import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface IGetAllNovidades {
  call(): Promise<Array<INovidade>>
}

export default class GetAllNovidades implements IGetAllNovidades {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(): Promise<Array<INovidade>> {
    return this.novidadesRepository.getAll()
  }
}
