import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Checkbox, FormGroup, withStyles } from '@material-ui/core'
import Sentimento from './Sentimento'
import { getSentimentosIniciais } from 'src/utils/getSentimentosIniciais'

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
}

const SentimentosCheckboxGroup: FC<ISentimentosProps> = ({
  onChange,
  values,
  userId
}) => {
  const classes = useStyles()
  const [sentimentos, setSentimentos] = useState([])
  useEffect(() => {
    const getSentimentos = async () => {
      setSentimentos(await getSentimentosIniciais(userId))
    }
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

  return (
    <FormGroup className={classes.checkboxFormGroup}>
      {sentimentos.map(sentimento => (
        <StyledCheckbox
          key={`sentimento-${sentimento.nome}`}
          icon={
            <Sentimento sentimento={sentimento} className={classes.label} />
          }
          checkedIcon={
            <Sentimento sentimento={sentimento} className={classes.label} />
          }
          value={sentimento.id}
          name={sentimento.nome}
          checked={values.includes(sentimento.id)}
          onChange={handleChange}
        />
      ))}
    </FormGroup>
  )
}

export default SentimentosCheckboxGroup
