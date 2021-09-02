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
      textTransform: 'capitalize',
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
  onConfirma?: (IItemEdicao) => void
  onFecha?: () => void
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

  const [error, setErrors] = useState('')
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
    setItem({ ...item, nome: value })
  }

  const onChangeEmoji = ({ target: { value } }) => {
    setErrors('')
    const unicodes = new EmojiToUnicode().call(value.trim().toLowerCase())
    if (unicodes.length <= 0) {
      setErrors('Por favor adicione um emoji')
    }
    setItem({
      ...item,
      emoji: value.trim().toLowerCase(),
      emojiUnicode: unicodes
    })
  }

  const handleConfirma = () => {
    onConfirma(item)
    onFecha()
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
              error={Boolean(error)}
              helperText={error}
              inputProps={{ maxLength: 2 }}
            />
            <InputLabel>{labelNome}</InputLabel>
            <TextField
              value={item.nome}
              onChange={onChangeNome}
              inputProps={{ maxLength: 15 }}
            />
          </Box>
        </Paper>
      </Backdrop>
    </Slide>
  )
}

export default ModalEdicao
