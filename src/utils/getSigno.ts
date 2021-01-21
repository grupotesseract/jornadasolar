const getSigno = (date: Date): string => {
  const dia = date.getDate()
  const mes = date.getMonth() + 1

  const signos = [
    '',
    'Capricórnio',
    'Aquário',
    'Peixes',
    'Áries',
    'Touro',
    'Gêmeos',
    'Câncer',
    'Leão',
    'Virgem',
    'Libra',
    'Escorpião',
    'Sagitário',
    'Capricórnio'
  ]

  const ultimoDia = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19]

  return dia > ultimoDia[mes] ? signos[mes + 1] : signos[mes]
}

export default getSigno
