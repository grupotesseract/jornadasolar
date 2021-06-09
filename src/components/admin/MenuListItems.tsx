import React, { FC } from 'react'
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SpaIcon from '@material-ui/icons/Spa'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuListItems: FC = () => {
  const paginaAtual = useRouter().pathname
  return (
    <Box>
      <Link href="/admin">
        <ListItem button selected={paginaAtual === '/admin'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link href="/admin/meditacoes">
        <ListItem button selected={paginaAtual.startsWith('/admin/meditacoes')}>
          <ListItemIcon>
            <SpaIcon />
          </ListItemIcon>
          <ListItemText primary="Meditações" />
        </ListItem>
      </Link>
      <Link href="/admin/novidades">
        <ListItem button selected={paginaAtual.startsWith('/admin/novidades')}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Novidades" />
        </ListItem>
      </Link>
    </Box>
  )
}

export default MenuListItems
