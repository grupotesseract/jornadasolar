import React, { FC, useState } from 'react'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import { Box } from '@material-ui/core'
import Sentimentos from '../diario/Sentimentos'

interface IEtapaSentimentosProps {
  onAvancarButtonClick: (number) => void
}

const EtapaSentimentos: FC<IEtapaSentimentosProps> = ({
  onAvancarButtonClick
}) => {
  const [sentimentos, setSentimentos] = useState([])

  const handleOnClickButton = () => {
    onAvancarButtonClick(4)
  }

  return (
    <Layout
      textoBotao="Continuar"
      exibirBotao={sentimentos.length > 0}
      onButtonClick={handleOnClickButton}
    >
      <Titulo>Legal, vamos te ajudar com isso!</Titulo>

      <Box mt="58px">
        <Subtitulo>Como você está se sentindo nesse momento?</Subtitulo>

        <Sentimentos onCheckboxClick={setSentimentos} values={sentimentos} />
      </Box>
    </Layout>
  )
}

export default EtapaSentimentos
