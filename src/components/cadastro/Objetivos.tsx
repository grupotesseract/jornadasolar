import React, { FC, useState } from 'react'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import { Box, FormGroup } from '@material-ui/core'
import TextCheckbox from '../TextCheckbox'

interface IObjetivosProps {
  setEtapaAtual: (number) => void
}

const Objetivos: FC<IObjetivosProps> = ({ setEtapaAtual }) => {
  const [objetivos, setObjetivos] = useState([])
  // TODO: Substituir nome por dado dinâmico
  const nome = 'Rafael'

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
    setEtapaAtual(3)
  }

  return (
    <Layout
      textoBotao="Continuar"
      exibirBotao={objetivos.length > 0}
      onClickButton={handleOnClickButton}
    >
      <Titulo>É um prazer te conhecer, {nome}!</Titulo>

      <Box mt={5}>
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
