import { INovidade } from 'src/entities/Novidade'
import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface IGetByDate {
  call(date: Date): Promise<Array<INovidade>>
}

export default class GetNovidadeByDateInRange implements IGetByDate {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(date: Date): Promise<Array<INovidade>> {
    return this.novidadesRepository.getByDateInRange(date)
  }
}
