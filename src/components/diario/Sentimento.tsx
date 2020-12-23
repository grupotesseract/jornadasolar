import React, { FC } from 'react'
import Emoji from '../Emoji'

export const sentimentos = [
  { emoji: 'triste', nome: 'triste' },
  { emoji: 'alegre', nome: 'alegre' },
  { emoji: 'amedrontado', nome: 'amedrontado' },
  { emoji: 'seguro', nome: 'seguro' },
  { emoji: 'irritado', nome: 'irritado' },
  { emoji: 'pacifico', nome: 'pacífico' },
  { emoji: 'cansado', nome: 'cansado' },
  { emoji: 'motivado', nome: 'motivado' },
  { emoji: 'culpado', nome: 'culpado' },
  { emoji: 'grato', nome: 'grato' },
  { emoji: 'desanimado', nome: 'desanimado' },
  { emoji: 'confiante', nome: 'confiante' },
  { emoji: 'inseguro', nome: 'inseguro' },
  { emoji: 'amoroso', nome: 'amoroso' },
  { emoji: 'ansioso', nome: 'ansioso' },
  { emoji: 'calmo', nome: 'calmo' }
]

interface IProps {
  nome: string
  className?: string
}

const Sentimento: FC<IProps> = ({ nome, className }) => {
  const sentimento = sentimentos.find(sentimento => sentimento.nome === nome)

  return (
    <>
      <Emoji nome={sentimento.emoji} />{' '}
      <span className={className}>{sentimento.nome}</span>
    </>
  )
}

export default Sentimento
