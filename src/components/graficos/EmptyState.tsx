import { Box, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    texto: {
      maxWidth: 300,
      marginTop: 30,
      fontSize: 16,
      textAlign: 'center'
    }
  })
)

const EmptyState: FC = () => {
  const classes = useStyles()

  return (
    <Box
      mt="36px"
      flexGrow="1"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* TODO: Validar com cliente a ilustração e frase */}
      <img src="/signo/capricornio.png" width="136px" height="136px" />

      <Typography className={classes.texto}>
        Ainda não existem registros nesse mês
      </Typography>
    </Box>
  )
}

export default EmptyState
