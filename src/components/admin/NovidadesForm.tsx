import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { INovidade } from 'src/entities/Novidade'
import InputLabel from '../InputLabel'
import TextField from '../TextField'
import Button from '../Button'
import DateInput from 'src/components/DateInput'
import SelectionField from '../SelectionField'
import { getPaginasDoApp } from 'src/utils/paginasDoApp'
import CreateOrUpdateNovidade from 'src/services/novidades/CreateOrUpdateNovidade'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { createdOrUpdated as createdOrUpdatedNovidadeAction } from '../../redux/admin/novidades'
import PermanenciaOptions from 'src/enums/admin/PermanenciaOptions'
import RadioGroup from '../RadioGroup'
import { endOfDay, startOfDay } from 'date-fns'

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1.5rem 2rem'
  },
  button: {
    marginRight: 16,
    padding: '5px 20px',
    width: 170,
    height: 40,
    fontSize: 18
  }
}))

interface IProps {
  novidade?: INovidade
}

const NovidadesForm = ({ novidade }: IProps) => {
  const classes = useStyles()
  const router = useRouter()
  const paginasDoApp = getPaginasDoApp()
  const dispatch = useDispatch()

  const limiteTitulo = 25

  const [loading, setLoading] = useState(false)
  const [titulo, setTitulo] = useState(novidade?.titulo || '')
  const [descricao, setDescricao] = useState(novidade?.descricao || '')
  const [path, setPath] = useState(novidade?.path || 'diario')
  const [dataInicio, setDataInicio] = useState(
    startOfDay(novidade?.dataInicio || new Date())
  )
  const [dataFinal, setDataFinal] = useState(
    endOfDay(novidade?.dataFinal || new Date())
  )
  const [permanencia, setPermanencia] = useState(
    novidade?.autoDispensar
      ? PermanenciaOptions.umaVez
      : PermanenciaOptions.ateDispensar
  )
  const [errors, setErrors] = useState({
    titulo: '',
    descricao: '',
    dataFinal: ''
  })

  useEffect(() => {
    setTitulo(novidade?.titulo)
    setDescricao(novidade?.descricao)
    setPath(novidade?.path || 'diario')
    setDataInicio(startOfDay(novidade?.dataInicio || new Date()))
    setDataFinal(endOfDay(novidade?.dataFinal || new Date()))
    setPermanencia(
      novidade?.autoDispensar
        ? PermanenciaOptions.umaVez
        : PermanenciaOptions.ateDispensar
    )
  }, [novidade])

  const handleSelectpath = ({ target: { value } }) => {
    setPath(value)
  }

  const handleChangePermanencia = event => {
    setPermanencia(event.target.value)
  }

  const handleChangeTitulo = ({ target: { value } }) => {
    if (value.length <= limiteTitulo) {
      setTitulo(value)
    }
    setErrors({
      ...errors,
      titulo: ''
    })
  }

  const handleChangeDescricao = ({ target: { value } }) => {
    setDescricao(value)
    setErrors({
      ...errors,
      descricao: ''
    })
  }

  const handleChangeDataInicio = (date: Date) => {
    setDataInicio(startOfDay(date))
  }

  const handleChangeDataFinal = (date: Date) => {
    setDataFinal(endOfDay(date))
  }

  const textoBotao = () => {
    if (loading) {
      return <CircularProgress color="secondary" size={20} />
    }
    return 'Salvar'
  }

  const buildParams = () => {
    const autoDispensar = permanencia === PermanenciaOptions.umaVez
    if (novidade?.id) {
      const id = novidade.id
      return {
        id,
        titulo,
        descricao,
        path,
        dataInicio,
        dataFinal,
        autoDispensar
      }
    }
    return {
      titulo,
      descricao,
      path,
      dataInicio,
      dataFinal,
      autoDispensar
    }
  }

  const caracteresTitulo = `${titulo?.length || 0} / ${limiteTitulo}`

  const handleClick = async () => {
    const isPeriodoInvalido = dataFinal < dataInicio
    if (!titulo || !descricao || isPeriodoInvalido) {
      setErrors({
        titulo: !titulo ? 'Não pode ficar em branco' : null,
        descricao: !descricao ? 'Não pode ficar em branco' : null,
        dataFinal: isPeriodoInvalido
          ? 'Data final deve ser após data inicial'
          : null
      })
      return null
    }

    const CreateOrUpdateNovidadeParams = buildParams()
    setLoading(true)
    await new CreateOrUpdateNovidade().call(CreateOrUpdateNovidadeParams)
    dispatch(createdOrUpdatedNovidadeAction())
    router.push('/admin/novidades')
    setLoading(false)
    setErrors({
      titulo: '',
      descricao: '',
      dataFinal: ''
    })
  }

  const radioOptions = [
    {
      value: PermanenciaOptions.ateDispensar,
      label: PermanenciaOptions.ateDispensar
    },
    {
      value: PermanenciaOptions.umaVez,
      label: PermanenciaOptions.umaVez
    }
  ]

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} lg={4}>
          <InputLabel>Título</InputLabel>
          <TextField
            disabled={loading}
            value={titulo}
            onChange={handleChangeTitulo}
            error={!!errors.titulo}
            helperText={errors.titulo || caracteresTitulo}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Descrição</InputLabel>
          <TextField
            disabled={loading}
            value={descricao}
            onChange={handleChangeDescricao}
            error={!!errors.descricao}
            helperText={errors.descricao}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SelectionField
            titulo="Exibir em"
            value={path}
            onChange={handleSelectpath}
            disabled={loading}
            options={paginasDoApp}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Início da exibição</InputLabel>
          <DateInput
            disabled={loading}
            value={dataInicio}
            onChange={handleChangeDataInicio}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Final da exibição</InputLabel>
          <DateInput
            disabled={loading}
            value={dataFinal}
            onChange={handleChangeDataFinal}
            error={errors.dataFinal}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <RadioGroup
            titulo="Permanência"
            options={radioOptions}
            currentValue={permanencia}
            onChange={handleChangePermanencia}
          />
        </Grid>
      </Grid>

      <Box textAlign="end" pt={2} alignSelf="flex-end">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          {textoBotao()}
        </Button>
      </Box>
    </Paper>
  )
}

export default NovidadesForm
