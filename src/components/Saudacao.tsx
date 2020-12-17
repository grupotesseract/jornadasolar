import { Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { getHours } from 'date-fns'

interface IProps {
  nome: string
  className: string
}

const Saudacao: FC<IProps> = ({ nome, className }) => {
  const [hora, setHora] = useState(null)

  useEffect(() => {
    setHora(getHours(new Date()))
  }, [hora])

  if (hora >= 6 && hora <= 12) {
    return <Typography className={className}>Bom dia, {nome}</Typography>
  } else if (hora > 12 && hora <= 18) {
    return <Typography className={className}>Boa tarde, {nome}</Typography>
  } else {
    return <Typography className={className}>Boa noite,{nome}</Typography>
  }
}

export default Saudacao
