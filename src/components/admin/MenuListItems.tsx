import React, { FC } from 'react'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SpaIcon from '@material-ui/icons/Spa'
import Link from 'next/link'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: '#828282'
    }
  }
})

const MenuListItems: FC = () => {
  const classes = useStyles()

  return (
    <Box>
      <Link href="/admin">
        <ListItem button className={classes.root}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link href="/admin/meditacoes">
        <ListItem button className={classes.root}>
          <ListItemIcon>
            <SpaIcon />
          </ListItemIcon>
          <ListItemText primary="Meditações" />
        </ListItem>
      </Link>
    </Box>
  )
}

export default MenuListItems
