import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup
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

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1.5rem 2rem'
  },
  audioPlayer: {
    width: '100%',
    '&:focus': {
      outline: 'none'
    }
  },
  helperText: {
    marginTop: 14
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

  const [loading, setLoading] = useState(false)
  const [titulo, setTitulo] = useState(novidade?.titulo || '')
  const [descricao, setDescricao] = useState(novidade?.descricao || '')
  const [path, setPath] = useState(novidade?.path || 'diario')
  const [dataInicio, setDataInicio] = useState(
    novidade?.dataInicio || new Date()
  )
  const [dataFinal, setDataFinal] = useState(novidade?.dataFinal || new Date())
  const [permanencia, setPermanencia] = useState(
    novidade?.autoDispensar ? 'uma vez' : 'sempre' || 'sempre'
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
    setDataInicio(novidade?.dataInicio || new Date())
    setDataFinal(novidade?.dataFinal || new Date())
    setPermanencia(novidade?.autoDispensar ? 'uma vez' : 'sempre')
  }, [novidade])

  const handleSelectpath = event => {
    setPath(event.target.value)
  }

  const handleChangePermanencia = event => {
    setPermanencia(event.target.value)
  }

  const textoBotao = () => {
    if (loading) {
      return <CircularProgress color="secondary" size={20} />
    }
    return 'Salvar'
  }

  const buildParams = () => {
    const autoDispensar = permanencia === 'uma vez'
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
    console.log('antes do dispatch')
    dispatch(createdOrUpdatedNovidadeAction())
    console.log('depois do dispatch')
    router.push('/admin/novidades')
    setLoading(false)
    setErrors({
      titulo: '',
      descricao: '',
      dataFinal: ''
    })
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} lg={4}>
          <InputLabel>Título</InputLabel>
          <TextField
            disabled={loading}
            value={titulo}
            onChange={event => setTitulo(event.target.value)}
            error={!!errors.titulo}
            helperText={errors.titulo}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Descrição</InputLabel>
          <TextField
            disabled={loading}
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
            error={!!errors.descricao}
            helperText={errors.descricao}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Exibir em</InputLabel>

          <SelectionField
            value={path}
            onChange={handleSelectpath}
            disabled={loading}
          >
            {paginasDoApp.map(pagina => (
              <MenuItem key={pagina.path} value={pagina.path}>
                {pagina.label}
              </MenuItem>
            ))}
          </SelectionField>
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Início da Exibição</InputLabel>
          <DateInput
            disabled={loading}
            value={dataInicio}
            onChange={setDataInicio}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Final da Exibição</InputLabel>
          <DateInput
            disabled={loading}
            value={dataFinal}
            onChange={setDataFinal}
          />
          <FormHelperText
            error={!!errors.dataFinal}
            className={classes.helperText}
          >
            {errors.dataFinal}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Permanência</InputLabel>
          <RadioGroup
            name="permanencia"
            value={permanencia}
            onChange={handleChangePermanencia}
          >
            <FormControlLabel
              value="sempre"
              control={<Radio />}
              label="Até o usuário dispensar"
            />
            <FormControlLabel
              value="uma vez"
              control={<Radio />}
              label="Aparece só uma vez"
            />
          </RadioGroup>
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
