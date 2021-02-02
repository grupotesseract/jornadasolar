import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@material-ui/core/'
import { useRouter } from 'next/router'
import Layout from 'src/components/templates/Layout'
import Titulo from 'src/components/Titulo'
import TextField from 'src/components/TextField'
import InputLabel from 'src/components/InputLabel'
import { auth } from 'src/components/firebase/firebase.config'
import { getMessageFromCode } from 'src/utils/firebaseAuth'
import { redefinirSenha } from '../../redux/auth'

const RedefinirSenha: FC = () => {
  const [senha, setSenha] = useState('')
  const [senhaconfirmacao, setSenhaConfirmacao] = useState('')
  const [erroConfirmacao, setErroConfirmacao] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    query: { oobCode }
  } = router

  const validaSenhas = () => {
    setErroConfirmacao('')

    if (senhaconfirmacao === '') {
      setErroConfirmacao('O campo de confirmação de senha não pode estar vazio')
    }

    if (senhaconfirmacao !== senha && senhaconfirmacao !== '') {
      setErroConfirmacao('Os campos de senha não coincidem')
    }
  }

  const handleRedefinirSenha = async () => {
    if (oobCode && oobCode !== '') {
      setLoading(true)
      try {
        await auth.confirmPasswordReset(oobCode.toString(), senha)
        dispatch(redefinirSenha())
        router.push('/login')
      } catch (e) {
        setErro(getMessageFromCode(e.code))
      }
      setLoading(false)
    } else {
      setErro({
        password:
          'Link para redefinir senha inválido. Clique em "Esqueci minha senha" na tela de login e solicite novamente.'
      })
    }
  }

  return (
    <Layout
      onButtonClick={handleRedefinirSenha}
      exibirBotao={Boolean(senha) && senha === senhaconfirmacao}
      textoBotao={
        loading ? <CircularProgress color="secondary" /> : 'Continuar'
      }
    >
      <Titulo>Vamos criar uma nova senha?</Titulo>

      <Box mt={5}>
        <InputLabel>Nova senha</InputLabel>
        <TextField
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          onBlur={() => validaSenhas()}
          helperText={erro?.password}
          error={Boolean(erro?.password)}
          disabled={loading}
        />
        <InputLabel>Confirme sua nova senha</InputLabel>
        <TextField
          type="password"
          value={senhaconfirmacao}
          onChange={e => setSenhaConfirmacao(e.target.value)}
          onBlur={() => validaSenhas()}
          error={erroConfirmacao !== ''}
          helperText={erroConfirmacao}
          disabled={loading}
        />
      </Box>
    </Layout>
  )
}

export default RedefinirSenha
