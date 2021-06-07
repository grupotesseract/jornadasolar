import React, { FC } from 'react'
import { withUser } from 'src/components/hocs/withAuth'
import { NextPageContext } from 'next'
import HabitoForm from 'src/components/diario/HabitoForm'
import Emoji from 'src/components/Emoji'

interface IProps {
  userId?: string
  date: string
}

const NovoHabito: FC<IProps> = ({ userId, date }: IProps) => {
  return (
    <HabitoForm
      date={date}
      userId={userId}
      formTitulo={
        <>
          Adicione um hábito personalizado <Emoji nome="alegre" />
        </>
      }
    />
  )
}

interface INovoHabitoWithAuthProps {
  date: string
}

const NovoHabitoWithAuth = withUser(NovoHabito)

NovoHabitoWithAuth.getInitialProps = (
  context: NextPageContext
): INovoHabitoWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default NovoHabitoWithAuth
