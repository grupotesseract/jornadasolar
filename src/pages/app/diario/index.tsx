import React, { FC, useState } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  isThisMonth,
  startOfMonth,
  lastDayOfMonth,
  startOfDay,
  isEqual,
  eachDayOfInterval,
  compareDesc
} from 'date-fns'
import RegistroDoDia from '../../../components/diario/RegistroDoDia'
import Saudacao from '../../../components/Saudacao'
import MonthNavigator from '../../../components/MonthNavigator'
import { withUser } from '../../../components/hocs/withAuth'
import PageWithBottomNavigation from '../../../components/templates/PageWithBottomNavigation'
import useRegistrosByMonth from '../../../hooks/useRegistrosByMonth'
import Loading from '../../../components/Loading'
import getFaseDaLua from '../../../utils/getFaseDaLua'
import getSigno from '../../../utils/getSigno'
import theme from '../../../../theme'
import { appVersion } from '../../../utils/appVersion'
import Link from 'next/link'
import { IUser } from 'src/entities/User'
import Novidade from 'src/components/Novidade'

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
      backgroundColor: theme.palette.primary.main,
      zIndex: -1,
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%'
    },
    nome: {
      paddingTop: 22,
      color: theme.palette.secondary.main,
      fontSize: 24,
      fontWeight: 900,
      lineHeight: '33px',
      textAlign: 'center'
    },
    mensagem: {
      margin: '14px auto',
      width: 334,
      color: theme.palette.secondary.main,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: '21.86px',
      '& span': {
        fontWeight: 700
      }
    },
    appVersion: {
      textAlign: 'right',
      margin: '8px 8px 0px 8px',
      fontSize: 10,
      color: theme.palette.secondary.main
    }
  })
)

interface IDiarioProps {
  user: IUser
  userId: string
  userName: string
}

const Diario: FC<IDiarioProps> = ({ user, userId, userName }) => {
  const [mes, setMes] = useState(new Date())
  const classes = useStyles()
  const dias = eachDayOfInterval({
    start: startOfMonth(mes),
    end: isThisMonth(mes) ? new Date() : lastDayOfMonth(mes)
  })

  const { loading, diarios } = useRegistrosByMonth({
    userId,
    mes
  })

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

  const signo = getSigno(new Date())
  const faseDaLua = getFaseDaLua(new Date())

  return (
    <PageWithBottomNavigation currentPage="registro">
      <Container maxWidth="xs" className={classes.container}>
        <Box style={{ position: 'relative' }}>
          <Box className={classes.background}></Box>
        </Box>
        <Box>
          <Link href="/app/perfil" passHref>
            <Typography className={classes.appVersion}>Perfil</Typography>
          </Link>
          <Saudacao className={classes.nome} nome={userName} />
          <Typography className={classes.mensagem}>
            Hoje o <span>Sol</span>{' '}
            {`está no signo de ${signo} e a Lua está na fase
            ${faseDaLua}.`}
          </Typography>
        </Box>
        <Box mt={8} mr={2} ml={2}>
          <MonthNavigator mes={mes} onClick={setMes} />
        </Box>
        <Novidade path="diario" user={user} />
        {loading ? <Loading /> : registros}
      </Container>
    </PageWithBottomNavigation>
  )
}

export default withUser(Diario)
