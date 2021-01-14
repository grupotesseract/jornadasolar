import { Box, IconButton } from '@material-ui/core'
import React, { FC } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { addMonths, format, isThisMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Data from './Data'

interface IProps {
  mes: Date
  onClick: (Date) => void
}

const MonthNavigator: FC<IProps> = ({ mes, onClick }) => {
  const handleVoltar = () => {
    const novoMes = addMonths(mes, -1)
    onClick(novoMes)
  }

  const handleProximo = () => {
    const novoMes = addMonths(mes, 1)
    onClick(novoMes)
  }

  return (
    <Box display="flex" alignItems="center" textAlign="center">
      <IconButton color="inherit" onClick={handleVoltar}>
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
      <Data>{format(mes, 'MMMM, yyyy', { locale: ptBR })}</Data>
      <IconButton
        color="inherit"
        onClick={handleProximo}
        disabled={isThisMonth(mes)}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}
export default MonthNavigator
