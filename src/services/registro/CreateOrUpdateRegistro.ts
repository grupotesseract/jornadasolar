import { IGruposDeHabitos } from '../../entities/Registro'
import RegistrosRepository, {
  IRegistrosRepository
} from '../../repositories/RegistrosRepository'

type Parameters = {
  id?: string
  date: unknown
  userId: string
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGruposDeHabitos>
  anotacoes?: string
}

interface ICreateOrUpdate {
  call(params: Parameters): Promise<boolean>
}

export default class CreateOrUpdate implements ICreateOrUpdate {
  private registrosRepository: IRegistrosRepository

  constructor() {
    this.registrosRepository = new RegistrosRepository()
  }

  async call({ id, ...attributes }: Parameters): Promise<boolean> {
    if (id) {
      return this.registrosRepository.update({ id, attributes })
    }

    return this.registrosRepository.add(attributes)
  }
}
