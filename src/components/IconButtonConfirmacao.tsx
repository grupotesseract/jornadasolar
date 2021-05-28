import React, { FC, ReactNode, useState } from 'react'
import Dialogo from './Dialogo'
import { IconButton } from '@material-ui/core'

interface IIconButtonConfirmacaoProps {
  icone: ReactNode
  onConfirmar: () => void
  conteudoDoDialogo: ReactNode
  tituloDoDialogo?: ReactNode
  labelDeConfirmacaoDoDialogo?: string
}

const IconButtonConfirmacao: FC<IIconButtonConfirmacaoProps> = ({
  icone,
  onConfirmar,
  conteudoDoDialogo,
  tituloDoDialogo,
  labelDeConfirmacaoDoDialogo
}) => {
  const [isDialogoOpen, setIsDialogoOpen] = useState(false)

  const abrirDialogo = () => {
    setIsDialogoOpen(true)
  }

  const fecharDialogo = () => {
    setIsDialogoOpen(false)
  }

  return (
    <>
      <IconButton style={{ padding: 0 }} onClick={abrirDialogo}>
        {icone}
      </IconButton>
      <Dialogo
        isOpen={isDialogoOpen}
        onFechar={fecharDialogo}
        onConfirmar={onConfirmar}
        titulo={tituloDoDialogo}
        labelConfirmar={labelDeConfirmacaoDoDialogo}
      >
        {conteudoDoDialogo}
      </Dialogo>
    </>
  )
}

export default IconButtonConfirmacao
