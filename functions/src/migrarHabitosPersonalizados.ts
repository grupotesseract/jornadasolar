
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Habito } from "./types/Habito";

/**
 * Função para migrar os hábitos da collection `habitos`
 * para a collection habitos do grupo Personalizados
 * de acordo com o userId
 */
export const migrarHabitosPersonalizados = functions.https.onRequest(async (request, response) => {
  let updatedHabitos = 0 // Contador para exibir no retorno

  // Passa por todos os usuários 
  const usersCollection = admin.firestore().collection("user")
  const snapshotUsers = await usersCollection.get()
  const usersId: Array<string> = []
  snapshotUsers.forEach(userSnap => {
    usersId.push(userSnap.id)
  })

  for (const userId of usersId) {
    // Busca os hábitos personalizados
    const snapshotHabitosPersonalizados = await admin
      .firestore()
      .collection("habitos")
      .where("userId", "==",userId)
      .get()

    // Busca o grupo Personalizados
    const snapshotGrupoPersonalizado = await admin
      .firestore()
      .collection(`user/${userId}/gruposDeHabitos`)
      .where("nome", "==", "Personalizados")
      .limit(1)
      .get()
    let grupoPersonalizadoId: string
    if (snapshotGrupoPersonalizado.empty) {
      const grupoRef = await admin
      .firestore()
      .collection(`user/${userId}/gruposDeHabitos`)
      .add({ nome: "Personalizados", posicao: 1 })
      grupoPersonalizadoId = grupoRef.id
      functions.logger.info("personalizado adicionado", { grupoPersonalizadoId });
    } else {
      grupoPersonalizadoId = snapshotGrupoPersonalizado.docs[0].id
      functions.logger.info("personalizado econtrado", { grupoPersonalizadoId });
    }

    const habitos: Array<Habito> = []
    snapshotHabitosPersonalizados.forEach(habitoPersonalizadoSnap => {
      const habitoPersonalizado = habitoPersonalizadoSnap.data() as Habito
      habitoPersonalizado.id = habitoPersonalizadoSnap.id
      habitos.push(habitoPersonalizado)
    })
    for (const habitoPersonalizado of habitos) {
      const { userId, id, ...habitoData } = habitoPersonalizado
      const habitoQuerySnapshot = await admin
          .firestore()
          .collection(`user/${userId}/gruposDeHabitos/${grupoPersonalizadoId}/habitos`)
          .where("nome", "==", habitoPersonalizado.nome)
          .limit(1)
          .get();

        if (habitoQuerySnapshot.empty) {
          admin
            .firestore()
            .collection(`user/${userId}/gruposDeHabitos/${grupoPersonalizadoId}/habitos`)
            .doc(String(id))
            .set(habitoData);
            functions.logger.info("habito adicionado", { habitoPersonalizado, userId, grupoPersonalizadoId });
            updatedHabitos++
        } else {
          admin
            .firestore()
            .collection(`user/${userId}/gruposDeHabitos/${grupoPersonalizadoId}/habitos`)
            .doc(habitoQuerySnapshot.docs[0].id)
            .set(
              habitoData,
              {merge: true}
            );
            functions.logger.info("habito set merge: true", { habitoPersonalizado, userId, grupoPersonalizadoId });
            updatedHabitos++
        }
    }
  }

  response.send({ message: `Total de ${updatedHabitos} hábitos migrados, distribuídos para um total de ${usersId.length} usuários` });
});