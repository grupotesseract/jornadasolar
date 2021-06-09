import { Container, Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import NovidadesForm from 'src/components/admin/NovidadesForm'
import { withAdmin } from 'src/components/hocs/withAuth'
import AdminBase from 'src/components/templates/AdminBase'

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
    <AdminBase>
      <Container>
        <Box className={classes.tituloContainer}>
          <Typography className={classes.titulo}>Incluir Novidade</Typography>
        </Box>
        <NovidadesForm />
      </Container>
    </AdminBase>
  )
}

export default withAdmin(NovaNovidade)
