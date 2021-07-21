import { IHabito } from 'src/entities/Habito'
import { firestore } from '../../components/firebase/firebase.config'

interface Parameters {
  userId: string
  habito: IHabito
  grupoDeHabitoId: string
}

const CreateUserHabitos = async ({
  userId,
  habito,
  grupoDeHabitoId
}: Parameters) => {
  await firestore
    .collection(`user/${userId}/gruposDeHabitos/${grupoDeHabitoId}/habitos`)
    .add({
      idDoHabitoModelo: habito.id || null,
      nome: habito.nome,
      emojiUnicode: habito.emojiUnicode,
      posicao: habito.posicao || null
    })
    .catch(error => {
      throw new Error('Ocorreu um erro inesperado ao criar o hábito' + error)
    })
}

export default CreateUserHabitos
