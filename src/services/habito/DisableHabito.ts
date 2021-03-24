import HabitosRepository, {
  IHabitosRepository
} from '../../repositories/HabitosRepository'

interface IDisableHabito {
  call(id: string): boolean
}

export default class DisableHabito implements IDisableHabito {
  private habitosRepository: IHabitosRepository

  constructor() {
    this.habitosRepository = new HabitosRepository()
  }

  call(id: string): boolean {
    return this.habitosRepository.update(id, { status: 'inativo' })
  }
}
