import { Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Item from './Item'
import { IDiario } from '../../../services/GetUserDiariosByDateRange'
import Sentimento from '../Sentimento'

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
      fontSize: 14,
      cursor: 'pointer'
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
        <Link href={`/diario/${format(diario.date, 'd-M-yyyy')}`}>
          <Typography color="primary" className={classes.textoLink}>
            Ver mais
          </Typography>
        </Link>
      </Grid>

      <Item
        key="registro-do-dia-sentimentos"
        label="sentimentos"
        value={diario.sentimentos?.map((nomeSentimento, index) => {
          return (
            <>
              <Sentimento nome={nomeSentimento} key={`sentimento-${index}`} />
              {index === diario.sentimentos.length - 1 ? null : ', '}
            </>
          )
        })}
      />
      <Item
        key="registro-do-dia-habitos"
        label="hábitos"
        value={diario.gruposDeHabitos?.map(grupo =>
          habitos.concat(grupo.habitos).join(', ')
        )}
      />
      <Item
        key="registro-do-dia-anotacoes"
        label="anotações"
        value={diario.anotacoes}
      />
    </Grid>
  )
}

export default RegistroDoDia
