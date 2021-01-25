import React, { FC } from 'react'

interface IEmojiProps {
  nome: string
  className?: string
}

const Emoji: FC<IEmojiProps> = ({ nome, className }) => {
  const emojis = {
    alegre: '\u{1F603}',
    wink: '\u{1F609}',
    seguro: '\u{1F609}',
    triste: '\u{1F622}',
    amedrontado: '\u{1F630}',
    irritado: '\u{1F621}',
    pacifico: '\u{1F642}',
    cansado: '\u{1F62A}',
    motivado: '\u{1F929}',
    culpado: '\u{1F613}',
    grato: '\u{1F60A}',
    desanimado: '\u{1F614}',
    confiante: '\u{1F929}',
    inseguro: '\u{1F629}',
    amoroso: '\u{1F970}',
    ansioso: '\u{1F92F}',
    calmo: '\u{1F60C}',
    lapis: '\u{270F}\u{FE0F}',
    familia: '\u{1F468}\u{200D}\u{1F468}\u{200D}\u{1F466}\u{200D}\u{1F466}',
    amigos: '\u{1F9D1}\u{200D}\u{1F91D}\u{200D}\u{1F9D1}',
    sozinho: '\u{1F468}',
    casual: '\u{1F57A}',
    companheiro:
      '\u{1F469}\u{200D}\u{2764}\u{FE0F}\u{200D}\u{1F468}\u{1F468}\u{200D}\u{2764}\u{FE0F}\u{200D}\u{1F468}',
    digital: '\u{1F4F1}',
    viagem: '\u{2708}\u{FE0F}',
    filmesSeries: '\u{1F3A5}',
    leitura: '\u{1F4DA}',
    jogos: '\u{1F3AE}',
    arLivre: '\u{2600}\u{FE0F}',
    hobby: '\u{1F60D}',
    nada: '\u{1F636}',
    caminhada: '\u{1F6B6}',
    esporte: '\u{1F3C3}',
    alongamento: '\u{1F646}\u{200D}\u{2642}\u{FE0F}',
    treinoIntenso: '\u{1F4AA}',
    lesionado: '\u{1F635}',
    dormiCedo: '\u{1F634}',
    dormiTarde: '\u{1F62A}',
    dormiBem: '\u{1F60C}',
    insonia: '\u{1F441}\u{FE0F}',
    sonho: '\u{1F4AD}',
    pesadelo: '\u{1F616}',
    caseira: '\u{1F951}',
    fastFood: '\u{1F35F}',
    restaurante: '\u{1F35D}',
    carne: '\u{1F357}',
    exagerei: '\u{1F922}',
    comidaLeve: '\u{1F966}',
    medico: '\u{1F468}\u{200D}\u{2695}\u{FE0F}',
    remedios: '\u{1F48A}',
    agua: '\u{1F6B0}',
    terapia: '\u{1F9D8}',
    chas: '\u{2615}',
    florais: '\u{1F343}',
    estudos: '\u{1F4D3}',
    trabalhoLeve: '\u{1F642}',
    pressaoTensao: '\u{1F61F}',
    voluntariado: '\u{1F64B}\u{200D}\u{2642}\u{FE0F}',
    workaholic: '\u{1F9B8}\u{200D}\u{2642}\u{FE0F}',
    procrastinei: '\u{1F61E}',
    faxina: '\u{1F9F9}',
    reforma: '\u{1F6A7}',
    compras: '\u{1F6D2}',
    financas: '\u{1F4B2}',
    lavarRoupa: '\u{1F9FC}',
    cozinhar: '\u{1F468}\u{200D}\u{1F373}',
    masturbacao: '\u{1F590}\u{FE0F}',
    protecao: '\u{1F34C}',
    tesao: '\u{1F525}',
    ejaculei: '\u{1F4A6}',
    cigarro: '\u{1F6AC}',
    alcool: '\u{1F377}',
    entorpecente: '\u{1F489}',
    pornografia: '\u{1F51E}'
  }

  return (
    <span role="img" aria-label={nome} aria-hidden className={className}>
      {emojis[nome]}
    </span>
  )
}

export default Emoji
