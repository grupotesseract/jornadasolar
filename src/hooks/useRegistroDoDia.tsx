import { useEffect } from 'react'
import GetUserDiarioByDate from '../services/GetUserDiarioByDate'
import { IDiario } from '../services/GetUserDiariosByDateRange'

interface IParameters {
  userId: string
  date: Date
  selector: (IDiario) => unknown
}

const useRegistroDoDia = ({ userId, date, selector }: IParameters): IDiario => {
  let selected = null

  const buscar = async () => {
    const registroDoDia = await GetUserDiarioByDate({
      userId,
      date
    })

    if (Object.keys(registroDoDia || {}).length > 0) {
      selected = selector(registroDoDia)
    }
  }

  useEffect(() => {
    buscar()
  }, [userId, date.toString()])

  return selected
}

export default useRegistroDoDia
