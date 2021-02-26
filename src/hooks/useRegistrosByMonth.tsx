import { useEffect, useState } from 'react'
import { IRegistro } from '../entities/Registro'
import GetRegistrosByMonth from '../services/registro/GetRegistrosByMonth'
import { lastDayOfMonth, startOfMonth } from 'date-fns'

interface IParameters {
  userId: string
  mes: Date
}

interface IResult {
  diarios: Array<IRegistro>
  loading: boolean
}

const useRegistrosByMonth = ({ userId, mes }: IParameters): IResult => {
  const initialData = { loading: true, diarios: null }
  const [data, setData] = useState(initialData)
  const startDate = startOfMonth(mes)
  const endDate = lastDayOfMonth(mes)

  const buscar = async () => {
    await setData(initialData)
    const diarios = await new GetRegistrosByMonth().call(
      userId,
      startDate,
      endDate
    )
    setData({ loading: false, diarios })
  }

  useEffect(() => {
    buscar()
  }, [userId, mes.toString()])

  return data
}

export default useRegistrosByMonth
