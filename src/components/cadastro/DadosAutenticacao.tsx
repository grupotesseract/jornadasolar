import React, { FC, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core/'
import Emoji from '../Emoji'
import TextField from '../TextField'
import PasswordTextField from '../PasswordTextField'
import Layout from '../Layout'
import Titulo from '../Titulo'
import InputLabel from '../InputLabel'
import RadioGroup from '../RadioGroup'
import { auth } from '../firebase/firebase.config'

const DadosAutenticacao: FC = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail = ({ target: { value } }) => setEmail(value)
  const onChangePassword = ({ target: { value } }) => setPassword(value)

  const radioOptions = [
    { value: '1', label: 'Sim, tenho!' },
    { value: '2', label: 'Não tenho' },
    { value: '3', label: 'Não, mas quero saber mais' }
  ]

  const handleOnClickButton = async () => {
    setLoading(true)
    try {
      const { uid } = await auth.createUserWithEmailAndPassword(email, password)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Layout
      textoBotao={loading ? <CircularProgress color="secondary" /> : 'Pronto!'}
      onButtonClick={handleOnClickButton}
    >
      <Titulo>
        Crie um cadastro e salve seus dados <Emoji nome="seguro" />
      </Titulo>

      <Box mt={5}>
        <InputLabel>Email</InputLabel>
        <TextField value={email} onChange={onChangeEmail} />

        <InputLabel>Senha</InputLabel>
        <PasswordTextField value={password} onChange={onChangePassword} />

        <RadioGroup
          titulo="Você já tem o livro da Jornada Solar?"
          options={radioOptions}
        />
      </Box>
    </Layout>
  )
}
export default DadosAutenticacao
