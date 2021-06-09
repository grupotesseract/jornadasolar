import React, { FC, useEffect, useState } from 'react'
import { Container, Box, Typography, makeStyles } from '@material-ui/core'
import AdminBase from 'src/components/templates/AdminBase'
import { NextPageContext } from 'next'
import { withAdmin } from '../../../components/hocs/withAuth'
import GetNovidadeById from 'src/services/novidades/GetNovidadeById'
import NovidadesForm from 'src/components/admin/NovidadesForm'

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

interface IProps {
  id: string
}

const DetalheDaNovidade: FC<IProps> = ({ id }) => {
  const [novidade, setNovidade] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const buscarNovidade = async () => {
      const novaNovidade = await new GetNovidadeById().call(id)
      setNovidade(novaNovidade)
    }
    buscarNovidade()
  }, [])

  return (
    <AdminBase>
      <Container>
        <Box className={classes.tituloContainer}>
          <Typography className={classes.titulo}>
            Detalhe da novidade
          </Typography>
        </Box>
        <NovidadesForm novidade={novidade} />
      </Container>
    </AdminBase>
  )
}

interface IDetalheDaNovidadeProps {
  id: string
}
const DetalheDaNovidadeWithAdmin = withAdmin(DetalheDaNovidade)

DetalheDaNovidadeWithAdmin.getInitialProps = (
  context: NextPageContext
): IDetalheDaNovidadeProps => {
  const id = context.query.id as string
  return {
    id
  }
}

export default DetalheDaNovidadeWithAdmin
