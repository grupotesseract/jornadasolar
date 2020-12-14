import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import RadioGroup from '../RadioGroup'

interface IIdentificacaoProps {
  onAvancarButtonClick: (number) => void
}

const Identificacao: FC<IIdentificacaoProps> = ({ onAvancarButtonClick }) => {
  const radioOptions = [
    { value: 'ele', label: 'Ele' },
    { value: 'ela', label: 'Ela' }
  ]

  const handleOnButtonClick = () => {
    onAvancarButtonClick(2)
  }

  return (
    <Layout textoBotao="Continuar" onButtonClick={handleOnButtonClick}>
      <Titulo>
        Olá! Parabéns por começar sua jornada <Emoji nome="alegre" />
      </Titulo>

      <Box mt="21px">
        <Subtitulo>Para começar, como gostaria de ser chamado?</Subtitulo>
        <TextField />
      </Box>

      <RadioGroup
        titulo="E com qual pronome você se identifica?"
        options={radioOptions}
      />
    </Layout>
  )
}

export default Identificacao
