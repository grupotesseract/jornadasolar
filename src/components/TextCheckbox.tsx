import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Checkbox, CheckboxProps } from '@material-ui/core'
import theme from '../../theme'

const StyledTextCheckbox = withStyles({
  root: {
    margin: '6px 0',
    width: 312,
    height: 65,
    justifyContent: 'start',
    color: theme.palette.text.secondary,
    borderRadius: '4px',
    border: '2px solid #828282',
    fontSize: 20,
    fontWeight: 300,
    lineHeight: '27px',
    '&$checked': {
      color: theme.palette.text.primary,
      border: '2px solid #F7C92A',
      fontWeight: 'normal'
    }
  },
  checked: {}
})(Checkbox)

const TextCheckbox: FC<CheckboxProps> = (props: CheckboxProps) => (
  <StyledTextCheckbox {...props} />
)

export default TextCheckbox
