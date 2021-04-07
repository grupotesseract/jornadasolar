import { IMeditacao } from 'src/entities/Meditacao'
import MeditacoesRepository, {
  IMeditacoesRepository
} from '../../repositories/MeditacoesRepository'

type Parameters = {
  id?: string
  nome?: string
  audioFile?: string
}

interface ICreateMeditacao {
  call(params: Parameters): Promise<IMeditacao>
}

export default class CreateMeditacao implements ICreateMeditacao {
  private meditacoesRepository: IMeditacoesRepository

  constructor() {
    this.meditacoesRepository = new MeditacoesRepository()
  }

  async call({ id, ...attributes }: Parameters): Promise<IMeditacao> {
    if (id) {
      return this.meditacoesRepository.update({
        id,
        ...attributes
      })
    }

    return this.meditacoesRepository.create(attributes)
  }
}
