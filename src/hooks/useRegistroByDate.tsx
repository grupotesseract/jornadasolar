import { useEffect, useState } from 'react'
import { IRegistro } from '../entities/Registro'
import GetRegistroByDate from '../services/registro/GetRegistroByDate'

interface IParameters {
  userId: string
  date: Date
}

interface IResult {
  registroDoDia: IRegistro
  loading: boolean
}

const useRegistroByDate = ({ userId, date }: IParameters): IResult => {
  const initialData = { loading: true, registroDoDia: null }
  const [data, setData] = useState(initialData)

  const buscar = async () => {
    await setData(initialData)
    const registroDoDia = await new GetRegistroByDate().call(userId, date)
    setData({ loading: false, registroDoDia })
  }

  useEffect(() => {
    buscar()
  }, [userId, date.toString()])

  return data
}

export default useRegistroByDate
