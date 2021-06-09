import { IHabito } from './Habito'

interface IGrupoDeHabitosAttributes {
  nome: string
  posicao?: number
  habitos: Array<IHabito>
}

export type IGrupoDeHabitos = IGrupoDeHabitosAttributes

export default class GrupoDeHabitos implements IGrupoDeHabitos {
  public nome: string
  public posicao: number
  public habitos: Array<IHabito>

  constructor({ nome, posicao, habitos }: IGrupoDeHabitosAttributes) {
    this.nome = nome
    this.posicao = posicao
    this.habitos = habitos
  }
}
