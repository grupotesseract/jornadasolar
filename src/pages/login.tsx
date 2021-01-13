import React, { FC, useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core/'
import Emoji from '../components/Emoji'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import Layout from '../components/templates/Layout'
import Titulo from '../components/Titulo'
import InputLabel from '../components/InputLabel'
import EsqueciMinhaSenha from '../components/login/EsqueciMinhaSenha'
import { useRouter } from 'next/dist/client/router'
import { auth } from '../components/firebase/firebase.config'
import { FirebaseAuthConsumer } from '@react-firebase/auth'

interface ILoginProps {
  isSignedIn: boolean
}
const Login: FC<ILoginProps> = ({ isSignedIn }: ILoginProps) => {
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
      await auth.signInWithEmailAndPassword(email, password)
      router.push('/diario')
    } catch (e) {
      const { message } = e
      setErro(message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/diario')
    }
  }, [isSignedIn])

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

const LoginWithAuth: FC = () => {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        return <Login isSignedIn={isSignedIn} />
      }}
    </FirebaseAuthConsumer>
  )
}
export default LoginWithAuth
