import { Grid, Typography } from '@material-ui/core'
import React, { FC, ReactFragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Conteudo from './Conteudo'

const useStyles = makeStyles(() =>
  createStyles({
    nome: {
      marginRight: 8,
      fontSize: 16,
      fontWeight: 600,
      textTransform: 'capitalize'
    }
  })
)

interface IProps {
  nome: string
  conteudo: ReactFragment
  linkHref: string
}

const Categoria: FC<IProps> = ({ nome, conteudo, linkHref }) => {
  const classes = useStyles()
  const linkLabel =
    nome === 'anotações' ? 'Escrever sobre seu dia' : `Preencher ${nome}`

  return (
    <Grid item xs={12} style={{ display: 'flex' }}>
      <Typography color="textSecondary" className={classes.nome}>
        {nome}:
      </Typography>
      <Conteudo conteudo={conteudo} linkLabel={linkLabel} linkHref={linkHref} />
    </Grid>
  )
}

export default Categoria
