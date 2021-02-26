import { endOfDay, startOfDay } from 'date-fns'
import { firestore } from '../components/firebase/firebase.config'
import { IRegistro, IGruposDeHabitos } from '../entities/Registro'

export interface ICreateParameters {
  date: Date
  userId: string
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGruposDeHabitos>
  anotacoes?: string
}

interface IUpdateParameters extends ICreateParameters {
  id: string
  attributes: string
}

export interface IRegistrosRepository {
  add(params): boolean
  update(params): boolean
  getByDate(userId, date): Promise<IRegistro>
  getByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<IRegistro>>
}

export default class RegistrosRepository implements IRegistrosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('diario')
  }

  add(attributes: ICreateParameters): boolean {
    try {
      this.collection.add(attributes)
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao criar o registro do dia.')
    }
  }

  update({ id, attributes }: IUpdateParameters): boolean {
    try {
      this.collection.doc(id).update(attributes)
      return true
    } catch {
      throw new Error(
        'Ocorreu um erro inesperado ao atualizar o registro do dia.'
      )
    }
  }

  async getByDate(userId: string, date: Date): Promise<IRegistro> {
    const Registros = await this.getByDateRange(
      userId,
      startOfDay(date),
      endOfDay(date)
    )
    if (Registros) {
      return Registros[0]
    } else {
      return null
    }
  }

  async getByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<IRegistro>> {
    const registrosDoDia = []
    if (!userId) {
      return null
    }
    try {
      const querySnapshot = await this.collection
        .where('userId', '==', userId)
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get()
      querySnapshot.forEach(RegistroSnapshot => {
        const RegistrosData = RegistroSnapshot.data()
        const Registros = {
          id: RegistroSnapshot.id,
          date: RegistrosData.date.toDate(),
          sentimentos: RegistrosData.sentimentos,
          gruposDeHabitos: RegistrosData.gruposDeHabitos,
          anotacoes: RegistrosData.anotacoes
        }

        registrosDoDia.push(Registros)
      })
      return registrosDoDia
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os registros do dia.'
      )
    }
  }
}
