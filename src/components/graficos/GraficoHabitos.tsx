import React, { FC } from 'react'
import { IRegistro } from '../../entities/Registro'
import { gruposDeHabitos } from '../diario/Habito'
import BaseGraficos from './GraficoBase'

interface IProps {
  diarios: Array<IRegistro>
  mesAtual: Date
}

const GraficoHabitos: FC<IProps> = ({ diarios, mesAtual }) => {
  const habitosDoMes = diarios
    ?.map(diario => diario?.gruposDeHabitos)
    .flat()
    .map(grupo => grupo?.habitos)
    .flat()
    .filter(habito => Boolean(habito))

  const listaDeHabitosComEmojis = gruposDeHabitos
    .map(grupo => grupo.habitos)
    .flat()

  return (
    <BaseGraficos
      registrosDoMes={habitosDoMes}
      mesAtual={mesAtual}
      listaComEmojis={listaDeHabitosComEmojis}
      titulo="Esses hábitos tiveram o maior impacto em sua vida neste mês:"
    />
  )
}

export default GraficoHabitos
