import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import { firestore } from '../../components/firebase/firebase.config'

interface Parameters {
  userId: string
  grupoDeHabitos: IGrupoDeHabitos
}

const CreateUserGrupoDeHabitos = async ({
  userId,
  grupoDeHabitos
}: Parameters) => {
  const { id, nome, posicao, habitos } = grupoDeHabitos
  await firestore
    .collection(`user/${userId}/gruposDeHabitos`)
    .add({
      idDoGrupoModelo: id,
      nome,
      posicao
    })
    .then(docRef => {
      habitos.forEach(habito =>
        firestore
          .collection(`user/${userId}/gruposDeHabitos/${docRef.id}/habitos`)
          .add({
            idDoHabitoModelo: habito.id,
            nome: habito.nome,
            emojiUnicode: habito.emojiUnicode,
            posicao: habito.posicao
          })
      )
    })
    .catch(error => {
      throw new Error(
        'Ocorreu um erro inesperado ao criar o grupo de hábitos.' + error
      )
    })
}

export default CreateUserGrupoDeHabitos
