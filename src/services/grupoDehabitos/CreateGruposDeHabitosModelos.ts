import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import GruposDeHabitosModelosRepository, {
  IGruposDeHabitosModelosRepository
} from '../../repositories/GruposDeHabitosModelosRepository'

interface ICreate {
  call(params: IGrupoDeHabitos): boolean
}

export default class Create implements ICreate {
  private gruposDeHabitosModelosRepository: IGruposDeHabitosModelosRepository

  constructor() {
    this.gruposDeHabitosModelosRepository = new GruposDeHabitosModelosRepository()
  }

  call(params: IGrupoDeHabitos): boolean {
    return this.gruposDeHabitosModelosRepository.add(params)
  }
}
