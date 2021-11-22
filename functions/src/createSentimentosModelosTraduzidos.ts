import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { Sentimento } from "./types/Sentimento"
import { getIdIdiomaModelo } from "./utils/getIdIdiomaModelo"

export const createSentimentosModelosTraduzidos = functions.https.onRequest(
  async (request, response) => {
    // Verifica se tem a collection de sentimentos modelos em português
    // Se tiver, ela será copiada, mantendo os ids
    const sentimentosPT = await getSentimentosAntigosPT()
    if (sentimentosPT.length) {
      const idIdioma = await getIdIdiomaModelo("pt")
      functions.logger.info("sentimentos antigos copiados")
      await insereSentimentosModelo(sentimentosPT, idIdioma)
    }

    sentimentosTemplate.forEach(async element => {
      const { idioma, sentimentos } = element
      const idIdioma = await getIdIdiomaModelo(idioma)
      await insereSentimentosModelo(sentimentos, idIdioma)
      functions.logger.info(`sentimentos criados no idioma ${idioma}`)
    })

    functions.logger.info("createSentimentosModelos", { structuredData: true })
    response.send("sentimentos modelos criados")
  }
)

const insereSentimentosModelo = async (
  sentimentosTemplate: Sentimento[],
  idIdioma: string
) => {
  const refCollectionSentimentos = admin
    .firestore()
    .collection(`modelos/${idIdioma}/sentimentosModelos`)

  sentimentosTemplate.forEach(async (element: Sentimento) => {
    const { nome, emojiUnicode, id } = element

    // se tiver o id aqui, significa que são os dados da collection sentimentosModelo antiga,
    // portanto, manter os ids para não perder a referência nos usuários
    if (id) {
      refCollectionSentimentos
        .doc(id)
        .set({ emojiUnicode, nome }, { merge: true })
    } else {
      const querySnapshot = await refCollectionSentimentos
        .where("nome", "==", nome)
        .limit(1)
        .get()

      if (querySnapshot.empty) {
        refCollectionSentimentos.add({ emojiUnicode, nome })
      } else {
        refCollectionSentimentos
          .doc(querySnapshot.docs[0].id)
          .set({ emojiUnicode, nome }, { merge: true })
      }
    }
  })
}

const getSentimentosAntigosPT = async () => {
  const refSentimentosAntigos = admin
    .firestore()
    .collection("sentimentosModelos")
  const sentimentosSnap = await refSentimentosAntigos.get()
  if (sentimentosSnap.empty) {
    return []
  } else {
    const sentimentosPT: Sentimento[] = []
    sentimentosSnap.forEach(sentimento => {
      const { nome, emojiUnicode } = sentimento.data()
      sentimentosPT.push({ nome, emojiUnicode, id: sentimento.id })
    })
    return sentimentosPT
  }
}

const sentimentosTemplate = [
  {
    idioma: "pt",
    sentimentos: [
      { emojiUnicode: ["1F622"], nome: "Triste" },
      { emojiUnicode: ["1F603"], nome: "Alegre" },
      { emojiUnicode: ["1F630"], nome: "Amedrontado" },
      { emojiUnicode: ["1F609"], nome: "Seguro" },
      { emojiUnicode: ["1F621"], nome: "Irritado" },
      { emojiUnicode: ["1F642"], nome: "Pacífico" },
      { emojiUnicode: ["1F62A"], nome: "Cansado" },
      { emojiUnicode: ["1F929"], nome: "Motivado" },
      { emojiUnicode: ["1F613"], nome: "Culpado" },
      { emojiUnicode: ["1F60A"], nome: "Grato" },
      { emojiUnicode: ["1F614"], nome: "Desanimado" },
      { emojiUnicode: ["1F929"], nome: "Confiante" },
      { emojiUnicode: ["1F629"], nome: "Inseguro" },
      { emojiUnicode: ["1F970"], nome: "Amoroso" },
      { emojiUnicode: ["1F92F"], nome: "Ansioso" },
      { emojiUnicode: ["1F60C"], nome: "Calmo" },
    ],
  },
  {
    idioma: "en",
    sentimentos: [
      { emojiUnicode: ["1F622"], nome: "Sad" },
      { emojiUnicode: ["1F603"], nome: "Cheerful" },
      { emojiUnicode: ["1F630"], nome: "Frightened" },
      { emojiUnicode: ["1F609"], nome: "Secure" },
      { emojiUnicode: ["1F621"], nome: "Irritated" },
      { emojiUnicode: ["1F642"], nome: "Peaceful" },
      { emojiUnicode: ["1F62A"], nome: "Tired" },
      { emojiUnicode: ["1F929"], nome: "Motivated" },
      { emojiUnicode: ["1F613"], nome: "Guilty" },
      { emojiUnicode: ["1F60A"], nome: "Grateful" },
      { emojiUnicode: ["1F614"], nome: "Discouraged" },
      { emojiUnicode: ["1F929"], nome: "Confident" },
      { emojiUnicode: ["1F629"], nome: "Unsure" },
      { emojiUnicode: ["1F970"], nome: "Loving" },
      { emojiUnicode: ["1F92F"], nome: "Anxious" },
      { emojiUnicode: ["1F60C"], nome: "Calm" },
    ],
  },
  {
    idioma: "es",
    sentimentos: [
      { emojiUnicode: ["1F622"], nome: "Triste" },
      { emojiUnicode: ["1F603"], nome: "Alegre" },
      { emojiUnicode: ["1F630"], nome: "Asustado" },
      { emojiUnicode: ["1F609"], nome: "Seguro" },
      { emojiUnicode: ["1F621"], nome: "Enojado" },
      { emojiUnicode: ["1F642"], nome: "Pacífico" },
      { emojiUnicode: ["1F62A"], nome: "Cansado" },
      { emojiUnicode: ["1F929"], nome: "Motivado" },
      { emojiUnicode: ["1F613"], nome: "Culpable" },
      { emojiUnicode: ["1F60A"], nome: "Agradecido" },
      { emojiUnicode: ["1F614"], nome: "Desalentado" },
      { emojiUnicode: ["1F929"], nome: "Confiado" },
      { emojiUnicode: ["1F629"], nome: "Inseguro" },
      { emojiUnicode: ["1F970"], nome: "Amoroso" },
      { emojiUnicode: ["1F92F"], nome: "Ansioso" },
      { emojiUnicode: ["1F60C"], nome: "Calmo" },
    ],
  },
]
