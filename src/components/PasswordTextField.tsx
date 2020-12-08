import React, { FC, useState } from 'react'
import { InputAdornment, IconButton, TextFieldProps } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import TextField from './TextField'

const PasswordTextField: FC = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const Icone = showPassword ? Visibility : VisibilityOff

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              style={{ paddingRight: 0 }}
            >
              <Icone style={{ fill: '#fff' }} />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    ></TextField>
  )
}

export default PasswordTextField
