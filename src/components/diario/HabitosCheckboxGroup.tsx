import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  Grid,
  Link as MaterialUiLink,
  Typography,
  withStyles
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Emoji from '../Emoji'
import GetGrupoDeHabitosTemplateByUserId from 'src/services/grupoDehabitos/GetGrupoDeHabitosTemplateByUserId'
import BotaoAdicionarHabito from './RegistroDoDia/BotaoAdicionarHabito'
import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Loading from '../Loading'
import ModalEdicao, { IItemEdicao } from './ModalEdicao'
import UpdateUserHabito from 'src/services/user/UpdateUserHabito'
import CreateUserHabitos from 'src/services/user/CreateUserHabito'
import { IHabito } from 'src/entities/Habito'
import { useDispatch } from 'react-redux'
import {
  habitoUpdated,
  habitoFailedUpdate,
  habitoFailedCreate
} from 'src/redux/habito'

const StyledCheckbox = withStyles({
  root: {
    width: '58px',
    height: '58px',
    color: '#4F4F4F',
    backgroundColor: '#4F4F4F',
    borderRadius: '%0%',
    '&$checked': {
      backgroundColor: '#F7C92A',
      '&:hover': {
        backgroundColor: '#F7C92A'
      }
    },
    '&:hover': {
      backgroundColor: '#4F4F4F'
    }
  },
  checked: {}
})(Checkbox)

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    },
    grupo: {
      minWidth: 270,
      marginBottom: 10,
      padding: '0 8px',
      maxWidth: '300px',
      height: 280,
      borderRadius: '4px',
      background: '#151515',
      boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.15)'
    },
    item: {
      textAlign: 'center',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    nome: {
      marginTop: 10,
      marginBottom: 14,
      paddingTop: 10,
      fontSize: '16px',
      lineHeight: '22px',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    habito: {
      marginTop: 5,
      marginBottom: 16,
      color: '#828282',
      fontSize: '14px',
      lineHeight: '19px',
      textAlign: 'center'
    },
    habitoChecked: {
      color: '#FFF'
    },
    emoji: {
      '&[aria-label="🧑‍🤝‍🧑"]': {
        fontSize: '0.6em'
      },
      '&[aria-label="👩‍❤️‍👨👨‍❤️‍👨"]': {
        fontSize: '0.6em'
      }
    },
    linkEditar: {
      fontSize: 14,
      cursor: 'pointer',
      position: 'absolute',
      right: 5,
      top: 25
    }
  })
)

const HabitoLabel = ({ modeDeEdicaoAtivo, classeTexto, nome, onEditar }) => {
  if (modeDeEdicaoAtivo) {
    return (
      <Typography className={classeTexto} onClick={onEditar}>
        <Emoji nome="lapis" /> {nome}
      </Typography>
    )
  }
  return <Typography className={classeTexto}>{nome}</Typography>
}
interface IHabitosCheckboxGroupProps {
  values: Array<IGrupoDeHabitos>
  userId?: string
  onChange: (event) => void
}

