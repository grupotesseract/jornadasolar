import React, { FC } from 'react'
import { IHabito } from 'src/entities/Habito'
import EmojiComNome from '../EmojiComNome'

interface IProps {
  habito: IHabito
  className?: string
}

const Habito: FC<IProps> = ({ habito, className }) => (
  <EmojiComNome item={habito} className={className} />
)

export default Habito
