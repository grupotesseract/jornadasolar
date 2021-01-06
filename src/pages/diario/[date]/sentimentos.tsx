import React, { FC, useState } from 'react'
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
  const [diarioId, setDiarioId] = useState<string>()
  const [sentimentos, setSentimentos] = useState<string[]>([])

  const dia = parse(date, 'd-M-yyyy', new Date())

  useRegistroDoDia({
    userId,
    date: dia,
    selector: registroDoDia => {
      setSentimentos(registroDoDia.sentimentos || [])
      setDiarioId(registroDoDia.id)
    }
  })

  const onSalvarClick = async () => {
    await CreateOrUpdateDiario({
      id: diarioId,
      date: dia,
      userId,
      atributos: { sentimentos }
    })
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick}>
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
