import React, { FC, ReactNode } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
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
}

const Dialogo: FC<IDialogoProps> = ({
  children,
  onConfirmar,
  onFechar,
  isOpen
}) => {
  const classes = useStyles()

  const handleConfirmar = () => {
    onConfirmar()
    onFechar()
  }

  return (
    <Dialog open={isOpen} PaperProps={{ className: classes.dialogo }}>
      <DialogContent>
        <IconButton
          aria-label="close"
          className={classes.botaoFechar}
          onClick={onFechar}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onFechar} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmar} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Dialogo.defaultProps = {
  isOpen: false
}

export default Dialogo
