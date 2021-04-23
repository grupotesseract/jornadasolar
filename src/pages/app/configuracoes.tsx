import React, { FC } from 'react'
import { Box, Container } from '@material-ui/core'
import Titulo from 'src/components/Titulo'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'
import { withUser } from 'src/components/hocs/withAuth'
import SignOutUser from 'src/services/user/SignOutUser'
import Button from 'src/components/Button'
import { useRouter } from 'next/router'

const Configuracoes: FC = () => {
  const router = useRouter()

  return (
    <PageWithBottomNavigation currentPage="meditacoes">
      <Container maxWidth="xs">
        <Box mt={4} mb={2} ml={2} alignSelf="center" flexGrow="1">
          <Titulo>Configurações</Titulo>
        </Box>
        <Button
          onClick={async () => {
            await new SignOutUser().call()
            router.replace('/login')
          }}
        >
          Logoff
        </Button>
      </Container>
    </PageWithBottomNavigation>
  )
}

export default withUser(Configuracoes)
