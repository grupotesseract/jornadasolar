import React from 'react'
import { Container } from '@material-ui/core'
import { withUser } from 'src/components/hocs/withAuth'
import NavigationList from 'src/components/NavigationList'
import { useRouter } from 'next/router'
import { ChevronRight } from '@material-ui/icons'
import TituloConfig from 'src/components/TituloConfig'

const MeusDados = () => {
  const router = useRouter()

  const handleAlterarNome = () => {
    router.push('/app/perfil/nome')
  }
  const handleAlterarSenha = () => {
    router.push('/app/perfil/senha')
  }

  const itens = [
    {
      texto: 'Alterar nome',
      onClick: handleAlterarNome,
      iconeSecundario: <ChevronRight />
    },
    {
      texto: 'Alterar senha',
      onClick: handleAlterarSenha,
      iconeSecundario: <ChevronRight />
    }
  ]

  return (
    <Container maxWidth="xs">
      <TituloConfig link="/app/perfil" titulo="Meus dados" />
      <NavigationList itens={itens} />
    </Container>
  )
}

export default withUser(MeusDados)
