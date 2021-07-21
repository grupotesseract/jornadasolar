import React, { FC, useState, useEffect } from 'react'
import { withUser } from 'src/components/hocs/withAuth'
import { NextPageContext } from 'next'
import GetHabitoById from 'src/services/habito/GetHabitoById'
import HabitoForm from 'src/components/diario/HabitoForm'
interface IProps {
  userId: string
  date: string
  id: string
  grupoId: string
  idDoGrupoModelo: string
}

const EdicaoDoHabito: FC<IProps> = ({
  date,
  id,
  grupoId,
  userId,
  idDoGrupoModelo
}) => {
  const [habito, setHabito] = useState(null)

  useEffect(() => {
    const buscarHabito = async () => {
      const novoHabito = await new GetHabitoById().call(id)
      setHabito(novoHabito)
    }
    buscarHabito()
  }, [])

  return (
    <HabitoForm
      habito={habito}
      date={date}
      formTitulo="Edição do hábito"
      grupoDeHabitoId={grupoId}
      userId={userId}
      idDoGrupoModelo={idDoGrupoModelo}
    />
  )
}
interface IEdicaoDoHabitoWithAuthProps {
  date: string
  id: string
  grupoId: string
  idDoGrupoModelo: string
}

const EdicaoDoHabitoWithAuth = withUser(EdicaoDoHabito)

EdicaoDoHabitoWithAuth.getInitialProps = (
  context: NextPageContext
): IEdicaoDoHabitoWithAuthProps => {
  const date = context.query.date as string
  const id = context.query.id as string
  const grupoId = context.query.grupoId as string
  const idDoGrupoModelo = context.query.idDoGrupoModelo as string

  return {
    date,
    id,
    grupoId,
    idDoGrupoModelo
  }
}

export default EdicaoDoHabitoWithAuth
