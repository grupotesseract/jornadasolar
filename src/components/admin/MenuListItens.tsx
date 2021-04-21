import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SpaIcon from '@material-ui/icons/Spa'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SpaIcon />
      </ListItemIcon>
      <ListItemText primary="Meditações" />
    </ListItem>
  </div>
)
