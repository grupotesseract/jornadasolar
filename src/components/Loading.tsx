import React, { FC } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loading: FC = () => (
  <Box
    display="flex"
    height="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress />
  </Box>
)

export default Loading
