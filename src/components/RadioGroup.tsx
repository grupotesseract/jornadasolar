import React, { FC, ChangeEvent } from 'react'
import {
  FormControlLabel,
  Typography,
  RadioGroup as MuiRadioGroup
} from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Radio from './Radio'

type options = {
  value: string
  label: string
}

interface IRadioGroupProps {
  titulo: string
  options: Array<options>
  onChange: (e: ChangeEvent) => void
}

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      width: 300,
      marginTop: 24,
      marginBottom: 15,
      fontSize: 20,
      lineHeight: '27px'
    },
    label: {
      fontSize: 20
    }
  })
)

const RadioGroup: FC<IRadioGroupProps> = ({ titulo, options, onChange }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="subtitle2" className={classes.titulo}>
        {titulo}
      </Typography>

      <MuiRadioGroup onChange={onChange}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={<span className={classes.label}>{option.label}</span>}
          />
        ))}
      </MuiRadioGroup>
    </>
  )
}
export default RadioGroup
