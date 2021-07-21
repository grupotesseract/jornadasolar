import Habito, { IHabito } from 'src/entities/Habito'
import { firestore } from '../../components/firebase/firebase.config'

const GetUserHabitoById = async ({
  userId,
  grupoDeHabitosId,
  id
}): Promise<IHabito> => {
  try {
    const habitoSnapshot = await firestore
      .collection(`user/${userId}/gruposDeHabitos/`)
      .doc(grupoDeHabitosId)
      .collection('habitos')
      .doc(id)
      .get()
    const HabitosData = habitoSnapshot.data()
    const habito = new Habito({
      id: habitoSnapshot.id,
      nome: HabitosData.nome,
      emojiUnicode: HabitosData.emojiUnicode
    })

    return habito
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao buscar o hábito:' + e)
  }
}

export default GetUserHabitoById
