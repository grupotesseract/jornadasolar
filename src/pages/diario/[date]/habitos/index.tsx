import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { parse } from 'date-fns'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { withUser } from '../../../../components/hocs/withAuth'
import CreateOrUpdateRegistro from '../../../../services/registro/CreateOrUpdateRegistro'
import EdicaoDiario from '../../../../components/templates/EdicaoDiario'
import useRegistroByDate from '../../../../hooks/useRegistroByDate'
import HabitosCheckboxGroup, {
  valoresIniciais
} from '../../../../components/diario/HabitosCheckboxGroup'
import { useRouter } from 'next/router'
import { analytics } from '../../../../components/firebase/firebase.config'

const useStyles = makeStyles(() =>
  createStyles({
    textoInformativo: {
      margin: '24px 29px',
      width: 284,
      color: '#BDBDBD',
      lineHeight: '22px'
    }
  })
)

interface IProps {
  userId?: string
  date: string
}

const Habitos: FC<IProps> = ({ userId, date }) => {
  const classes = useStyles()
  const dia = parse(date, 'd-M-yyyy', new Date())
  const router = useRouter()

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia
  })

  const [gruposDeHabitos, setGruposDeHabitos] = useState(valoresIniciais)

  useEffect(() => {
    if (registroDoDia?.gruposDeHabitos?.length > 0) {
      setGruposDeHabitos(registroDoDia.gruposDeHabitos)
    }
  }, [registroDoDia])

  const onSalvarClick = async () => {
    await new CreateOrUpdateRegistro().call({
      id: registroDoDia?.id,
      date: dia,
      userId,
      gruposDeHabitos
    })
    analytics?.logEvent('add_habitos')
  }

  const handleAdicionarHabito = () => {
    router.push(`/diario/${date}/habitos/novo`)
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick} loading={loading}>
      <Box mt="46px" maxWidth={360} ml="28px">
        <HabitosCheckboxGroup
          onChange={setGruposDeHabitos}
          values={gruposDeHabitos}
          onAdicionarHabitoClick={handleAdicionarHabito}
          userId={userId}
        />
      </Box>
      <Typography className={classes.textoInformativo}>
        Gostaria de editar ou incluir um novo hábito? Envie uma sugestão para
        <span style={{ color: '#F7C92A' }}> jornadasolar@gmail.com.br</span>
      </Typography>
    </EdicaoDiario>
  )
}

interface IHabitosWithAuthProps {
  date: string
}

const HabitosWithAuth = withUser(Habitos)

HabitosWithAuth.getInitialProps = (
  context: NextPageContext
): IHabitosWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default HabitosWithAuth
