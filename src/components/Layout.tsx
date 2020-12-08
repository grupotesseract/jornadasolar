import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@material-ui/core/'
import Button from './Button'

interface ILayoutProps {
  children: ReactNode
  textoBotao: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children, textoBotao }) => (
  <Container maxWidth="xs">
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box mt={2} alignSelf="center" flexGrow="1">
        {children}
      </Box>

      <Box mb={3} alignSelf="center">
        <Button variant="contained" color="primary">
          {textoBotao}
        </Button>
      </Box>
    </Box>
  </Container>
)

export default Layout
