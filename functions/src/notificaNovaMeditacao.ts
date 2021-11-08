import * as functions from "firebase-functions"
import * as request from "request"
import * as admin from "firebase-admin"

export const notificaNovaMeditacao = functions.firestore
  .document("/meditacoes/{id}")
  .onCreate(async (snap, context) => {
    const id = snap.id
    const { nome } = snap.data()

    const idCanal = await getIdCanal("novasMeditacoes")

    // divide os tokens em lotes porque o serviço do expo limita o envio a 100 mensagens por vez
    const tokens = await getTokens(idCanal)
    const lotesDeToken = chunk(tokens, 100)
    functions.logger.info(`${tokens.length} tokens receberão notificações em ${lotesDeToken.length} lotes de 100`)
    const notificacao = {
      title: "Nova meditação",
      body: `Adicionamos uma nova meditação guiada: ${nome}`,
      data: { link: "meditacao", params: { id } }
    }
    lotesDeToken.forEach(lote => {
      enviaNotificacao(lote, notificacao)
    })
  })

function enviaNotificacao(para: string | string[], notificacao: any) {
  notificacao["to"] = para
  request.post({
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json"
    },
    url: "https://exp.host/--/api/v2/push/send",
    body: JSON.stringify(notificacao)
  })
  return notificacao
}

const getIdCanal = async (nome: string): Promise<string> => {
  const firestore = admin.firestore()
  const snap = await firestore
    .collection("canaisDeNotificacao")
    .where("nome", "==", nome)
    .limit(1)
    .get()
  if (snap.empty) {
    functions.logger.warn(`canal de notificação ${nome} não encontrado`)
    return ""
  }

  return snap.docs[0].id
}

const getTokens = async (canal: string): Promise<string[]> => {
  const firestore = admin.firestore()
  const tokens: string[] = []
  const snap = await firestore
    .collection("user")
    .where("canaisDeNotificacao", "array-contains", canal)
    .get()

  if (snap.empty) {
    functions.logger.info("Nenhum token encontrado")
    return tokens
  }

  snap.forEach(user => {
    const dados = user.data()
    if(dados) {
      const tokensUser = dados.tokens
      if (tokensUser) {
        tokens.push(...tokensUser)
      }
    }
  })

  return tokens
}

function chunk(array: Array<string>, tamanho: number) {
  const chunks = []
  let i = 0
  const tamanhoArray = array.length

  while (i < tamanhoArray) {
    chunks.push(array.slice(i, (i += tamanho)))
  }

  return chunks
}
