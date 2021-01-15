import { useEffect, useState } from 'react'
import GetUserDiarioByDate from '../services/GetUserDiarioByDate'
import { IDiario } from '../services/GetUserDiariosByMes'

interface IParameters {
  userId: string
  date: Date
}

interface IResult {
  registroDoDia: IDiario
  loading: boolean
}

const useRegistroDoDia = ({ userId, date }: IParameters): IResult => {
  const initialData = { loading: true, registroDoDia: null }
  const [data, setData] = useState(initialData)

  const buscar = async () => {
    await setData(initialData)

    const registroDoDia = await GetUserDiarioByDate({
      userId,
      date
    })

    setData({ loading: false, registroDoDia })
  }

  useEffect(() => {
    buscar()
  }, [userId, date.toString()])

  return data
}

export default useRegistroDoDia
