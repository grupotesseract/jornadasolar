import { firestore } from '../components/firebase/firebase.config'

type Parameters = {
  userId?: string | null
  dataInicial: Date
  dataFinal: Date
}

export interface IGruposDeHabitos {
  nome: string
  habitos: Array<string>
}

export interface IDiario {
  id: string
  date: Date
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGruposDeHabitos>
  anotacoes: string
}

const GetUserDiariosByDateRange = async ({
  userId,
  dataInicial,
  dataFinal
}: Parameters): Promise<Array<IDiario>> => {
  const diarios = []
  if (!userId) {
    return diarios
  }
  try {
    const querySnapshot = await firestore
      .collection('diario')
      .where('userId', '==', userId)
      .where('date', '>=', dataInicial)
      .where('date', '<=', dataFinal)
      .get()
    querySnapshot.forEach(diarioSnapshot => {
      const diariosData = diarioSnapshot.data()
      const diario = {
        id: diarioSnapshot.id,
        date: diariosData.date.toDate(),
        sentimentos: diariosData.sentimentos,
        gruposDeHabitos: diariosData.gruposDeHabitos,
        anotacoes: diariosData.anotacoes
      }

      diarios.push(diario)
    })
    return diarios
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao buscar os diarios.')
  }
}

export default GetUserDiariosByDateRange
