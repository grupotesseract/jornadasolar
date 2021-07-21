import { ISentimento } from 'src/entities/Sentimento'
import SentimentosModelosRepository, {
  ISentimentosModelosRepository
} from 'src/repositories/SentimentosModelosRepository'

interface IGetAll {
  call(): Promise<Array<ISentimento>>
}
export default class GetAllSentimentosModelos implements IGetAll {
  private sentimentosModelosRepository: ISentimentosModelosRepository

  constructor() {
    this.sentimentosModelosRepository = new SentimentosModelosRepository()
  }

  async call(): Promise<Array<ISentimento>> {
    return await this.sentimentosModelosRepository.getAll()
  }
}
