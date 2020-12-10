import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@material-ui/core/'
import Button from './Button'

interface ILayoutProps {
  children: ReactNode
  textoBotao: ReactNode
  exibirBotao?: boolean
  onClickButton?: () => void
}

const Layout: FC<ILayoutProps> = ({
  children,
  textoBotao,
  exibirBotao,
  onClickButton
}) => (
  <Container maxWidth="xs">
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box mt={2} mb={10} alignSelf="center" flexGrow="1">
        {children}
      </Box>

      <Box alignSelf="center" position="fixed" top="calc(100vh - 80px)">
        {exibirBotao && (
          <Button variant="contained" color="primary" onClick={onClickButton}>
            {textoBotao}
          </Button>
        )}
      </Box>
    </Box>
  </Container>
)

Layout.defaultProps = {
  exibirBotao: true
}

export default Layout
