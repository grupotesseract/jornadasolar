import React, { FC, useState } from 'react'
import { NextPageContext } from 'next'
import { parse } from 'date-fns'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import withAuth from '../../../components/hocs/withAuth'
import CreateOrUpdateDiario from '../../../services/CreateOrUpdateDiario'
import EdicaoDiario from '../../../components/templates/EdicaoDiario'
import useRegistroDoDia from '../../../hooks/useRegistroDoDia'
import HabitosCheckboxGroup from '../../../components/diario/HabitosCheckboxGroup'

const useStyles = makeStyles(() =>
  createStyles({
    textoInformativo: {
      margin: '24px auto',
      width: 284,
      color: '#BDBDBD',
      lineHeight: '22px'
    }
  })
)

interface IProps {
  userId?: string
  date: string
}

const Habitos: FC<IProps> = ({ userId, date }) => {
  const classes = useStyles()
  const [diarioId, setDiarioId] = useState<string>()
  const [gruposDeHabitos, setGruposDeHabitos] = useState([
    {
      nome: 'social',
      habitos: []
    },
    {
      nome: 'Atividade física',
      habitos: []
    },
    {
      nome: 'sono',
      habitos: []
    },
    {
      nome: 'Alimentação',
      habitos: []
    },
    {
      nome: 'Saúde',
      habitos: []
    },
    {
      nome: 'Profissional',
      habitos: []
    },
    {
      nome: 'Tarefa',
      habitos: []
    },
    {
      nome: 'Sexo',
      habitos: []
    },
    {
      nome: 'Vício',
      habitos: []
    }
  ])

  const dia = parse(date, 'd-M-yyyy', new Date())

  useRegistroDoDia({
    userId,
    date: dia,
    selector: registroDoDia => {
      setGruposDeHabitos(registroDoDia.gruposDeHabitos || gruposDeHabitos)
      setDiarioId(registroDoDia.id)
    }
  })

  const onSalvarClick = async () => {
    await CreateOrUpdateDiario({
      id: diarioId,
      date: dia,
      userId,
      atributos: { gruposDeHabitos }
    })
  }

  return (
    <EdicaoDiario date={date} onClick={onSalvarClick}>
      <Box mt="19px" maxWidth={360} pl="28px">
        <HabitosCheckboxGroup
          onChange={setGruposDeHabitos}
          values={gruposDeHabitos}
        />
      </Box>
      <Typography className={classes.textoInformativo}>
        Gostaria de editar ou incluir um novo hábito? Envie uma sugestão para
        <span style={{ color: '#F7C92A' }}> contato@jornadasolar.com.br</span>
      </Typography>
    </EdicaoDiario>
  )
}

interface IHabitosWithAuthProps {
  date: string
}

const HabitosWithAuth = withAuth(Habitos)

HabitosWithAuth.getInitialProps = (
  context: NextPageContext
): IHabitosWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default HabitosWithAuth
