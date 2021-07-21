import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const preencheSentimentosUsuarios = functions.https.onRequest(
  async (request, response) => {
    const firestore = admin.firestore()

    const sentimentosModeloSnapshot = await firestore
      .collection("sentimentosModelos")
      .get()

    if (sentimentosModeloSnapshot.empty) {
      functions.logger.info("sentimentos modelos não encontrados")
      response.send({ message: "sentimentos modelos não encontrados" })
      return
    }
    const sentimentosModelos: any[] = []

    sentimentosModeloSnapshot.forEach(sentimento => {
      const dados = sentimento.data()

      const sentimentoModelo = {
        id: sentimento.id,
        nome: dados.nome,
        emojiUnicode: dados.emojiUnicode
      }

      sentimentosModelos.push(sentimentoModelo)
    })

    const usersSnapshot = await firestore.collection("user").get()

    usersSnapshot.forEach(async user => {
      const userId = user.id
      const collectionSentimentosUsuario = firestore.collection(
        `user/${userId}/sentimentos`
      )
      const sentimentoUserSnapshot = await collectionSentimentosUsuario.get()
      if (sentimentoUserSnapshot.empty) {
        sentimentosModelos.forEach(sentimento => {
          const { id, nome, emojiUnicode } = sentimento
          collectionSentimentosUsuario.add({
            idSentimentoModelo: id,
            nome,
            emojiUnicode
          })
        })
      }
    })

    functions.logger.info("preenche sentimentos nos usuarios", {
      structuredData: true
    })
    response.send({ message: "sentimentos adicionados", sentimentosModelos })
  }
)
