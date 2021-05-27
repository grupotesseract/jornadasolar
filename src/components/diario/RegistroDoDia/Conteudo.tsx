import { Typography } from '@material-ui/core'
import React, { FC, ReactFragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Emoji from '../../Emoji'

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      marginLeft: 8,
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer'
    },
    conteudo: {
      marginLeft: 8,
      maxWidth: 220,
      overflow: 'hidden',
      fontSize: 16,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  })
)

interface IProps {
  conteudo: ReactFragment
  linkHref: string
  linkLabel: string
}

const Conteudo: FC<IProps> = ({ conteudo, linkHref, linkLabel }) => {
  const classes = useStyles()

  if (conteudo) {
    return <Typography className={classes.conteudo}>{conteudo}</Typography>
  }
  return (
    <>
      <Emoji nome="lapis" />
      <Link href={linkHref}>
        <Typography
          color="primary"
          className={classes.link}
          data-cy="link-preencher"
        >
          {linkLabel}
        </Typography>
      </Link>
    </>
  )
}

export default Conteudo
