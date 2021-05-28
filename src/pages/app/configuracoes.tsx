import React, { FC } from 'react'
import { Box, Container } from '@material-ui/core'
import Titulo from 'src/components/Titulo'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'
import { withUser } from 'src/components/hocs/withAuth'
import SignOutUser from 'src/services/user/SignOutUser'
import Button from 'src/components/Button'
import { useRouter } from 'next/router'
import { appVersion } from '../../utils/appVersion'

type Props = {
  userName?: string
}

const Configuracoes: FC<Props> = ({ userName }) => {
  const router = useRouter()

  return (
    <PageWithBottomNavigation currentPage="meditacoes">
      <Container maxWidth="xs">
        <Box mt={4} mb={2} ml={2} alignSelf="center" flexGrow="1">
          <Titulo>Configurações</Titulo>
        </Box>
        <Box>
          <span>
            Você entrou no app com o usuário <b>{userName}</b>
          </span>
          <Button
            onClick={async () => {
              await new SignOutUser().call()
              router.replace('/login')
            }}
            style={{ width: 'auto', height: 'auto', fontSize: 10, margin: 10 }}
          >
            Sair
          </Button>
        </Box>
        <Box>
          <span>Changelog {appVersion}</span>
          <ul>
            <li>Melhorias no layout e correções</li>
          </ul>
          <span>Changelog v0.7.5</span>
          <ul>
            <li>Edição de hábitos personalizados</li>
            <li>Componente de novidades</li>
            <li>Alteração do scroll de hábitos</li>
          </ul>
        </Box>

      </Container>
    </PageWithBottomNavigation>
  )
}

export default withUser(Configuracoes)
