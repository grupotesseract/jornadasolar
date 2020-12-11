import React, { FC } from 'react'
import { Box } from '@material-ui/core/'
import Emoji from '../components/Emoji'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import Layout from '../components/Layout'
import Titulo from '../components/Titulo'
import InputLabel from '../components/InputLabel'
import EsqueciMinhaSenha from '../components/login/EsqueciMinhaSenha'

const Login: FC = () => {
  return (
    <Layout textoBotao="Entrar">
      <Titulo>
        Oi! Que bom te ver por aqui <Emoji nome="feliz" />
      </Titulo>

      <Box mt={5}>
        <Box>
          <InputLabel>Email</InputLabel>
          <TextField />

          <InputLabel>Senha</InputLabel>
          <PasswordTextField />
        </Box>

        <EsqueciMinhaSenha />
      </Box>
    </Layout>
  )
}

export default Login
