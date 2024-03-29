import React, { FC, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core/'
import Emoji from '../components/Emoji'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import Layout from '../components/templates/Layout'
import Titulo from '../components/Titulo'
import InputLabel from '../components/InputLabel'
import EsqueciMinhaSenha from '../components/login/EsqueciMinhaSenha'
import { getMessageFromCode } from '../utils/firebaseAuth'
import { withGuest } from 'src/components/hocs/withAuth'
import SignInUser from 'src/services/user/SignInUser'

const Login: FC = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState(null)

  const onChangeEmail = ({ target: { value } }) =>
    setEmail(value.trim().toLowerCase())

  const onChangePassword = ({ target: { value } }) => setPassword(value)

  const handleLogin = async () => {
    setLoading(true)
    setErro('')
    try {
      await new SignInUser().call(email, password)
    } catch (e) {
      setErro(getMessageFromCode(e.code))
    }
    setLoading(false)
  }

  return (
    <Layout
      onButtonClick={handleLogin}
      textoBotao={loading ? <CircularProgress color="secondary" /> : 'Entrar'}
    >
      <Titulo>
        Oi! Que bom te ver por aqui <Emoji nome="alegre" />
      </Titulo>

      <Box mt={5}>
        <Box>
          <InputLabel error={erro?.email}>Email</InputLabel>
          <TextField
            value={email}
            onChange={onChangeEmail}
            helperText={erro?.email}
            error={erro?.email}
            data-cy="login_usuario"
          />
          <InputLabel error={erro?.password}>Senha</InputLabel>
          <PasswordTextField
            value={password}
            onChange={onChangePassword}
            helperText={erro?.password}
            error={erro?.password}
            data-cy="login_password"
          />
        </Box>

        <EsqueciMinhaSenha />
      </Box>
    </Layout>
  )
}

export default withGuest(Login)
