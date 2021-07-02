import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { nameUpdated } from 'src/redux/perfil'
import { withUser } from 'src/components/hocs/withAuth'
import { Box, Container } from '@material-ui/core'
import TextField from 'src/components/TextField'
import InputLabel from 'src/components/InputLabel'
import Layout from 'src/components/templates/Layout'
import UpdateNome from 'src/services/user/UpdateNome'
import TituloConfig from 'src/components/TituloConfig'

type Props = {
  userName?: string
  userId: string
}

const AlteraNome = ({ userName, userId }: Props) => {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    setNome(userName)
  }, [userName])

  const handleChangeNome = ({ target: { value } }) => {
    setErro('')
    setNome(value)
  }

  const handleSalvar = async () => {
    if (!nome.length) {
      setErro('Não pode ficar em branco')
    } else {
      await new UpdateNome().call(userId, nome)
      dispatch(nameUpdated())
      router.push('/app/perfil/dados')
    }
  }

  return (
    <Container maxWidth="xs">
      <TituloConfig link="/app/perfil/dados" titulo="Nome" />
      <Layout textoBotao="Salvar" onButtonClick={handleSalvar}>
        <Box>
          <InputLabel error={!!erro}>Nome</InputLabel>
          <TextField
            value={nome}
            onChange={handleChangeNome}
            error={!!erro}
            helperText={erro}
          />
        </Box>
      </Layout>
    </Container>
  )
}

export default withUser(AlteraNome)
