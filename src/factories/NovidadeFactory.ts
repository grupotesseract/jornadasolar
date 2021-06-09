import Novidade, { INovidade } from '../entities/Novidade'

export interface INovidadeFactory {
  build(novidadeSnapshot: any): INovidade
}

export default class NovidadeFactory {
  build(novidadeSnapshot: any): INovidade {
    const { id } = novidadeSnapshot
    const dados = novidadeSnapshot.data()
    const { titulo, descricao, path, autoDispensar } = dados
    const dataInicio = dados.dataInicio.toDate()
    const dataFinal = dados.dataFinal.toDate()

    return new Novidade({
      id,
      titulo,
      descricao,
      path,
      dataInicio,
      dataFinal,
      autoDispensar
    })
  }
}
