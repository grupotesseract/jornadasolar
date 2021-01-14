import React, { FC, useEffect, useState } from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/dist/client/router'
import {
  isThisMonth,
  startOfMonth,
  lastDayOfMonth,
  startOfDay,
  isEqual,
  eachDayOfInterval,
  compareDesc
} from 'date-fns'
import RegistroDoDia from '../../components/diario/RegistroDoDia'
import Saudacao from '../../components/Saudacao'
import MonthNavigator from '../../components/MonthNavigator'
import withAuth from '../../components/hocs/withAuth'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'
import useDiarios from '../../hooks/useDiarios'
import Loading from '../../components/Loading'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: 0,
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    background: {
      width: 582,
      maxWidth: 582,
      height: 329,
      position: 'absolute',
      top: '-165px',
      left: 'calc(((582px - 100%) / 2) * -1)',
      backgroundColor: '#F7C92A',
      zIndex: -1,
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%'
    },
    nome: {
      paddingTop: 22,
      color: '#000000',
      fontSize: 24,
      fontWeight: 900,
      lineHeight: '33px',
      textAlign: 'center'
    }
  })
)

interface IDiarioProps {
  userId: string
  userName: string
  isSignedIn: boolean
}

const Diario: FC<IDiarioProps> = ({ userId, userName, isSignedIn }) => {
  const [mes, setMes] = useState(new Date())
  const classes = useStyles()
  const router = useRouter()
  const dias = eachDayOfInterval({
    start: startOfMonth(mes),
    end: isThisMonth(mes) ? new Date() : lastDayOfMonth(mes)
  })

  const { loading, diarios } = useDiarios({
    userId,
    mes
  })

  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/login')
    }
  }, [isSignedIn])

  const registros = dias.sort(compareDesc).map((dia, index) => {
    let diario = diarios?.find(diario =>
      isEqual(startOfDay(diario.date), startOfDay(dia))
    )

    if (!diario) {
      diario = {
        id: `diario-${index}`,
        date: dia,
        sentimentos: null,
        gruposDeHabitos: null,
        anotacoes: null
      }
    }
    return <RegistroDoDia diario={diario} key={diario.id} />
  })

  return (
    <PageWithBottomNavigation currentPage="registro">
      <Container maxWidth="xs" className={classes.container}>
        <Box style={{ position: 'relative' }}>
          <Box className={classes.background}></Box>
        </Box>
        <Box>
          <Saudacao className={classes.nome} nome={userName} />
        </Box>
        <Box mt={16} mr={2} ml={2}>
          <MonthNavigator mes={mes} onClick={setMes} />
        </Box>

        {loading ? <Loading /> : registros}
      </Container>
    </PageWithBottomNavigation>
  )
}

const DiarioWithAuth = withAuth(Diario)

export default DiarioWithAuth
