import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import { Box, FormGroup } from '@material-ui/core'
import TextCheckbox from '../TextCheckbox'
import { avancoParaEtapa3Solicitado as avancoParaEtapa3SolicitadoAction } from '../../redux/cadastro'

const Objetivos: FC = () => {
  const dispatch = useDispatch()
  const { avancoParaEtapa3Solicitado } = bindActionCreators(
    { avancoParaEtapa3Solicitado: avancoParaEtapa3SolicitadoAction },
    dispatch
  )

  const [objetivos, setObjetivos] = useState([])

  const nome = useSelector(state => state.cadastro.nome)

  const options = [
    'Autoconhecimento',
    'Monitorar hábitos',
    'Monitorar emoções',
    'Escrever sobre meu dia',
    'Outros'
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setObjetivos([...objetivos, event.target.value])
    } else {
      const novosObjetivos = objetivos.filter(
        objetivo => objetivo !== event.target.value
      )
      setObjetivos(novosObjetivos)
    }
  }

  const handleOnClickButton = () => {
    avancoParaEtapa3Solicitado({ objetivos })
  }

  return (
    <Layout
      textoBotao="Continuar"
      exibirBotao={objetivos.length > 0}
      onButtonClick={handleOnClickButton}
    >
      <Titulo>É um prazer te conhecer, {nome}!</Titulo>

      <Box mt="58px">
        <Subtitulo>Quais são seus principais objetivos?</Subtitulo>

        <FormGroup>
          {options.map(option => (
            <TextCheckbox
              key={`objetivo-${option}`}
              icon={<span style={{ marginLeft: 10 }}>{option}</span>}
              checkedIcon={<span style={{ marginLeft: 10 }}>{option}</span>}
              value={option}
              name={option}
              onChange={handleChange}
            />
          ))}
        </FormGroup>
      </Box>
    </Layout>
  )
}

export default Objetivos
