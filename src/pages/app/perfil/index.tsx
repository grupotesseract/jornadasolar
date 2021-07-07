import React, { FC, useState } from 'react'
import { Box, Container, Typography, makeStyles } from '@material-ui/core'
import Titulo from 'src/components/Titulo'
import { withUser } from 'src/components/hocs/withAuth'
import SignOutUser from 'src/services/user/SignOutUser'
import { useRouter } from 'next/router'
import { appVersion } from '../../../utils/appVersion'
import Emoji from 'src/components/Emoji'
import NavigationList from 'src/components/NavigationList'
import LinkVoltar from 'src/components/LinkVoltar'
import { IUser } from 'src/entities/User'
import Novidade from 'src/components/Novidade'
import Dialogo from 'src/components/Dialogo'

const useStyles = makeStyles({
  versao: {
    position: 'fixed',
    bottom: '20px',
    textAlign: 'center'
  }
})

type Props = {
  userName?: string
  user: IUser
}

const Perfil: FC<Props> = ({ user }) => {
  const router = useRouter()
  const classes = useStyles()
  const [isDialogoOpen, setIsDialogoOpen] = useState(false)

  const abrirDialogo = () => {
    setIsDialogoOpen(true)
  }

  const fecharDialogo = () => {
    setIsDialogoOpen(false)
  }

  const handleMeusDados = () => {
    router.push('/app/perfil/dados')
  }

  const handleNotificacoes = () => {
    router.push('/app/perfil/notificacoes')
  }

  const handleSair = async () => {
    await new SignOutUser().call()
    router.replace('/login')
  }

  const itens = [
    {
      icone: <Emoji nome="perfil" />,
      texto: 'Meus Dados',
      onClick: handleMeusDados
    },
    {
      icone: <Emoji nome="sino" />,
      texto: 'Notificações',
      onClick: handleNotificacoes
    },
    {
      icone: <Emoji nome="duvida" />,
      texto: 'Ajuda',
      onClick: abrirDialogo
    },
    {
      icone: <Emoji nome="sair" />,
      texto: 'Sair',
      onClick: handleSair
    }
  ]

  return (
    <Container maxWidth="xs">
      <LinkVoltar href="/app/diario" />
      <Box mt={4} mb={2} ml={2} alignSelf="center" flexGrow="1">
        <Titulo>Editar Perfil</Titulo>
      </Box>
      <Novidade path="configuracoes" user={user} />
      <NavigationList itens={itens} />
      <Container maxWidth="xs" className={classes.versao}>
        <Typography>Versão {appVersion}</Typography>
      </Container>
      <Dialogo
        isOpen={isDialogoOpen}
        onFechar={fecharDialogo}
        onConfirmar={fecharDialogo}
        titulo="Ajuda"
        labelCancelar=""
        labelConfirmar="Ok"
      >
        Precisa de ajuda? Envie um e-mail para jornadasolar@gmail.com
      </Dialogo>
    </Container>
  )
}

export default withUser(Perfil)
