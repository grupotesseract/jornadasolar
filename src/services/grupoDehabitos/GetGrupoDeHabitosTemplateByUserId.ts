import GrupoDeHabitos, { IGrupoDeHabitos } from 'src/entities/GrupoDeHabitos'
import Habito from '../../entities/Habito'
import GetAllGruposDeHaBitosModelos from '../grupoDehabitos/GetAllGruposDeHabitosModelos'
import GetUserGruposDeHabitos from '../user/GetUserGruposDeHabitos'

type Parameters = {
  userId: string
}

interface IGetGrupoDeHabitosTemplateByUserId {
  call({ userId }: Parameters): Promise<Array<IGrupoDeHabitos>>
}

// eslint-disable-next-line prettier/prettier
export default class GetGrupoDeHabitosTemplateByUserId implements IGetGrupoDeHabitosTemplateByUserId {
  async call({ userId }: Parameters): Promise<Array<IGrupoDeHabitos>> {
    // Busca grupos de hábitos da subcollection do user
    const gruposDeHabitosDoUsuario = await GetUserGruposDeHabitos(userId)

    const usuarioTemGruposDeHabitos = gruposDeHabitosDoUsuario.length > 0

    const gruposDeHabitos = usuarioTemGruposDeHabitos
      ? gruposDeHabitosDoUsuario
      : await new GetAllGruposDeHaBitosModelos().call() // Busca grupos de hábitos da collection grupoDeHabitosModelos

    return gruposDeHabitos.map(grupoDeHabito => {
      const habitos = grupoDeHabito.habitos.map(
        habito =>
          new Habito({
            id: usuarioTemGruposDeHabitos ? habito.id : null,
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
