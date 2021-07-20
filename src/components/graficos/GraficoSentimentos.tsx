import React, { FC } from 'react'
import { IRegistro } from '../../entities/Registro'
import GraficoBase from './GraficoBase'

interface IProps {
  diarios: Array<IRegistro>
  mesAtual: Date
}

const GraficoSentimentos: FC<IProps> = ({ diarios, mesAtual }) => {
  const sentimentosDoMes = diarios?.map(diario => diario.sentimentos).flat()

  const nomes = sentimentosDoMes.map(sentimento => sentimento.nome)
  return (
    <GraficoBase
      registrosDoMes={nomes}
      mesAtual={mesAtual}
      listaComEmojis={sentimentosDoMes}
      titulo="Acompanhe a frequência de cada emoção ao longo do mês:"
    />
  )
}

export default GraficoSentimentos
