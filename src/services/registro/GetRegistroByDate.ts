import { IRegistro } from '../../entities/Registro'
import RegistrosRepository, {
  IRegistrosRepository
} from '../../repositories/RegistrosRepository'

interface IGetRegistroByDate {
  call(userId, date): Promise<IRegistro>
}

export default class GetRegistroByDate implements IGetRegistroByDate {
  private registrosRepository: IRegistrosRepository

  constructor() {
    this.registrosRepository = new RegistrosRepository()
  }

  async call(userId: string, date: Date): Promise<IRegistro> {
    return await this.registrosRepository.getByDate(userId, date)
  }
}
