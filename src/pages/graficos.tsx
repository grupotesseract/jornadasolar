import { Typography } from '@material-ui/core'
import React, { FC } from 'react'
import PageWithBottomNavigation from '../components/templates/PageWithBottomNavigation'

const Graficos: FC = () => {
  return (
    <PageWithBottomNavigation currentPage="graficos">
      <Typography>Gráficos</Typography>
    </PageWithBottomNavigation>
  )
}

export default Graficos
