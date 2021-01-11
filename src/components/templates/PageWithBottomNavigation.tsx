import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@material-ui/core/'
import BottomNavigation from '../BottomNavigation'

interface IPageWithBottomNavigationProps {
  children: ReactNode
  currentPage: string
}

const PageWithBottomNavigation: FC<IPageWithBottomNavigationProps> = ({
  children,
  currentPage
}) => (
  <Box display="flex" justifyContent="center">
    <Container maxWidth="xs" style={{ padding: 0, overflowX: 'hidden' }}>
      <Box mb={9} alignSelf="center">
        {children}
      </Box>
    </Container>

    <BottomNavigation currentPage={currentPage} />
  </Box>
)

export default PageWithBottomNavigation
