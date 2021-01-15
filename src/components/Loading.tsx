import React, { FC } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loading: FC = () => (
  <Box display="flex" height="50vh" justifyContent="center" alignItems="center">
    <CircularProgress />
  </Box>
)

export default Loading
