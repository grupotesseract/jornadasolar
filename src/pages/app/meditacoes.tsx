import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import Titulo from 'src/components/Titulo'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import GetAllMeditacoes from 'src/services/meditacoes/GetAllMeditacoes'
import PageWithBottomNavigation from '../../components/templates/PageWithBottomNavigation'
import Loading from 'src/components/Loading'
import { withUser } from 'src/components/hocs/withAuth'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      margin: '20px auto',
      paddingBottom: '14px',
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
  const router = useRouter()

  useEffect(() => {
    const buscarMeditacoes = async () => {
      setLoading(true)
      const meditacao = await GetAllMeditacoes()
      setMeditacoes(meditacao)
      setLoading(false)
    }
    buscarMeditacoes()
  }, [])

  const handleClick = (id: string) => {
    router.push(`/app/meditacoes/${id}`)
  }

  const listaDeMeditacoes = meditacoes.map(meditacao => (
    <ListItem
      key={meditacao.id}
      className={classes.listItem}
      onClick={() => handleClick(meditacao.id)}
    >
      <ListItemText primary={meditacao.nome} secondary={meditacao.data} />
      <IconButton edge="end" aria-label="play">
        <PlayCircleFilledIcon fontSize="large" />
      </IconButton>
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
