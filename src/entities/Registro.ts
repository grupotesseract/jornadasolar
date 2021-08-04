import { IGrupoDeHabitos } from './GrupoDeHabitos'
import { ISentimento } from './Sentimento'

interface IRegistroAttributes {
  id: string
  userId?: string
  date: Date
  sentimentos?: Array<ISentimento>
  gruposDeHabitos?: Array<IGrupoDeHabitos>
  anotacoes?: string
}

export type IRegistro = IRegistroAttributes

export default class Registro implements IRegistro {
  public id: string
  public date: Date
  public userId: string
  public sentimentos: Array<ISentimento>
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
