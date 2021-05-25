import React, { FC } from 'react'
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SpaIcon from '@material-ui/icons/Spa'
import Link from 'next/link'

const MenuListItems: FC = () => {
  return (
    <Box>
      <Link href="/admin">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link href="/admin/meditacoes">
        <ListItem button>
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
