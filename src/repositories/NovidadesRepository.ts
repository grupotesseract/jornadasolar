import { firestore } from '../components/firebase/firebase.config'
import Novidade, { INovidade } from 'src/entities/Novidade'
import NovidadeFactory from 'src/factories/NovidadeFactory'

export interface ICreateParameters {
  titulo: string
  descricao: string
  path: string
  dataInicio: Date
  dataFinal: Date
  autoDispensar: boolean
}

export interface INovidadesRepository {
  create(attributes: ICreateParameters): Promise<INovidade>
  update(attributes: INovidade): Promise<INovidade>
  delete(id: string): Promise<boolean>
  getById(id: string): Promise<INovidade>
  getByDateAndPath(date: Date, path: string): Promise<Array<INovidade>>
  getAll(): Promise<Array<INovidade>>
}

export default class NovidadesRepository implements INovidadesRepository {
  private collection
  private factory

  constructor() {
    this.collection = firestore.collection('novidades')
    this.factory = new NovidadeFactory()
  }

  async create(attributes: ICreateParameters): Promise<INovidade> {
    try {
      const { id } = await this.collection.add(attributes)
      const novidade = new Novidade({ id, ...attributes })
      return novidade
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao criar a novidade: ' + error
      )
    }
  }

  async update({ id, ...attributes }: INovidade): Promise<INovidade> {
    return this.collection
      .doc(id)
      .update(attributes)
      .then(() => true)
      .catch(error => {
        throw new Error(
          'Ocorreu um erro inesperado ao atualizar a novidade: ' + error
        )
      })
  }

  async getById(id: string): Promise<INovidade> {
    try {
      const novidadeSnapshot = await this.collection.doc(id).get()
      const novidade = this.factory.build(novidadeSnapshot)

      return novidade
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar a novidade: ' + error
      )
    }
  }

  async getByDateAndPath(date: Date, path: string): Promise<Array<INovidade>> {
    const novidadesNoPeriodo = []
    try {
      const novidadeSnapshot = await this.collection
        .where('path', '==', path)
        .where('dataInicio', '<=', date)
        .orderBy('dataInicio', 'desc')
        .get()
      novidadeSnapshot.forEach(registroSnapshot => {
        novidadesNoPeriodo.push(this.factory.build(registroSnapshot))
      })
      return novidadesNoPeriodo.filter(novidade => novidade.dataFinal >= date)
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar as novidades: ' + error
      )
    }
  }

  async getAll(): Promise<Array<INovidade>> {
    const novidadesNoPeriodo = []
    try {
      const novidadeSnapshot = await this.collection
        .orderBy('dataInicio', 'desc')
        .get()
      novidadeSnapshot.forEach(registroSnapshot => {
        novidadesNoPeriodo.push(this.factory.build(registroSnapshot))
      })
      return novidadesNoPeriodo
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar as novidades: ' + error
      )
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.doc(id).delete()
      return true
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao excluir a novidade: ' + error
      )
    }
  }
}
