import { IHabito } from './Habito'

interface IGrupoDeHabitosAttributes {
  nome: string
  habitos: Array<IHabito>
}

export type IGrupoDeHabitos = IGrupoDeHabitosAttributes

export default class GrupoDeHabitos implements IGrupoDeHabitos {
  public nome: string
  public habitos: Array<IHabito>

  constructor({ nome, habitos }: IGrupoDeHabitosAttributes) {
    this.nome = nome
    this.habitos = habitos
  }
}
