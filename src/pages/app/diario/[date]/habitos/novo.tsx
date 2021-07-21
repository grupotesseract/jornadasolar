import React, { FC } from 'react'
import { withUser } from 'src/components/hocs/withAuth'
import { NextPageContext } from 'next'
import HabitoForm from 'src/components/diario/HabitoForm'
import Emoji from 'src/components/Emoji'

interface IProps {
  userId?: string
  date: string
  grouId: string
  idDoGrupoModelo: string
  posicaoDohabito: string
}

const NovoHabito: FC<IProps> = ({
  userId,
  date,
  grouId,
  idDoGrupoModelo,
  posicaoDohabito
}: IProps) => {
  return (
    <HabitoForm
      posicaoDohabito={posicaoDohabito}
      grupoDeHabitoId={grouId}
      idDoGrupoModelo={idDoGrupoModelo}
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
  grouId: string
  idDoGrupoModelo: string
  posicaoDohabito: string
}

const NovoHabitoWithAuth = withUser(NovoHabito)

NovoHabitoWithAuth.getInitialProps = (
  context: NextPageContext
): INovoHabitoWithAuthProps => {
  const date = context.query.date as string
  const grouId = context.query.grupoId as string
  const idDoGrupoModelo = context.query.idDoGrupoModelo as string
  const posicaoDohabito = context.query.posicaoDohabito as string

  return {
    date,
    grouId,
    idDoGrupoModelo,
    posicaoDohabito
  }
}

export default NovoHabitoWithAuth
