import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiButton, { ButtonProps } from '@material-ui/core/Button'

type Props = ButtonProps

const StyledButton = withStyles({
  root: {
    width: 300,
    height: 60,
    borderRadius: 30,
    border: '2px solid #F7C92A',
    fontSize: 20,
    fontWeight: 700,
    textTransform: 'none'
  }
})(MuiButton)

const Button: FC<Props> = ({ children, color, variant, onClick }) => {
  return (
    <StyledButton onClick={onClick} color={color} variant={variant}>
      {children}
    </StyledButton>
  )
}

export default Button
