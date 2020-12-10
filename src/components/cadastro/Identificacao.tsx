import React, { FC } from 'react'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import Subtitulo from '../Subtitulo'
import RadioGroup from '../RadioGroup'

interface IIdentificacaoProps {
  setEtapaAtual: (number) => void
}

const Identificacao: FC<IIdentificacaoProps> = ({ setEtapaAtual }) => {
  const radioOptions = [
    { value: 'ele', label: 'Ele' },
    { value: 'ela', label: 'Ela' }
  ]

  const handleOnclickButton = () => {
    setEtapaAtual(2)
  }

  return (
    <Layout textoBotao="Continuar" onClickButton={handleOnclickButton}>
      <Titulo>
        Olá! Parabéns por começar sua jornada <Emoji nome="feliz" />
      </Titulo>

      <Subtitulo>Para começar, como gostaria de ser chamado?</Subtitulo>

      <TextField />

      <RadioGroup
        titulo="E com qual pronome você se identifica?"
        options={radioOptions}
      />
    </Layout>
  )
}

export default Identificacao
