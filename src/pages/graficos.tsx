import React, { FC, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import PageWithBottomNavigation from '../components/templates/PageWithBottomNavigation'
import MonthNavigator from '../components/MonthNavigator'
import GraficoSentimentos from '../components/graficos/GraficoSentimentos'
import GraficoHabitos from '../components/graficos/GraficoHabitos'
import Loading from '../components/Loading'
import { withUser } from '../components/hocs/withAuth'
import useRegistrosByMonth from '../hooks/useRegistrosByMonth'
import theme from '../../theme'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '190px',
      height: 40,
      borderRadius: '100px',
      zIndex: 1000,
      backgroundColor: '#333333',
      color: '#828282',
      fontSize: 16,
      textTransform: 'none'
    },
    selected: {
      borderRadius: '100px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      '&.MuiTab-textColorPrimary.Mui-selected': {
        width: 170,
        zIndex: 1001,
        color: theme.palette.secondary.main,
        fontWeight: 700
      }
    },
    indicator: {
      height: '0'
    }
  })
)

interface IProps {
  userId?: string
}

const Graficos: FC<IProps> = ({ userId }) => {
  const [mes, setMes] = useState(new Date())
  const [currentTab, setCurrentTab] = React.useState('sentimentos')
  const classes = useStyles()

  const { loading, diarios } = useRegistrosByMonth({
    userId,
    mes
  })

  const handleChange = (event: React.ChangeEvent, newcurrentTab: string) => {
    setCurrentTab(newcurrentTab)
  }

  const Graficos = () => {
    if (currentTab === 'sentimentos') {
      return <GraficoSentimentos diarios={diarios} mesAtual={mes} />
    }
    return <GraficoHabitos diarios={diarios} mesAtual={mes} />
  }

  return (
    <PageWithBottomNavigation currentPage="graficos">
      <Box mt="17px" width="100%">
        <MonthNavigator mes={mes} onClick={setMes} />
      </Box>
      <Box display="flex" justifyContent="center" mt="34px">
        <Tabs
          value={currentTab}
          textColor="primary"
          onChange={handleChange}
          aria-label="gráfico tabs"
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab
            label="Emoções"
            classes={{
              root: classes.button,
              selected: classes.selected
            }}
            fullWidth
            value="sentimentos"
          />
          <Tab
            label="Hábitos"
            classes={{
              root: classes.button,
              selected: classes.selected
            }}
            fullWidth
            style={{ marginLeft: -40 }}
            value="habitos"
          />
        </Tabs>
      </Box>

      {loading ? <Loading /> : <Graficos />}
    </PageWithBottomNavigation>
  )
}

export default withUser(Graficos)
