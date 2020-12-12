import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import { TextFieldProps } from '@material-ui/core'

export const StyledTextField = withStyles({
  root: {
    width: 310
  }
})(MuiTextField)

const TextField: FC<TextFieldProps> = props => (
  <StyledTextField variant="outlined" fullWidth {...props} />
)

export default TextField
