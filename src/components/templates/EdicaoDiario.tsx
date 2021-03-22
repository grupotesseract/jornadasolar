import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useRouter } from 'next/dist/client/router'
import { Box, CircularProgress, Container } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Button from '../Button'
import LinkVoltar from '../LinkVoltar'
import Data from '../Data'
import Loading from '../Loading'
import { createdOrUpdated as createdOrUpdatedDiarioAction } from '../../redux/diario'

interface IProps {
  date: string
  loading: boolean
  onClick: () => void
}

const EdicaoDiario: FC<IProps> = ({ children, date, loading, onClick }) => {
  const [submit, setSubmit] = useState(false)
  const dia = parse(date, 'd-M-yyyy', new Date())
  const router = useRouter()
  const dispatch = useDispatch()
  const { createdOrUpdatedDiario } = bindActionCreators(
    { createdOrUpdatedDiario: createdOrUpdatedDiarioAction },
    dispatch
  )

  const handleOnClick = async () => {
    setSubmit(true)
    await onClick()
    setSubmit(false)
    createdOrUpdatedDiario()
    router.push(`/diario/${date}`)
  }

  const TextoBotao = () => {
    if (submit) {
      return <CircularProgress color="secondary" />
    } else {
      return (
        <>
          <CheckIcon style={{ marginRight: 6 }} />
          Salvar
        </>
      )
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column">
        <Box mb={12}>
          <LinkVoltar href={`/diario/${date}`} />

          <Box
            mt="23px"
            mb="23px"
            textAlign="center"
            alignItems="center"
            display="flex"
          >
            <Data>{format(dia, "EEEE, d 'de' MMMM", { locale: ptBR })}</Data>
          </Box>

          {children}
        </Box>

        <Box alignSelf="center" position="fixed" bottom="20px" zIndex={1000}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnClick}
            data-cy="submit"
          >
            <TextoBotao />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EdicaoDiario
