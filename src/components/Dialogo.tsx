import React, { FC, ReactNode } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import theme from 'theme'

const useStyles = makeStyles(() =>
  createStyles({
    dialogo: {
      backgroundColor: theme.palette.background.default
    },
    botaoFechar: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1)
    }
  })
)
interface IDialogoProps {
  children: ReactNode
  isOpen?: boolean
  onConfirmar: () => void
  onFechar: () => void
  titulo?: ReactNode
  labelConfirmar?: string
  labelCancelar?: string
}

const Dialogo: FC<IDialogoProps> = ({
  children,
  titulo,
  onConfirmar,
  onFechar,
  isOpen = false,
  labelConfirmar = 'Confirmar',
  labelCancelar = 'Cancelar'
}) => {
  const classes = useStyles()

  const handleConfirmar = () => {
    onConfirmar()
    onFechar()
  }

  return (
    <Dialog open={isOpen} PaperProps={{ className: classes.dialogo }}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.botaoFechar}
          onClick={onFechar}
        >
          <CloseIcon />
        </IconButton>
        {titulo}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {labelCancelar !== '' && (
          <Button onClick={onFechar} color="primary">
            {labelCancelar}
          </Button>
        )}
        <Button onClick={handleConfirmar} color="primary">
          {labelConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialogo
