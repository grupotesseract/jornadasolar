import { INovidade } from 'src/entities/Novidade'
import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface IGetNovidadeById {
  call(id: string): Promise<INovidade>
}

export default class GetNovidadeById implements IGetNovidadeById {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(id: string): Promise<INovidade> {
    return this.novidadesRepository.getById(id)
  }
}
