import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import Button from 'src/components/Button'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withAdmin } from 'src/components/hocs/withAuth'
import IconButtonConfirmacao from 'src/components/IconButtonConfirmacao'
import DeleteIcon from '@material-ui/icons/Delete'
import { useRouter } from 'next/router'
import Table from 'src/components/admin/Table'
import GetAllNovidades from 'src/services/novidades/GetAllNovidades'
import { getLabel } from 'src/utils/paginasDoApp'
import DeleteNovidade from 'src/services/novidades/DeleteNovidade'
import { deleteNovidade as deleteNovidadeAction } from 'src/redux/admin/novidades'

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

const Novidades: FC = () => {
  const [arrayNovidades, setArrayNovidades] = useState([])
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()

  const buscarNovidades = async () => {
    const fakenews = await new GetAllNovidades().call()
    setArrayNovidades(fakenews)
  }

  useEffect(() => {
    buscarNovidades()
  }, [])

  const handleDelete = id => {
    new DeleteNovidade().call(id).then(() => {
      dispatch(deleteNovidadeAction())
      buscarNovidades()
    })
  }

  const headCells = [
    { id: 'titulo', label: 'Título' },
    { id: 'descricao', label: 'Descrição' },
    { id: 'dataInicio', label: 'Início exibição' },
    { id: 'dataFinal', label: 'Final exibição' },
    { id: 'permanencia', label: 'Permanência' },
    { id: 'path', label: 'Exibir em' },
    { id: 'actions', label: 'Excluir' }
  ]

  const bodyCells = arrayNovidades.map(novidade => ({
    id: novidade.id,
    titulo: novidade.titulo,
    descricao: novidade.descricao,
    dataInicio: novidade.dataInicio.toLocaleDateString('pt-BR'),
    dataFinal: novidade.dataFinal.toLocaleDateString('pt-BR'),
    path: getLabel(novidade.path),
    permanencia: novidade.autoDispensar
      ? 'Aparece uma vez'
      : 'Até usuário dispensar',
    actions: (
      <IconButtonConfirmacao
        icone={<DeleteIcon />}
        onConfirmar={() => handleDelete(novidade.id)}
        conteudoDoDialogo="Você tem certeza que deseja excluir a novidade?"
        tituloDoDialogo="Excluir novidade"
        labelDeConfirmacaoDoDialogo="Excluir"
      />
    ),
    onClick: () => {
      router.push(`/admin/novidades/${novidade.id}`)
    }
  }))
  return (
    <Grid item xs={12}>
      <Box className={classes.tituloContainer}>
        <Typography className={classes.titulo}>Novidades</Typography>
        <Link href="/admin/novidades/nova">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Incluir novidade
          </Button>
        </Link>
      </Box>
      <Table headCells={headCells} bodyCells={bodyCells} />
    </Grid>
  )
}

export default withAdmin(Novidades)
