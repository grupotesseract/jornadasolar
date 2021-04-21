import { Box, IconButton } from '@material-ui/core'
import React, { FC } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Link from 'next/link'
import { format } from 'date-fns'
import Data from './Data'

interface IProps {
  label: string
  anterior: Date
  proximo: Date
  proximoDisabled: boolean
}

const RegistroDoDiaNavigator: FC<IProps> = ({
  label,
  anterior,
  proximo,
  proximoDisabled
}) => (
  <Box display="flex" alignItems="center" textAlign="center">
    <Link href={`/app/diario/${format(anterior, 'd-M-yyyy')}`}>
      <IconButton color="inherit">
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
    </Link>
    <Data>{label}</Data>
    <Link href={`/app/diario/${format(proximo, 'd-M-yyyy')}`}>
      <IconButton color="inherit" disabled={proximoDisabled}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Link>
  </Box>
)

export default RegistroDoDiaNavigator
