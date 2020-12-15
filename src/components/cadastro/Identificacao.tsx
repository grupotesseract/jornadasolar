import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'

interface IIdentificacaoProps {
  onAvancarButtonClick: (number) => void
}

const Identificacao: FC<IIdentificacaoProps> = ({ onAvancarButtonClick }) => {
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
    </Layout>
  )
}

export default Identificacao
