import { IHabito } from '../../entities/Habito'
import HabitosRepository, {
  IHabitosRepository
} from '../../repositories/HabitosRepository'

interface IGetHabitoById {
  call(id: string): Promise<IHabito>
}

export default class GetHabitoById implements IGetHabitoById {
  private habitosRepository: IHabitosRepository

  constructor() {
    this.habitosRepository = new HabitosRepository()
  }

  async call(id: string): Promise<IHabito> {
    return await this.habitosRepository.getById(id)
  }
}
