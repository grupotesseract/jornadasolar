import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiRadio from '@material-ui/core/Radio'
import { RadioProps } from '@material-ui/core'

const StyledRadio = withStyles({
  root: {
    marginRight: 8,
    color: '#4F4F4F'
  },
  checked: {}
})(MuiRadio)

const Radio: FC<RadioProps> = (props: RadioProps) => (
  <StyledRadio {...props} color="primary" />
)

export default Radio
