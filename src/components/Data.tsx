import React, { FC } from 'react'
import { Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      margin: '0 auto',
      display: 'flex',
      fontSize: 16,
      fontWeight: 600
    }
  })
)

const Data: FC = ({ children }) => {
  const classes = useStyles()

  return <Typography className={classes.label}>{children}</Typography>
}

export default Data
