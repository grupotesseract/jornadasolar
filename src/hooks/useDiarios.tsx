import { useEffect, useState } from 'react'
import GetUserDiariosByMes, { IDiario } from '../services/GetUserDiariosByMes'

interface IParameters {
  userId: string
  mes: Date
}

interface IResult {
  diarios: Array<IDiario>
  loading: boolean
}

const useDiarios = ({ userId, mes }: IParameters): IResult => {
  const initialData = { loading: true, diarios: null }
  const [data, setData] = useState(initialData)

  const buscar = async () => {
    await setData(initialData)

    const diarios = await GetUserDiariosByMes({
      userId,
      mes
    })

    setData({ loading: false, diarios })
  }

  useEffect(() => {
    buscar()
  }, [userId, mes.toString()])

  return data
}

export default useDiarios
