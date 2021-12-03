import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const queryUsers = functions.https.onRequest(
  async (request, response) => {
    const db = admin.firestore()
    const users = await db.collection("user").get() 
    const userList = users.docs.map(doc => doc.data())
    functions.logger.info(
      `Iniciando processamento de ${userList.length} usuários`
    )

    let totalAcessos = 0
    let countUsersWithAcessos = 0
    let countUsersComTokenAtivo = 0
    const countObjetivos = {
      autoconhecimento: 0,
      monitorarHabitos: 0,
      monitorarEmocoes: 0,
      escrever: 0,
      outros: 0
    }
    let countTemLivro = 0
    let countNaoTemLivro = 0
    let countQueroSaberMais = 0

    for(const user of userList) {
      // Ignora utilização de quem já é admin
      if (user.admin === true) {
        return
      }
      if (user.countAccess) {
        totalAcessos += user.countAccess
        countUsersWithAcessos++
      }
      if (user.tokens?.length) {
        countUsersComTokenAtivo++
      }
      if (user.objetivos) {
        for(const objetivo of user.objetivos) {
          switch (objetivo) {
            case "autoconhecimento":
            case "Autoconhecimento":
              countObjetivos.autoconhecimento++
              break
            case "Monitorar hábitos":
            case "habitos":
              countObjetivos.monitorarHabitos++
              break
            case "Monitorar Emoções":
            case "Monitorar emoções":
            case "emocoes":
              countObjetivos.monitorarEmocoes++
              break
            case "escrever":
            case "Escrever sobre meu dia":
              countObjetivos.escrever++
              break
            case "outros":
            case "Outros":
              countObjetivos.outros++
              break
            default:
              functions.logger.info(`objetivo não encontrado: ${objetivo}`)
          }
        }
      }
      if(user.temLivro) {
        switch (user.temLivro) {
          case "Sim, tenho!":
          case "TemLivro":
            countTemLivro++
            break
          case "Não tenho":
          case "NaoTemLivro":
            countNaoTemLivro++
            break
          case "Não, mas quero saber mais":
          case "QueroSaberMais":
            countQueroSaberMais++
        }

      }
    }
    response.send({
      totalAcessos,
      countUsersWithAcessos,
      countUsersComTokenAtivo,
      countObjetivos,
      countTemLivro,
      countNaoTemLivro,
      countQueroSaberMais
    })
  }
)
