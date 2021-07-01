import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import LinkVoltar from 'src/components/LinkVoltar'
import { withUser } from 'src/components/hocs/withAuth'
import TextField from 'src/components/TextField'
import InputLabel from 'src/components/InputLabel'
import Layout from 'src/components/templates/Layout'
import UpdateNome from 'src/services/user/UpdateNome'
import { useRouter } from 'next/router'
const useStyles = makeStyles({
  tituloContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 48
  },
  titulo: {
    flex: 1,
    textAlign: 'center'
  }
})

type Props = {
  userName?: string
  userId: string
}

const AlteraNome = ({ userName, userId }: Props) => {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()
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
      router.push('/app/perfil/dados')
    }
  }

  const classes = useStyles()
  return (
    <Layout textoBotao="Salvar" onButtonClick={handleSalvar}>
      <Box className={classes.tituloContainer}>
        <LinkVoltar href="/app/perfil/dados" />
        <Typography variant="button" className={classes.titulo}>
          Nome
        </Typography>
      </Box>
      <Box>
        <InputLabel>Nome</InputLabel>
        <TextField
          value={nome}
          onChange={handleChangeNome}
          error={!!erro}
          helperText={erro}
        />
      </Box>
    </Layout>
  )
}

export default withUser(AlteraNome)
