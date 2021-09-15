import { ISentimento } from 'src/entities/Sentimento'
import SentimentosRepository from 'src/repositories/SentimentosRepository'

interface IUpdateUserSentimentos {
  call(sentimento: ISentimento): Promise<ISentimento>
}

export default class UpdateUserSentimentos implements IUpdateUserSentimentos {
  private sentimentosRepository

  constructor(userId: string) {
    this.sentimentosRepository = new SentimentosRepository(userId)
  }

  async call(sentimento: ISentimento): Promise<ISentimento> {
    return await this.sentimentosRepository.update(sentimento)
  }
}
