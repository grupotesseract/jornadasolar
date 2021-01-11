import { Box, IconButton } from '@material-ui/core'
import React, { FC } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Data from './Data'

interface IProps {
  label: string
  onVoltarClick: () => void
  onAvancarClick: () => void
  avancarDisabled: boolean
}

const DiarioNavigator: FC<IProps> = ({
  label,
  onVoltarClick,
  onAvancarClick,
  avancarDisabled
}) => (
  <Box display="flex" alignItems="center" textAlign="center">
    <IconButton color="inherit" onClick={onVoltarClick}>
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
    <Data>{label}</Data>
    <IconButton
      color="inherit"
      onClick={onAvancarClick}
      disabled={avancarDisabled}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  </Box>
)

export default DiarioNavigator
