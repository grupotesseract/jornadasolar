import { IHabito } from 'src/entities/Habito'
import HabitosModelosRepository, {
  IHabitosModelosRepository
} from '../../repositories/HabitosModelosRepository'

interface IGetAll {
  call(): Promise<Array<IHabito>>
}

export default class GetAll implements IGetAll {
  private habitosModelosRepository: IHabitosModelosRepository

  constructor(gruposDeHabitosModelosId: string) {
    this.habitosModelosRepository = new HabitosModelosRepository(
      gruposDeHabitosModelosId
    )
  }

  call(): Promise<Array<IHabito>> {
    return this.habitosModelosRepository.getAll()
  }
}
