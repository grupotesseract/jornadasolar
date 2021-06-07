import React, { FC, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from 'src/components/admin/Table'
import GetAllMeditacoes from '../../../services/meditacoes/GetAllMeditacoes'
import Button from 'src/components/Button'
import { Box, Grid, makeStyles } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteMeditacao from 'src/services/meditacoes/DeleteMeditacao'
import AdminBase from 'src/components/templates/AdminBase'
import { useDispatch } from 'react-redux'
import { deleteMeditacao as deleteMeditacaoAction } from '../../../redux/admin/meditacoes'
import { withAdmin } from 'src/components/hocs/withAuth'
import IconButtonConfirmacao from 'src/components/IconButtonConfirmacao'

const useStyles = makeStyles({
  tituloContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 700
  },
  button: {
    padding: '5px 20px',
    width: 170,
    height: 40,
    fontSize: 16
  }
})

const Meditacoes: FC = () => {
  const [meditacoes, setMeditacoes] = useState([])

  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()

  const buscarMeditacoes = async () => {
    const meditacao = await GetAllMeditacoes()
    setMeditacoes(meditacao)
  }

  useEffect(() => {
    buscarMeditacoes()
  }, [])

  const headCells = [
    { id: 'nome', label: 'Nome' },
    { id: 'data', label: 'Data' },
    { id: 'actions', label: 'Ações' }
  ]

  const handleDelete = id => {
    new DeleteMeditacao().call(id).then(() => {
      dispatch(deleteMeditacaoAction())
      buscarMeditacoes()
    })
  }

  const bodyCells = meditacoes.map(meditacao => ({
    id: meditacao.id,
    nome: meditacao.nome,
    data: meditacao.data,
    actions: (
      <IconButtonConfirmacao
        icone={<DeleteIcon />}
        onConfirmar={() => handleDelete(meditacao.id)}
        conteudoDoDialogo="Você tem certeza que deseja excluir a meditação?"
        tituloDoDialogo="Excluir meditação"
        labelDeConfirmacaoDoDialogo="Excluir"
      />
    ),
    onClick: () => {
      router.push(`/admin/meditacoes/${meditacao.id}`)
    }
  }))
  return (
    <AdminBase>
      <Grid item xs={12}>
        <Box className={classes.tituloContainer}>
          <Typography className={classes.titulo}>Meditações</Typography>
          <Link href="/admin/meditacoes/nova">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Nova meditação
            </Button>
          </Link>
        </Box>
        <Table headCells={headCells} bodyCells={bodyCells} />
      </Grid>
    </AdminBase>
  )
}

export default withAdmin(Meditacoes)
