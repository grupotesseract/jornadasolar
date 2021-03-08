import React, { FC } from 'react'
import Emoji from './Emoji'

interface IProps {
  emoji: string
  nome: string
  className?: string
}

const EmojiComNome: FC<IProps> = ({ emoji, nome, className }) => (
  <>
    <Emoji nome={emoji} /> <span className={className}>{nome}</span>
  </>
)

export default EmojiComNome
