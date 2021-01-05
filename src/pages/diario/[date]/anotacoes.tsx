import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { Box, CircularProgress, Container, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Button from '../../../components/Button'
import Snackbar from '../../../components/Snackbar'
import LinkVoltar from '../../../components/LinkVoltar'
import GetUserDiarioByDate from '../../../services/GetUserDiarioByDate'
import withAuth from '../../../components/hocs/withAuth'
import CreateOrUpdateDiario from '../../../services/CreateOrUpdateDiario'
import TextArea from '../../../components/TextArea'

const useStyles = makeStyles(() =>
  createStyles({
    data: {
      margin: '0 auto',
      display: 'flex',
      fontSize: 16,
      fontWeight: 600,
      textAlign: 'right'
    },
    containerRegistro: {
      margin: '20px auto',
      width: 332,
      minHeight: 100,
      borderRadius: '4px',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)',
    }
  })
)

interface IProps {
  userId?: string
  date: string
}

const Anotacoes: FC<IProps> = ({ userId, date }) => {
  const classes = useStyles()
  const [diarioId, setDiarioId] = useState<string>()
  const [anotacoes, setAnotacoes] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [openSucessMessage, setOpenSucessMessage] = useState(false)

  const dia = parse(date, 'd-M-yyyy', new Date())

  const buscarRegistroDoDia = async () => {
    const registroDoDia = await GetUserDiarioByDate({
      userId,
      date: dia
    })
    setAnotacoes(registroDoDia?.anotacoes)
    setDiarioId(registroDoDia?.id)
  }

  useEffect(() => {
    buscarRegistroDoDia()
  }, [userId])

  const onChangeAnotacoes = ({ target: { value } }) => {
    setAnotacoes(value)
  }

  const onSalvarClick = async () => {
    setLoading(true)
    await CreateOrUpdateDiario({
      id: diarioId,
      date: dia,
      userId,
      atributos: { anotacoes }
    })
    setLoading(false)
    setOpenSucessMessage(true)
  }

  const TextoBotao = () => {
    if (loading) {
      return <CircularProgress color="secondary" />
    } else {
      return (
        <>
          <CheckIcon style={{ marginRight: 6 }} />
          Salvar
        </>
      )
    }
  }

  return (
    <Container maxWidth="xs">
      <Snackbar
        open={openSucessMessage}
        onClose={() => {
          setOpenSucessMessage(false)
        }}
        message="Cadastro realizado com sucesso"
        severity="success"
      />

      <Box display="flex" flexDirection="column" minHeight="100vh">
        <LinkVoltar href={`/diario/${date}`} />

        <Box
          mt="23px"
          mb="7px"
          textAlign="center"
          alignItems="center"
          display="flex"
        >
          <Typography className={classes.data}>
            {format(dia, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </Typography>
        </Box>

        <Box className={classes.containerRegistro}>
          <Box display="flex" justifyContent="space-between" p={2} pb={0}>
            <Typography color="textSecondary">Anotações:</Typography>
          </Box>

          <Box p={2}>
            <TextArea
              onChange={onChangeAnotacoes}
              id="anotacoes"
              value={anotacoes}
            />
          </Box>
        </Box>

        <Box alignSelf="center" position="fixed" top="calc(100vh - 80px)">
          <Button variant="contained" color="primary" onClick={onSalvarClick}>
            <TextoBotao />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

interface IAnotacoesWithAuthProps {
  date: string
}

const AnotacoesWithAuth = withAuth(Anotacoes)

AnotacoesWithAuth.getInitialProps = (
  context: NextPageContext
): IAnotacoesWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default AnotacoesWithAuth
