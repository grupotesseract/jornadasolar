import React, { FC, useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '../components/Button'
import Link from 'next/link'
import withAuth from 'src/components/hocs/withAuth'
import { useRouter } from 'next/router'
import { appVersion } from '../utils/appVersion'
import theme from '../../theme'

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
    },
    appVersion: {
      textAlign: 'center',
      margin: 0,
      fontSize: 10,
      color: theme.palette.primary.main
    }
  })
)
interface IHomeProps {
  isSignedIn: boolean
}

const Home: FC<IHomeProps> = ({ isSignedIn }) => {
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/diario')
    }
  }, [isSignedIn])

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box mt={2} alignSelf="center">
          <Typography color="primary" className={classes.titulo}>
            Jornada Solar
          </Typography>
          <Typography className={classes.appVersion}>
            versão {appVersion}
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

export default withAuth(Home)
