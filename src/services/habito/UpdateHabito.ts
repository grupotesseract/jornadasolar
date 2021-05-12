import HabitosRepository, {
  IHabitosRepository
} from '../../repositories/HabitosRepository'

type Parameters = {
  id: string
  emojiUnicode?: Array<string>
  nome?: string
}

interface IUpdate {
  call(params: Parameters): boolean
}

export default class Update implements IUpdate {
  private habitosRepository: IHabitosRepository

  constructor() {
    this.habitosRepository = new HabitosRepository()
  }

  call({ id, ...attributes }: Parameters): boolean {
    return this.habitosRepository.update(id, {
      ...attributes
    })
  }
}
