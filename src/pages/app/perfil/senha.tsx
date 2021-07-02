import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { withUser } from 'src/components/hocs/withAuth'
import { useDispatch } from 'react-redux'
import { passwordUpdated } from 'src/redux/perfil'
import UpdatePasswordInApp from 'src/services/user/UpdatePasswordInApp'
import { Box, Container } from '@material-ui/core'
import PasswordTextField from 'src/components/PasswordTextField'
import InputLabel from 'src/components/InputLabel'
import Layout from 'src/components/templates/Layout'
import TituloConfig from 'src/components/TituloConfig'

const AlteraSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState('')
  const [senhaNova, setSenhaNova] = useState('')
  const [confirmaSenhaNova, setConfirmaSenhaNova] = useState('')
  const [erros, setErros] = useState({
    senha: '',
    senhaNova: '',
    confirmacao: ''
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChangePassword = ({ target: { value } }) => {
    setErros({
      ...erros,
      senha: ''
    })
    setSenhaAtual(value)
  }

  const handleChangeNewPassword = ({ target: { value } }) => {
    setErros({
      ...erros,
      senhaNova: ''
    })
    setSenhaNova(value)
  }

  const handleChangeConfirmation = ({ target: { value } }) => {
    setErros({
      ...erros,
      confirmacao: ''
    })
    setConfirmaSenhaNova(value)
  }

  const validaCampos = () => {
    if (!senhaAtual || !senhaNova || confirmaSenhaNova !== senhaNova) {
      setErros({
        senha: !senhaAtual ? 'Não pode ficar em branco' : '',
        senhaNova: !senhaNova ? 'Não pode ficar em branco' : '',
        confirmacao:
          confirmaSenhaNova !== senhaNova ? 'As senhas são diferentes' : ''
      })
      return false
    }
    return true
  }

  const handleSalvar = async () => {
    if (validaCampos()) {
      new UpdatePasswordInApp()
        .call(senhaAtual, senhaNova)
        .then(() => {
          dispatch(passwordUpdated())
          router.push('/app/perfil/dados')
        })
        .catch(e => {
          setErros({
            senha:
              e.code === 'auth/wrong-password' ? 'Senha atual incorreta' : '',
            senhaNova:
              e.code === 'auth/weak-password'
                ? 'A senha deve ter 6 caracteres ou mais'
                : '',
            confirmacao: ''
          })
        })
    }
  }

  return (
    <Container maxWidth="xs">
      <TituloConfig link="/app/perfil/dados" titulo="Senha" />
      <Layout textoBotao="Salvar" onButtonClick={handleSalvar}>
        <Box>
          <InputLabel error={!!erros.senha}>Senha</InputLabel>
          <PasswordTextField
            value={senhaAtual}
            onChange={handleChangePassword}
            error={!!erros.senha}
            helperText={erros.senha}
          />
          <InputLabel error={!!erros.senhaNova}>Nova senha</InputLabel>
          <PasswordTextField
            value={senhaNova}
            onChange={handleChangeNewPassword}
            error={!!erros.senhaNova}
            helperText={erros.senhaNova}
          />
          <InputLabel error={!!erros.confirmacao}>
            Confirme sua nova senha
          </InputLabel>
          <PasswordTextField
            value={confirmaSenhaNova}
            onChange={handleChangeConfirmation}
            error={!!erros.confirmacao}
            helperText={erros.confirmacao}
          />
        </Box>
      </Layout>
    </Container>
  )
}

export default withUser(AlteraSenha)
