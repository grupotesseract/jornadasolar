import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Identificacao from '../components/cadastro/Identificacao'
import DadosAutenticacao from '../components/cadastro/DadosAutenticacao'
import Objetivos from '../components/cadastro/Objetivos'
import EtapaSentimentos from '../components/cadastro/EtapaSentimentos'
import EtapaHabitos from '../components/cadastro/EtapaHabitos'

const Cadastro: FC = () => {
  const etapaAtual = useSelector(state => state.cadastro.etapa)

  const getEtapaCadastro = etapa => {
    switch (etapa) {
      case 1:
        return <Identificacao />
      case 2:
        return <Objetivos />
      case 3:
        return <EtapaSentimentos />
      case 4:
        return <EtapaHabitos />
      case 5:
        return <DadosAutenticacao />
      default:
        return null
    }
  }

  return <>{getEtapaCadastro(etapaAtual)}</>
}

export default Cadastro
