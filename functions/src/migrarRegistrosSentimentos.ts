import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const migrarRegistrosSentimentos = functions.https.onRequest(
  async (request, response) => {
    let updatedDiarios = 0
    let updatedUsers = 0

    const firestore = admin.firestore()
    const usersCollection = firestore.collection("user")
    const diariosCollection = firestore.collection("diario")

    const userIdParam = request.query?.userid
    const limite = Number(request.query?.userslimite) || 100
    const userIds = []

    if (userIdParam) {
      functions.logger.info(
        `Iniciando migração para um único usuário: ${userIdParam}`
      )
      userIds.push(String(userIdParam))
    } else {
      const usersSnapshot = await usersCollection.get()
      usersSnapshot.forEach(async user => {
        const { sentimentosMigrados } = user.data()
        if (!sentimentosMigrados) {
          const id = user.id
          userIds.push(id)
        }
      })
    }
    const userIdsLimitados = userIds.slice(0, limite)

    functions.logger.info(
      `Iniciando migração de ${userIdsLimitados.length} usuários - ${userIds.length} pendentes`
    )

    for (const user of userIdsLimitados) {
      functions.logger.info(`Migrando ${user}`)
      const sentimentosIdPeloNome = new Map<string, string>()
      const sentimentosSnapshot = await firestore
        .collection(`user/${user}/sentimentos`)
        .get()

      if (sentimentosSnapshot.empty) {
        functions.logger.info(`user ${user} não tem a collection sentimentos`)
        continue
      }
      sentimentosSnapshot.forEach(sentimentoSnap => {
        sentimentosIdPeloNome.set(sentimentoSnap.data().nome, sentimentoSnap.id)
      })

      const diariosSnapshot = await diariosCollection
        .where("userId", "==", user)
        .get()

      if (diariosSnapshot.empty) {
        functions.logger.info(`user ${user} não tem registros de diario`)
        continue
      }

      diariosSnapshot.forEach(diarioSnap => {
        const { id } = diarioSnap
        const diario = diarioSnap.data()
        const { sentimentos, sentimentosComId } = diario

        if (!sentimentos || sentimentosComId) {
          return
        }

        const sentimentosAtualizados = sentimentos.map(
          (sentimentoOriginal: string) => {
            const sentimentoId = sentimentosIdPeloNome.get(sentimentoOriginal)
            if (sentimentoId) {
              return sentimentoId
            } else {
              functions.logger.info(
                `user ${user} / diario ${id} - sentimento do diario [${sentimentoOriginal}] não consta na collection e não foi alterado`
              )
              return sentimentoOriginal
            }
          }
        )
        diariosCollection
          .doc(id)
          .set(
            { sentimentos: sentimentosAtualizados, sentimentosComId: true },
            { merge: true }
          )
        updatedDiarios++
      })

      usersCollection.doc(user).set({ sentimentosComId: true }, { merge: true })
      updatedUsers++
      functions.logger.info(`Usuário ${user} atualizado`)
    }

    response.send({
      message: `Foram alterado ${updatedDiarios} registros de diário de ${updatedUsers} usuários`
    })
  }
)
