import { firestore, storage } from '../components/firebase/firebase.config'
import firebase from 'firebase/app'
import Meditacao, { IMeditacao } from 'src/entities/Meditacao'

interface ICreateParameters {
  nome: string
  file: File
}

interface IUpdateParameters {
  id: string
  nome?: string
  url?: string
  file?: File
}

interface IUploadFileParameters {
  id: string
  file: File
}

export interface IMeditacoesRepository {
  create(params): Promise<IMeditacao>
  update(params): Promise<IMeditacao>
  getById(id: string): Promise<IMeditacao>
  delete(id: string): Promise<boolean>
}

export default class MeditacoesRepository implements IMeditacoesRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('meditacoes')
  }

  async create(attributes: ICreateParameters): Promise<IMeditacao> {
    const { nome, file } = attributes
    const data = firebase.firestore.Timestamp.now()

    try {
      const { id } = await this.collection.add({ nome, data })
      const url = await this.uploadFile({ id, file })
      await this.update({ id, url })

      const meditacao = new Meditacao({
        id,
        nome,
        url,
        data: data.toDate().toLocaleDateString('pt-BR')
      })

      return meditacao
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao criar a meditaçao.')
    }
  }

  async update({ id, ...attributes }: IUpdateParameters): Promise<IMeditacao> {
    const payload = { ...attributes }
    if (attributes.file) {
      payload.url = await this.uploadFile({ id, file: attributes.file })
      delete payload.file
    }

    return this.collection
      .doc(id)
      .update(payload)
      .then(() => true)
      .catch(() => {
        throw new Error('Ocorreu um erro inesperado ao atualizar a meditação.')
      })
  }

  async getById(id: string): Promise<IMeditacao> {
    try {
      const documentSnapshot = await this.collection.doc(id).get()
      const meditacaoData = documentSnapshot.data()
      const meditacao = {
        id: documentSnapshot.id,
        nome: meditacaoData.nome,
        url: meditacaoData.url,
        data: meditacaoData.data.toDate().toLocaleDateString('pt-BR')
      }

      return meditacao
    } catch {
      throw new Error('Ocorreu um erro inesperado ao buscar meditação.')
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.doc(id).delete()
      const fileRef = storage.ref().child(`meditacoes/${id}`)
      await fileRef.delete()
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao deletar a meditação.')
    }
  }

  private async uploadFile({
    id,
    file
  }: IUploadFileParameters): Promise<string> {
    const fileRef = storage.ref().child(`meditacoes/${id}`)
    await fileRef.put(file)
    return await fileRef.getDownloadURL()
  }
}
