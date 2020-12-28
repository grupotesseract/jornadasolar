import React, { FC } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '../components/Button'
import Link from 'next/link'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      fontSize: 20,
      fontWeight: 700
    },
    texto: {
      maxWidth: 300,
      marginTop: 30,
      fontSize: 20,
      lineHeight: '27px',
      textAlign: 'center'
    }
  })
)

const Home: FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box mt={2} alignSelf="center">
          <Typography color="primary" className={classes.titulo}>
            Jornada Solar
          </Typography>
        </Box>

        <Box
          mt={2}
          flexGrow="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* TODO: Substituir icon por ilustração */}
          <img src="/icons/icon-512x512.png" width="154px" height="154px" />

          <Typography className={classes.texto}>
            Embarque em uma jornada de autoconhecimento e monitore seus hábitos
            e emoções
          </Typography>
        </Box>

        <Box mb={2} alignSelf="center">
          <Link href="/cadastro" passHref>
            <Button variant="contained" color="primary">
              Começar Jornada
            </Button>
          </Link>
        </Box>

        <Box mb={3} alignSelf="center">
          <Link href="/login" passHref>
            <Button variant="outlined" color="primary">
              Já tenho cadastro
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
