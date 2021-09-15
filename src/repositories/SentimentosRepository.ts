import { firestore } from 'src/components/firebase/firebase.config'
import Sentimento, { ISentimento } from 'src/entities/Sentimento'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

export interface ISentimentosRepository {
  create(params: ICreateParameters): Promise<ISentimento>
  update(params: ISentimento): Promise<void>
  getUserSentimentos(id: string): Promise<Array<ISentimento>>
}
export default class SentimentosRepository implements ISentimentosRepository {
  private collection

  constructor(userId: string) {
    this.collection = firestore.collection(`user/${userId}/sentimentos`)
  }

  create(params: ICreateParameters): Promise<ISentimento> {
    const { nome, emojiUnicode, idSentimentoModelo } = params
    return this.collection
      .add({
        idSentimentoModelo: idSentimentoModelo || null,
        nome,
        emojiUnicode
      })
      .catch(error => {
        throw new Error(
          'Ocorreu um erro inesperado ao criar o sentimento' + error
        )
      })
  }

  async update(sentimento: ISentimento): Promise<void> {
    const { id } = sentimento
    const { nome, emojiUnicode } = sentimento
    console.log('sentimento', sentimento)
    await this.collection
      .doc(id)
      .update({ nome, emojiUnicode })
      .catch(error => {
        throw new Error(
          'Ocorreu um erro inesperado ao atualizar o sentimento' + error
        )
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

      return sentimentos.map(sentimento => new Sentimento(sentimento))
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os sentimentos do usuário.' + e
      )
    }
  }
}
