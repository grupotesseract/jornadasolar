import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

interface ILoadingProps {
  size?: number | string
  color?: 'primary' | 'secondary' | 'inherit'
}

const Loading = ({ size = 40, color = 'primary' }: ILoadingProps) => (
  <Box display="flex" height="50vh" justifyContent="center" alignItems="center">
    <CircularProgress size={size} color={color} />
  </Box>
)

export default Loading
