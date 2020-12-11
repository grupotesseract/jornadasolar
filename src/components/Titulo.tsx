import React, { FC } from 'react'
import { Box, Typography } from '@material-ui/core/'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      fontSize: 30,
      fontWeight: 800,
      lineHeight: '41px'
    }
  })
)

const Titulo: FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Box mt={3} maxWidth={290} ml="auto" mr="auto">
      <Typography variant="h4" component="h1" className={classes.titulo}>
        {children}
      </Typography>
    </Box>
  )
}

export default Titulo
