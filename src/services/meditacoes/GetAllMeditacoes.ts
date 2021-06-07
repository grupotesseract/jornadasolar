import { firestore } from '../../components/firebase/firebase.config'

interface IMeditacao {
  id: string
  nome: string
  url: string
  data: Date
}

const GetAllMeditacoes = async (): Promise<Array<IMeditacao>> => {
  try {
    const querySnapshot = await firestore
      .collection('meditacoes')
      .orderBy('data', 'desc')
      .get()
    const meditacoes = []
    querySnapshot.forEach(meditacaoSnapshot => {
      const meditacaoData = meditacaoSnapshot.data()
      const meditacao = {
        id: meditacaoSnapshot.id,
        nome: meditacaoData.nome,
        url: meditacaoData.url,
        data: meditacaoData.data.toDate().toLocaleDateString('pt-BR')
      }

      meditacoes.push(meditacao)
    })

    return meditacoes
  } catch (e) {
    throw new Error('Ocorreu um erro inesperado ao buscar as meditações.')
  }
}

export default GetAllMeditacoes
