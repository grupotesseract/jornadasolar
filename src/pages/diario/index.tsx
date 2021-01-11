import React, { FC, useEffect, useState } from 'react'
import { ptBR } from 'date-fns/locale'
import { Box, Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/dist/client/router'
import GetUserDiariosByDateRange from '../../services/GetUserDiariosByDateRange'
import {
  format,
  addMonths,
  isThisMonth,
  startOfMonth,
  lastDayOfMonth,
  endOfDay,
  startOfDay,
  isEqual,
  eachDayOfInterval,
  compareDesc
} from 'date-fns'
import RegistroDoDia from '../../components/diario/RegistroDoDia'
import Saudacao from '../../components/Saudacao'
import DiarioNavigator from '../../components/DiarioNavigator'
import withAuth from '../../components/hocs/withAuth'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'

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
  const [diarios, setDiarios] = useState([])
  const [mes, setMes] = useState(new Date())
  const [dataInicial, setDataInicial] = useState(startOfMonth(mes))
  const [dataFinal, setDataFinal] = useState(endOfDay(lastDayOfMonth(mes)))
  const classes = useStyles()
  const router = useRouter()
  const dias = eachDayOfInterval({
    start: dataInicial,
    end: isThisMonth(mes) ? new Date() : dataFinal
  })

  const avancarMes = () => {
    const novoMes = addMonths(mes, 1)
    setMes(novoMes)
    setDataInicial(startOfMonth(novoMes))
    setDataFinal(lastDayOfMonth(novoMes))
  }

  const voltarMes = () => {
    const novoMes = addMonths(mes, -1)
    setMes(novoMes)
    setDataInicial(startOfMonth(novoMes))
    setDataFinal(endOfDay(lastDayOfMonth(novoMes)))
  }

  useEffect(() => {
    const buscarDiarios = async () => {
      const newDiarios = await GetUserDiariosByDateRange({
        userId,
        dataInicial,
        dataFinal
      })
      setDiarios(newDiarios)
    }
    buscarDiarios()
  }, [userId, dataInicial, dataFinal])

  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/login')
    }
  }, [isSignedIn])

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
          <DiarioNavigator
            label={format(mes, 'MMMM, yyyy', { locale: ptBR })}
            onVoltarClick={voltarMes}
            onAvancarClick={avancarMes}
            avancarDisabled={isThisMonth(mes)}
          />
        </Box>

        {dias.sort(compareDesc).map(dia => {
          let diario = diarios?.find(diario =>
            isEqual(startOfDay(diario.date), startOfDay(dia))
          )

          if (!diario) {
            diario = {
              id: dia,
              date: dia,
              sentimentos: null,
              gruposDeHabitos: null,
              anotacoes: null
            }
          }
          return <RegistroDoDia diario={diario} key={diario.id} />
        })}
      </Container>
    </PageWithBottomNavigation>
  )
}

const DiarioWithAuth = withAuth(Diario)

export default DiarioWithAuth
