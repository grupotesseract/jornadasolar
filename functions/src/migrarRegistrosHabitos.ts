import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { GrupoDeHabitos } from "./types/GrupoDeHabitos"

/**
 * Função para alterar os registros do diário trocando
 * o nome do hábito pelo id que ele possui na collection
 * de habitos pertencente ao usuário, isso tanto para os
 * hábitos como para os grupos de hábitos
 */
export const migrarRegistrosHabitos = functions.https.onRequest(
  async (request, response) => {
    let updatedUsers = 0 // Contador para exibir no retorno
    let updatedDiarios = 0 // Contador para exibir no retorno

    // Passa por todos os usuários
    const usersCollection = admin.firestore().collection("user")
    const snapshotUsers = await usersCollection.get()
    const usersId: Array<string> = []
    snapshotUsers.forEach(userSnap => {
      usersId.push(userSnap.id)
    })

    for (const userId of usersId) {
      // Monta um array indexado pelo nome dos grupos e habitos
      // eslint-disable-next-line prefer-const
      let gruposIdByNome: Map<string, string> = new Map<string, string>()
      const habitosIdByNome: Map<string, string> = new Map<string, string>()
      const snapshotGrupos = await admin
        .firestore()
        .collection(`user/${userId}/gruposDeHabitos`)
        .get()

      if (snapshotGrupos.empty) {
        functions.logger.info("sem gruposDeHabitos", { snapshotGrupos })
        return
      }

      // monta aray de grupos
      snapshotGrupos.forEach(grupoHabitoSnap => {
        const grupoHabito = grupoHabitoSnap.data() as GrupoDeHabitos
        gruposIdByNome.set(grupoHabito.nome.toLowerCase(), grupoHabitoSnap.id)
      })
      functions.logger.info("gruposIdByNome", gruposIdByNome)

      // monta array de habitos com base nos grupos
      for (const grupoHabitoId of gruposIdByNome.values()) {
        const snapshotHabitosUsuario = await admin
          .firestore()
          .collection(`user/${userId}/gruposDeHabitos/${grupoHabitoId}/habitos`)
          .get()
        snapshotHabitosUsuario.forEach(habitoUsuarioSnap => {
          const habitoUsuario = habitoUsuarioSnap.data()
          habitosIdByNome.set(
            habitoUsuario.nome.toLowerCase(),
            habitoUsuarioSnap.id
          )
        })
      }
      functions.logger.info("habitosIdByNome", habitosIdByNome)

      // Passa por todos os registros desse usuario
      const diarioCollection = admin.firestore().collection("diario")
      const snapshotDiario = await diarioCollection
        .where("userId", "==", userId)
        .get()
      snapshotDiario.forEach(diarioSnap => {
        const { id } = diarioSnap
        const diario = diarioSnap.data()
        const { gruposDeHabitos } = diario
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const novoGrupoDeHabitos = gruposDeHabitos.map((grupo: any) => {
          const { nome, habitos } = grupo
          const idGrupo = gruposIdByNome.get(nome.toLowerCase()) || ""
          if (!habitos || habitos.length === 0) {
            return {
              nome,
              id: idGrupo
            }
          }
          const novosHabitos = habitos?.map((habitoNome: string) =>
            habitosIdByNome.get(habitoNome.toLowerCase())
          )
          return {
            nome,
            id: idGrupo,
            habitos: novosHabitos
          }
        })
        functions.logger.info("novoGrupoDeHabitos", novoGrupoDeHabitos)
        // Atualiza no banco
        admin
        diarioCollection
          .doc(id)
          .set({ gruposDeHabitos: novoGrupoDeHabitos }, { merge: true })
        updatedDiarios++
      })
      updatedUsers++
    }
    response.send({
      message: `Foram alterado ${updatedDiarios} registros de diário de ${updatedUsers} usuários`
    })
  }
)
