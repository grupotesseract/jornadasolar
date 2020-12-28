import React, { FC } from 'react'

interface IEmojiProps {
  nome: string
}

const Emoji: FC<IEmojiProps> = ({ nome }) => {
  const emojis = {
    alegre: '\u{1F603}',
    seguro: '\u{1F609}',
    triste: '\u{1F622}',
    amedrontado: '\u{1F630}',
    irritado: '\u{1F621}',
    pacifico: '\u{1F642}',
    cansado: '\u{1F971}',
    motivado: '\u{1F929}',
    culpado: '\u{1F613}',
    grato: '😊',
    desanimado: '\u{1F614}',
    confiante: '\u{1F929}',
    inseguro: '\u{1F629}',
    amoroso: '\u{1F970}',
    ansioso: '\u{1F92F}',
    calmo: '\u{1F60C}',
    lapis: '✏️'
  }

  return (
    <span role="img" aria-label={nome} aria-hidden>
      {emojis[nome]}
    </span>
  )
}

export default Emoji
