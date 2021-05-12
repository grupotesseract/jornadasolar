import React, { FC, useState, useEffect } from 'react'
import { withUser } from 'src/components/hocs/withAuth'
import { NextPageContext } from 'next'
import GetHabitoById from 'src/services/habito/GetHabitoById'
import HabitoForm from 'src/components/diario/HabitoForm'

interface IProps {
  date: string
  id: string
}

const NovoHabito: FC<IProps> = ({ date, id }) => {
  const [habito, setHabito] = useState(null)

  useEffect(() => {
    const buscarHabito = async () => {
      const novoHabito = await new GetHabitoById().call(id)
      setHabito(novoHabito)
    }
    buscarHabito()
  }, [])

  return (
    <HabitoForm habito={habito} date={date} formTitulo="Edição do hábito" />
  )
}

interface INovoHabitoWithAuthProps {
  date: string
  id: string
}

const NovoHabitoWithAuth = withUser(NovoHabito)

NovoHabitoWithAuth.getInitialProps = (
  context: NextPageContext
): INovoHabitoWithAuthProps => {
  const date = context.query.date as string
  const id = context.query.id as string

  return {
    date,
    id
  }
}

export default NovoHabitoWithAuth
