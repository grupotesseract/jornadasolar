import React from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import { withUser } from 'src/components/hocs/withAuth'
import LinkVoltar from 'src/components/LinkVoltar'
import NavigationList from 'src/components/NavigationList'
import { useRouter } from 'next/router'
import { ChevronRight } from '@material-ui/icons'

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

const MeusDados = () => {
  const classes = useStyles()
  const router = useRouter()

  const handleAlterarNome = () => {
    router.push('/app/perfil/nome')
  }

  const itens = [
    {
      texto: 'Alterar nome',
      onClick: handleAlterarNome,
      iconeSecundario: <ChevronRight />
    },
    {
      texto: 'Alterar senha',
      iconeSecundario: <ChevronRight />
    }
  ]

  return (
    <Container maxWidth="xs">
      <Box className={classes.tituloContainer}>
        <LinkVoltar href="/app/perfil" />
        <Typography variant="button" className={classes.titulo}>
          Meus dados
        </Typography>
      </Box>
      <NavigationList itens={itens} />
    </Container>
  )
}

export default withUser(MeusDados)
