interface INovidadeAttributes {
  id: string
  titulo: string
  descricao: string
  slug: string
  path: string
  dataInicio?: Date
  dataFinal?: Date
  autoDispensar?: boolean
}

export type INovidade = INovidadeAttributes

export default class Novidade implements INovidade {
  public id: string
  public titulo: string
  public descricao: string
  public slug: string
  public path: string
  public dataInicio?: Date
  public dataFinal?: Date
  public autoDispensar?: boolean

  constructor({
    id,
    titulo,
    descricao,
    slug,
    path,
    dataInicio,
    dataFinal,
    autoDispensar
  }: INovidadeAttributes) {
    this.id = id
    this.titulo = titulo
    this.descricao = descricao
    this.slug = slug
    this.path = path
    this.dataInicio = dataInicio
    this.dataFinal = dataFinal
    this.autoDispensar = autoDispensar
  }
}
