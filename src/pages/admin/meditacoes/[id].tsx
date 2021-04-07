import React, { FC, useEffect, useState } from 'react'
import { Container, Box, Typography, makeStyles } from '@material-ui/core'
import MeditacoesForm from '../../../components/admin/meditacoes/MeditacoesForm'
import GetMeditacaoById from 'src/services/meditacoes/GetMeditacaoById'
import AdminBase from 'src/components/templates/AdminBase'
import { NextPageContext } from 'next'
import { withAdmin } from '../../../components/hocs/withAuth'

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

const DetalheDaMeditacao: FC<IProps> = ({ id }) => {
  const [meditacao, setMeditacao] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const buscarMeditacao = async () => {
      const novaMeditacao = await new GetMeditacaoById().call(id)
      setMeditacao(novaMeditacao)
    }
    buscarMeditacao()
  }, [])

  return (
    <AdminBase>
      <Container>
        <Box className={classes.tituloContainer}>
          <Typography className={classes.titulo}>
            Detalhe da meditação
          </Typography>
        </Box>
        <MeditacoesForm meditacao={meditacao} />
      </Container>
    </AdminBase>
  )
}

interface IDetalheDaMeditacaoProps {
  id: string
}
const DetalheDaMeditacaoWithAdmin = withAdmin(DetalheDaMeditacao)

DetalheDaMeditacaoWithAdmin.getInitialProps = (
  context: NextPageContext
): IDetalheDaMeditacaoProps => {
  const id = context.query.id as string
  return {
    id
  }
}

export default DetalheDaMeditacaoWithAdmin
