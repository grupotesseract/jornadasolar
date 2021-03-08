import { IGrupoDeHabitos } from './GrupoDeHabitos'

interface IRegistroAttributes {
  id: string
  userId?: string
  date: Date
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGrupoDeHabitos>
  anotacoes?: string
}

export type IRegistro = IRegistroAttributes

export default class Registro implements IRegistro {
  public id: string
  public date: Date
  public userId: string
  public sentimentos: Array<string>
  public gruposDeHabitos: Array<IGrupoDeHabitos>
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
