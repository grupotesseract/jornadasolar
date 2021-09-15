import React, { FC, useState, useEffect, ReactElement } from 'react'
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Slide,
  Backdrop
} from '@material-ui/core/'
import TextField from '../TextField'
import InputLabel from '../InputLabel'
import EmojiToUnicode from 'src/services/EmojiToUnicode'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() =>
  createStyles({
    titulo: {
      marginRight: 8,
      fontSize: 16,
      fontWeight: 700,
      marginTop: 8
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32
    },
    botaoFechar: {
      marginLeft: 8,
      fontSize: 14,
      cursor: 'pointer'
    },
    header: {
      display: 'flex',
      width: 310,
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
    backdrop: {
      zIndex: 9999
    }
  })
)

export interface IItemEdicao {
  emoji?: string
  nome: string
  emojiUnicode: string[]
}

interface IProps {
  itemEdicao?: IItemEdicao
  formTitulo: ReactElement | string
  labelNome: string
  onConfirma: (IItemEdicao) => void
  onFecha: () => void
  isOpen: boolean
}

const ModalEdicao: FC<IProps> = ({
  itemEdicao,
  formTitulo,
  labelNome,
  onConfirma,
  onFecha,
  isOpen
}) => {
  const [item, setItem] = useState<IItemEdicao>({
    emoji: '',
    nome: '',
    emojiUnicode: []
  })

  const [error, setErrors] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    if (itemEdicao) {
      setItem({
        emoji: itemEdicao.emoji,
        nome: itemEdicao.nome,
        emojiUnicode: itemEdicao.emojiUnicode
      })
    } else {
      setItem({
        emoji: '',
        nome: '',
        emojiUnicode: []
      })
    }
  }, [itemEdicao])

  const onChangeNome = ({ target: { value } }) => {
    setErrors({})
    setItem({ ...item, nome: value })
  }

  const onChangeEmoji = ({ target: { value } }) => {
    setErrors({})
    const unicodes = new EmojiToUnicode().call(value.trim().toLowerCase())
    let emoji = value.trim().toLowerCase()

    if (unicodes.length <= 0) {
      setErrors({ emoji: 'Por favor adicione um emoji' })
      emoji = ''
    }

    setItem({
      ...item,
      emoji: emoji,
      emojiUnicode: unicodes
    })
  }

  const validaPreenchimento = () => {
    if (!item.emojiUnicode.length) {
      setErrors({ emoji: 'Por favor adicione um emoji' })
      return false
    }
    if (!item.nome.length) {
      setErrors({ nome: 'Por favor adicione um nome' })
      return false
    }
    return true
  }

  const handleConfirma = () => {
    if (validaPreenchimento()) {
      onConfirma(item)
      onFecha()
    }
  }

  const handleFecha = () => {
    onFecha()
  }

  return (
    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
      <Backdrop open={isOpen} className={classes.backdrop}>
        <Paper className={classes.form}>
          <Box className={classes.header}>
            <Typography color="textSecondary" className={classes.titulo}>
              <IconButton edge="start" onClick={handleFecha} color="inherit">
                <CloseIcon />
              </IconButton>
              {formTitulo}
            </Typography>
            <Typography
              onClick={handleConfirma}
              color="primary"
              className={classes.botaoFechar}
            >
              Concluir
            </Typography>
          </Box>

          <Box mb={5}>
            <InputLabel>Emoji</InputLabel>
            <TextField
              value={item.emoji}
              onChange={onChangeEmoji}
              error={error?.emoji}
              helperText={error?.emoji}
              inputProps={{ maxLength: 2 }}
            />
            <InputLabel>{labelNome}</InputLabel>
            <TextField
              value={item.nome}
              onChange={onChangeNome}
              error={error?.nome}
              helperText={error?.nome}
              inputProps={{ maxLength: 15 }}
            />
          </Box>
        </Paper>
      </Backdrop>
    </Slide>
  )
}

export default ModalEdicao
