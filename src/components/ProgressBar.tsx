import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Emoji from './Emoji'
import theme from '../../theme'

const useStyles = makeStyles({
  container: {
    width: 296,
    height: 60,
    margin: '15px auto',
    borderRadius: 4,
    backgroundColor: theme.palette.text.secondary
  },
  filler: completed => ({
    width: `${completed}%`,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: `${completed}%` === '100%' ? 4 : 'none',
    borderTopRightRadius: `${completed}%` === '100%' ? 4 : 'none',
    textAlign: 'right'
  }),
  label: {
    fontSize: 16,
    marginLeft: 19,
    color: theme.palette.secondary.main,
    fontWeight: 800,
    textAlign: 'left'
  },
  emoji: {
    textAlign: 'right',
    marginRight: 14,
    fontSize: 30
  }
})

interface IProps {
  completed: number
  label: string
  emoji: string
}

const ProgressBar: FC<IProps> = ({ completed, label, emoji }) => {
  const classes = useStyles(Math.round(completed))

  return (
    <div className={classes.container}>
      <div className={classes.filler}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width={296}
        >
          <span className={classes.label}>
            {`${Math.round(completed)}% ${label}`}
          </span>
          <span>
            <Emoji nome={emoji} className={classes.emoji} />
          </span>
        </Box>
      </div>
    </div>
  )
}

export default ProgressBar
