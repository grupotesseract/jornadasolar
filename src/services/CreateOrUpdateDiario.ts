import { firestore } from '../components/firebase/firebase.config'
import { IDiario } from './GetUserDiarioByDate'

type Parameters = {
  id: string
  date: Date
  userId: string
  atributos: IDiario
}

const CreateOrUpdateDiario = async ({
  id,
  date,
  userId,
  atributos
}: Parameters): Promise<boolean> => {
  try {
    if (id) {
      await firestore.collection('diario').doc(id).update(atributos)
    } else {
      await firestore.collection('diario').add({
        date,
        userId,
        ...atributos
      })
    }
    return true
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao salvar o diário.')
  }
}

export default CreateOrUpdateDiario
