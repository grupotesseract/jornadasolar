export interface IGruposDeHabitos {
  nome: string
  habitos: Array<string>
}

interface IRegistroAttributes {
  id: string
  userId?: string
  date: Date
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGruposDeHabitos>
  anotacoes?: string
}

export type IRegistro = IRegistroAttributes

export default class Registro implements IRegistro {
  public id: string
  public date: Date
  public userId: string
  public sentimentos: Array<string>
  public gruposDeHabitos: Array<IGruposDeHabitos>
  public anotacoes: string

  constructor({
    id,
    userId,
    date,
    sentimentos,
    gruposDeHabitos,
    anotacoes
  }: IRegistroAttributes) {
    this.id = id
    this.userId = userId
    this.date = date
    this.sentimentos = sentimentos
    this.gruposDeHabitos = gruposDeHabitos
    this.anotacoes = anotacoes
  }
}
