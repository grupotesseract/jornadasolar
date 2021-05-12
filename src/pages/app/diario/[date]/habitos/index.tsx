import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { parse } from 'date-fns'
import { Box } from '@material-ui/core'
import { withUser } from '../../../../../components/hocs/withAuth'
import CreateOrUpdateRegistro from '../../../../../services/registro/CreateOrUpdateRegistro'
import EdicaoDiario from '../../../../../components/templates/EdicaoDiario'
import useRegistroByDate from '../../../../../hooks/useRegistroByDate'
import HabitosCheckboxGroup, {
  valoresIniciais
} from '../../../../../components/diario/HabitosCheckboxGroup'
import { useRouter } from 'next/router'
import { analytics } from '../../../../../components/firebase/firebase.config'
import Novidade from '../../../../../components/Novidade'
import { IUser } from 'src/entities/User'

interface IProps {
  date: string
  user: IUser
}

const Habitos: FC<IProps> = ({ date, user }) => {
  const dia = parse(date, 'd-M-yyyy', new Date())
  const router = useRouter()
  const userId = user?.id

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
    router.push(`/app/diario/${date}/habitos/novo`)
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick} loading={loading}>
      <Novidade slug="habitos-personalizados" user={user} />
      <Box mt="46px" maxWidth={360} ml="28px">
        <HabitosCheckboxGroup
          onChange={setGruposDeHabitos}
          values={gruposDeHabitos}
          onAdicionarHabitoClick={handleAdicionarHabito}
          userId={userId}
          date={date}
        />
      </Box>
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
