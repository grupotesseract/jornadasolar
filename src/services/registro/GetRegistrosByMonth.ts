import { IRegistro } from '../../entities/Registro'
import RegistrosRepository, {
  IRegistrosRepository
} from '../../repositories/RegistrosRepository'

interface IGetRegistrosByMonth {
  call(userId, startDate, endDate): Promise<Array<IRegistro>>
}

export default class GetRegistrosByMonth implements IGetRegistrosByMonth {
  private registrosRepository: IRegistrosRepository

  constructor() {
    this.registrosRepository = new RegistrosRepository()
  }

  async call(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<IRegistro>> {
    return await this.registrosRepository.getByDateRange(
      userId,
      startDate,
      endDate
    )
  }
}
