/* eslint-disable multiline-ternary */
import React, { FC, useEffect, useState } from 'react'
import { Box, Checkbox, Grid, Typography, withStyles } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Emoji from '../Emoji'
import GetGrupoDeHabitosTemplateByUserId from 'src/services/grupoDehabitos/GetGrupoDeHabitosTemplateByUserId'
import BotaoAdicionarHabito from './RegistroDoDia/BotaoAdicionarHabito'
import { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Loading from '../Loading'

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
      display: 'flex',
      overflowY: 'hidden',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    grupo: {
      minWidth: 270,
      marginRight: '10px',
      padding: '0 15px',
      maxWidth: '300px',
      height: '252px',
      flex: '0 0 auto',
      borderRadius: '4px',
      background: '#151515',
      boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.15)'
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
    scrollInfo: {
      marginTop: 18,
      marginLeft: 4,
      display: 'flex',
      alignItems: 'center',
      color: '#828282',
      fontSize: '16px'
    },
    icone: {
      marginRight: 6,
      color: '#BDBDBD'
    },
    emoji: {
      '&[aria-label="🧑‍🤝‍🧑"]': {
        fontSize: '0.6em'
      },
      '&[aria-label="👩‍❤️‍👨👨‍❤️‍👨"]': {
        fontSize: '0.6em'
      }
    }
  })
)

export const valoresIniciais = [
  {
    nome: 'Personalizados',
    habitos: []
  },
  {
    nome: 'social',
    habitos: []
  },
  {
    nome: 'Lazer',
    habitos: []
  },
  {
    nome: 'Atividade física',
    habitos: []
  },
  {
    nome: 'sono',
    habitos: []
  },
  {
    nome: 'Alimentação',
    habitos: []
  },
  {
    nome: 'Saúde',
    habitos: []
  },
  {
    nome: 'Profissional',
    habitos: []
  },
  {
    nome: 'Tarefa',
    habitos: []
  },
  {
    nome: 'Sexo',
    habitos: []
  },
  {
    nome: 'Vício',
    habitos: []
  }
]

interface IHabitosCheckboxGroupProps {
  values: Array<IGrupoDeHabitos>
  userId?: string
  onChange: (event) => void
  onAdicionarHabitoClick?: (event) => void
}

const HabitosCheckboxGroup: FC<IHabitosCheckboxGroupProps> = ({
  values,
  userId,
  onChange,
  onAdicionarHabitoClick
}) => {
  const classes = useStyles()
  const [gruposDeHabitosTemplate, setGruposDeHabitosTemplate] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const isCadastro = router.pathname === '/cadastro'

  useEffect(() => {
    setLoading(true)
    const getGrupoDeHabitosTemplate = async () => {
      const newGruposDeHabitosTemplate = await new GetGrupoDeHabitosTemplateByUserId().call(
        {
          userId,
          allowPersonalizados: !isCadastro
        }
      )
      setGruposDeHabitosTemplate(newGruposDeHabitosTemplate)
    }
    getGrupoDeHabitosTemplate()
    setLoading(false)
  }, [])

  const handleChange = ({ nomeDoGrupo, habito, checked }) => {
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
      value => value.nome === nomeDoGrupo
    )

    let habitosAlterados
    if (checked) {
      habitosAlterados = [...grupoDeHabitosAlterado.habitos, habito]
    } else {
      habitosAlterados = grupoDeHabitosAlterado.habitos.filter(
        value => value.nome !== habito.nome
      )
    }

    grupoDeHabitosAlterado.habitos = habitosAlterados
    onChange(novosGruposDeHabitos)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Box display="flex">
        <Box className={classes.container}>
          {gruposDeHabitosTemplate.map(grupo => {
            const indexGrupo = values.findIndex(
              value => value.nome === grupo.nome
            )
            return (
              <Box className={classes.grupo} key={`nome-habito-${grupo.nome}`}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    xs={12}
                    style={{ textAlign: 'center', padding: 0 }}
                  >
                    <Typography className={classes.nome}>
                      {grupo.nome}
                    </Typography>
                  </Grid>
                  {grupo.habitos?.map(habito => (
                    <Grid
                      item
                      key={`habito-${habito.nome}`}
                      xs={4}
                      style={{ textAlign: 'center', padding: 0 }}
                    >
                      <StyledCheckbox
                        name={habito.nome}
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
                            nomeDoGrupo: grupo.nome,
                            habito: habito,
                            checked: event.target.checked
                          })
                        }
                        checked={values[indexGrupo]?.habitos
                          .map(habito => habito.nome)
                          .includes(habito.nome)}
                      />
                      <Typography
                        className={
                          values[indexGrupo]?.habitos.includes(habito.nome)
                            ? `${classes.habito} ${classes.habitoChecked}`
                            : classes.habito
                        }
                      >
                        {habito.nome}
                      </Typography>
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
                          onClick={onAdicionarHabitoClick}
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

      <Typography className={classes.scrollInfo}>
        <ArrowBackIcon className={classes.icone} />
        Arraste para a esquerda
      </Typography>
    </>
  )
}

export default HabitosCheckboxGroup
