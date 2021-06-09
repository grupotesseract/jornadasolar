import React, { FC } from 'react'
import { SelectProps, withStyles } from '@material-ui/core'
import MuiSelect from '@material-ui/core/Select'

const StyledSelect = withStyles(() => ({
  root: {
    width: 264
  }
}))(MuiSelect)

const SelectionField: FC<SelectProps> = props => (
  <StyledSelect variant="outlined" {...props} />
)

export default SelectionField
