import React, { FC } from 'react'

interface IEmojiProps {
  nome: string
}

const Emoji: FC<IEmojiProps> = ({ nome }) => {
  const emojis = {
    feliz: '😃'
  }

  return (
    <span role="img" aria-label={nome} aria-hidden>
      {emojis[nome]}
    </span>
  )
}

export default Emoji
