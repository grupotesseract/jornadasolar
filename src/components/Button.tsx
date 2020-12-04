import React, { FC } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiButton, { ButtonProps } from '@material-ui/core/Button'

type Props = ButtonProps

const StyledButton = withStyles({
  root: {
    borderRadius: 30,
    width: 300,
    height: 60,
    fontSize: 20,
    textTransform: 'none',
    fontWeight: 700
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
