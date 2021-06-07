import React, { FC, Fragment } from 'react'
import { NextPageContext } from 'next'
import { Box, Container, Typography } from '@material-ui/core'
import { addDays, isToday, parse, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DetalheDaCategoria from '../../../../components/diario/Detalhe/DetalheDaCategoria'
import Sentimento from '../../../../components/diario/Sentimento'
import LinkVoltar from '../../../../components/LinkVoltar'
import { withUser } from '../../../../components/hocs/withAuth'
import RegistroDoDiaNavigator from '../../../../components/RegistroDoDiaNavigator'
import useRegistroByDate from '../../../../hooks/useRegistroByDate'
import Habito from '../../../../components/diario/Habito'
import Loading from '../../../../components/Loading'

interface IProps {
  userId?: string
  date: string
}

const Detalhe: FC<IProps> = ({ userId, date }) => {
  const dia = parse(date, 'd-M-yyyy', new Date())

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia
  })

  const habitos = registroDoDia?.gruposDeHabitos
    ?.map(grupo => grupo.habitos)
    .flat()

  const detalhesdaCategoria = (
    <>
      <DetalheDaCategoria
        nome="Sentimentos"
        conteudo={registroDoDia?.sentimentos?.map((nomeSentimento, index) => {
          return (
            <Fragment key={`sentimento-${index}`}>
              <Sentimento nome={nomeSentimento} />
              {index === registroDoDia?.sentimentos.length - 1 ? null : ', '}
            </Fragment>
          )
        })}
        linkHref={`/app/diario/${date}/sentimentos`}
      />

      <DetalheDaCategoria
        nome="Hábitos"
        conteudo={
          <Box display="flex" flexWrap="wrap">
            {habitos?.map((habito, index) => (
              <Box
                style={{ flexGrow: 1, width: '50%' }}
                key={`habito-${index}`}
              >
                <Habito habito={habito} key={`habito-${index}`} />
              </Box>
            ))}
          </Box>
        }
        linkHref={`/app/diario/${date}/habitos`}
      />

      <DetalheDaCategoria
        nome="Anotações"
        conteudo={<Typography>{registroDoDia?.anotacoes}</Typography>}
        linkHref={`/app/diario/${date}/anotacoes`}
      />
    </>
  )

  return (
    <Container maxWidth="xs">
      <LinkVoltar href="/app/diario" />

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

      {loading ? <Loading /> : detalhesdaCategoria}
    </Container>
  )
}

interface IDetalheWithAuthProps {
  date: string
}

const DetalheWithAuth = withUser(Detalhe)

DetalheWithAuth.getInitialProps = (
  context: NextPageContext
): IDetalheWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default DetalheWithAuth
