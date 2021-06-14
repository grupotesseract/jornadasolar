import { Container, Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import NovidadesForm from 'src/components/admin/NovidadesForm'
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
const NovaNovidade = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box className={classes.tituloContainer}>
        <Typography className={classes.titulo}>Nova novidade</Typography>
      </Box>
      <NovidadesForm />
    </Container>
  )
}

export default withAdmin(NovaNovidade)
