import GrupoDeHabitos, { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Habito from '../../entities/Habito'
import GetAllGruposDeHaBitosModelos from '../grupoDehabitos/GetAllGruposDeHabitosModelos'
import GetHabitosByUserId from '../habito/GetHabitosByUserId'

type Parameters = {
  userId: string
  allowPersonalizados?: boolean
}

interface IGetGrupoDeHabitosTemplateByUserId {
  call({
    userId,
    allowPersonalizados
  }: Parameters): Promise<Array<IGrupoDeHabitos>>
}

export default class GetGrupoDeHabitosTemplateByUserId implements IGetGrupoDeHabitosTemplateByUserId {
  async call({
    userId,
    allowPersonalizados = true
  }: Parameters): Promise<Array<IGrupoDeHabitos>> {
    const gruposDeHabitosTemplate = await new GetAllGruposDeHaBitosModelos().call()
    const gruposDeHabitos = gruposDeHabitosTemplate.map(grupoDeHabito => {
      const habitos = grupoDeHabito.habitos.map(
        habito =>
          new Habito({ nome: habito.nome, emojiUnicode: habito.emojiUnicode })
      )
      return new GrupoDeHabitos({ nome: grupoDeHabito.nome, habitos })
    })
    if (allowPersonalizados) {
      const habitosDoUsuario = await new GetHabitosByUserId().call(userId)
      const personalizados = new GrupoDeHabitos({
        nome: 'Personalizados',
        habitos: habitosDoUsuario
      })
      gruposDeHabitos.push(personalizados)
    }

    return gruposDeHabitos
  }
}
