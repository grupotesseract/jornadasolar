import React, { FC, useState } from 'react'
import { Button, Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'

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
  const [botaoClicado, setBotaoClicado] = useState(false)
  const classes = useStyles()

  const handleButtonClick = () => setBotaoClicado(true)

  if (botaoClicado) {
    return (
      <Typography className={classes.contato}>
        Esqueceu sua senha? Entre em contato com a gente pelo email
        jornadasolar@gmail.com
      </Typography>
    )
  }

  return (
    <Button className={classes.botao} onClick={handleButtonClick}>
      Esqueci minha senha
    </Button>
  )
}

export default EsqueciMinhaSenha
