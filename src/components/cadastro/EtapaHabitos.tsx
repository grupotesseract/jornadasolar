import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { Box } from '@material-ui/core'
import Layout from '../templates/Layout'
import Titulo from '../Titulo'
import HabitosCheckboxGroup from '../diario/HabitosCheckboxGroup'
import { avancoParaEtapa5Solicitado as avancoParaEtapa5SolicitadoAction } from '../../redux/cadastro'
import { getGrupoDeHabitosIniciais } from 'src/utils/getGrupoDeHabitosIniciais'

const EtapaHabitos: FC = () => {
  const dispatch = useDispatch()
  const { avancoParaEtapa5Solicitado } = bindActionCreators(
    { avancoParaEtapa5Solicitado: avancoParaEtapa5SolicitadoAction },
    dispatch
  )

  const [gruposDeHabitos, setGruposDeHabitos] = useState([])

  useEffect(() => {
    const buscarValoresIniciais = async () => {
      const valoresIniciais = await getGrupoDeHabitosIniciais()
      setGruposDeHabitos(valoresIniciais)
    }
    buscarValoresIniciais()
  }, [])

  const handleOnClickButton = () => {
    avancoParaEtapa5Solicitado({ gruposDeHabitos })
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

      <Box mt="42px" maxWidth={360}>
        <HabitosCheckboxGroup
          onChange={setGruposDeHabitos}
          values={gruposDeHabitos}
        />
      </Box>
    </Layout>
  )
}

export default EtapaHabitos
