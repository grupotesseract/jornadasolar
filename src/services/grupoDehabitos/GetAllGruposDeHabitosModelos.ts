import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import GruposDeHabitosModelosRepository, {
  IGruposDeHabitosModelosRepository
} from '../../repositories/GruposDeHabitosModelosRepository'

interface IGetAll {
  call(): Promise<Array<IGrupoDeHabitos>>
}

export default class GetAll implements IGetAll {
  private gruposDeHabitosModelosRepository: IGruposDeHabitosModelosRepository

  constructor() {
    this.gruposDeHabitosModelosRepository = new GruposDeHabitosModelosRepository()
  }

  async call(): Promise<Array<IGrupoDeHabitos>> {
    return await this.gruposDeHabitosModelosRepository.getAll()
  }
}
