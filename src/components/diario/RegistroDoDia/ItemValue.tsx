import { Typography } from '@material-ui/core'
import React, { FC, ReactFragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Emoji from '../../Emoji'

const useStyles = makeStyles(() =>
  createStyles({
    textoLink: {
      marginLeft: 8,
      fontWeight: 700,
      fontSize: 14
    },
    value: {
      marginLeft: 8,
      maxWidth: 220,
      overflow: 'hidden',
      fontSize: 16,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize'
    }
  })
)

interface IProps {
  label: string
  value: ReactFragment
}

const ItemValue: FC<IProps> = ({ value, label }) => {
  const classes = useStyles()
  const textoLink =
    label === 'anotações' ? 'Escrever sobre seu dia' : `Preencher ${label}`

  if (value) {
    return <Typography className={classes.value}>{value}</Typography>
  }
  return (
    <>
      <Emoji nome="lapis" />
      <Link href="/" passHref>
        <Typography color="primary" className={classes.textoLink}>
          {textoLink}
        </Typography>
      </Link>
    </>
  )
}

export default ItemValue
