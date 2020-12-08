import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiInputLabel from '@material-ui/core/InputLabel'
import { InputLabelProps } from '@material-ui/core'

const StyledInputLabel = withStyles({
  root: {
    marginTop: 22,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 300,
    lineHeight: '27px'
  }
})(MuiInputLabel)

const InputLabel: FC<InputLabelProps> = (props: InputLabelProps) => (
  <StyledInputLabel {...props} />
)

export default InputLabel
