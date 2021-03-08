import { IHabito } from 'src/entities/Habito'
import { firestore } from '../components/firebase/firebase.config'
import Habito from '../entities/Habito'

export interface ICreateParameters {
  userId: string
  nome: string
  emojiUnicode: Array<string>
}

export interface IHabitosRepository {
  add(params): boolean
  getAllByUserId(userId: string): Promise<Array<IHabito>>
}

export default class HabitosRepository implements IHabitosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('habitos')
  }

  add(attributes: ICreateParameters): boolean {
    try {
      this.collection.add(attributes)
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao criar o hábito')
    }
  }

  async getAllByUserId(userId: string): Promise<Array<IHabito>> {
    const habitos = []
    if (!userId) {
      return null
    }
    try {
      const querySnapshot = await this.collection
        .where('userId', '==', userId)
        .get()
      querySnapshot.forEach(HabitoSnapshot => {
        const HabitosData = HabitoSnapshot.data()
        const habito = new Habito({
          id: HabitoSnapshot.id,
          userId: HabitosData.userId,
          nome: HabitosData.nome,
          emojiUnicode: HabitosData.emojiUnicode
        })

        habitos.push(habito)
      })
      return habitos
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao buscar os hábitos.')
    }
  }
}
