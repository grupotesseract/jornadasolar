import { IHabito } from '../../entities/Habito'
import HabitosRepository, {
  IHabitosRepository
} from '../../repositories/HabitosRepository'

interface IGetHabitosByUserId {
  call(userId): Promise<Array<IHabito>>
}

export default class GetHabitosByUserId implements IGetHabitosByUserId {
  private habitosRepository: IHabitosRepository

  constructor() {
    this.habitosRepository = new HabitosRepository()
  }

  async call(userId: string): Promise<Array<IHabito>> {
    return await this.habitosRepository.getAllByUserId(userId)
  }
}
