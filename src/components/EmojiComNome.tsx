import React, { FC } from 'react'
import Emoji from './Emoji'
import { IHabito } from '../entities/Habito'

type ListaEmojisComNome = {
  nome: string
  emoji: string
}

interface IProps {
  item: ListaEmojisComNome | IHabito
  className?: string
}

const EmojiComNome: FC<IProps> = ({ className, item }) => (
  <>
    <Emoji nome={item?.emoji} /> <span className={className}>{item?.nome}</span>
  </>
)

export default EmojiComNome
