import NovidadesRepository, {
  INovidadesRepository
} from 'src/repositories/NovidadesRepository'

interface IDelete {
  call(id: string): Promise<boolean>
}

export default class Delete implements IDelete {
  private novidadesRepository: INovidadesRepository

  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(id: string): Promise<boolean> {
    return this.novidadesRepository.delete(id)
  }
}
