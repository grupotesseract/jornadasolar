import React, { FC, useEffect, useState } from 'react'
import { Box, Container, List, ListItem, ListItemText } from '@material-ui/core'
import Titulo from 'src/components/Titulo'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import GetAllMeditacoes from 'src/services/meditacoes/GetAllMeditacoes'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'
import Loading from 'src/components/Loading'
import { analytics } from '../../components/firebase/firebase.config'
import { withUser } from 'src/components/hocs/withAuth'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      width: 332,
      minHeight: 150,
      margin: '20px auto',
      paddingBottom: '14px',
      flexWrap: 'wrap',
      background: '#222222',
      boxShadow: '1px 3px 8px rgba(255, 255, 255, 0.15)',
      borderRadius: '4px',
      listStyle: 'none'
    },
    player: {
      width: '100%',
      marginTop: 10
    }
  })
)

const Meditacoes: FC = () => {
  const [meditacoes, setMeditacoes] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const buscarMeditacoes = async () => {
      setLoading(true)
      const meditacao = await GetAllMeditacoes()
      setMeditacoes(meditacao)
      setLoading(false)
    }
    buscarMeditacoes()
  }, [])

  const listaDeMeditacoes = meditacoes.map(meditacao => (
    <ListItem key={`meditacao-${meditacao.nome}`} className={classes.listItem}>
      <ListItemText primary={meditacao.nome} secondary={meditacao.data} />
      <audio
        controls
        src={meditacao.url}
        className={classes.player}
        onPlay={() => {
          analytics?.logEvent('play_meditacao', { nome: meditacao.nome })
        }}
      />
    </ListItem>
  ))

  return (
    <PageWithBottomNavigation currentPage="meditacoes">
      <Container maxWidth="xs">
        <Box mt={4} mb={2} ml={2} alignSelf="center" flexGrow="1">
          <Titulo>Meditações</Titulo>
        </Box>

        <List>{loading ? <Loading /> : listaDeMeditacoes}</List>
      </Container>
    </PageWithBottomNavigation>
  )
}

export default withUser(Meditacoes)
