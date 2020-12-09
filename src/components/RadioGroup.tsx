import React, { FC } from 'react'
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

const RadioGroup: FC<IRadioGroupProps> = ({ titulo, options }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="subtitle2" className={classes.titulo}>
        {titulo}
      </Typography>

      <MuiRadioGroup>
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
