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
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import ModalEdicao from 'src/components/diario/ModalEdicao'

interface IProps {
  user?: IUser
  userId?: string
  date: string
}

const useStyles = makeStyles(() =>
  createStyles({
    botaoEditar: {
      marginRight: 14,
      marginTop: 14,
      fontSize: 14,
      cursor: 'pointer'
    }
  })
)

const Sentimentos: FC<IProps> = ({ user, userId, date }) => {
  const [sentimentos, setSentimentos] = useState<string[]>([])
  const [isEmEdicao, setIsEmEdicao] = useState(false)

  const classes = useStyles()
  const dia = parse(date, 'd-M-yyyy', new Date())

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia
  })

  useEffect(() => {
    const idsSentimentos = registroDoDia?.sentimentos.map(
      sentimento => sentimento.id
    )
    setSentimentos(idsSentimentos || [])
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

  const toggleEditar = () => {
    setIsEmEdicao(!isEmEdicao)
  }

  const BotaoEditar = (
    <Typography
      color="primary"
      className={classes.botaoEditar}
      onClick={toggleEditar}
    >
      {isEmEdicao ? 'Concluir' : 'Editar'}
    </Typography>
  )

  return (
    <>
      <EdicaoDiario
        date={date}
        onClick={onSalvarClick}
        loading={loading}
        BotaoSecundario={BotaoEditar}
      >
        <Novidade path="sentimentos" user={user} />
        <SentimentosCheckboxGroup
          values={sentimentos}
          onChange={setSentimentos}
          userId={userId}
          isEmEdicao={isEmEdicao}
        />
      </EdicaoDiario>
    </>
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
