import { INovidade } from 'src/entities/Novidade'
import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface ICreateOrUpdate {
  call(params: INovidade): Promise<INovidade>
}

export default class CreateOrUpdate implements ICreateOrUpdate {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call({ id, ...attributes }: INovidade): Promise<INovidade> {
    if (id) {
      return this.novidadesRepository.update({ id, ...attributes })
    }

    return this.novidadesRepository.create(attributes)
  }
}
