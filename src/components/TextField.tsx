import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'

export const StyledTextField = withStyles({
  root: {
    width: 300
  }
})(MuiTextField)

const TextField: FC = () => <StyledTextField variant="outlined" fullWidth />

export default TextField
