import React, { FC } from 'react'
import { Box, Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Emoji from '../components/Emoji'
import TextField from '../components/TextField'
import PasswordTextField from '../components/PasswordTextField'
import Layout from '../components/Layout'
import Titulo from '../components/Titulo'
import InputLabel from '../components/InputLabel'

const useStyles = makeStyles(() =>
  createStyles({
    contato: {
      marginTop: 16,
      width: 320,
      fontSize: 18,
      lineHeight: '25px'
    }
  })
)

const Login: FC = () => {
  const classes = useStyles()

  return (
    <Layout textoBotao="Entrar">
      <Titulo>
        Oi! Que bom te ver por aqui <Emoji nome="feliz" />
      </Titulo>

      <Box mt={5}>
        <InputLabel>Email</InputLabel>
        <TextField />

        <InputLabel>Senha</InputLabel>
        <PasswordTextField />

        <Typography className={classes.contato}>
          Esqueceu sua senha? Entre em contato com a gente pelo email
          contato@jornadasolar.com.br
        </Typography>
      </Box>
    </Layout>
  )
}

export default Login
