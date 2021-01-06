import React, { FC, ReactFragment } from 'react'
import Link from 'next/link'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    diario: {
      width: 332,
      minHeight: 100,
      margin: '20px auto',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)',
      borderRadius: '4px'
    },
    label: {
      marginTop: 4,
      alignItems: 'center',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '22px',
      textTransform: 'capitalize'
    },
    textoLink: {
      fontWeight: 700,
      fontSize: 12,
      cursor: 'pointer'
    }
  })
)

interface IProps {
  label: string
  value: ReactFragment
  linkHref: string
}

const DetalheDoItem: FC<IProps> = ({ label, value, linkHref }) => {
  const classes = useStyles()
  return (
    <Box className={classes.diario}>
      <Box display="flex" justifyContent="space-between" p={2} pb={0}>
        <Typography className={classes.label} color="textSecondary">
          {label}:
        </Typography>

        <Link href={linkHref}>
          <Typography color="primary" className={classes.textoLink}>
            Editar
          </Typography>
        </Link>
      </Box>
      <Box p={2}>{value}</Box>
    </Box>
  )
}

export default DetalheDoItem
