import React, { FC } from 'react'
import { getDaysInMonth } from 'date-fns'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import ProgressBar from '../ProgressBar'
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

interface IListaComEmojis {
  nome: string
  emoji: string
}

interface IProps {
  registrosDoMes: Array<string>
  mesAtual: Date
  listaComEmojis: Array<IListaComEmojis>
  titulo: string
}

const GraficoBase: FC<IProps> = ({
  registrosDoMes,
  mesAtual,
  listaComEmojis,
  titulo
}) => {
  const classes = useStyles()

  if (registrosDoMes?.length === 0) {
    return <EmptyState />
  }

  const groupByQuantidade = registro => {
    const quantidade = registrosDoMes.reduce((quantidade, registroAtual) => {
      if (registroAtual === registro) {
        return quantidade + 1
      }

      return quantidade
    }, 0)

    return [registro, quantidade]
  }

  const sortByQuantidadeENome = (
    [nomeA, quantidadeA],
    [nomeB, quantidadeB]
  ) => {
    if (quantidadeA > quantidadeB) {
      return -1
    }

    if (quantidadeA < quantidadeB) {
      return 1
    }

    if (nomeA < nomeB) {
      return -1
    }

    if (nomeA > nomeB) {
      return 1
    }

    return 0
  }

  const registrosAgrupados = [...new Set(registrosDoMes)]
    .map(groupByQuantidade)
    .sort(sortByQuantidadeENome)

  return (
    <Box>
      <Typography className={classes.titulo}>{titulo}</Typography>
      <Box mt={2}>
        {registrosAgrupados.map(([registro, quantidade], index) => {
          const percentual = (quantidade * 100) / getDaysInMonth(mesAtual)
          const itens = listaComEmojis.find(item => {
            const nomeDoRegistro =
              typeof registro === 'string' ? registro : registro?.nome
            return item.nome.toLowerCase() === nomeDoRegistro?.toLowerCase()
          })
          return (
            <ProgressBar
              key={index}
              completed={percentual}
              label={itens.nome}
              emoji={itens.emoji}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default GraficoBase
