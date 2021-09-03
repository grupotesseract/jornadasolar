import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Checkbox, FormGroup, Box, withStyles } from '@material-ui/core'
import Sentimento from './Sentimento'
import { getSentimentosIniciais } from 'src/utils/getSentimentosIniciais'
import Emoji from '../Emoji'
import ModalEdicao, { IItemEdicao } from './ModalEdicao'
import UpdateUserSentimentos from 'src/services/sentimentos/UpdateUserSentimento'
import CreateUserSentimentos from 'src/services/sentimentos/CreateUserSentimento'
import { useDispatch } from 'react-redux'
import {
  sentimentoUpdated,
  sentimentoFailedUpdate,
  sentimentoFailedCreate
} from 'src/redux/sentimento'
import Loading from '../Loading'
const useStyles = makeStyles(() =>
  createStyles({
    checkboxFormGroup: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '16px'
    },
    label: {
      marginLeft: 8,
      fontSize: 20,
      textAlign: 'center',
      textTransform: 'capitalize'
    }
  })
)

interface ISentimentosProps {
  onChange: (event) => void
  values: Array<unknown>
  userId?: string
  isEmEdicao?: boolean
}

const SentimentosCheckboxGroup: FC<ISentimentosProps> = ({
  onChange,
  values,
  userId,
  isEmEdicao = false
}) => {
  const StyledCheckbox = withStyles({
    root: {
      margin: 6,
      padding: 12,
      flexGrow: isEmEdicao ? 0 : 1,
      height: 44,
      justifyContent: 'center',
      color: '#BDBDBD',
      borderRadius: '100px',
      border: '1px solid #BDBDBD',
      fontSize: 20,
      fontWeight: 300,
      lineHeight: '27px',
      '&$checked': {
        color: '#fff',
        border: '3px solid #F7C92A',
        fontWeight: 'normal'
      }
    },
    checked: {}
  })(Checkbox)

  const classes = useStyles()
  const [sentimentos, setSentimentos] = useState([])
  const [isModalAberto, setIsModalAberto] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sentimentoEdicao, setSentimentoEdicao] = useState(null)
  const dispatch = useDispatch()

  const getSentimentos = async () => {
    setIsLoading(true)
    setSentimentos(await getSentimentosIniciais(userId))
    setIsLoading(false)
  }

  useEffect(() => {
    getSentimentos()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange([...values, event.target.value])
    } else {
      const newValues = values.filter(value => value !== event.target.value)
      onChange(newValues)
    }
  }

  const Icone = sentimento => {
    return (
      <>
        <Sentimento sentimento={sentimento} className={classes.label} />
        {isEmEdicao ? (
          <Box ml={1}>
            <Emoji nome="lapis" />
          </Box>
        ) : null}
      </>
    )
  }

  const IconeCriarNovo = isLoading ? (
    <Box width={107}>
      <Loading size={20} />
    </Box>
  ) : (
    <span>+ Criar novo</span>
  )

  const atualizaNaPagina = (item: IItemEdicao) => {
    const sentimentosAtualizados = sentimentos.map(sentimento => {
      if (sentimento.id === sentimentoEdicao.id) {
        return {
          ...sentimento,
          nome: item.nome,
          emojiUnicode: item.emojiUnicode,
          emoji: item.emoji
        }
      } else {
        return sentimento
      }
    })
    setSentimentos(sentimentosAtualizados)
  }

  const toggleModalAberto = () => {
    setIsModalAberto(!isModalAberto)
  }

  const handleComecarEdicao = sentimento => {
    if (isEmEdicao) {
      setSentimentoEdicao(sentimento)
      toggleModalAberto()
    }
  }

  const handleNovoSentimento = () => {
    if (!isLoading) {
      setSentimentoEdicao(null)
      toggleModalAberto()
    }
  }

  const handleConfirmarEdicao = (item: IItemEdicao) => {
    atualizaNaPagina(item)
    if (sentimentoEdicao) {
      const sentimentoAtualizado = {
        ...sentimentoEdicao,
        nome: item.nome,
        emojiUnicode: item.emojiUnicode
      }
      new UpdateUserSentimentos(userId)
        .call(sentimentoAtualizado)
        .then(() => {
          dispatch(sentimentoUpdated())
        })
        .catch(() => {
          dispatch(sentimentoFailedUpdate())
        })
    } else {
      new CreateUserSentimentos(userId)
        .call({
          nome: item.nome,
          emojiUnicode: item.emojiUnicode
        })
        .then(() => {
          getSentimentos()
        })
        .catch(() => {
          dispatch(sentimentoFailedCreate())
        })
    }
  }

  return (
    <>
      <FormGroup className={classes.checkboxFormGroup}>
        {sentimentos.map(sentimento => (
          <StyledCheckbox
            key={`sentimento-${sentimento.nome}`}
            icon={Icone(sentimento)}
            checkedIcon={Icone(sentimento)}
            value={sentimento.id}
            name={sentimento.nome}
            checked={values.includes(sentimento.id) && !isEmEdicao}
            onChange={handleChange}
            onClick={() => {
              handleComecarEdicao(sentimento)
            }}
          />
        ))}
        {isEmEdicao && (
          <StyledCheckbox
            key="botaoNovo"
            icon={IconeCriarNovo}
            checkedIcon={IconeCriarNovo}
            checked={false}
            onClick={handleNovoSentimento}
          />
        )}
        <ModalEdicao
          formTitulo={
            sentimentoEdicao ? 'Edição de sentimento' : 'Novo sentimento'
          }
          labelNome="Sentimento"
          isOpen={isModalAberto}
          itemEdicao={sentimentoEdicao}
          onConfirma={handleConfirmarEdicao}
          onFecha={toggleModalAberto}
        />
      </FormGroup>
    </>
  )
}

export default SentimentosCheckboxGroup
