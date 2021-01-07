import React, { FC } from 'react'
import Emoji from './Emoji'

type ListaEmojisComNome = {
  nome: string
  emoji: string
}

interface IProps {
  nome: string
  className?: string
  lista: ListaEmojisComNome[]
}

const EmojiComNome: FC<IProps> = ({ lista, className, nome }) => {
  const item = lista.find(item => item.nome === nome)

  return (
    <>
      <Emoji nome={item.emoji} /> <span className={className}>{item.nome}</span>
    </>
  )
}

export default EmojiComNome
