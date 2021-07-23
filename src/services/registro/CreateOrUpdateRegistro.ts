import RegistrosRepository, {
  IRegistrosRepository
} from '../../repositories/RegistrosRepository'
import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'

interface IParsedGrupoDeHabitos {
  nome: string
  habitos: Array<string>
}

type Parameters = {
  id?: string
  date: unknown
  userId: string
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGrupoDeHabitos> | Array<IParsedGrupoDeHabitos>
  anotacoes?: string
  sentimentosComId?: boolean
}

interface ICreateOrUpdate {
  call(params: Parameters): Promise<boolean>
}

export default class CreateOrUpdate implements ICreateOrUpdate {
  private registrosRepository: IRegistrosRepository

  constructor() {
    this.registrosRepository = new RegistrosRepository()
  }

  async call({ id, ...attributes }: Parameters): Promise<boolean> {
    const parsedAttributes = { ...attributes }
    if (Object.keys(attributes).includes('gruposDeHabitos')) {
      parsedAttributes.gruposDeHabitos = []
      attributes.gruposDeHabitos.forEach(grupoDeHabitos => {
        const habitos = grupoDeHabitos.habitos.map(
          habito => habito.id || habito.nome
        )
        parsedAttributes.gruposDeHabitos.push({
          id: grupoDeHabitos.id || '',
          nome: grupoDeHabitos.nome,
          habitos
        })
      })
    }

    if (Object.keys(attributes).includes('sentimentos')) {
      parsedAttributes.sentimentosComId = true
    }

    if (id) {
      return this.registrosRepository.update({
        id,
        attributes: parsedAttributes
      })
    }

    return this.registrosRepository.add(parsedAttributes)
  }
}
