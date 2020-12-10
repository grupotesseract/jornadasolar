import React, { FC, useState } from 'react'
import Identificacao from '../components/cadastro/Identificacao'
import DadosAutenticacao from '../components/cadastro/DadosAutenticacao'
import Objetivos from '../components/cadastro/Objetivos'

const Cadastro: FC = () => {
  const [etapaAtual, setEtapaAtual] = useState(1)

  const getEtapaCadastro = etapa => {
    switch (etapa) {
      case 1:
        return <Identificacao setEtapaAtual={setEtapaAtual} />
      case 2:
        return <Objetivos setEtapaAtual={setEtapaAtual} />
      case 3:
        return <DadosAutenticacao />
      default:
        return null
    }
  }

  return <>{getEtapaCadastro(etapaAtual)}</>
}

export default Cadastro
