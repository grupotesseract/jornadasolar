import { Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Emoji from '../../Emoji'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Item from './Item'
import { sentimentos } from '../Sentimentos'
import { IDiario } from '../../../services/GetUserDiariosByDateRange'

const useStyles = makeStyles(() =>
  createStyles({
    diario: {
      width: 332,
      height: 200,
      margin: '20px auto',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)',
      borderRadius: '4px'
    },
    dia: {
      display: 'flex',
      alignItems: 'center',
      color: '#828282',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: '16px',
      textTransform: 'uppercase'
    },
    textoLink: {
      marginLeft: 8,
      fontWeight: 700,
      fontSize: 14
    }
  })
)

interface IProps {
  diario: IDiario
}

const RegistroDoDia: FC<IProps> = ({ diario }) => {
  const classes = useStyles()
  const habitos = []

  if (!diario) {
    return null
  }

  return (
    <Grid container className={classes.diario} spacing={3} key={diario.id}>
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography className={classes.dia}>
          {format(diario.date, "EEEE, d 'de' MMMM", {
            locale: ptBR
          })}
        </Typography>
        <Link href="" passHref>
          <Typography color="primary" className={classes.textoLink}>
            Ver mais
          </Typography>
        </Link>
      </Grid>

      <Item
        label="sentimentos"
        value={diario.sentimentos?.map((nomeSentimento, index) => {
          const sentimento = sentimentos.find(s => s.nome === nomeSentimento)
          return (
            <>
              <Emoji nome={sentimento.emoji} /> {nomeSentimento}
              {index === diario.sentimentos.length - 1 ? null : ', '}
            </>
          )
        })}
      />
      <Item
        label="hábitos"
        value={diario.gruposDeHabitos?.map(grupo =>
          habitos.concat(grupo.habitos).join(', ')
        )}
      />
      <Item label="anotações" value={diario.anotacoes} />
    </Grid>
  )
}

export default RegistroDoDia
