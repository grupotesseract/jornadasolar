import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import { Collapse } from '@material-ui/core'
import DispensarNovidade from 'src/services/user/DispensarNovidade'
import theme from '../../theme'
import { IUser } from 'src/entities/User'
import GetNovidadeValida from 'src/services/novidades/GetNovidadeValida'
import { INovidade } from 'src/entities/Novidade'

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
      color: '#FFF',
      fontSize: 16
    },
    alertTitle: {
      display: 'flex',
      fontWeight: 700
    },
    destaque: {
      width: 46,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 46,
      alignSelf: 'flex-start',
      marginTop: 4,
      marginLeft: 8,
      borderRadius: 10,
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      fontWeight: 800,
      fontSize: 8,
      textTransform: 'uppercase',
      lineHeight: '11px'
    },
    action: {
      alignItems: 'flex-start'
    },
    message: {
      flex: 1
    }
  })
)

interface IProps {
  path: string
  user: IUser
}

const Novidade: FC<IProps> = ({ user, path }) => {
  const classes = useStyles()
  const [visivel, setVisivel] = useState(false)
  const [novidade, setNovidade] = useState<INovidade>()

  const dispensarNovidade = () => {
    new DispensarNovidade().call(novidade.id, user)
  }

  useEffect(() => {
    const verificarNovidade = async () => {
      const novidade = await new GetNovidadeValida().call(user, path)
      setNovidade(novidade)
    }
    verificarNovidade()
  }, [])

  useEffect(() => {
    setVisivel(!!novidade)
    if (novidade?.autoDispensar) {
      dispensarNovidade()
    }
  }, [novidade])

  const handleOnClose = () => {
    setVisivel(false)
    if (!novidade?.autoDispensar) {
      dispensarNovidade()
    }
  }

  return (
    <Collapse
      in={visivel}
      className={!visivel ? `${classes.hiddenCollapse}` : ''}
    >
      <Alert
        onClose={handleOnClose}
        icon={<></>}
        classes={{
          root: classes.root,
          action: classes.action,
          message: classes.message
        }}
      >
        <AlertTitle className={classes.alertTitle}>
          {novidade?.titulo}
          <div className={classes.destaque}>Novo</div>
        </AlertTitle>
        {novidade?.descricao}
      </Alert>
    </Collapse>
  )
}

export default Novidade
