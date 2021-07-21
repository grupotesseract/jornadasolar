import { IHabito } from 'src/entities/Habito'
import { firestore } from '../../components/firebase/firebase.config'

interface Parameters {
  userId: string
  habito: IHabito
  grupoDeHabitoId: string
  id: string
}

const UpdateUserHabito = async ({
  userId,
  habito,
  grupoDeHabitoId,
  id
}: Parameters) => {
  await firestore
    .collection(`user/${userId}/gruposDeHabitos/${grupoDeHabitoId}/habitos`)
    .doc(id)
    .update(habito)
    .catch(error => {
      throw new Error(
        'Ocorreu um erro inesperado ao atualizar o hábito' + error
      )
    })
}

export default UpdateUserHabito
