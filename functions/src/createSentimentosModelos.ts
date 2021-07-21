import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const sentimentosTemplate = [
  {emojiUnicode: ["1F622"], nome: "Triste"},
  {emojiUnicode: ["1F603"], nome: "Alegre"},
  {emojiUnicode: ["1F630"], nome: "Amedrontado"},
  {emojiUnicode: ["1F609"], nome: "Seguro"},
  {emojiUnicode: ["1F621"], nome: "Irritado"},
  {emojiUnicode: ["1F642"], nome: "Pacífico"},
  {emojiUnicode: ["1F62A"], nome: "Cansado"},
  {emojiUnicode: ["1F929"], nome: "Motivado"},
  {emojiUnicode: ["1F613"], nome: "Culpado"},
  {emojiUnicode: ["1F60A"], nome: "Grato"},
  {emojiUnicode: ["1F614"], nome: "Desanimado"},
  {emojiUnicode: ["1F929"], nome: "Confiante"},
  {emojiUnicode: ["1F629"], nome: "Inseguro"},
  {emojiUnicode: ["1F970"], nome: "Amoroso"},
  {emojiUnicode: ["1F92F"], nome: "Ansioso"},
  {emojiUnicode: ["1F60C"], nome: "Calmo"}
];

export const createSentimentosModelos = functions.https.onRequest(
  (request, response) => {
    sentimentosTemplate.forEach(async element => {
      const {nome, emojiUnicode} = element;
      const querySnapshot = await admin
        .firestore()
        .collection("sentimentosModelos")
        .where("nome", "==", nome)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        admin
          .firestore()
          .collection("sentimentosModelos")
          .add({emojiUnicode, nome});
      } else {
        admin
          .firestore()
          .collection("sentimentosModelos")
          .doc(querySnapshot.docs[0].id)
          .set({emojiUnicode, nome}, {merge: true});
      }
    });

    functions.logger.info("createSentimentosModelos", {structuredData: true});
    response.send("sentimentos modelos criados");
  }
);
