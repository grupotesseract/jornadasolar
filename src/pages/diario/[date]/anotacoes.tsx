import React, { FC, useState } from 'react'
import { NextPageContext } from 'next'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { parse } from 'date-fns'
import withAuth from '../../../components/hocs/withAuth'
import CreateOrUpdateDiario from '../../../services/CreateOrUpdateDiario'
import TextArea from '../../../components/TextArea'
import EdicaoDiario from '../../../components/templates/EdicaoDiario'
import useRegistroDoDia from '../../../hooks/useRegistroDoDia'

const useStyles = makeStyles(() =>
  createStyles({
    containerRegistro: {
      margin: '0 auto',
      width: 332,
      minHeight: 100,
      borderRadius: '4px',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)'
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

  const dia = parse(date, 'd-M-yyyy', new Date())

  useRegistroDoDia({
    userId,
    date: dia,
    selector: registroDoDia => {
      setAnotacoes(registroDoDia.anotacoes)
      setDiarioId(registroDoDia.id)
    }
  })

  const onChangeAnotacoes = ({ target: { value } }) => {
    setAnotacoes(value)
  }

  const onSalvarClick = async () => {
    await CreateOrUpdateDiario({
      id: diarioId,
      date: dia,
      userId,
      atributos: { anotacoes }
    })
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick}>
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
    </EdicaoDiario>
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
