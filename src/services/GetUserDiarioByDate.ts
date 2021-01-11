import { firestore } from '../components/firebase/firebase.config'
import { endOfDay, startOfDay } from 'date-fns'

type Parameters = {
  userId: string
  date: Date
}

export interface IGruposDeHabitos {
  nome: string
  habitos: Array<string>
}

export interface IDiario {
  id?: string
  date?: Date
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGruposDeHabitos>
  anotacoes?: string
}

const GetUserDiarioByDate = async ({
  userId,
  date
}: Parameters): Promise<IDiario> => {
  if (!userId || !date) {
    return null
  }
  try {
    const querySnapshot = await firestore
      .collection('diario')
      .where('userId', '==', userId)
      .where('date', '>=', startOfDay(date))
      .where('date', '<=', endOfDay(date))
      .limit(1)
      .get()
    let diario
    querySnapshot.forEach(diarioSnapshot => {
      const diarioData = diarioSnapshot.data()

      diario = {
        id: diarioSnapshot.id,
        date: diarioData.date.toDate(),
        sentimentos: diarioData.sentimentos,
        gruposDeHabitos: diarioData.gruposDeHabitos,
        anotacoes: diarioData.anotacoes
      }
    })

    return diario
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao buscar o diario.')
  }
}

export default GetUserDiarioByDate
