import React, { FC } from 'react'
import Identificacao from '../components/cadastro/Identificacao'
import DadosAutenticacao from '../components/cadastro/DadosAutenticacao'

const Cadastro: FC = () => {
  return (
    <>
      <Identificacao />
      <DadosAutenticacao />
    </>
  )
}

export default Cadastro
