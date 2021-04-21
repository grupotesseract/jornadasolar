import { IMeditacao } from 'src/entities/Meditacao'
import MeditacoesRepository, {
  IMeditacoesRepository
} from '../../repositories/MeditacoesRepository'

interface IGetMeditacaoById {
  call(id: string): Promise<IMeditacao>
}

export default class GetMeditacaoById implements IGetMeditacaoById {
  private meditacoesRepository: IMeditacoesRepository

  constructor() {
    this.meditacoesRepository = new MeditacoesRepository()
  }

  async call(id: string): Promise<IMeditacao> {
    return await this.meditacoesRepository.getById(id)
  }
}
