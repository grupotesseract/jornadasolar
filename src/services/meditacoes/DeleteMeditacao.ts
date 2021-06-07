import MeditacoesRepository, {
  IMeditacoesRepository
} from '../../repositories/MeditacoesRepository'

interface IDeleteMeditacao {
  call(id: string): Promise<boolean>
}

export default class DeleteMeditacao implements IDeleteMeditacao {
  private meditacoesRepository: IMeditacoesRepository

  constructor() {
    this.meditacoesRepository = new MeditacoesRepository()
  }

  async call(id: string): Promise<boolean> {
    return await this.meditacoesRepository.delete(id)
  }
}
