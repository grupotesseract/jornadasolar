import React, { FC } from 'react'
import { IRegistro } from '../../entities/Registro'
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

  const listaDeHabitosComEmojis = habitosDoMes
    .map(habito => ({ nome: habito.nome, emoji: habito.emoji }))
    .flat()

  const habitosDoMesAsStrings = habitosDoMes.map(habito => habito.nome)

  return (
    <BaseGraficos
      registrosDoMes={habitosDoMesAsStrings}
      mesAtual={mesAtual}
      listaComEmojis={listaDeHabitosComEmojis}
      titulo="Esses hábitos tiveram o maior impacto em sua vida neste mês:"
    />
  )
}

export default GraficoHabitos
