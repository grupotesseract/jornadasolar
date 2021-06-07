/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ptBR } from 'date-fns/locale'
import { InputAdornment } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from './TextField'

interface Props {
  value: Date
  disabled?: boolean
  onChange: (Date) => void
}

const DateInput = ({ value, disabled = false, onChange }: Props) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
    <DatePicker
      cancelLabel="Cancelar"
      format="dd/MM/yyyy"
      inputVariant="outlined"
      TextFieldComponent={TextField}
      disabled={disabled}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ExpandMoreIcon />
          </InputAdornment>
        )
      }}
    />
  </MuiPickersUtilsProvider>
)

export default DateInput
