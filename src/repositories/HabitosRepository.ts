import { IHabito } from 'src/entities/Habito'
import { firestore } from '../components/firebase/firebase.config'
import Habito from '../entities/Habito'

export interface ICreateParameters {
  userId: string
  nome: string
  emojiUnicode: Array<string>
}

export interface IHabitosRepository {
  add(params): Promise<string>
  getAllByUserId(userId: string): Promise<Array<IHabito>>
  update(id, values): boolean
  getById(id: string): Promise<IHabito>
}

export default class HabitosRepository implements IHabitosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('habitos')
  }

  async add(attributes: ICreateParameters): Promise<string> {
    try {
      const { id } = await this.collection.add(attributes)
      return id
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao criar o hábito')
    }
  }

  update(id: string, values: Record<string, unknown>): boolean {
    try {
      this.collection.doc(id).update(values)
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao atualizar o hábito')
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

  async getById(id: string): Promise<IHabito> {
    try {
      const habitoSnapshot = await this.collection.doc(id).get()
      const HabitosData = habitoSnapshot.data()
      const habito = new Habito({
        id: habitoSnapshot.id,
        userId: HabitosData.userId,
        nome: HabitosData.nome,
        emojiUnicode: HabitosData.emojiUnicode
      })

      return habito
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao buscar o hábito:' + e)
    }
  }
}
