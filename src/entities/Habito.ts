import UnicodeToEmoji from '../services/UnicodeToEmoji'

interface IhabitoAttributes {
  emoji?: string
  id?: string
  userId?: string
  nome: string
  emojiUnicode: Array<string>
}

export type IHabito = IhabitoAttributes

export default class Habito implements IHabito {
  public id: string
  public userId: string
  public nome: string
  public emojiUnicode: Array<string>

  constructor({ id, userId, nome, emojiUnicode }: IhabitoAttributes) {
    this.id = id
    this.userId = userId
    this.nome = nome
    this.emojiUnicode = emojiUnicode
  }

  get emoji(): string {
    return new UnicodeToEmoji().call(this.emojiUnicode)
  }
}
