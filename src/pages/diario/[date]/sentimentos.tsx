import React, { FC, useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import { parse } from 'date-fns'
import withAuth from '../../../components/hocs/withAuth'
import CreateOrUpdateDiario from '../../../services/CreateOrUpdateDiario'
import SentimentosCheckboxGroup from '../../../components/diario/SentimentosCheckboxGroup'
import EdicaoDiario from '../../../components/templates/EdicaoDiario'
import useRegistroDoDia from '../../../hooks/useRegistroDoDia'

interface IProps {
  userId?: string
  date: string
}

const Sentimentos: FC<IProps> = ({ userId, date }) => {
  const [sentimentos, setSentimentos] = useState<string[]>([])
  const dia = parse(date, 'd-M-yyyy', new Date())

  const { loading, registroDoDia } = useRegistroDoDia({
    userId,
    date: dia
  })

  useEffect(() => {
    setSentimentos(registroDoDia?.sentimentos || [])
  }, [registroDoDia])

  const onSalvarClick = async () => {
    await CreateOrUpdateDiario({
      id: registroDoDia?.id,
      date: dia,
      userId,
      atributos: { sentimentos }
    })
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick} loading={loading}>
      <SentimentosCheckboxGroup
        values={sentimentos}
        onChange={setSentimentos}
      />
    </EdicaoDiario>
  )
}

interface ISentimentosWithAuthProps {
  date: string
}

const SentimentosWithAuth = withAuth(Sentimentos)

SentimentosWithAuth.getInitialProps = (
  context: NextPageContext
): ISentimentosWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default SentimentosWithAuth
