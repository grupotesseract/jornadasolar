import React, { FC } from 'react'
import { Container, Box, Typography, makeStyles } from '@material-ui/core'
import MeditacoesForm from '../../../components/admin/meditacoes/MeditacoesForm'
import { withAdmin } from 'src/components/hocs/withAuth'

const useStyles = makeStyles({
  tituloContainer: {
    paddingTop: 30,
    paddingBottom: 30
  },
  titulo: {
    fontSize: 24,
    fontWeight: 700
  }
})

const NovaMeditacao: FC = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box className={classes.tituloContainer}>
        <Typography className={classes.titulo}>Nova meditação</Typography>
      </Box>
      <MeditacoesForm />
    </Container>
  )
}

export default withAdmin(NovaMeditacao)
