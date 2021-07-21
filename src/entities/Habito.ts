import UnicodeToEmoji from '../services/UnicodeToEmoji'

interface IhabitoAttributes {
  emoji?: string
  id?: string
  userId?: string
  nome: string
  emojiUnicode: Array<string>
  posicao?: number
}

export type IHabito = IhabitoAttributes

export default class Habito implements IHabito {
  public id: string
  public userId: string
  public nome: string
  public emojiUnicode: Array<string>
  public posicao: number

  constructor({ id, userId, nome, emojiUnicode, posicao }: IhabitoAttributes) {
    this.id = id
    this.userId = userId
    this.nome = nome
    this.emojiUnicode = emojiUnicode
    this.posicao = posicao
  }

  get emoji(): string {
    return new UnicodeToEmoji().call(this.emojiUnicode)
  }
}
