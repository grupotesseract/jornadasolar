import React, { FC } from 'react'
import EmojiComNome from '../EmojiComNome'

export const sentimentos = [
  { emoji: 'triste', nome: 'Triste' },
  { emoji: 'alegre', nome: 'Alegre' },
  { emoji: 'amedrontado', nome: 'Amedrontado' },
  { emoji: 'seguro', nome: 'Seguro' },
  { emoji: 'irritado', nome: 'Irritado' },
  { emoji: 'pacifico', nome: 'Pacífico' },
  { emoji: 'cansado', nome: 'Cansado' },
  { emoji: 'motivado', nome: 'Motivado' },
  { emoji: 'culpado', nome: 'Culpado' },
  { emoji: 'grato', nome: 'Grato' },
  { emoji: 'desanimado', nome: 'Desanimado' },
  { emoji: 'confiante', nome: 'Confiante' },
  { emoji: 'inseguro', nome: 'Inseguro' },
  { emoji: 'amoroso', nome: 'Amoroso' },
  { emoji: 'ansioso', nome: 'Ansioso' },
  { emoji: 'calmo', nome: 'Calmo' }
]

interface IProps {
  nome: string
  className?: string
}

const Sentimento: FC<IProps> = ({ nome, className }) => {
  const sentimento = sentimentos.find(
    sentimento => sentimento.nome.toLowerCase() === nome.toLowerCase()
  )
  return <EmojiComNome item={sentimento} className={className} />
}

export default Sentimento
