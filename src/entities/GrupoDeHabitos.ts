import { IHabito } from './Habito'

interface IGrupoDeHabitosAttributes {
  id?: string
  idDoGrupoModelo?: string
  nome: string
  posicao?: number
  habitos: Array<IHabito>
}

export type IGrupoDeHabitos = IGrupoDeHabitosAttributes

export default class GrupoDeHabitos implements IGrupoDeHabitos {
  public id: string
  public idDoGrupoModelo: string
  public nome: string
  public posicao: number
  public habitos: Array<IHabito>

  constructor({
    id,
    idDoGrupoModelo,
    nome,
    posicao,
    habitos
  }: IGrupoDeHabitosAttributes) {
    this.id = id
    this.idDoGrupoModelo = idDoGrupoModelo
    this.nome = nome
    this.posicao = posicao
    this.habitos = habitos
  }
}
