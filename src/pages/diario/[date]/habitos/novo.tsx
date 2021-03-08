import React, { FC, useState } from 'react'
import { Box } from '@material-ui/core/'
import Emoji from '../../../../components/Emoji'
import TextField from '../../../../components/TextField'
import Titulo from '../../../../components/Titulo'
import InputLabel from '../../../../components/InputLabel'
import { useRouter } from 'next/dist/client/router'
import withAuth from 'src/components/hocs/withAuth'
import Layout from '../../../../components/templates/Layout'
import CreateHabito from '../../../../services/habito/CreateHabito'
import { NextPageContext } from 'next'
import EmojiToUnicode from 'src/services/EmojiToUnicode'

interface IProps {
  userId?: string
  date: string
}

const NovoHabito: FC<IProps> = ({ userId, date }: IProps) => {
  const [emoji, setEmoji] = useState('')
  const [emojiUnicode, setEmojiUnicode] = useState([])
  const [nome, setNome] = useState('')
  const [error, setErrors] = useState('')
  const router = useRouter()

  const onChangenome = ({ target: { value } }) => {
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

  const handleAddHabito = async () => {
    new CreateHabito().call({ userId, nome, emojiUnicode })
    router.push(`/diario/${date}/habitos`)
  }

  return (
    <Layout
      onButtonClick={handleAddHabito}
      textoBotao="Adicionar"
      exibirBotao={emoji && nome && !error}
    >
      <Titulo>
        Adicione um hábito personalizado <Emoji nome="alegre" />
      </Titulo>

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
            onChange={onChangenome}
            inputProps={{ maxLength: 15 }}
          />
        </Box>
      </Box>
    </Layout>
  )
}

interface INovoHabitoWithAuthProps {
  date: string
}

const NovoHabitoWithAuth = withAuth(NovoHabito)

NovoHabitoWithAuth.getInitialProps = (
  context: NextPageContext
): INovoHabitoWithAuthProps => {
  const date = context.query.date as string

  return {
    date
  }
}

export default NovoHabitoWithAuth
