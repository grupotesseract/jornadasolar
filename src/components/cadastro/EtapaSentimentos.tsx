import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import { Box } from '@material-ui/core'
import Sentimentos from '../diario/Sentimentos'
import { avancoParaEtapa4Solicitado as avancoParaEtapa4SolicitadoAction } from '../../redux/cadastro'

const EtapaSentimentos: FC = () => {
  const dispatch = useDispatch()
  const { avancoParaEtapa4Solicitado } = bindActionCreators(
    { avancoParaEtapa4Solicitado: avancoParaEtapa4SolicitadoAction },
    dispatch
  )

  const [sentimentos, setSentimentos] = useState([])

  const handleOnClickButton = () => {
    avancoParaEtapa4Solicitado({ sentimentos })
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
