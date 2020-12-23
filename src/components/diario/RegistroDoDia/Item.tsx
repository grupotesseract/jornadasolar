import { Grid, Typography } from '@material-ui/core'
import React, { FC, ReactFragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ItemValue from './ItemValue'

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      marginRight: 8,
      fontSize: 16,
      fontWeight: 600,
      textTransform: 'capitalize'
    }
  })
)

interface IProps {
  label: string
  value: ReactFragment
}

const Item: FC<IProps> = ({ label, value }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} style={{ display: 'flex' }}>
      <Typography color="textSecondary" className={classes.label}>
        {label}:
      </Typography>
      <ItemValue value={value} label={label} />
    </Grid>
  )
}

export default Item
