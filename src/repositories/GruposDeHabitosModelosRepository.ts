import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import CreateHabitoModelo from 'src/services/habitosModelos/CreateHabitoModelo'
import GelAllHabitosModelos from 'src/services/habitosModelos/GelAllHabitosModelos'
import { firestore } from '../components/firebase/firebase.config'

export interface IGruposDeHabitosModelosRepository {
  add(params: IGrupoDeHabitos): boolean
  getAll(): Promise<Array<IGrupoDeHabitos>>
}

export default class GruposDeHabitosModelosRepository implements IGruposDeHabitosModelosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('gruposDeHabitosModelos')
  }

  add(params: IGrupoDeHabitos): boolean {
    try {
      const { nome, posicao, habitos } = params
      this.collection
        .add({
          nome,
          posicao
        })
        .then(docRef => {
          habitos.map(habito => new CreateHabitoModelo(docRef.id).call(habito))
        })
        .catch(e => {
          console.error('Erro ao adicionar o hábito modelo ', e)
        })
      return true
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao criar o grupo de hábito modelo' + e
      )
    }
  }

  async getAll(): Promise<Array<IGrupoDeHabitos>> {
    try {
      const querySnapshot = await this.collection
        .orderBy('posicao', 'asc')
        .get()

      const gruposDeHabitosModelos = []

      querySnapshot.forEach(grupoDeHabitoModelo => {
        const grupoDeHabitosModeloData = grupoDeHabitoModelo.data()

        const grupoDeHabitosModelo = {
          id: grupoDeHabitoModelo.id,
          nome: grupoDeHabitosModeloData.nome,
          posicao: grupoDeHabitosModeloData.posicao
        }

        gruposDeHabitosModelos.push(grupoDeHabitosModelo)
      })

      for (let index = 0; index < gruposDeHabitosModelos.length; index++) {
        const grupoDeHabitosModelo = gruposDeHabitosModelos[index]

        const habitos = await new GelAllHabitosModelos(
          grupoDeHabitosModelo.id
        ).call()
        grupoDeHabitosModelo.habitos = habitos
      }

      return gruposDeHabitosModelos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os grupos de hábitos modelos.' + e
      )
    }
  }
}
