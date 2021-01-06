import React, { FC } from 'react'
import Alert from '@material-ui/lab/Alert'
import MuiSnackbar from '@material-ui/core/Snackbar'
import { SnackbarProps } from '@material-ui/core'

interface IProps extends Omit<SnackbarProps, 'open'> {
  message: string | null | undefined
  severity: 'success' | 'warning' | 'error' | 'info'
  open: boolean
  onClose?: () => void
}

const Snackbar: FC<IProps> = ({ message, severity, open, onClose }) => (
  <MuiSnackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <Alert severity={severity}>{message}</Alert>
  </MuiSnackbar>
)

export default Snackbar
