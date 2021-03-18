import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { TextField, TextFieldProps } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    underline: {
      '&&&:before': {
        borderBottom: 'none'
      },
      '&&:after': {
        borderBottom: 'none'
      }
    }
  })
)

const TextArea: FC<TextFieldProps> = ({ onChange, id, value }) => {
  const classes = useStyles()

  return (
    <TextField
      onChange={onChange}
      fullWidth
      id={id}
      multiline
      value={value}
      InputProps={{ classes }}
      data-cy="text-area"
    />
  )
}

export default TextArea