const HabitosCheckboxGroup: FC<IHabitosCheckboxGroupProps> = ({
  values,
  userId,
  onChange
}) => {
  const classes = useStyles()
  const [gruposDeHabitosTemplate, setGruposDeHabitosTemplate] = useState([])
  const router = useRouter()
  const isCadastro = router.pathname === '/cadastro'
  const [gruposEmModoEdicao, setGruposEmModoEdicao] = useState([])
  const [isModalAberto, setIsModalAberto] = useState(false)
  const [habitoEmEdicao, setHabitoEmEdicao] = useState<IHabito>(null)
  const [grupoEmEdicao, setGrupoEmEdicao] = useState<IGrupoDeHabitos>(null)
  const [isLoading, setIsLoading] = useState(false)
  const tituloModal = habitoEmEdicao ? 'Edição do hábito' : 'Novo hábito'
  const dispatch = useDispatch()

  const getGrupoDeHabitosTemplate = async () => {
    setIsLoading(true)
    const newGruposDeHabitosTemplate = await new GetGrupoDeHabitosTemplateByUserId().call(
      {
        userId
      }
    )
    if (isCadastro) {
      const gruposDeHabitosSemPersonalizados = Array.from(
        newGruposDeHabitosTemplate,
        grupo => ({ ...grupo })
      )
      delete gruposDeHabitosSemPersonalizados[0]
      setGruposDeHabitosTemplate(gruposDeHabitosSemPersonalizados)
    } else {
      setGruposDeHabitosTemplate(newGruposDeHabitosTemplate)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getGrupoDeHabitosTemplate()
  }, [])

  const handleChange = ({ idDoGrupo, nomeDoGrupo, habito, checked }) => {
    // Clona grupos de hábitos que estão no values para atualizar a referência (imutábilidade)
    const novosGruposDeHabitos = Array.from(values, value => ({ ...value }))

    const precisaAdicionarGrupoPersonalizado =
      nomeDoGrupo === 'Personalizados' &&
      !novosGruposDeHabitos.find(
        grupoDeHabito => grupoDeHabito.nome === 'Personalizados'
      )

    if (precisaAdicionarGrupoPersonalizado) {
      novosGruposDeHabitos.unshift({ nome: 'Personalizados', habitos: [] })
    }

    const grupoDeHabitosAlterado = novosGruposDeHabitos.find(
      value =>
        value.id === idDoGrupo ||
        value.nome.toLowerCase() === nomeDoGrupo.toLowerCase()
    )

    let habitosAlterados
    if (checked) {
      habitosAlterados = [...grupoDeHabitosAlterado.habitos, habito]
    } else {
      habitosAlterados = grupoDeHabitosAlterado.habitos.filter(
        value => value.id !== habito?.id
      )
    }

    grupoDeHabitosAlterado.habitos = habitosAlterados
    onChange(novosGruposDeHabitos)
  }

  const handleOnClickEditarGrupo = (idDoGrupo, nomeDoGrupo) => {
    if (
      gruposEmModoEdicao.some(
        grupoEmModoEdicao =>
          grupoEmModoEdicao.id === idDoGrupo ||
          grupoEmModoEdicao.nome.toLowerCase() === nomeDoGrupo.toLowerCase()
      )
    ) {
      const grupoEmModoEdicao = gruposEmModoEdicao.filter(
        grupoEmEdicao =>
          grupoEmEdicao.id !== idDoGrupo ||
          grupoEmEdicao.nome.toLowerCase() !== nomeDoGrupo.toLowerCase()
      )
      setGruposEmModoEdicao(grupoEmModoEdicao)
      return
    }
    setGruposEmModoEdicao([
      ...gruposEmModoEdicao,
      { nome: nomeDoGrupo, id: idDoGrupo }
    ])
  }

  const handleComecarEdicao = (habito, grupo) => {
    setHabitoEmEdicao(habito)
    setGrupoEmEdicao(grupo)
    setIsModalAberto(true)
  }

  const handleNovoHabito = grupo => {
    if (!isLoading) {
      setHabitoEmEdicao(null)
      setGrupoEmEdicao(grupo)
      setIsModalAberto(true)
    }
  }

  const handleFecharModal = () => {
    setIsModalAberto(false)
  }

  const atualizaHabitoNaTela = (novosDados: IItemEdicao) => {
    const grupoAtualizado = gruposDeHabitosTemplate.map(grupo => {
      if (grupo.id !== grupoEmEdicao.id) {
        return grupo
      }
      const habitosAtualizados = grupo.habitos.map(habito => {
        if (habito.id !== habitoEmEdicao.id) {
          return habito
        }
        return {
          ...habito,
          nome: novosDados.nome,
          emojiUnicode: novosDados.emojiUnicode,
          emoji: novosDados.emoji
        }
      })
      return { ...grupo, habitos: habitosAtualizados }
    })
    setGruposDeHabitosTemplate(grupoAtualizado)
  }

  const handleConfirmarEdicao = (item: IItemEdicao) => {
    if (habitoEmEdicao) {
      atualizaHabitoNaTela(item)
      UpdateUserHabito({
        userId,
        habito: { nome: item.nome, emojiUnicode: item.emojiUnicode },
        grupoDeHabitoId: grupoEmEdicao.id,
        id: habitoEmEdicao.id
      })
        .then(() => dispatch(habitoUpdated()))
        .catch(() => dispatch(habitoFailedUpdate()))
    } else {
      CreateUserHabitos({
        userId,
        habito: {
          nome: item.nome,
          emojiUnicode: item.emojiUnicode,
          posicao: Number(grupoEmEdicao.habitos?.length)
        },
        grupoDeHabitoId: grupoEmEdicao.id
      })
        .then(() => getGrupoDeHabitosTemplate())
        .catch(() => dispatch(habitoFailedCreate()))
    }
  }

  if (gruposDeHabitosTemplate.length === 0) {
    return <Loading />
  }

  return (
    <>
      <Box display="flex">
        <Box className={classes.container}>
          {gruposDeHabitosTemplate.map(grupo => {
            const isModoDeEdicaoAtivo = gruposEmModoEdicao.some(
              grupoEmModoEdicao =>
                grupoEmModoEdicao.id === grupo.id ||
                grupoEmModoEdicao.nome.toLowerCase() ===
                  grupo.nome.toLowerCase()
            )
            const indexGrupo = values.findIndex(
              value =>
                value.id === grupo.id ||
                value.nome.toLowerCase() === grupo.nome.toLowerCase()
            )
            return (
              <Box className={classes.grupo} key={`nome-habito-${grupo.nome}`}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} className={classes.item}>
                    <Typography className={classes.nome}>
                      {grupo.nome}
                    </Typography>
                    {!isCadastro && (
                      <MaterialUiLink
                        href="#"
                        component="button"
                        onClick={() =>
                          handleOnClickEditarGrupo(grupo.id, grupo.nome)
                        }
                        style={{ position: 'initial' }}
                        underline="none"
                      >
                        <Typography
                          color="primary"
                          className={classes.linkEditar}
                        >
                          {isModoDeEdicaoAtivo ? 'Concluir' : 'Editar'}
                        </Typography>
                      </MaterialUiLink>
                    )}
                  </Grid>
                  {grupo.habitos?.map(habito => (
                    <Grid
                      item
                      key={`habito-${habito?.nome}`}
                      xs={4}
                      style={{ textAlign: 'center', padding: 0 }}
                    >
                      <StyledCheckbox
                        name={habito?.nome}
                        icon={
                          <span>
                            <Emoji
                              nome={habito.emoji}
                              className={classes.emoji}
                            />
                          </span>
                        }
                        checkedIcon={
                          <span>
                            <Emoji
                              nome={habito.emoji}
                              className={classes.emoji}
                            />
                          </span>
                        }
                        color="primary"
                        onChange={event =>
                          handleChange({
                            idDoGrupo: grupo.id,
                            nomeDoGrupo: grupo.nome,
                            habito: habito,
                            checked: event.target.checked
                          })
                        }
                        checked={values[indexGrupo]?.habitos
                          .map(habito => habito?.id)
                          .includes(habito?.id)}
                      />
                      <HabitoLabel
                        modeDeEdicaoAtivo={isModoDeEdicaoAtivo}
                        classeTexto={
                          values[indexGrupo]?.habitos.includes(habito?.nome)
                            ? `${classes.habito} ${classes.habitoChecked}`
                            : classes.habito
                        }
                        nome={habito?.nome}
                        onEditar={() => {
                          handleComecarEdicao(habito, grupo)
                        }}
                      />
                    </Grid>
                  ))}
                  {grupo.nome === 'Personalizados' && !isCadastro ? (
                    <Grid
                      item
                      xs={4}
                      style={{ textAlign: 'center', padding: 0 }}
                    >
                      {grupo.habitos?.length < 6 ? (
                        <BotaoAdicionarHabito
                          isLoading={isLoading}
                          onClick={() => handleNovoHabito(grupo)}
                        />
                      ) : null}
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
            )
          })}
        </Box>
      </Box>
      <ModalEdicao
        itemEdicao={habitoEmEdicao}
        isOpen={isModalAberto}
        formTitulo={tituloModal}
        labelNome="Hábito"
        onFecha={handleFecharModal}
        onConfirma={handleConfirmarEdicao}
      />
    </>
  )
}

export default HabitosCheckboxGroup
