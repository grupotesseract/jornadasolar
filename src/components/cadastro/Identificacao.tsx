import React, { FC } from 'react'
import {
  Box,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '../Button'
import Emoji from '../Emoji'
import TextField from '../TextField'
import Radio from '../Radio'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      fontSize: 30,
      fontWeight: 800,
      lineHeight: '41px'
    },
    subtitulo: {
      width: 300,
      marginTop: 20,
      marginBottom: 15,
      fontSize: 20,
      lineHeight: '27px'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    conteudo: {
      flexGrow: 1,
      alignSelf: 'center'
    }
  })
)

const Identificacao: FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.conteudo} mt={2}>
        <Box mt={3} maxWidth={280}>
          <Typography variant="h4" component="h1" className={classes.titulo}>
            Olá! Parabéns por começar sua jornada <Emoji nome="feliz" />
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.subtitulo}
        >
          Para começar, como gostaria de ser chamado?
        </Typography>

        <TextField />

        <Typography variant="subtitle1" className={classes.subtitulo}>
          E com qual pronome você se identifica?
        </Typography>

        <RadioGroup aria-label="pronome" name="pronome">
          <FormControlLabel
            value="ele"
            control={<Radio color="primary" />}
            label={<span style={{ fontSize: 20 }}>Ele</span>}
          />
          <FormControlLabel
            value="ela"
            control={<Radio color="primary" />}
            label={<span style={{ fontSize: 20 }}>Ela</span>}
          />
        </RadioGroup>
      </Box>

      <Box mb={3} alignSelf="center">
        <Button variant="contained" color="primary">
          Continuar
        </Button>
      </Box>
    </Container>
  )
}

export default Identificacao
