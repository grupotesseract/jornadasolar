import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import Identificacao from '../components/cadastro/Identificacao'
import DadosAutenticacao from '../components/cadastro/DadosAutenticacao'
import Objetivos from '../components/cadastro/Objetivos'
import { avancoDeEtapaSolicitado as avancoDeEtapaSolicitadoAction } from '../redux/cadastro'
import EtapaSentimentos from '../components/cadastro/EtapaSentimentos'
import EtapaHabitos from '../components/cadastro/EtapaHabitos'

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
        return (
          <EtapaSentimentos onAvancarButtonClick={avancoDeEtapaSolicitado} />
        )
      case 4:
        return <EtapaHabitos onAvancarButtonClick={avancoDeEtapaSolicitado} />
      case 5:
        return <DadosAutenticacao />
      default:
        return null
    }
  }

  return <>{getEtapaCadastro(etapaAtual)}</>
}

export default Cadastro
