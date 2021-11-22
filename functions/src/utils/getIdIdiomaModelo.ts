import * as admin from "firebase-admin"

export const getIdIdiomaModelo = async (idioma: string): Promise<string> => {
  const snap = await admin
    .firestore()
    .collection("modelos")
    .where("idioma", "==", idioma)
    .limit(1)
    .get()

  if (snap.empty) {
    const novoIdioma = await admin
      .firestore()
      .collection("modelos")
      .add({ idioma })
    return novoIdioma.id
  } else {
    return snap.docs[0].id
  }
}
