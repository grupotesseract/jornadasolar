import { IHabito } from 'src/entities/Habito'
import HabitosModelosRepository, {
  IHabitosModelosRepository
} from '../../repositories/HabitosModelosRepository'

interface ICreate {
  call(params: IHabito): boolean
}

export default class Create implements ICreate {
  private habitosModelosRepository: IHabitosModelosRepository

  constructor(gruposDeHabitosModelosId: string) {
    this.habitosModelosRepository = new HabitosModelosRepository(
      gruposDeHabitosModelosId
    )
  }

  call(params: IHabito): boolean {
    return this.habitosModelosRepository.add(params)
  }
}
