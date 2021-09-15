import React, { FC } from 'react'
import { ISentimento } from 'src/entities/Sentimento'
import EmojiComNome from '../EmojiComNome'
interface IProps {
  sentimento: ISentimento
  className?: string
}

const Sentimento: FC<IProps> = ({ sentimento, className }) => {
  return (
    <EmojiComNome
      emoji={sentimento?.emoji}
      nome={sentimento?.nome}
      className={className}
    />
  )
}

export default Sentimento
