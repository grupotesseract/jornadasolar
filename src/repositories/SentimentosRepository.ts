import { firestore } from 'src/components/firebase/firebase.config'
import { ISentimento } from 'src/entities/Sentimento'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

export interface ISentimentosRepository {
  create(params: ICreateParameters): Promise<ISentimento>
}
export default class SentimentosRepository implements ISentimentosRepository {
  private collection

  constructor(userId: string) {
    this.collection = firestore.collection(`user/${userId}/sentimentos`)
  }

  create(params: ICreateParameters): Promise<ISentimento> {
    const { nome, emojiUnicode, idSentimentoModelo } = params
    return this.collection.add({
      idSentimentoModelo,
      nome,
      emojiUnicode
    })
  }
}
