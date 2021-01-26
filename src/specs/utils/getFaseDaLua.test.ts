import getFaseDaLua from '../../utils/getFaseDaLua'

let date = null
let result = null

describe('getFaseDaLua', () => {
  const datasLuaCrescente = ['2021/01/21', '2021/02/22', '2021/03/23']
  const datasLuaNova = ['2021/1/14', '2021/2/13', '2021/3/13']
  const datasLuaCheia = ['2021/1/28', '2021/2/26', '2021/5/25']
  const datasLuaMinguante = ['2021/1/7', '2021/2/6', '2021/6/2']

  datasLuaNova.forEach(dataLuaNova => {
    describe(`when date is ${dataLuaNova}`, () => {
      it('returns "Nova"', () => {
        date = new Date(dataLuaNova)
        result = getFaseDaLua(date)
        expect(result).toBe('Nova')
      })
    })
  })

  datasLuaCrescente.forEach(dataLuaCrescente => {
    describe(`when date is ${dataLuaCrescente}`, () => {
      it('returns "Crescente"', () => {
        date = new Date(dataLuaCrescente)
        result = getFaseDaLua(date)
        expect(result).toBe('Crescente')
      })
    })
  })

  datasLuaCheia.forEach(dataLuaCheia => {
    describe(`when date is ${dataLuaCheia}`, () => {
      it('returns "Cheia"', () => {
        date = new Date(dataLuaCheia)
        result = getFaseDaLua(date)
        expect(result).toBe('Cheia')
      })
    })
  })

  datasLuaMinguante.forEach(dataLuaMinguante => {
    describe(`when date is ${dataLuaMinguante}`, () => {
      it('returns "Minguante"', () => {
        date = new Date(dataLuaMinguante)
        result = getFaseDaLua(date)
        expect(result).toBe('Minguante')
      })
    })
  })
})
