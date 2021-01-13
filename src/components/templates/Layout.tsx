import React, { FC, ReactNode } from 'react'
import { Box, Container } from '@material-ui/core/'
import Button from '../Button'

interface ILayoutProps {
  children: ReactNode
  textoBotao: ReactNode
  exibirBotao?: boolean
  onButtonClick?: () => void
}

const Layout: FC<ILayoutProps> = ({
  children,
  textoBotao,
  exibirBotao,
  onButtonClick
}) => (
  <Container maxWidth="xs">
    <Box display="flex" flexDirection="column">
      <Box mt={2} mb={10} alignSelf="center" flexGrow="1">
        {children}
      </Box>

      <Box alignSelf="center" position="fixed" bottom="20px">
        {exibirBotao && (
          <Button variant="contained" color="primary" onClick={onButtonClick}>
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
