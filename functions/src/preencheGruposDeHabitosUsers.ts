
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Habito } from "./types/Habito";

/**
 * Função para copiar todos os hábitos da collection `gruposDeHabitosModelos`
 * para uma collection `gruposDeHabitos` dentro do document do `user`
 */
export const preencheGruposDeHabitosUsers = functions.https.onRequest(async (request, response) => {

  const snapshotGruposModelo = await admin.firestore().collection("gruposDeHabitosModelos").get();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gruposDeHabitos: any[] = []
  if (snapshotGruposModelo.empty) {
    functions.logger.info("sem gruposDeHabitos", { snapshotGruposModelo });
    return 
  } 

  // traz os grupos
  snapshotGruposModelo.forEach(grupoModeloSnap => {
    const grupoModelo = grupoModeloSnap.data()
    grupoModelo.id = grupoModeloSnap.id
    grupoModelo.habitos = []
    gruposDeHabitos.push(grupoModelo)
  })

  // coloca os habitos de cada grupo dentro do grupo
  for(const grupoModelo of gruposDeHabitos) {
    const snapshotHabitosModelo = await admin
      .firestore()
      .collection(`gruposDeHabitosModelos/${grupoModelo.id}/habitosModelos`)
      .get()
    snapshotHabitosModelo.forEach(habitoModeloSnap => {
      const habitoModelo = habitoModeloSnap.data()
      grupoModelo.habitos.push({ ...habitoModelo, id: habitoModeloSnap.id })
    })
  }

  const usersCollection = admin.firestore().collection("user")
  const usersId: Array<string> = []
  const snapshotUsers = await usersCollection.get()
  snapshotUsers.forEach(userSnap => {
    usersId.push(userSnap.id)
  })

  functions.logger.info("lista de usuários que passarão pela migração", usersId)
  
  for (const userId of usersId) {
  // Percorre todos os usuários
    const snapshotGruposUser = await admin
      .firestore()
      .collection(`user/${userId}/gruposDeHabitos`)
      .get()
    // Caso não tenha grupoDeHabitos, insere hábitos
    if (snapshotGruposUser.empty) {
      functions.logger.info(`inserindo grupos no user ${userId}`)
      for (const grupo of gruposDeHabitos) {
        const { habitos, id, ...grupoProps } = grupo
        const grupoRef = await usersCollection.doc(userId).collection("gruposDeHabitos").add({ ...grupoProps, idDoGrupoModelo: id })
        habitos.forEach(({ id, ...habito }: Habito) => {
          admin
            .firestore()
            .collection(`user/${userId}/gruposDeHabitos/${grupoRef.id}/habitos`)
            .add({ ...habito, idDoHabitoModelo: id })
        })
      }
    }
  }

  response.send({ message: "grupos de hábitos adicionados", gruposDeHabitos });
});