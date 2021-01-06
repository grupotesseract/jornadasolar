import React, { FC, Fragment, useState } from 'react'
import { NextPageContext } from 'next'
import { Box, Container, Typography } from '@material-ui/core'
import { addDays, isToday, parse, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DetalheDoItem from '../../../components/diario/RegistroDoDia/DetalheDoItem'
import { IDiario } from '../../../services/GetUserDiarioByDate'
import Sentimento from '../../../components/diario/Sentimento'
import LinkVoltar from '../../../components/LinkVoltar'
import withAuth from '../../../components/hocs/withAuth'
import RegistroDoDiaNavigator from '../../../components/RegistroDoDiaNavigator'
import useRegistroDoDia from '../../../hooks/useRegistroDoDia'

interface IProps {
  userId?: string
  date: string
}

const Detalhe: FC<IProps> = ({ userId, date }) => {
  const dia = parse(date, 'd-M-yyyy', new Date())
  const [registroDoDia, setRegistroDoDia] = useState<IDiario>()
  const habitos = registroDoDia?.gruposDeHabitos
    ?.map(grupo => grupo.habitos)
    .flat()

  useRegistroDoDia({
    userId,
    date: dia,
    selector: registroDoDia => {
      setRegistroDoDia(registroDoDia)
    }
  })

  return (
    <Container maxWidth="xs">
      <LinkVoltar href="/diario" />

      <Box mt={3} mr={1} ml={1}>
        <RegistroDoDiaNavigator
          label={format(dia, "EEEE, d 'de' MMMM", {
            locale: ptBR
          })}
          anterior={addDays(dia, -1)}
          proximo={addDays(dia, 1)}
          proximoDisabled={isToday(dia)}
        />
      </Box>

      <DetalheDoItem
        label="Sentimentos"
        value={registroDoDia?.sentimentos?.map((nomeSentimento, index) => {
          return (
            <Fragment key={`sentimento-${index}`}>
              <Sentimento nome={nomeSentimento} />
              {index === registroDoDia?.sentimentos.length - 1 ? null : ', '}
            </Fragment>
          )
        })}
        linkHref={`/diario/${date}/sentimentos`}
      />

      <DetalheDoItem
        label="Hábitos"
        value={
          <Box display="flex" flexWrap="wrap">
            {habitos?.map((habito, index) => (
              <Typography
                style={{ flexGrow: 1, width: '50%' }}
                key={`habito-${index}`}
              >
                {habito}
              </Typography>
            ))}
          </Box>
        }
        linkHref={`/diario/${date}/habitos`}
      />

      <DetalheDoItem
        label="Anotações"
        value={<Typography>{registroDoDia?.anotacoes}</Typography>}
        linkHref={`/diario/${date}/anotacoes`}
      />
    </Container>
  )
}

interface IDetalheWithAuthProps {
  date: string
}

const DetalheWithAuth = withAuth(Detalhe)

DetalheWithAuth.getInitialProps = (
  context: NextPageContext
): IDetalheWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default DetalheWithAuth
