import GrupoDeHabitos, { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Habito from '../../entities/Habito'
import GetAllGruposDeHaBitosModelos from '../grupoDehabitos/GetAllGruposDeHabitosModelos'
import GetHabitosByUserId from '../habito/GetHabitosByUserId'
import GetUserGruposDeHabitos from '../user/GetUserGruposDeHabitos'

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

// eslint-disable-next-line prettier/prettier
export default class GetGrupoDeHabitosTemplateByUserId implements IGetGrupoDeHabitosTemplateByUserId {
  async call({
    userId,
    allowPersonalizados = true
  }: Parameters): Promise<Array<IGrupoDeHabitos>> {
    // Busca grupos de hábitos da subcollection do user
    const gruposDeHabitosDoUsuario = await GetUserGruposDeHabitos(userId)

    // Busca hábitos da collection habitos (personalizados)
    const habitosDoUsuario = await new GetHabitosByUserId().call(userId)

    const usuarioTemGruposDeHabitos = gruposDeHabitosDoUsuario.length > 0

    const gruposDeHabitos = usuarioTemGruposDeHabitos
      ? gruposDeHabitosDoUsuario
      : await new GetAllGruposDeHaBitosModelos().call() // Busca grupos de hábitos da collection grupoDeHabitosModelos

    return gruposDeHabitos.map(grupoDeHabito => {
      const isPersonalizados = grupoDeHabito.nome === 'Personalizados'

      if (isPersonalizados && allowPersonalizados) {
        grupoDeHabito.habitos = habitosDoUsuario
      }

      const habitos = grupoDeHabito.habitos.map(
        habito =>
          new Habito({
            id:
              usuarioTemGruposDeHabitos || isPersonalizados ? habito.id : null,
            nome: habito.nome,
            posicao: habito.posicao,
            emojiUnicode: habito.emojiUnicode
          })
      )
      return new GrupoDeHabitos({
        id: usuarioTemGruposDeHabitos ? grupoDeHabito.id : null,
        idDoGrupoModelo: grupoDeHabito.idDoGrupoModelo,
        nome: grupoDeHabito.nome,
        habitos
      })
    })
  }
}
