import React, { FC } from 'react'
import { Box, Checkbox, Grid, Typography, withStyles } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
    }
  })
)

type GruposDeHabitos = {
  nome: string
  habitos: Array<string>
}

interface IHabitosProps {
  onChange: (event) => void
  values: Array<GruposDeHabitos>
}

const Habitos: FC<IHabitosProps> = ({ onChange, values }) => {
  const classes = useStyles()

  const gruposDeHabitos = [
    {
      nome: 'social',
      habitos: [
        'Família',
        'Amigos',
        'Sozinho',
        'Encontro casual',
        'Companheir@',
        'Digital'
      ]
    },
    {
      nome: 'Atividade física',
      habitos: [
        'Nada',
        'Caminhada',
        'Esporte',
        'Alongamentos',
        'Treino intenso',
        'Lesionado'
      ]
    },
    {
      nome: 'sono',
      habitos: [
        'Dormi cedo',
        'Dormi tarde',
        'Dormi bem',
        'Insônia',
        'Sonho',
        'Pesadelo'
      ]
    },
    {
      nome: 'Alimentação',
      habitos: [
        'Caseira',
        'Fast food',
        'Restaurante',
        'Carne',
        'Exagerei',
        'Comida leve'
      ]
    },
    {
      nome: 'Saúde',
      habitos: ['Médico', 'Remédios', 'Água', 'Terapia', 'Chás', 'Florais']
    },
    {
      nome: 'Profissional',
      habitos: [
        'Estudos',
        'Trabalho leve',
        'Pressão/tensão',
        'Voluntariado',
        'Workaholic',
        'Procrastinei'
      ]
    },
    {
      nome: 'Tarefa',
      habitos: [
        'Faxina',
        'Reforma',
        'Compras',
        'Finanças',
        'Lavar roupa',
        'Cozinhar'
      ]
    },
    {
      nome: 'Sexo',
      habitos: [
        'Masturbação',
        'Usei proteção',
        'Casual',
        'Companheir@',
        'Com tesão',
        'Ejaculei'
      ]
    },
    {
      nome: 'Vício',
      habitos: [
        'Cigarro',
        'Álcool',
        'Entorpecente',
        'Pornografia',
        'Jogos',
        'Rede Social'
      ]
    }
  ]

  const handleChange = ({ indexGrupo, habito, checked }) => {
    const newGruposDeHabitos = values[indexGrupo]
    let newhabitos
    if (checked) {
      newhabitos = [...newGruposDeHabitos.habitos, habito]
    } else {
      newhabitos = newGruposDeHabitos.habitos.filter(value => value !== habito)
    }

    const newValues = [...values]
    newValues[indexGrupo].habitos = newhabitos
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
                    key={`habito-${habito}`}
                    xs={4}
                    style={{ textAlign: 'center', padding: 0 }}
                  >
                    <StyledCheckbox
                      icon={<span />}
                      checkedIcon={<span />}
                      color="primary"
                      onChange={event =>
                        handleChange({
                          indexGrupo,
                          habito: habito,
                          checked: event.target.checked
                        })
                      }
                    />
                    <Typography
                      className={
                        values[indexGrupo].habitos.includes(habito)
                          ? `${classes.habito} ${classes.habitoChecked}`
                          : classes.habito
                      }
                    >
                      {habito}
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

export default Habitos
