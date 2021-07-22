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

    querySnapshot.forEach(grupoDeHabitoSnapshot => {
      const grupoDeHabitosData = grupoDeHabitoSnapshot.data()

      const grupoDeHabitos = {
        id: grupoDeHabitoSnapshot.id,
        idDoGrupoModelo: grupoDeHabitosData.idDoGrupoModelo,
        nome: grupoDeHabitosData.nome,
        posicao: grupoDeHabitosData.posicao
      }

      gruposDeHabitos.push(grupoDeHabitos)
    })

    for (let index = 0; index < gruposDeHabitos.length; index++) {
      const nomeOuPosicao =
        gruposDeHabitos[index].nome.toLowerCase() === 'personalizados'
          ? 'nome'
          : 'posicao'
      const grupoDeHabitos = gruposDeHabitos[index]
      const habitosSnapshot = await firestore
        .collection(`user/${userId}/gruposDeHabitos/`)
        .doc(grupoDeHabitos.id)
        .collection('habitos')
        .orderBy(nomeOuPosicao, 'asc')
        .get()
      const habitos = []
      habitosSnapshot.forEach(habitoSnapshot => {
        const habitoData = habitoSnapshot.data()
        const habito = {
          id: habitoSnapshot.id,
          idDoHabitoModelo: habitoData.idDoHabitoModelo || null,
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
