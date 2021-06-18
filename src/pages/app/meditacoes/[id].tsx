/* eslint-disable multiline-ternary */
import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Slider,
  Typography
} from '@material-ui/core'
import { NextPageContext } from 'next'
import React, { FC, useEffect, useState, useRef } from 'react'
import { withUser } from 'src/components/hocs/withAuth'
import LinkVoltar from 'src/components/LinkVoltar'
import Titulo from 'src/components/Titulo'
import GetMeditacaoById from 'src/services/meditacoes/GetMeditacaoById'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import Image from 'next/image'
import Loading from 'src/components/Loading'
import { analytics } from 'src/components/firebase/firebase.config'

const useStyles = makeStyles({
  titulo: {
    textAlign: 'center'
  },
  player: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controles: {
    position: 'fixed',
    bottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center'
  },
  botaoPlay: {
    marginBottom: '24px'
  },
  tempos: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imagemGirando: {
    animation: '$spin 16s linear infinite'
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  pausado: {
    animationPlayState: 'paused'
  }
})

interface IProps {
  id: string
}

const PlayerMeditacao: FC<IProps> = ({ id }) => {
  const [meditacao, setMeditacao] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duracao, setDuracao] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const classes = useStyles()

  useEffect(() => {
    const buscarMeditacao = async () => {
      const novaMeditacao = await new GetMeditacaoById().call(id)
      setMeditacao(novaMeditacao)
      setIsLoading(!novaMeditacao.url)
    }
    buscarMeditacao()
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const imageClasses = isPlaying
    ? classes.imagemGirando
    : classes.imagemGirando + ' ' + classes.pausado

  const converteDuracaoEmTimeString = (duracao: number): string => {
    const horas = Math.floor(duracao / 3600)
    const minutos = Math.floor((duracao % 3600) / 60)
    const segundos = Math.floor(duracao % 60)
    const timeString = [horas, minutos, segundos]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':')
    return horas > 0 ? timeString : timeString.substring(3)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })

    setDuracao(audioRef.current.duration)
  }

  const handleInteracaoSlider = (e, value: number) => {
    audioRef.current.currentTime = value
    setProgress(value)
  }

  const handleFimDoAudio = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  const onPlay = () => {
    analytics?.logEvent('play_meditacao', { nome: meditacao.nome })
    setIsPlaying(true)
  }

  const IconePlayPause = () => {
    return isPlaying ? (
      <PauseCircleFilledIcon style={{ fontSize: 90 }} />
    ) : (
      <PlayCircleFilledIcon style={{ fontSize: 90 }} />
    )
  }

  const EmptyPlayer = () => {
    return (
      <Container maxWidth="xs">
        <LinkVoltar href="/app/meditacoes" />
        <Box className={classes.titulo}>
          <Titulo>Carregando</Titulo>
          <Loading />
        </Box>
      </Container>
    )
  }

  if (isLoading) {
    return <EmptyPlayer />
  }

  return (
    <Container maxWidth="xs">
      <LinkVoltar href="/app/meditacoes" />
      <Box className={classes.titulo}>
        <Titulo>{meditacao ? meditacao.nome : 'loading'}</Titulo>
      </Box>
      <Box mt={3} className={classes.player}>
        <Image
          src="/icons/icon-512x512.png"
          width="200px"
          height="200px"
          className={imageClasses}
        />
        <Container className={classes.controles} maxWidth="xs">
          <IconButton className={classes.botaoPlay} onClick={handlePlayPause}>
            <IconePlayPause />
          </IconButton>
          {meditacao && (
            <audio
              src={meditacao.url}
              ref={audioRef}
              onPlay={onPlay}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={setupProgressListener}
              onEnded={handleFimDoAudio}
            />
          )}
          <Slider
            valueLabelDisplay="off"
            value={progress}
            max={duracao}
            onChange={handleInteracaoSlider}
            step={1}
          />
          <Box className={classes.tempos} mb={2}>
            <Typography variant="subtitle2">
              {converteDuracaoEmTimeString(progress)}
            </Typography>
            <Typography variant="subtitle2">
              {converteDuracaoEmTimeString(duracao)}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

interface IPlayerMeditacaoProps {
  id: string
}
const PlayerMeditacaoWithUser = withUser(PlayerMeditacao)

PlayerMeditacaoWithUser.getInitialProps = (
  context: NextPageContext
): IPlayerMeditacaoProps => {
  const id = context.query.id as string
  return {
    id
  }
}

export default PlayerMeditacaoWithUser
