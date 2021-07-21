import GetGrupoDeHabitosTemplateByUserId from 'src/services/grupoDehabitos/GetGrupoDeHabitosTemplateByUserId'
import GetAllGruposDeHaBitosModelos from 'src/services/grupoDehabitos/GetAllGruposDeHabitosModelos'

export const getGrupoDeHabitosIniciais = async (userId?: string) => {
  let gruposDeHabitosIniciais = []
  if (userId) {
    gruposDeHabitosIniciais = await new GetGrupoDeHabitosTemplateByUserId().call(
      {
        userId
      }
    )
  } else {
    gruposDeHabitosIniciais = await new GetAllGruposDeHaBitosModelos().call()
  }
  return gruposDeHabitosIniciais.map(grupoDeHabitos => ({
    nome: grupoDeHabitos.nome,
    id: userId && grupoDeHabitos.id !== null ? grupoDeHabitos.id : '',
    habitos: []
  }))
}
