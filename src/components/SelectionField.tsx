import React, { ChangeEvent, FC } from 'react'
import { MenuItem, withStyles } from '@material-ui/core'
import MuiSelect from '@material-ui/core/Select'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InputLabel from './InputLabel'

type options = {
  value: string
  label: string
}

interface ISelectProps {
  titulo: string
  options: Array<options>
  value: string
  onChange: (e: ChangeEvent) => void
  disabled: boolean
}

const StyledSelect = withStyles(() => ({
  root: {
    width: 264
  },
  icon: {
    color: '#fff'
  }
}))(MuiSelect)

const SelectionField: FC<ISelectProps> = ({
  titulo,
  options,
  value,
  onChange,
  disabled
}) => {
  return (
    <>
      <InputLabel>{titulo}</InputLabel>
      <StyledSelect
        IconComponent={ExpandMoreIcon}
        variant="outlined"
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </>
  )
}

export default SelectionField
