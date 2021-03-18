import React, { FC } from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      animation: '$spin 8s linear infinite'
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' }
    }
  })
)

const SplashScreen: FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" minHeight="80vh">
        <Box
          flexGrow="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="/icons/icon-512x512.png"
            width="154px"
            height="154px"
            className={classes.image}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default SplashScreen
