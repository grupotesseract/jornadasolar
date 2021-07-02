import React, { useState } from 'react'
import { Container, makeStyles, Switch } from '@material-ui/core'
import Button from 'src/components/Button'
import { withUser } from 'src/components/hocs/withAuth'
import TituloConfig from 'src/components/TituloConfig'
import NavigationList from 'src/components/NavigationList'

const useStyles = makeStyles({
  tituloContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 48
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

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
