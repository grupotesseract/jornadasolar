import React, { FC, useState } from 'react'
import { Box, CircularProgress, Container } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Button from '../Button'
import Snackbar from '../Snackbar'
import LinkVoltar from '../LinkVoltar'
import Data from '../Data'
import Loading from '../Loading'

interface IProps {
  date: string
  loading: boolean
  onClick: () => void
}

const EdicaoDiario: FC<IProps> = ({ children, date, loading, onClick }) => {
  const [submit, setSubmit] = useState(false)
  const [openSucessMessage, setOpenSucessMessage] = useState(false)
  const dia = parse(date, 'd-M-yyyy', new Date())

  const handleOnClick = async () => {
    setSubmit(true)
    await onClick()
    setSubmit(false)
    setOpenSucessMessage(true)
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
      <Snackbar
        open={openSucessMessage}
        onClose={() => {
          setOpenSucessMessage(false)
        }}
        message="Cadastro realizado com sucesso"
        severity="success"
      />

      <Box display="flex" flexDirection="column" minHeight="100vh">
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

        <Box alignSelf="center" position="fixed" top="calc(100vh - 80px)">
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            <TextoBotao />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EdicaoDiario
