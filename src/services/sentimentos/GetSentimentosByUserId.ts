import { ISentimento } from 'src/entities/Sentimento'
import SentimentosRepository, {
  ISentimentosRepository
} from 'src/repositories/SentimentosRepository'
import GetAllSentimentosModelos from '../sentimentosModelos/GetAllSentimentosModelos'

interface IGetSentimentosByUserId {
  call(userId: string): Promise<Array<ISentimento>>
}
export default class GetSentimentosByUserId implements IGetSentimentosByUserId {
  private sentimentosRepository: ISentimentosRepository
  private userId
  constructor(userId: string) {
    this.sentimentosRepository = new SentimentosRepository(userId)
    this.userId = userId
  }

  async call(): Promise<Array<ISentimento>> {
    const SentimentosDoUsuario = await this.sentimentosRepository.getUserSentimentos(
      this.userId
    )
    const usuarioTemSentimentos = SentimentosDoUsuario.length > 0

    const Sentimentos = usuarioTemSentimentos
      ? SentimentosDoUsuario
      : await new GetAllSentimentosModelos().call()

    return Sentimentos
  }
}
