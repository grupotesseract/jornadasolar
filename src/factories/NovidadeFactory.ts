import Novidade, { INovidade } from '../entities/Novidade'

export interface INovidadeFactory {
  build(novidadeSnapshot: any): INovidade
}

export default class NovidadeFactory {
  build(novidadeSnapshot: any): INovidade {
    const { id } = novidadeSnapshot
    const {
      titulo,
      descricao,
      slug,
      path,
      autoDispensar
    } = novidadeSnapshot.data()
    const dataInicio = novidadeSnapshot.data().dataInicio.toDate()
    const dataFinal = novidadeSnapshot.data().dataFinal.toDate()

    return new Novidade({
      id,
      titulo,
      descricao,
      slug,
      path,
      dataInicio,
      dataFinal,
      autoDispensar
    })
  }
}
