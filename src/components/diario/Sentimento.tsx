import React, { FC } from 'react'
import EmojiComNome from '../EmojiComNome'

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

const Sentimento: FC<IProps> = ({ nome, className }) => (
  <EmojiComNome lista={sentimentos} nome={nome} className={className} />
)

export default Sentimento
