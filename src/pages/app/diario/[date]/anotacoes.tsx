import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { parse } from 'date-fns'
import { withUser } from '../../../../components/hocs/withAuth'
import CreateOrUpdateRegistro from '../../../../services/registro/CreateOrUpdateRegistro'
import TextArea from '../../../../components/TextArea'
import EdicaoDiario from '../../../../components/templates/EdicaoDiario'
import useRegistroByDate from '../../../../hooks/useRegistroByDate'
import { analytics } from '../../../../components/firebase/firebase.config'
import Novidade from 'src/components/Novidade'
import { IUser } from 'src/entities/User'

const useStyles = makeStyles(() =>
  createStyles({
    containerRegistro: {
      margin: '16px auto',
      width: 332,
      minHeight: 100,
      borderRadius: '4px',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)'
    },
    label: {
      fontSize: 16,
      color: '#E0E0E0'
    }
  })
)

interface IProps {
  user?: IUser
  userId?: string
  date: string
}

const Anotacoes: FC<IProps> = ({ user, userId, date }) => {
  const classes = useStyles()
  const [anotacoes, setAnotacoes] = useState<string>('')
  const dia = parse(date, 'd-M-yyyy', new Date())

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia
  })

  useEffect(() => {
    setAnotacoes(registroDoDia?.anotacoes || '')
  }, [registroDoDia])

  const onChangeAnotacoes = ({ target: { value } }) => {
    setAnotacoes(value)
  }

  const onSalvarClick = async () => {
    await new CreateOrUpdateRegistro().call({
      id: registroDoDia?.id,
      date: dia,
      userId,
      anotacoes
    })
    analytics?.logEvent('add_anotacoes')
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick} loading={loading}>
      <Novidade path="anotacoes" user={user} />
      <Box className={classes.containerRegistro}>
        <Box display="flex" justifyContent="space-between" p={2} pb={0} clone>
          <label htmlFor="anotacoes" className={classes.label}>
            Anotações:
          </label>
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

const AnotacoesWithAuth = withUser(Anotacoes)

AnotacoesWithAuth.getInitialProps = (
  context: NextPageContext
): IAnotacoesWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default AnotacoesWithAuth
