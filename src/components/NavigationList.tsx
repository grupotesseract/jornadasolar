import React, { ReactNode } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  makeStyles
} from '@material-ui/core'

interface INavigationItem {
  icone?: ReactNode
  texto: string
  onClick?: () => void
  iconeSecundario?: ReactNode
}

interface INavigationListProps {
  itens: INavigationItem[]
}

const useStyles = makeStyles(() => ({
  item: {
    height: 72,
    paddingLeft: 24
  },
  icone: {
    fontSize: 16,
    minWidth: 0,
    paddingRight: 8
  }
}))

const NavigationList = ({ itens }: INavigationListProps) => {
  const classes = useStyles()
  return (
    <List component="nav">
      <Divider />
      {itens.map(item => {
        return (
          <>
            <ListItem
              className={classes.item}
              key={item.texto}
              button
              onClick={item.onClick}
            >
              <ListItemIcon className={classes.icone}>
                {item.icone}
              </ListItemIcon>
              <ListItemText primary={item.texto} />
              <ListItemSecondaryAction>
                {item.iconeSecundario}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        )
      })}
    </List>
  )
}

export default NavigationList
