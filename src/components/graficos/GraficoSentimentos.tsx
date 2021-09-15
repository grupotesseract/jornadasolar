import React, { FC } from 'react'
import { IRegistro } from '../../entities/Registro'
import GraficoBase from './GraficoBase'

interface IProps {
  diarios: Array<IRegistro>
  mesAtual: Date
}

const GraficoSentimentos: FC<IProps> = ({ diarios, mesAtual }) => {
  const sentimentosDoMes = diarios?.map(diario => diario.sentimentos).flat()
  const sentimentoscomEmojis = sentimentosDoMes.map(sentimento => {
    return { nome: sentimento.nome, emoji: sentimento.emoji }
  })
  const nomes = sentimentosDoMes.map(sentimento => sentimento.nome)
  return (
    <GraficoBase
      registrosDoMes={nomes}
      mesAtual={mesAtual}
      listaComEmojis={sentimentoscomEmojis}
      titulo="Acompanhe a frequência de cada emoção ao longo do mês:"
    />
  )
}

export default GraficoSentimentos
