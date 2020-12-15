import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { Box } from '@material-ui/core'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import { avancoParaEtapa2Solicitado as avancoParaEtapa2SolicitadoAction } from '../../redux/cadastro'

const Identificacao: FC = () => {
  const dispatch = useDispatch()
  const { avancoParaEtapa2Solicitado } = bindActionCreators(
    { avancoParaEtapa2Solicitado: avancoParaEtapa2SolicitadoAction },
    dispatch
  )

  const [nome, setNome] = useState('')

  const handleOnButtonClick = () => {
    avancoParaEtapa2Solicitado({ nome })
  }

  const onChangeNome = ({ target: { value } }) => setNome(value)

  return (
    <Layout
      textoBotao="Continuar"
      exibirBotao={Boolean(nome)}
      onButtonClick={handleOnButtonClick}
    >
      <Titulo>
        Olá! Parabéns por começar sua jornada <Emoji nome="alegre" />
      </Titulo>

      <Box mt="21px">
        <Subtitulo>Para começar, como gostaria de ser chamado?</Subtitulo>
        <TextField value={nome} onChange={onChangeNome} />
      </Box>
    </Layout>
  )
}

export default Identificacao
