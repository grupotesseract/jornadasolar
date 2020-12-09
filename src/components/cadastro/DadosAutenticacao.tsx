import React, { FC } from 'react'
import { Box } from '@material-ui/core/'
import Emoji from '../Emoji'
import TextField from '../TextField'
import PasswordTextField from '../PasswordTextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import InputLabel from '../InputLabel'
import RadioGroup from '../RadioGroup'

const DadosAutenticacao: FC = () => {
  const radioOptions = [
    { value: '1', label: 'Sim, tenho!' },
    { value: '2', label: 'Não tenho' },
    { value: '3', label: 'Não, mas quero saber mais' }
  ]

  return (
    <Layout textoBotao="Pronto!">
      <Titulo>
        Crie um cadastro e salve seus dados <Emoji nome="piscando" />
      </Titulo>

      <Box mt={5}>
        <InputLabel>Email</InputLabel>
        <TextField />

        <InputLabel>Senha</InputLabel>
        <PasswordTextField />

        <RadioGroup
          titulo="Você já tem o livro da Jornada Solar?"
          options={radioOptions}
        />
      </Box>
    </Layout>
  )
}
export default DadosAutenticacao
