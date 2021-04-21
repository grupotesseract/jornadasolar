import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { closed as alertClosedAction } from '../redux/alert'

const Alert: FC = () => {
  const { severity, message, only } = useSelector(state => state.alert)
  if (!message) {
    return null
  }

  const { route } = useRouter()
  if (Boolean(only.length) && !only.includes(route)) {
    return null
  }

  const dispatch = useDispatch()
  const { onClose } = bindActionCreators(
    { onClose: alertClosedAction },
    dispatch
  )

  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => onClose()}
    >
      <MuiAlert severity={severity}>{message}</MuiAlert>
    </Snackbar>
  )
}

export default Alert
