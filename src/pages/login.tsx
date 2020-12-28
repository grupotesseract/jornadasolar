import React, { FC, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core/'
import Emoji from '../components/Emoji'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import Layout from '../components/Layout'
import Titulo from '../components/Titulo'
import InputLabel from '../components/InputLabel'
import EsqueciMinhaSenha from '../components/login/EsqueciMinhaSenha'
import { useRouter } from 'next/dist/client/router'
import firebase from 'firebase/app'

const Login: FC = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const onChangeEmail = ({ target: { value } }) => setEmail(value)
  const onChangePassword = ({ target: { value } }) => setPassword(value)

  const handleLogin = async () => {
    setLoading(true)
    setErro('')
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      router.push('/diario')
    } catch (e) {
      const { message } = e
      setErro(message)
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
          <InputLabel>Email</InputLabel>
          <TextField value={email} onChange={onChangeEmail} helperText={erro} />

          <InputLabel>Senha</InputLabel>
          <PasswordTextField value={password} onChange={onChangePassword} />
        </Box>

        <EsqueciMinhaSenha />
      </Box>
    </Layout>
  )
}

export default Login
