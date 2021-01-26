import getSigno from '../../utils/getSigno'

let date = null
let result = null

describe('getSigno', () => {
  const datasCapricornio = ['2021/12/21', '2021/01/03', '2021/1/19']
  const datasAquario = ['2021/1/20', '2021/01/22', '2021/2/18']
  const datasPeixes = ['2021/2/19', '2021/03/05', '2021/3/20']
  const datasAries = ['2021/3/21', '2021/04/10', '2021/4/20']
  const datasTouro = ['2021/4/21', '2021/05/15', '2021/5/21']
  const datasGemeos = ['2021/5/22', '2021/06/16', '2021/6/21']
  const datasCancer = ['2021/6/22', '2021/7/7', '2021/7/22']
  const datasLeao = ['2021/7/23', '2021/7/31', '2021/8/22']
  const datasVirgem = ['2021/8/23', '2021/9/3', '2021/9/21']
  const datasLibra = ['2021/9/22', '2021/10/5', '2021/10/22']
  const datasEscorpiao = ['2021/10/23', '2021/11/15', '2021/11/21']
  const datasSagitario = ['2021/11/22', '2021/12/8', '2021/12/20']

  datasCapricornio.forEach(dataCapricornio => {
    describe(`when date is ${dataCapricornio}`, () => {
      it('returns "Capricórnio"', () => {
        date = new Date(dataCapricornio)
        result = getSigno(date)
        expect(result).toBe('Capricórnio')
      })
    })
  })

  datasAquario.forEach(dataAquario => {
    describe(`when date is ${dataAquario}`, () => {
      it('returns "Aquário"', () => {
        date = new Date(dataAquario)
        result = getSigno(date)
        expect(result).toBe('Aquário')
      })
    })
  })

  datasPeixes.forEach(dataPeixes => {
    describe(`when date is ${dataPeixes}`, () => {
      it('returns "Peixes"', () => {
        date = new Date(dataPeixes)
        result = getSigno(date)
        expect(result).toBe('Peixes')
      })
    })
  })

  datasAries.forEach(dataAries => {
    describe(`when date is ${dataAries}`, () => {
      it('returns "Áries"', () => {
        date = new Date(dataAries)
        result = getSigno(date)
        expect(result).toBe('Áries')
      })
    })
  })

  datasTouro.forEach(dataTouro => {
    describe(`when date is ${dataTouro}`, () => {
      it('returns "Touro"', () => {
        date = new Date(dataTouro)
        result = getSigno(date)
        expect(result).toBe('Touro')
      })
    })
  })

  datasGemeos.forEach(dataGemeos => {
    describe(`when date is ${dataGemeos}`, () => {
      it('returns "Gêmeos"', () => {
        date = new Date(dataGemeos)
        result = getSigno(date)
        expect(result).toBe('Gêmeos')
      })
    })
  })

  datasCancer.forEach(dataCancer => {
    describe(`when date is ${dataCancer}`, () => {
      it('returns "Câncer"', () => {
        date = new Date(dataCancer)
        result = getSigno(date)
        expect(result).toBe('Câncer')
      })
    })
  })

  datasLeao.forEach(dataLeao => {
    describe(`when date is ${dataLeao}`, () => {
      it('returns "Leão"', () => {
        date = new Date(dataLeao)
        result = getSigno(date)
        expect(result).toBe('Leão')
      })
    })
  })

  datasVirgem.forEach(dataVirgem => {
    describe(`when date is ${dataVirgem}`, () => {
      it('returns "Virgem"', () => {
        date = new Date(dataVirgem)
        result = getSigno(date)
        expect(result).toBe('Virgem')
      })
    })
  })

  datasLibra.forEach(dataLibra => {
    describe(`when date is ${dataLibra}`, () => {
      it('returns "Libra"', () => {
        date = new Date(dataLibra)
        result = getSigno(date)
        expect(result).toBe('Libra')
      })
    })
  })

  datasEscorpiao.forEach(dataEscorpiao => {
    describe(`when date is ${dataEscorpiao}`, () => {
      it('returns "Escorpião"', () => {
        date = new Date(dataEscorpiao)
        result = getSigno(date)
        expect(result).toBe('Escorpião')
      })
    })
  })

  datasSagitario.forEach(dataSagitario => {
    describe(`when date is ${dataSagitario}`, () => {
      it('returns "Sagitário"', () => {
        date = new Date(dataSagitario)
        result = getSigno(date)
        expect(result).toBe('Sagitário')
      })
    })
  })
})
