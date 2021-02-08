import { firestore } from '../components/firebase/firebase.config'
import { IDiario } from './GetUserDiarioByDate'

type Parameters = {
  id: string
  date: Date
  userId: string
  atributos: IDiario
}

const CreateOrUpdateDiario = ({
  id,
  date,
  userId,
  atributos
}: Parameters): Promise<boolean> => {
  try {
    if (id) {
      firestore.collection('diario').doc(id).update(atributos)
    } else {
      firestore.collection('diario').add({
        date,
        userId,
        ...atributos
      })
    }
    return
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao salvar o diário.')
  }
}

export default CreateOrUpdateDiario
