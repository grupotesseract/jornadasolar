import React from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import LinkVoltar from 'src/components/LinkVoltar'

const useStyles = makeStyles({
  tituloContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 48
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

interface IProps {
  link: string
  titulo: string
}

const TituloConfig = ({ link, titulo }: IProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.tituloContainer}>
      <LinkVoltar href={link} />
      <Typography variant="button" className={classes.titulo}>
        {titulo}
      </Typography>
    </Box>
  )
}

export default TituloConfig
