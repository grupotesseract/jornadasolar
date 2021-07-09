
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

type Habito = {
  nome: string;
  emojiUnicode: string | Array<string>;
  posicao: number;
}

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
      grupoModelo.habitos.push(habitoModelo)
    })
  }


  const usersCollection = admin.firestore().collection("users")
  const snapshotUsers = await usersCollection.get()
  snapshotUsers.forEach(async userSnap => {
    const userId = userSnap.id
    const snapshotGruposUser = await admin
      .firestore()
      .collection(`users/${userId}/gruposDeHabitos`)
      .get()
    if (snapshotGruposUser.empty) {
      const user = userSnap.data()
      functions.logger.info("user sem grupos", { user })
      gruposDeHabitos.forEach(async grupo => {
        const { habitos, ...grupoProps } = grupo
        const grupoRef = await usersCollection.doc(userId).collection("gruposDeHabitos").add(grupoProps)
        habitos.forEach((habito: Habito) => {
          admin
            .firestore()
            .collection(`users/${userId}/gruposDeHabitos/${grupoRef.id}/habitos`)
            .add(habito)
        })
      })
    }
  })

  response.send({ message: "grupos de hábitos adicionados", gruposDeHabitos });
});