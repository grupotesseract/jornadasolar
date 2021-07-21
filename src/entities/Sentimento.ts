import UnicodeToEmoji from '../services/UnicodeToEmoji'

interface ISentimentoAttributes {
  emoji?: string
  id?: string
  nome: string
  emojiUnicode: Array<string>
}

export type ISentimento = ISentimentoAttributes

export default class Sentimento implements ISentimento {
  public id: string
  public nome: string
  public emojiUnicode: Array<string>

  constructor({ id, nome, emojiUnicode }: ISentimentoAttributes) {
    this.id = id
    this.nome = nome
    this.emojiUnicode = emojiUnicode
  }

  get emoji(): string {
    return new UnicodeToEmoji().call(this.emojiUnicode)
  }
}
