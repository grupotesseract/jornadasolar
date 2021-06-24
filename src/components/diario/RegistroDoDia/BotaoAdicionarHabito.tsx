import React from 'react'
import {
  createStyles,
  IconButton,
  makeStyles,
  Typography,
  withStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import theme from '../../../../theme'
import Link from 'next/link'

const StyledButton = withStyles({
  root: {
    width: '58px',
    height: '58px',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '%0%',
    '&:hover': {
      backgroundColor: '#4F4F4F'
    }
  }
})(IconButton)

const useStyles = makeStyles(() =>
  createStyles({
    labelBotao: {
      marginTop: 5,
      marginBottom: 16,
      color: '#828282',
      fontSize: '14px',
      lineHeight: '19px',
      textAlign: 'center'
    }
  })
)

interface IBotaoAdicionarHabitoProps {
  href: any
  classname?: string
}

const BotaoAdicionarHabito = ({ href }: IBotaoAdicionarHabitoProps) => {
  const classes = useStyles()

  return (
    <Link href={href} passHref>
      <div>
        <StyledButton>
          <AddIcon color="secondary" fontSize="large" />
        </StyledButton>
        <Typography className={classes.labelBotao}>Novo hábito</Typography>
      </div>
    </Link>
  )
}

export default BotaoAdicionarHabito
