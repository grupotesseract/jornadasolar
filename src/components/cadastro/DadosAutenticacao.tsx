import React, { FC } from 'react'
import {
  Box,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  InputLabel
} from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '../Button'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Radio from '../Radio'
import PasswordTextField from '../PasswordTextField'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    conteudo: {
      flexGrow: 1,
      alignSelf: 'center'
    },
    titulo: {
      marginBottom: 36,
      fontSize: 30,
      fontWeight: 800,
      lineHeight: '41px'
    },
    subtitulo: {
      width: 300,
      marginTop: 24,
      marginBottom: 15,
      fontSize: 20,
      lineHeight: '27px'
    },
    inputLabel: {
      marginTop: 22,
      marginBottom: 16,
      fontSize: 20,
      lineHeight: '27px'
    },
    label: {
      fontSize: 20
    }
  })
)

const DadosAutenticacao: FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.conteudo} mt={2}>
        <Box mt={3} maxWidth={285}>
          <Typography variant="h4" component="h1" className={classes.titulo}>
            Crie um cadastro e salve seus dados <Emoji nome="piscando" />
          </Typography>
        </Box>

        <InputLabel className={classes.inputLabel}>Email</InputLabel>
        <TextField />

        <InputLabel className={classes.inputLabel}>Senha</InputLabel>
        <PasswordTextField />

        <Typography variant="subtitle1" className={classes.subtitulo}>
          Você já tem o livro da Jornada Solar?
        </Typography>

        <RadioGroup aria-label="pronome" name="pronome">
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label={<span className={classes.label}>Sim, tenho!</span>}
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label={<span className={classes.label}>Não tenho</span>}
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label={
              <span className={classes.label}>Não, mas quero saber mais</span>
            }
          />
        </RadioGroup>
      </Box>

      <Box mb={3} alignSelf="center">
        <Button variant="contained" color="primary">
          Pronto!
        </Button>
      </Box>
    </Container>
  )
}

export default DadosAutenticacao
