import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import { Collapse } from '@material-ui/core'
import DispensarNovidade from 'src/services/user/DispensarNovidade'
import theme from '../../theme'
import { IUser } from 'src/entities/User'

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
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 700
    },
    destaque: {
      width: 46,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    }
  })
)

interface IProps {
  slug: string
  user: IUser
}

const Novidade: FC<IProps> = ({ user, slug }) => {
  const classes = useStyles()
  const [visivel, setVisivel] = useState(false)
  const titulo = 'Crie hábitos personalizados!'
  const descricao =
    'Arraste até o final da lista para criar novos hábitos de sua preferência 🙌'

  useEffect(() => {
    const verificarNovidade = async () => {
      const novidadeNaoDispensada = !user.novidadeDispensada(slug)
      setVisivel(novidadeNaoDispensada)
      if (novidadeNaoDispensada) {
        await new DispensarNovidade().call(slug, user)
      }
    }
    verificarNovidade()
  }, [])

  const handleOnClose = async () => {
    setVisivel(false)
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
          action: classes.action
        }}
      >
        <AlertTitle className={classes.alertTitle}>
          {titulo}
          <div className={classes.destaque}>Novo</div>
        </AlertTitle>
        {descricao}
      </Alert>
    </Collapse>
  )
}

export default Novidade
