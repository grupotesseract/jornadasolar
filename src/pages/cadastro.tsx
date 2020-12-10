import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import Identificacao from '../components/cadastro/Identificacao'
import DadosAutenticacao from '../components/cadastro/DadosAutenticacao'
import Objetivos from '../components/cadastro/Objetivos'
import { avancoDeEtapaSolicitado as avancoDeEtapaSolicitadoAction } from '../redux/cadastro'

const Cadastro: FC = () => {
  const dispatch = useDispatch()
  const { avancoDeEtapaSolicitado } = bindActionCreators(
    { avancoDeEtapaSolicitado: avancoDeEtapaSolicitadoAction },
    dispatch
  )

  const etapaAtual = useSelector(state => state.cadastro.etapa)

  const getEtapaCadastro = etapa => {
    switch (etapa) {
      case 1:
        return <Identificacao onAvancarButtonClick={avancoDeEtapaSolicitado} />
      case 2:
        return <Objetivos onAvancarButtonClick={avancoDeEtapaSolicitado} />
      case 3:
        return <DadosAutenticacao />
      default:
        return null
    }
  }

  return <>{getEtapaCadastro(etapaAtual)}</>
}

export default Cadastro
