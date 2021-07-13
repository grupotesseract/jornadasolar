import { ISentimento } from 'src/entities/Sentimento'
import { firestore } from '../components/firebase/firebase.config'

export interface ISentimentosModelosRepository {
  getAll(): Promise<Array<ISentimento>>
}

export default class SentimentosModelosRepository
  implements ISentimentosModelosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('sentimentosModelos')
  }

  async getAll(): Promise<Array<ISentimento>> {
    try {
      const querySnapshot = await this.collection.get()

      const sentimentosModelos = []

      querySnapshot.forEach(sentimento => {
        const dados = sentimento.data()

        const sentimentoModelo = {
          id: sentimento.id,
          nome: dados.nome,
          emojiUnicode: dados.emojiUnicode
        }

        sentimentosModelos.push(sentimentoModelo)
      })
      return sentimentosModelos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os sentimentos modelos.' + e
      )
    }
  }
}
