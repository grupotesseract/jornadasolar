import HabitosRepository, {
  IHabitosRepository
} from '../../repositories/HabitosRepository'

type Parameters = {
  userId: string
  nome: string
  emojiUnicode: Array<string>
}

interface ICreate {
  call(params: Parameters): boolean
}

export default class Create implements ICreate {
  private habitosRepository: IHabitosRepository

  constructor() {
    this.habitosRepository = new HabitosRepository()
  }

  call(attributes: Parameters): boolean {
    return this.habitosRepository.add(attributes)
  }
}
