import React, { FC, useState } from 'react'
import { Button, Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles(() =>
  createStyles({
    contato: {
      marginTop: 16,
      width: 320,
      fontSize: 18,
      lineHeight: '25px'
    },
    botao: {
      marginTop: 8,
      padding: '6px 0px',
      color: '#FFF',
      fontSize: 18,
      lineHeight: '25px',
      textTransform: 'none',
      textDecorationLine: 'underline'
    }
  })
)

const EsqueciMinhaSenha: FC = () => {
  const classes = useStyles()

  return (
    <Link href="/auth/esquecisenha">
      <Typography className={classes.botao}>Esqueci minha senha</Typography>
    </Link>
  )
}

export default EsqueciMinhaSenha
