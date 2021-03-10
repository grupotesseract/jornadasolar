import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiBottomNavigation from '@material-ui/core/BottomNavigation'
import MuiBottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useRouter } from 'next/router'
import { SvgIcon } from '@material-ui/core'
import IconeRegistros from './IconeRegistros'
import IconeGraficos from './IconeGraficos'
import SpaIcon from '@material-ui/icons/Spa';

const useStyles = makeStyles({
  root: {
    width: 444,
    height: 62,
    bottom: 0,
    paddingTop: 12,
    paddingBottom: 9,
    position: 'fixed',
    backgroundColor: '#222222',
    boxShadow: '0px 6px 20px #000000',
    // Ajuste personalizado para o navegador Safari
    '@media not all and (min-resolution:.001dpcm)': {
      '@supports (-webkit-appearance:none)': {
        height: 72,
        paddingBottom: 16
      }
    }
  },
  button: {},
  selected: {
    '&.MuiBottomNavigationAction-label': {
      fontSize: '0.75rem'
    }
  }
})

export interface IBottomNavigationProps {
  currentPage: string
}

const BottomNavigation: FC<IBottomNavigationProps> = ({ currentPage }) => {
  const classes = useStyles()
  const router = useRouter()

  const handleOnClick = link => () => {
    router.push(link)
  }

  return (
    <MuiBottomNavigation
      value={currentPage}
      showLabels
      className={classes.root}
    >
      <MuiBottomNavigationAction
        onClick={handleOnClick('/diario')}
        classes={{
          root: classes.button,
          selected: classes.selected
        }}
        value="registro"
        label="Registros"
        icon={
          <SvgIcon>
            <IconeRegistros />
          </SvgIcon>
        }
      />

      <MuiBottomNavigationAction
        onClick={handleOnClick('/graficos')}
        classes={{
          root: classes.button,
          selected: classes.selected
        }}
        value="graficos"
        label="Gráficos"
        icon={
          <SvgIcon>
            <IconeGraficos />
          </SvgIcon>
        }
      />

      <MuiBottomNavigationAction
        onClick={handleOnClick('/meditacoes')}
        classes={{
          root: classes.button,
          selected: classes.selected
        }}
        value="meditacoes"
        label="Meditações"
        icon={
          <SvgIcon>
            <SpaIcon />
          </SvgIcon>
        }
      />
    </MuiBottomNavigation>
  )
}

export default BottomNavigation
