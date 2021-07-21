import React, { useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AlertTitle } from '@material-ui/lab'
import {
  Collapse,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import theme from '../../theme'
import { firebaseCloudMessaging } from 'src/utils/webPush'

const useStyles = makeStyles(() =>
  createStyles({
    hiddenCollapse: {
      display: 'none'
    },
    root: {
      maxWidth: 335,
      margin: '0 auto',
      padding: '6px 12px',
      background: 'linear-gradient(95.27deg, #4237BF 0.47%, #9C37BF 100.56%)',
      borderRadius: 10,
      fontSize: 16
    },
    title: {
      display: 'flex',
      fontWeight: 800,
      alignItems: 'center'
    },
    destaque: {
      height: 16,
      width: 46,
      minWidth: 46,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
      borderRadius: 10,
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      fontWeight: 800,
      fontSize: 8,
      textTransform: 'uppercase',
      lineHeight: '11px'
    },
    actions: {
      justifyContent: 'flex-end'
    },
    botaoAcao: {
      fontWeight: 800
    },
    cardTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    botaoFechar: {
      color: '#FFF',
      padding: 0
    }
  })
)

const NovidadeNotificacao = () => {
  const classes = useStyles()
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    setVisivel(Notification.permission === 'default')
  }, [])

  const handleOnClose = () => {
    setVisivel(false)
  }

  const handleAtivar = async () => {
    await Notification.requestPermission()
    setVisivel(Notification.permission === 'default')
  }
  return (
    <Collapse
      in={visivel}
      className={!visivel ? `${classes.hiddenCollapse}` : ''}
    >
      <Card className={classes.root}>
        <CardContent>
          <Box className={classes.cardTitle}>
            <Typography gutterBottom className={classes.title}>
              Receba novidades!<div className={classes.destaque}>Novo</div>
            </Typography>
            <IconButton className={classes.botaoFechar} onClick={handleOnClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          Ative as Notificações e fique por dentro de novidades do Jornada
          Solar!
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            className={classes.botaoAcao}
            size="small"
            onClick={handleOnClose}
          >
            Agora não
          </Button>
          <Button
            className={classes.botaoAcao}
            size="small"
            color="primary"
            onClick={handleAtivar}
            variant="contained"
          >
            Ativar
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  )
}

export default NovidadeNotificacao
