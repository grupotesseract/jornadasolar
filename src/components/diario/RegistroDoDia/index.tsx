import { Grid, Typography } from '@material-ui/core'
import React, { FC, Fragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Categoria from './Categoria'
import { IRegistro } from '../../../entities/Registro'
import Sentimento from '../Sentimento'
import Habito from '../Habito'

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
  diario: IRegistro
}

const RegistroDoDia: FC<IProps> = ({ diario }) => {
  const classes = useStyles()
  const habitos = diario.gruposDeHabitos?.map(grupo => grupo.habitos).flat()
  const dataFormatada = format(diario.date, 'd-M-yyyy')

  if (!diario) {
    return null
  }

  return (
    <Grid
      container
      className={classes.diario}
      spacing={3}
      key={diario.id}
      data-cy="box-diario"
    >
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
        <Link href={`/app/diario/${dataFormatada}`}>
          <Typography
            color="primary"
            className={classes.textoLink}
            data-cy="ver-mais"
          >
            Ver mais
          </Typography>
        </Link>
      </Grid>

      <Categoria
        key="registro-do-dia-sentimentos"
        nome="sentimentos"
        conteudo={diario.sentimentos?.map((nomeSentimento, index) => {
          return (
            <Fragment key={`sentimento-${index}`}>
              <Sentimento nome={nomeSentimento} />
              {index === diario.sentimentos.length - 1 ? null : ', '}
            </Fragment>
          )
        })}
        linkHref={`/app/diario/${dataFormatada}/sentimentos`}
      />
      <Categoria
        key="registro-do-dia-habitos"
        nome="hábitos"
        conteudo={habitos?.map((habito, index) => (
          <Fragment key={`habito-${index}`}>
            <Habito habito={habito} />
            {index === habitos.length - 1 ? null : ', '}
          </Fragment>
        ))}
        linkHref={`/app/diario/${dataFormatada}/habitos`}
      />
      <Categoria
        key="registro-do-dia-anotacoes"
        nome="anotações"
        conteudo={diario.anotacoes}
        linkHref={`/app/diario/${dataFormatada}/anotacoes`}
      />
    </Grid>
  )
}

export default RegistroDoDia
