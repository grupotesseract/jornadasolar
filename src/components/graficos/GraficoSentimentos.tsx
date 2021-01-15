import { Box, Typography } from '@material-ui/core'
import { getDaysInMonth } from 'date-fns'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ProgressBar from '../ProgressBar'
import { sentimentos as listaDeSentimentos } from '../diario/Sentimento'
import { IDiario } from '../../services/GetUserDiarioByDate'
import EmptyState from './EmptyState'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      width: 303,
      marginTop: 36,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })
)

interface IProps {
  diarios: Array<IDiario>
  mesAtual: Date
}

const GraficoSentimentos: FC<IProps> = ({ diarios, mesAtual }) => {
  const classes = useStyles()
  const sentimentosDoMes = diarios
    ?.map(diario => diario.sentimentos)
    .flat()
    .filter(sentimento => Boolean(sentimento))

  if (sentimentosDoMes?.length === 0) {
    return <EmptyState />
  }

  const sentimentos = [...new Set(sentimentosDoMes)]

  const sentimentoAgrupados = sentimentosDoMes?.reduce((grupo, sentimento) => {
    grupo[sentimento] = grupo[sentimento] ? grupo[sentimento] + 1 : 1

    return grupo
  }, {})

  return (
    <Box>
      <Typography className={classes.titulo}>
        Acompanhe a frequência de cada emoção ao longo do mês:
      </Typography>
      <Box mt={2}>
        {sentimentos.map((sentimento, index) => {
          const quantidadeNoMes = sentimentoAgrupados[sentimento]
          const percentual = (quantidadeNoMes * 100) / getDaysInMonth(mesAtual)
          const emoji = listaDeSentimentos.find(
            item => item.nome === sentimento
          )
          return (
            <ProgressBar
              key={index}
              completed={percentual}
              label={sentimento}
              emoji={emoji.emoji}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default GraficoSentimentos
