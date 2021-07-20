import { ISentimento } from 'src/entities/Sentimento'
import SentimentosRepository from 'src/repositories/SentimentosRepository'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

interface ICreateUserSentimentos {
  call(params: ICreateParameters): Promise<ISentimento>
}

export default class CreateUserSentimentos implements ICreateUserSentimentos {
  private sentimentosRepository

  constructor(userId: string) {
    this.sentimentosRepository = new SentimentosRepository(userId)
  }

  call(params: ICreateParameters): Promise<ISentimento> {
    return this.sentimentosRepository.create(params)
  }
}
