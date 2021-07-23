import UnicodeToEmoji from '../services/UnicodeToEmoji'

interface ISentimentoAttributes {
  emoji: string
  id?: string
  nome: string
  emojiUnicode: Array<string>
  idSentimentoModelo?: string
}

export type ISentimento = ISentimentoAttributes

export default class Sentimento implements ISentimento {
  public id: string
  public nome: string
  public emojiUnicode: Array<string>
  public idSentimentoModelo?: string

  constructor({
    id,
    nome,
    emojiUnicode,
    idSentimentoModelo
  }: ISentimentoAttributes) {
    this.id = id
    this.nome = nome
    this.emojiUnicode = emojiUnicode
    this.idSentimentoModelo = idSentimentoModelo
  }

  get emoji(): string {
    return new UnicodeToEmoji().call(this.emojiUnicode)
  }
}
