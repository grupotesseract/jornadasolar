import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core/'
import Emoji from '../Emoji'
import TextField from '../TextField'
import PasswordTextField from '../PasswordTextField'
import Layout from '../templates/Layout'
import Titulo from '../Titulo'
import InputLabel from '../InputLabel'
import RadioGroup from '../RadioGroup'
import firebase from 'firebase/app'
import { auth, firestore } from '../firebase/firebase.config'
import { useRouter } from 'next/dist/client/router'

const getMessageFromCode = (code: string) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email já cadastrado'
    case 'auth/invalid-email':
      return 'Email inválido'
    default:
      return null
  }
}

const DadosAutenticacao: FC = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [temLivro, setTemLivro] = useState('')
  const [erro, setErro] = useState(null)
  const router = useRouter()

  const onChangeEmail = ({ target: { value } }) => setEmail(value)
  const onChangePassword = ({ target: { value } }) => setPassword(value)
  const onChangeOptions = e => setTemLivro(e.target.value)

  const radioOptions = [
    { value: 'Sim, tenho!', label: 'Sim, tenho!' },
    { value: 'Não tenho', label: 'Não tenho' },
    { value: 'Não, mas quero saber mais', label: 'Não, mas quero saber mais' }
  ]

  const { nome, objetivos, sentimentos, gruposDeHabitos } = useSelector(
    state => state.cadastro
  )

  const handleOnClickButton = async () => {
    setLoading(true)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await user.updateProfile({
        displayName: nome
      })
      const now = firebase.firestore.FieldValue.serverTimestamp()
      await firestore.collection('user').doc(user.uid).set({
        nome,
        email,
        objetivos,
        temLivro,
        created_at: now,
        updated_at: now
      })
      await firestore.collection('diario').add({
        date: now,
        userId: user.uid,
        sentimentos,
        gruposDeHabitos
      })
      await auth.signInWithEmailAndPassword(email, password)
      router.push('/diario')
    } catch (e) {
      console.log('erro', e)
      setErro(getMessageFromCode(e.code))
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
        <TextField value={email} onChange={onChangeEmail} helperText={erro} />

        <InputLabel>Senha</InputLabel>
        <PasswordTextField value={password} onChange={onChangePassword} />

        <RadioGroup
          titulo="Você já tem o livro da Jornada Solar?"
          options={radioOptions}
          onChange={onChangeOptions}
        />
      </Box>
    </Layout>
  )
}
export default DadosAutenticacao
