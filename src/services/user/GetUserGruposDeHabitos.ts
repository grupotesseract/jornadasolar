import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import { firestore } from '../../components/firebase/firebase.config'

const GetUserGruposDeHabitos = async (
  userId: string
): Promise<Array<IGrupoDeHabitos>> => {
  try {
    const querySnapshot = await firestore
      .collection(`user/${userId}/gruposDeHabitos`)
      .orderBy('posicao', 'asc')
      .get()

    const gruposDeHabitos = []

    querySnapshot.forEach(grupoDeHabitoModelo => {
      const grupoDeHabitosData = grupoDeHabitoModelo.data()

      const grupoDeHabitos = {
        id: grupoDeHabitoModelo.id,
        idDoGrupoModelo: grupoDeHabitosData.idDoGrupoModelo,
        nome: grupoDeHabitosData.nome,
        posicao: grupoDeHabitosData.posicao
      }

      gruposDeHabitos.push(grupoDeHabitos)
    })

    for (let index = 0; index < gruposDeHabitos.length; index++) {
      const grupoDeHabitos = gruposDeHabitos[index]
      const habitosSnapshot = await firestore
        .collection(`user/${userId}/gruposDeHabitos/`)
        .doc(grupoDeHabitos.id)
        .collection('habitos')
        .orderBy('posicao', 'asc')
        .get()
      const habitos = []
      habitosSnapshot.forEach(habitoModelo => {
        const habitoData = habitoModelo.data()
        const habito = {
          id: habitoModelo.id,
          nome: habitoData.nome,
          emojiUnicode: habitoData.emojiUnicode,
          posicao: habitoData.posicao
        }

        habitos.push(habito)
      })
      grupoDeHabitos.habitos = habitos
    }

    return gruposDeHabitos
  } catch (e) {
    throw new Error(
      'Ocorreu um erro inesperado ao buscar os grupos de hábitos.'
    )
  }
}

export default GetUserGruposDeHabitos
