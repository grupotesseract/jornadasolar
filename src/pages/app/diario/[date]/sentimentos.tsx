import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { parse } from 'date-fns'
import { withUser } from '../../../../components/hocs/withAuth'
import CreateOrUpdateRegistro from '../../../../services/registro/CreateOrUpdateRegistro'
import SentimentosCheckboxGroup from '../../../../components/diario/SentimentosCheckboxGroup'
import EdicaoDiario from '../../../../components/templates/EdicaoDiario'
import useRegistroByDate from '../../../../hooks/useRegistroByDate'
import { analytics } from '../../../../components/firebase/firebase.config'
import Novidade from 'src/components/Novidade'
import { IUser } from 'src/entities/User'

interface IProps {
  user?: IUser
  userId?: string
  date: string
}

const Sentimentos: FC<IProps> = ({ user, userId, date }) => {
  const [sentimentos, setSentimentos] = useState<string[]>([])
  const dia = parse(date, 'd-M-yyyy', new Date())

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia
  })

  useEffect(() => {
    const nomesSentimentos = registroDoDia?.sentimentos.map(
      sentimento => sentimento.nome
    )
    setSentimentos(nomesSentimentos || [])
  }, [registroDoDia])

  const onSalvarClick = async () => {
    await new CreateOrUpdateRegistro().call({
      id: registroDoDia?.id,
      date: dia,
      userId,
      sentimentos
    })
    analytics?.logEvent('add_sentimentos')
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick} loading={loading}>
      <Novidade path="sentimentos" user={user} />
      <SentimentosCheckboxGroup
        values={sentimentos}
        onChange={setSentimentos}
        userId={userId}
      />
    </EdicaoDiario>
  )
}

interface ISentimentosWithAuthProps {
  date: string
}

const SentimentosWithAuth = withUser(Sentimentos)

SentimentosWithAuth.getInitialProps = (
  context: NextPageContext
): ISentimentosWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default SentimentosWithAuth
