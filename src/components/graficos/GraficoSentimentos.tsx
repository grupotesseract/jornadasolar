import React, { FC } from 'react'
import { sentimentos as listaDeSentimentosComEmojis } from '../diario/Sentimento'
import { IRegistro } from '../../entities/Registro'
import GraficoBase from './GraficoBase'

interface IProps {
  diarios: Array<IRegistro>
  mesAtual: Date
}

const GraficoSentimentos: FC<IProps> = ({ diarios, mesAtual }) => {
  const sentimentosDoMes = diarios
    ?.map(diario => diario.sentimentos)
    .flat()
    .filter(sentimento => Boolean(sentimento))

  return (
    <GraficoBase
      registrosDoMes={sentimentosDoMes}
      mesAtual={mesAtual}
      listaComEmojis={listaDeSentimentosComEmojis}
      titulo="Acompanhe a frequência de cada emoção ao longo do mês:"
    />
  )
}

export default GraficoSentimentos
