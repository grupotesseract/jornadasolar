import React, { FC, useState } from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core/'
import Emoji from '../../components/Emoji'
import TextField from 'src/components/TextField'
import Layout from 'src/components/templates/Layout'
import Titulo from 'src/components/Titulo'
import { auth } from 'src/components/firebase/firebase.config'
import { getMessageFromCode } from 'src/utils/firebaseAuth'
import InputLabel from 'src/components/InputLabel'

const EsqueciSenha: FC = () => {
  const [loading, setLoading] = useState(false)
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState(null)

  const onChangeEmail = ({ target: { value } }) => setEmail(value)

  const handleLogin = async () => {
    setEmailEnviado(false)
    setLoading(true)
    setErro('')
    try {
      await auth.sendPasswordResetEmail(email)
      setEmailEnviado(true)
    } catch (e) {
      setErro(getMessageFromCode(e.code))
    }
    setLoading(false)
  }

  return (
    <Layout
      onButtonClick={handleLogin}
      textoBotao={loading ? <CircularProgress color="secondary" /> : 'Enviar'}
    >
      <Titulo>
        Opa! Vamos dar um jeito nisso <Emoji nome="wink" />
      </Titulo>

      <Box mt={5}>
        <Box>
          <Typography style={{ fontSize: '1.45em' }}>
            Te enviaremos um link por email <br></br> para criar uma nova senha.
          </Typography>
          <InputLabel error={erro?.email}>Email</InputLabel>
          <TextField
            value={email}
            onChange={onChangeEmail}
            helperText={erro?.email}
            error={erro?.email}
          />
        </Box>
        {emailEnviado && (
          <Box>
            <Typography
              style={{ fontSize: '1em', maxWidth: 300, marginTop: 30 }}
            >
              Um link para redefinir sua senha foi enviado para {email},
              verifique sua caixa de entrada ou spam.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default EsqueciSenha
