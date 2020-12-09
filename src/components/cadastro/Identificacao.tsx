import React, { FC } from 'react'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import RadioGroup from '../RadioGroup'

const Identificacao: FC = () => {
  const radioOptions = [
    { value: 'ele', label: 'Ele' },
    { value: 'ela', label: 'Ela' }
  ]

  return (
    <Layout textoBotao="Continuar">
      <Titulo>
        Olá! Parabéns por começar sua jornada <Emoji nome="feliz" />
      </Titulo>

      <Subtitulo>Para começar, como gostaria de ser chamado?</Subtitulo>

      <TextField />

      <RadioGroup
        titulo="E com qual pronome você se identifica?"
        options={radioOptions}
      />
    </Layout>
  )
}

export default Identificacao
