import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

const canaisTemplate = ["geral", "novasMeditacoes"]

export const createCanaisNotificacao = functions.https.onRequest(
  (request, response) => {
    const collection = admin.firestore().collection("canaisDeNotificacao")
    canaisTemplate.forEach(async canal => {
      const querySnapshot = await collection
        .where("nome", "==", canal)
        .limit(1)
        .get()

      if (querySnapshot.empty) {
        collection.add({ nome: canal })
      } else {
        collection.doc(querySnapshot.docs[0].id).set({ nome: canal })
      }
    })
    functions.logger.info("canais de notificação criados", canaisTemplate)
    response.send({
      message:
        "Canais de notificação atualizados. Caso algum nome seja alterado, revisar functions de envio de notificação"
    })
  }
)
