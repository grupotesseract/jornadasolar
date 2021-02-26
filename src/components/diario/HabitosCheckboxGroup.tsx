import React, { FC } from 'react'
import { Box, Checkbox, Grid, Typography, withStyles } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { IGruposDeHabitos } from '../../entities/Registro'
import Emoji from '../Emoji'
import { gruposDeHabitos } from './Habito'

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
      '&[aria-label="amigos"]': {
        fontSize: '0.6em'
      },
      '&[aria-label="companheiro"]': {
        fontSize: '0.6em'
      }
    }
  })
)

export const valoresIniciais = [
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
  onChange: (event) => void
  values: Array<IGruposDeHabitos>
}

const HabitosCheckboxGroup: FC<IHabitosCheckboxGroupProps> = ({
  onChange,
  values
}) => {
  const classes = useStyles()

  const handleChange = ({ indexGrupo, habito, checked }) => {
    const newGruposDeHabitos = { ...values[indexGrupo] }
    let newHabitos
    if (checked) {
      newHabitos = [...newGruposDeHabitos.habitos, habito]
    } else {
      newHabitos = newGruposDeHabitos.habitos.filter(value => value !== habito)
    }

    const newValues = Array.from(values, value => ({ ...value }))
    newValues[indexGrupo].habitos = newHabitos
    onChange(newValues)
  }

  return (
    <>
      <Box display="flex">
        <Box className={classes.container}>
          {gruposDeHabitos.map((grupo, indexGrupo) => (
            <Box className={classes.grupo} key={`nome-habito-${grupo.nome}`}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} style={{ textAlign: 'center', padding: 0 }}>
                  <Typography className={classes.nome}>{grupo.nome}</Typography>
                </Grid>
                {grupo.habitos.map(habito => (
                  <Grid
                    item
                    key={`habito-${habito.nome}`}
                    xs={4}
                    style={{ textAlign: 'center', padding: 0 }}
                  >
                    <StyledCheckbox
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
                          indexGrupo,
                          habito: habito.nome,
                          checked: event.target.checked
                        })
                      }
                      checked={values[indexGrupo]?.habitos.includes(
                        habito.nome
                      )}
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
              </Grid>
            </Box>
          ))}
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
