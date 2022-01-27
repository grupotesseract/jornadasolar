import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

export const createUserDefault = functions.https.onRequest(
  async (request, response) => {
    const userEmail = request.query?.email?.toString() || ""
    const userName = request.query?.nome?.toString() || ""
    let userId = ""

    const now = admin.firestore.Timestamp.now()
    const canaisDeNotificacao: string[] = []
    try {
      const collectionCanais = admin
        .firestore()
        .collection("canaisDeNotificacao")
      const canaisSnapshot = await collectionCanais.get()

      canaisSnapshot.forEach(canal => {
        canaisDeNotificacao.push(canal.data().nome)
      })
    } catch (error) {
      console.log("canais error", error)
    }
    try {
      const userAuth = await admin.auth().getUserByEmail(userEmail)

      if(userAuth.uid) {
        userId = userAuth.uid
      } else {
        throw new Error("Usuário sem id (?)")
      }

      const userData = {
        nome: userAuth.displayName || userName,
        email: userAuth.email,
        objetivos: [],
        temLivro: "",
        created_at: now,
        updated_at: now,
        lastAccess: now,
        countAccess: 1,
        canaisDeNotificacao,
        tokens: [],
        idioma: "pt"
      }
      await admin.firestore().collection("user").doc(userId).set(userData)
    } catch (error) {
      console.log("Error fetching user data:", error)
    }

    // Popula hábitos
    const idIdioma = "T8mtr2UwpIGFHlwRXeSF"
    try {
      const habitosCollection = admin
        .firestore()
        .collection(`modelos/${idIdioma}/gruposDeHabitosModelos`)

      const querySnapshot = await habitosCollection.get()

      console.log("querySnapshot", querySnapshot)
      const gruposDeHabitosModelos: any[] = []

      querySnapshot.forEach(grupoDeHabitoModelo => {
        const grupoDeHabitosModeloData = grupoDeHabitoModelo.data()

        const grupoDeHabitosModelo = {
          id: grupoDeHabitoModelo.id,
          nome: grupoDeHabitosModeloData.nome,
          posicao: grupoDeHabitosModeloData.posicao,
          habitos: []
        }

        gruposDeHabitosModelos.push(grupoDeHabitosModelo)
      })
      console.log("gruposDeHabitosModelos", gruposDeHabitosModelos)

      for (let index = 0; index < gruposDeHabitosModelos.length; index++) {
        const grupoDeHabitosModelo = gruposDeHabitosModelos[index]

        const habitos = await getAllHabitosModelos(
          grupoDeHabitosModelo.id,
          idIdioma
        )
        
        grupoDeHabitosModelo.habitos = habitos.map(habitos => {
          return {
            id: habitos.id,
            userId: habitos.userId,
            nome: habitos.nome,
            emojiUnicode: habitos.emojiUnicode,
            posicao: habitos.posicao
          }
        })
      }

      // Cria subcollection de gruposDeHabitos com subcollection de habitos na collection user
      gruposDeHabitosModelos.forEach(async grupoDeHabitoModelo => {
        await createUserGrupoDeHabitos({
          userId: userId,
          grupoDeHabitos: grupoDeHabitoModelo
        })
      })
    } catch (error) {
      console.log("Error fetching habitos data:", error)
    }

    // Cria subcollection de sentimentos na collection user
    const sentimentosModelos = await getAllSentimentosModelos(idIdioma)

    sentimentosModelos.forEach(async (sentimento: any) => {
      const { id, nome, emojiUnicode } = sentimento
      await createUserSentimentos({
        userId,
        idSentimentoModelo: id,
        nome,
        emojiUnicode
      })
    })

    response.send({
      message: `Usuário ${userEmail} criado com sucesso!`
    })
  }
)

const getAllHabitosModelos = async (
  idGrupoDeHabitoModelo: string,
  idIdioma: string
): Promise<any[]> => {
  const habitosCollection = admin
    .firestore()
    .collection(
      `modelos/${idIdioma}/gruposDeHabitosModelos/${idGrupoDeHabitoModelo}/habitosModelos`
    )
  const habitosModelosSnapshot = await habitosCollection
    .orderBy("posicao", "asc")
    .get()
  const habitos: any[] = []
  habitosModelosSnapshot.forEach(habitoModelo => {
    const habitoModeloData = habitoModelo.data()
    const habito = {
      id: habitoModelo.id,
      nome: habitoModeloData.nome,
      emojiUnicode: habitoModeloData.emojiUnicode,
      posicao: habitoModeloData.posicao
    }

    habitos.push(habito)
  })

  return habitos
}

const createUserGrupoDeHabitos = async ({
  userId,
  grupoDeHabitos
}: {
  userId: string
  grupoDeHabitos: any
}) => {
  try {
    const userGrupoHabitosCollection = admin
      .firestore()
      .collection(`user/${userId}/gruposDeHabitos`)

    const { id, nome, posicao, habitos } = grupoDeHabitos
    const docRef = await userGrupoHabitosCollection.add({
      idDoGrupoModelo: id,
      nome,
      posicao
    })

    if (habitos.length > 0) {
      habitos.forEach((habito: any) =>
        admin
          .firestore()
          .collection(`user/${userId}/gruposDeHabitos/${docRef.id}/habitos`)
          .add({
            idDoHabitoModelo: habito.id,
            nome: habito.nome,
            emojiUnicode: habito.emojiUnicode,
            posicao: habito.posicao
          })
      )
    }
  } catch (error) {
    console.log("Error creating user grupo de habitos:", error)
  }
}

const getAllSentimentosModelos = async (idIdioma: string): Promise<any[]> => {
  const sentimentosCollection = admin
    .firestore()
    .collection(`modelos/${idIdioma}/sentimentosModelos`)
  const querySnapshot = await sentimentosCollection.get()

  const sentimentosModelos: any[] = []

  querySnapshot.forEach(sentimento => {
    const dados = sentimento.data()

    const sentimentoModelo = {
      id: sentimento.id,
      nome: dados.nome,
      emojiUnicode: dados.emojiUnicode
    }

    sentimentosModelos.push(sentimentoModelo)
  })
  return sentimentosModelos
}

const createUserSentimentos = ({
  userId,
  idSentimentoModelo,
  nome,
  emojiUnicode
}: any) => {
  const sentimentosUserCollection = admin
    .firestore()
    .collection(`user/${userId}/sentimentos`)

  sentimentosUserCollection.add({
      idSentimentoModelo: idSentimentoModelo || null,
      nome,
      emojiUnicode
  })
}