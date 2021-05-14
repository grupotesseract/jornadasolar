import React, { FC, useState, useEffect, ReactElement } from 'react'
import { Box } from '@material-ui/core/'
import TextField from '../TextField'
import Titulo from '../Titulo'
import InputLabel from '../InputLabel'
import { useRouter } from 'next/dist/client/router'
import Layout from '../templates/Layout'
import CreateHabito from '../../services/habito/CreateHabito'
import EmojiToUnicode from 'src/services/EmojiToUnicode'
import { IHabito } from 'src/entities/Habito'
import UpdateHabito from 'src/services/habito/UpdateHabito'

interface IProps {
  userId?: string
  date: string
  habito?: IHabito
  formTitulo: ReactElement | string
}

const HabitoForm: FC<IProps> = ({ userId, date, habito, formTitulo }) => {
  const [emoji, setEmoji] = useState(habito?.emoji || '')
  const [emojiUnicode, setEmojiUnicode] = useState(habito?.emojiUnicode || [])
  const [nome, setNome] = useState(habito?.nome || '')
  const [error, setErrors] = useState('')
  const router = useRouter()

  useEffect(() => {
    setNome(habito?.nome || '')
    setEmoji(habito?.emoji || '')
    setEmojiUnicode(habito?.emojiUnicode || [])
  }, [habito])

  const onChangeNome = ({ target: { value } }) => {
    setNome(value)
  }

  const onChangeEmoji = ({ target: { value } }) => {
    setErrors('')
    const unicodes = new EmojiToUnicode().call(value.trim().toLowerCase())
    if (unicodes.length <= 0) {
      setErrors('Por favor adicione um emoji')
    }
    setEmoji(value.trim().toLowerCase())
    setEmojiUnicode(unicodes)
  }

  const handleCreateOrUpdate = async () => {
    if (habito?.id) {
      new UpdateHabito().call({ id: habito.id, nome, emojiUnicode })
    } else {
      new CreateHabito().call({ userId, nome, emojiUnicode })
    }
    router.push(`/app/diario/${date}/habitos`)
  }

  return (
    <Layout
      onButtonClick={handleCreateOrUpdate}
      textoBotao="Salvar"
      exibirBotao={emoji && nome && !error}
    >
      <Titulo>{formTitulo}</Titulo>

      <Box mt={5}>
        <Box>
          <InputLabel>Emoji</InputLabel>
          <TextField
            value={emoji}
            onChange={onChangeEmoji}
            error={Boolean(error)}
            helperText={error}
            inputProps={{ maxLength: 2 }}
          />
          <InputLabel>Nome</InputLabel>
          <TextField
            value={nome}
            onChange={onChangeNome}
            inputProps={{ maxLength: 15 }}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default HabitoForm
