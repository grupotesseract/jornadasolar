import React, { FC, useState } from 'react'
import { Box } from '@material-ui/core'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Habitos from '../diario/Habitos'

interface IEtapaHabitosProps {
  onAvancarButtonClick: (number) => void
}

const EtapaHabitos: FC<IEtapaHabitosProps> = ({ onAvancarButtonClick }) => {
  const [gruposDeHabitos, setGruposDeHabitos] = useState([
    {
      nome: 'social',
      habitos: []
    },
    {
      nome: 'Atividade física',
      habitos: []
    },
    {
      nome: 'sono',
      habitos: []
    },
    {
      nome: 'Alimentação',
      habitos: []
    },
    {
      nome: 'Saúde',
      habitos: []
    },
    {
      nome: 'Profissional',
      habitos: []
    },
    {
      nome: 'Tarefa',
      habitos: []
    },
    {
      nome: 'Sexo',
      habitos: []
    },
    {
      nome: 'Vício',
      habitos: []
    }
  ])

  const handleOnClickButton = () => {
    onAvancarButtonClick(5)
  }

  return (
    <Layout
      textoBotao="Só falta um passo!"
      exibirBotao={gruposDeHabitos.some(grupo => grupo.habitos.length)}
      onButtonClick={handleOnClickButton}
    >
      <Titulo>
        O que você fez
        <br />
        hoje?
      </Titulo>

      <Box mt="42px" maxWidth={360} pl="28px">
        <Habitos onChange={setGruposDeHabitos} values={gruposDeHabitos} />
      </Box>
    </Layout>
  )
}

export default EtapaHabitos
