import { IHabito } from 'src/entities/Habito'
import { firestore } from '../../components/firebase/firebase.config'

interface Parameters {
  userId: string
  habito: IHabito
  grupoDeHabitoId: string
  idDoHabitoPersonalizado: string
}

const CreateUserHabitos = async ({
  userId,
  habito,
  grupoDeHabitoId,
  idDoHabitoPersonalizado
}: Parameters) => {
  // TODO: Após migrar usar .add ao inves de .doc().set() já que não teremos o idDoHabitoPersonalizado
  await firestore
    .collection(`user/${userId}/gruposDeHabitos/${grupoDeHabitoId}/habitos`)
    .doc(idDoHabitoPersonalizado)
    .set({
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
