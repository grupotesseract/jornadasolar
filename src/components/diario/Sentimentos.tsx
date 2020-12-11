import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Checkbox, FormGroup, withStyles } from '@material-ui/core'
import Emoji from '../Emoji'

const StyledCheckbox = withStyles({
  root: {
    margin: 6,
    padding: 12,
    flexGrow: 1,
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

const useStyles = makeStyles(() =>
  createStyles({
    checkboxFormGroup: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
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
  onCheckboxClick: (event) => void
  values: Array<unknown>
}

const Sentimentos: FC<ISentimentosProps> = ({ onCheckboxClick, values }) => {
  const classes = useStyles()
  const sentimentos = [
    { emoji: 'triste', nome: 'triste' },
    { emoji: 'alegre', nome: 'alegre' },
    { emoji: 'amedrontado', nome: 'amedrontado' },
    { emoji: 'seguro', nome: 'seguro' },
    { emoji: 'irritado', nome: 'irritado' },
    { emoji: 'pacifico', nome: 'pacífico' },
    { emoji: 'cansado', nome: 'cansado' },
    { emoji: 'motivado', nome: 'motivado' },
    { emoji: 'culpado', nome: 'culpado' },
    { emoji: 'grato', nome: 'grato' },
    { emoji: 'desanimado', nome: 'desanimado' },
    { emoji: 'confiante', nome: 'confiante' },
    { emoji: 'inseguro', nome: 'inseguro' },
    { emoji: 'amoroso', nome: 'amoroso' },
    { emoji: 'ansioso', nome: 'ansioso' },
    { emoji: 'calmo', nome: 'calmo' }
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onCheckboxClick([...values, event.target.value])
    } else {
      const newValues = values.filter(value => value !== event.target.value)
      onCheckboxClick(newValues)
    }
  }

  return (
    <FormGroup className={classes.checkboxFormGroup}>
      {sentimentos.map(sentimento => (
        <StyledCheckbox
          key={`sentimento-${sentimento.nome}`}
          icon={
            <span>
              <Emoji nome={sentimento.emoji} />
              <span className={classes.label}>{sentimento.nome}</span>
            </span>
          }
          checkedIcon={
            <span>
              <Emoji nome={sentimento.emoji} />
              <span className={classes.label}>{sentimento.nome}</span>
            </span>
          }
          value={sentimento.nome}
          name={sentimento.nome}
          onChange={handleChange}
        />
      ))}
    </FormGroup>
  )
}

export default Sentimentos
