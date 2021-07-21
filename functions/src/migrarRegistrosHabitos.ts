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

    const userIdParam = request.query?.userid
    const limite = Number(request.query?.userslimite) || 100
    const pagina = Number(request.query?.pagina) || 0
    const usersCollection = admin.firestore().collection("user")
    const usersId: Array<string> = []
    if (userIdParam) {
      // Filtro por usuário
      functions.logger.info(`Iniciando migração para único usuário ${userIdParam}`)
      usersId.push(String(userIdParam))
    } else {
      // Passa por todos os usuários, e adiciona os que 
      // ainda não foram migrados ao array usersId
      const snapshotUsers = await usersCollection.get() 
      snapshotUsers.forEach(userSnap => {
        const { registroMigrado } = userSnap.data()
        if (!registroMigrado) {
          usersId.push(userSnap.id)
        }
      })
    }
    usersId.sort()
    const usersIdPaginado = usersId.slice(pagina * limite, (pagina * limite) + limite)
    functions.logger.info(`Aplicando migração para ${usersIdPaginado.length}, iniciando da pagina ${pagina} como limite de ${limite} users`)
    functions.logger.info("usersPaginado", usersIdPaginado)

    for (const userId of usersIdPaginado) {
      functions.logger.info(`iniciando Migração de registros para o user ${userId}`)
      if(!userId) {
        continue
      }
      // Passa por todos os registros desse usuario
      const diarioCollection = admin.firestore().collection("diario")
      const snapshotDiario = await diarioCollection
        .where("userId", "==", userId)
        .get()
      if (snapshotDiario.empty) {
        functions.logger.info(`user ${userId} sem registros no diario`);
      } else {
        // Monta um array indexado pelo nome dos grupos e habitos
        // eslint-disable-next-line prefer-const
        let gruposIdByNome: Map<string, string> = new Map<string, string>()
        const habitosIdByNome: Map<string, string> = new Map<string, string>()
        const snapshotGrupos = await admin
          .firestore()
          .collection(`user/${userId}/gruposDeHabitos`)
          .get()

        if (snapshotGrupos.empty) {
          functions.logger.info(`user ${userId} sem gruposDeHabitos`);
          continue
        }

        // monta aray de grupos
        snapshotGrupos.forEach(grupoHabitoSnap => {
          const grupoHabito = grupoHabitoSnap.data() as GrupoDeHabitos
          gruposIdByNome.set(grupoHabito.nome.toLowerCase(), grupoHabitoSnap.id)
        })
        functions.logger.info("gruposIdByNome", gruposIdByNome)

        // monta array de habitos com base nos grupos
        for (const [grupoHabitoNome, grupoHabitoId] of gruposIdByNome) {
          const snapshotHabitosUsuario = await admin
            .firestore()
            .collection(`user/${userId}/gruposDeHabitos/${grupoHabitoId}/habitos`)
            .get()
          if (snapshotHabitosUsuario.empty) {
            functions.logger.info(`user/${userId}/gruposDeHabitos/${grupoHabitoId}/habitos: sem hábitos registrados`);
          } else {
            snapshotHabitosUsuario.forEach(habitoUsuarioSnap => {
              const habitoUsuario = habitoUsuarioSnap.data()
              habitosIdByNome.set(
                grupoHabitoNome.toLowerCase() + "/" + habitoUsuario.nome.toLowerCase(),
                habitoUsuarioSnap.id
              )
            })
          } 
        }
        functions.logger.info("habitosIdByNome", habitosIdByNome)

        snapshotDiario.forEach(diarioSnap => {
          const { id } = diarioSnap
          const diario = diarioSnap.data()
          const { gruposDeHabitos, registroMigrado } = diario
          if (!gruposDeHabitos || registroMigrado) {
            return
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const novoGrupoDeHabitos = gruposDeHabitos?.map((grupo: any) => {
            const { nome, habitos } = grupo
            const idGrupo = gruposIdByNome.get(nome.toLowerCase()) || ""
            if (!habitos || habitos.length === 0) {
              return {
                nome,
                id: idGrupo
              }
            }
            const novosHabitos: string[] = []
            habitos?.forEach((habitoNome: string) => {
              const habitoId = habitosIdByNome.get(nome.toLowerCase() + "/" + habitoNome.toLowerCase())
              if (habitoId) {
                novosHabitos.push(habitoId)
              } else {
                // Caso não encontre o habito mas seja do grupo personalizado
                // mantém o registro pois é um id
                if (nome.toLowerCase() === "personalizados") {
                  novosHabitos.push(habitoNome)
                }
              }
            })
            return {
              nome,
              id: idGrupo,
              habitos: novosHabitos
            }
          })
          // Atualiza no banco
          diarioCollection
            .doc(id)
            .set({ gruposDeHabitos: novoGrupoDeHabitos, registroMigrado: true }, { merge: true })
          updatedDiarios++
        })
        usersCollection
          .doc(userId)
          .set({ registrosMigrados: true }, { merge: true })
        updatedUsers++
      } 
    }
    response.send({
      message: `Foram alterado ${updatedDiarios} registros de diário de ${updatedUsers} usuários`,
      usersIdPaginado
    })
  }
)
