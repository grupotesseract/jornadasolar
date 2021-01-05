import { Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Link from 'next/link'

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      marginTop: 14,
      marginLeft: 6,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer'
    },
    icone: {
      marginRight: 6
    }
  })
)

interface IProps {
  href: string
}

const LinkVoltar: FC<IProps> = ({ href }) => {
  const classes = useStyles()

  return (
    <Link href={href}>
      <Typography className={classes.label}>
        <ArrowBackIcon className={classes.icone} fontSize="small" />
        Voltar
      </Typography>
    </Link>
  )
}

export default LinkVoltar
