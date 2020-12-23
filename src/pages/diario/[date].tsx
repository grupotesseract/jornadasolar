import React, { FC, Fragment, useEffect, useState } from 'react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { addDays, isToday, parse, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import PageNavigator from '../../components/PageNavigator'
import DetalheDoItem from '../../components/diario/RegistroDoDia/DetalheDoItem'
import GetUserDiarioByDate, {
  IDiario
} from '../../services/GetUserDiarioByDate'
import Sentimento from '../../components/diario/Sentimento'

const useStyles = makeStyles(() =>
  createStyles({
    linkVoltar: {
      marginTop: 14,
      marginLeft: 6,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer'
    },
    icone: {
      marginRight: 6
    }
  })
)

interface IProps {
  userId?: string
  date: string
}

const Detalhe: FC<IProps> = ({ userId, date }) => {
  const [dia, setDia] = useState(parse(date, 'd-M-yyyy', new Date()))

  const [registroDoDia, setRegistroDoDia] = useState<IDiario>()
  const classes = useStyles()
  const habitos = registroDoDia?.gruposDeHabitos
    ?.map(grupo => grupo.habitos)
    .flat()

  const avancarDia = () => {
    const novoDia = addDays(dia, 1)
    setDia(novoDia)
  }

  const voltarDia = () => {
    const novoDia = addDays(dia, -1)
    setDia(novoDia)
  }

  useEffect(() => {
    const buscarRegistroDodia = async () => {
      const newRegistroDoDia = await GetUserDiarioByDate({
        userId,
        date: dia
      })
      setRegistroDoDia(newRegistroDoDia)
    }
    buscarRegistroDodia()
  }, [userId, dia])

  return (
    <Container maxWidth="xs">
      <Link href="/diario">
        <Typography className={classes.linkVoltar}>
          <ArrowBackIcon className={classes.icone} fontSize="small" />
          Voltar
        </Typography>
      </Link>

      <Box mt={3} mr={1} ml={1}>
        <PageNavigator
          label={format(dia, "EEEE, d 'de' MMMM", {
            locale: ptBR
          })}
          onVoltarClick={voltarDia}
          onAvancarClick={avancarDia}
          onAvancarDisabled={isToday(dia)}
        />
      </Box>

      <DetalheDoItem
        label="Sentimentos"
        value={registroDoDia?.sentimentos?.map((nomeSentimento, index) => {
          return (
            <Fragment key={`sentimento-${index}`}>
              <Sentimento nome={nomeSentimento} />
              {index === registroDoDia?.sentimentos.length - 1 ? null : ', '}
            </Fragment>
          )
        })}
      />

      <DetalheDoItem
        label="Hábitos"
        value={
          <Box display="flex" flexWrap="wrap">
            {habitos?.map((habito, index) => (
              <Typography
                style={{ flexGrow: 1, width: '50%' }}
                key={`habito-${index}`}
              >
                {habito}
              </Typography>
            ))}
          </Box>
        }
      />

      <DetalheDoItem
        label="Anotações"
        value={<Typography>{registroDoDia?.anotacoes}</Typography>}
      />
    </Container>
  )
}

interface IDetalheWithAuthProps {
  date: string
}

const DetalheWithAuth: NextPage<IDetalheWithAuthProps> = ({ date }) => (
  <FirebaseAuthConsumer>
    {({ user }) => {
      return <Detalhe userId={user?.uid} date={date} />
    }}
  </FirebaseAuthConsumer>
)

DetalheWithAuth.getInitialProps = (
  context: NextPageContext
): IDetalheWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default DetalheWithAuth
