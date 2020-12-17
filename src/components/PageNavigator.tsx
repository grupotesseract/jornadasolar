import { Box, IconButton, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      alignItems: 'center',
      textAlign: 'center'
    },
    label: {
      margin: '0 auto',
      display: 'flex',
      fontSize: 16,
      fontWeight: 600
    }
  })
)

interface IProps {
  label: string
  onVoltarClick: () => void
  onAvancarClick: () => void
  onAvancarDisabled: boolean
}

const PageNavigator: FC<IProps> = ({
  label,
  onVoltarClick,
  onAvancarClick,
  onAvancarDisabled
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.container} display="flex">
      <IconButton color="inherit" onClick={onVoltarClick}>
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
      <Typography className={classes.label}>{label}</Typography>
      <IconButton
        color="inherit"
        onClick={onAvancarClick}
        disabled={onAvancarDisabled}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default PageNavigator
