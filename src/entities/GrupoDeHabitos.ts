import { IHabito } from './Habito'

interface IGrupoDeHabitosAttributes {
  id?: string
  nome: string
  posicao?: number
  habitos: Array<IHabito>
}

export type IGrupoDeHabitos = IGrupoDeHabitosAttributes

export default class GrupoDeHabitos implements IGrupoDeHabitos {
  public id: string
  public nome: string
  public posicao: number
  public habitos: Array<IHabito>

  constructor({ id, nome, posicao, habitos }: IGrupoDeHabitosAttributes) {
    this.id = id
    this.nome = nome
    this.posicao = posicao
    this.habitos = habitos
  }
}
