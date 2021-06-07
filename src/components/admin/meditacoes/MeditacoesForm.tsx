import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core'
import TextField from '../../../components/TextField'
import InputLabel from '../../../components/InputLabel'
import Button from '../../../components/Button'
import AudioUpload from 'src/components/admin/AudioUpload'
import CreateMeditacao from 'src/services/meditacoes/CreateMeditacao'
import { useRouter } from 'next/router'
import { IMeditacao } from 'src/entities/Meditacao'
import { createdOrUpdated as createdOrUpdatedMeditacaoAction } from '../../../redux/admin/meditacoes'
import { useDispatch } from 'react-redux'
import DateInput from 'src/components/DateInput'
import { parse } from 'date-fns'

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
  meditacao?: IMeditacao
}

const MeditacoesForm = ({ meditacao }: IProps) => {
  const [nome, setNome] = useState(meditacao?.nome || '')
  const [data, setData] = useState(
    meditacao?.data
      ? parse(meditacao?.data, 'dd/MM/yyyy', new Date())
      : new Date()
  )
  const [errors, setErrors] = useState({
    nome: '',
    audio: ''
  })
  const [loading, setLoading] = useState(false)
  const [audioFile, setAudioFile] = useState()
  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (meditacao) {
      setNome(meditacao.nome)
      setData(parse(meditacao?.data, 'dd/MM/yyyy', new Date()))
    }
  }, [meditacao])

  const onChangeNome = ({ target: { value } }) => {
    setNome(value)
  }

  const buildParams = () => {
    if (meditacao?.id) {
      const id = meditacao.id
      return {
        id,
        nome,
        data
      }
    }

    return { nome, file: audioFile, data }
  }

  const hableClick = async () => {
    const isAudioInvalid = !audioFile && !meditacao?.id
    if (!nome || isAudioInvalid) {
      setErrors({
        nome: !nome ? 'Não pode ficar em branco' : null,
        audio: isAudioInvalid ? 'Não pode ficar em branco' : null
      })

      return null
    }
    const createOrUpdateParams = buildParams()
    setLoading(true)
    await new CreateMeditacao().call(createOrUpdateParams)
    dispatch(createdOrUpdatedMeditacaoAction())
    router.push('/admin/meditacoes')
    setLoading(false)
    setErrors({ nome: '', audio: '' })
  }

  const exibirMeditacao = () => {
    if (meditacao?.id) {
      return (
        <Box mt="18px">
          <audio
            controls
            src={meditacao?.url}
            className={classes.audioPlayer}
          />
        </Box>
      )
    }

    return (
      <AudioUpload
        onChangeFile={file => setAudioFile(file)}
        inputDisabled={loading}
      />
    )
  }

  const textoBotao = () => {
    if (loading) {
      return <CircularProgress color="secondary" size={20} />
    }

    return 'Salvar'
  }

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} lg={4}>
          <InputLabel>Nome</InputLabel>
          <TextField
            disabled={loading}
            value={nome}
            onChange={onChangeNome}
            error={!!errors.nome}
            helperText={errors.nome}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <InputLabel>Data</InputLabel>
          <DateInput disabled={loading} value={data} onChange={setData} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <InputLabel>Meditação</InputLabel>
          {exibirMeditacao()}
          <FormHelperText error={!!errors.audio} className={classes.helperText}>
            {errors.audio}
          </FormHelperText>
        </Grid>
      </Grid>

      <Box textAlign="end" pt={2} alignSelf="flex-end">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={hableClick}
        >
          {textoBotao()}
        </Button>
      </Box>
    </Paper>
  )
}

export default MeditacoesForm
