import React, { FC } from 'react'
import { Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    subtitulo: {
      width: 300,
      marginBottom: 16,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 20,
      fontWeight: 300,
      lineHeight: '27px'
    }
  })
)

const Subtitulo: FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      className={classes.subtitulo}
    >
      {children}
    </Typography>
  )
}

export default Subtitulo
