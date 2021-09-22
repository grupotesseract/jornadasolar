import { createMuiTheme } from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'

const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        main: '#F7C92A'
      },
      secondary: {
        main: '#000000'
      },
      background: {
        default: '#000000'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0'
      },
      action: {
        active: '#F7C92A',
        focus: '#F7C92A',
        hover: '#828282'
      }
    },
    typography: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(',')
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            scrollBehavior: 'smooth'
          }
        }
      }
    }
  },
  ptBR
)

export default theme
