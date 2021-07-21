import React, { useState } from 'react'
import { Container, Switch } from '@material-ui/core'
import { withUser } from 'src/components/hocs/withAuth'
import TituloConfig from 'src/components/TituloConfig'
import NavigationList from 'src/components/NavigationList'

const Notificacoes = () => {
  const [permission, setPermission] = useState(Notification.permission)

  const requestPermission = () => {
    console.log('Requesting permission...')
    Notification.requestPermission().then(permission => {
      setPermission(permission)
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        // TODO(developer): Retrieve a registration token for use with FCM.
        // In many cases once an app has been granted notification permission,
        // it should update its UI reflecting this.
        // resetUI()
      } else {
        console.log('Unable to get permission to notify.')
      }
    })
  }

  const handlePermissao = () => {
    requestPermission()
  }

  const itens = [
    {
      texto: 'Eventos do Jornada Solar',
      onClick: handlePermissao,
      iconeSecundario: (
        <Switch
          edge="end"
          onChange={handlePermissao}
          color="primary"
          checked={permission === 'granted'}
        />
      )
    }
  ]

  return (
    <Container maxWidth="xs">
      <TituloConfig link="/app/perfil" titulo="Notificações" />
      <NavigationList itens={itens} />
    </Container>
  )
}

export default withUser(Notificacoes)
