import { firestore } from 'src/components/firebase/firebase.config'
import { ISentimento } from 'src/entities/Sentimento'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

export interface ISentimentosRepository {
  create(params: ICreateParameters): Promise<ISentimento>
  getUserSentimentos(id: string): Promise<Array<ISentimento>>
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

  async getUserSentimentos(id: string): Promise<Array<ISentimento>> {
    try {
      const querySnapshot = await firestore
        .collection(`user/${id}/sentimentos`)
        .get()
      const sentimentos = []
      querySnapshot.forEach(sentimento => {
        const dados = sentimento.data()
        sentimentos.push({ id: sentimento.id, ...dados })
      })

      return sentimentos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os sentimentos do usuário.' + e
      )
    }
  }
}
