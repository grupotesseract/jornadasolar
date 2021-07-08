/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const gruposDeHabitosTemplate = [
  {
    nome: "Personalizados",
    posicao: 1,
  },
  {
    nome: "social",
    posicao: 2,
    habitos: [
      {
        emojiUnicode: [
          "1F468",
          "200D",
          "1F468",
          "200D",
          "1F466",
          "200D",
          "1F466",
        ],
        nome: "Família",
        posicao: 1,
      },
      {
        emojiUnicode: ["1F9D1", "200D", "1F91D", "200D", "1F9D1"],
        nome: "Amigos",
        posicao: 2,
      },
      {emojiUnicode: ["1F468"], nome: "Sozinho", posicao: 3},
      {emojiUnicode: ["1F57A"], nome: "Encontro casual", posicao: 4},
      {
        emojiUnicode: [
          "1F469",
          "200D",
          "2764",
          "FE0F",
          "200D",
          "1F468",
          "1F468",
          "200D",
          "2764",
          "FE0F",
          "200D",
          "1F468",
        ],
        nome: "Companheir@",
        posicao: 5,
      },
      {emojiUnicode: ["1F4F1"], nome: "Digital", posicao: 6},
    ],
  },
  {
    nome: "Lazer",
    posicao: 3,
    habitos: [
      {emojiUnicode: ["2708", "FE0F"], nome: "Viagem", posicao: 1},
      {emojiUnicode: ["1F3A5"], nome: "Fimes/séries", posicao: 2},
      {emojiUnicode: ["1F4DA"], nome: "Leitura", posicao: 3},
      {emojiUnicode: ["1F3AE"], nome: "Jogos", posicao: 4},
      {emojiUnicode: ["2600", "FE0F"], nome: "Ar livre", posicao: 5},
      {emojiUnicode: ["1F60D"], nome: "Hobby", posicao: 6},
    ],
  },
  {
    nome: "Atividade física",
    posicao: 4,
    habitos: [
      {emojiUnicode: ["1F636"], nome: "Nada", posicao: 1},
      {emojiUnicode: ["1F6B6"], nome: "Caminhada", posicao: 2},
      {emojiUnicode: ["1F3C3"], nome: "Esporte", posicao: 3},
      {
        emojiUnicode: ["1F646", "200D", "2642", "FE0F"],
        nome: "Alongamentos",
        posicao: 4,
      },
      {emojiUnicode: ["1F4AA"], nome: "Treino intenso", posicao: 5},
      {emojiUnicode: ["1F635"], nome: "Lesionado", posicao: 6},
    ],
  },
  {
    nome: "sono",
    posicao: 5,
    habitos: [
      {emojiUnicode: ["1F634"], nome: "Dormi cedo", posicao: 1},
      {emojiUnicode: ["1F62A"], nome: "Dormi tarde", posicao: 2},
      {emojiUnicode: ["1F60C"], nome: "Dormi bem", posicao: 3},
      {emojiUnicode: ["1F441", "FE0F"], nome: "Insônia", posicao: 4},
      {emojiUnicode: ["1F4AD"], nome: "Sonho", posicao: 5},
      {emojiUnicode: ["1F616"], nome: "Pesadelo", posicao: 6},
    ],
  },
  {
    nome: "Alimentação",
    posicao: 6,
    habitos: [
      {emojiUnicode: ["1F951"], nome: "Caseira", posicao: 1},
      {emojiUnicode: ["1F35F"], nome: "Fast food", posicao: 2},
      {emojiUnicode: ["1F35D"], nome: "Restaurante", posicao: 3},
      {emojiUnicode: ["1F357"], nome: "Carne", posicao: 4},
      {emojiUnicode: ["1F922"], nome: "Exagerei", posicao: 5},
      {emojiUnicode: ["1F966"], nome: "Comida leve", posicao: 6},
    ],
  },
  {
    nome: "Saúde",
    posicao: 7,
    habitos: [
      {
        emojiUnicode: ["1F468", "200D", "2695", "FE0F"],
        nome: "Médico",
        posicao: 1,
      },
      {emojiUnicode: ["1F48A"], nome: "Remédios", posicao: 2},
      {emojiUnicode: ["1F6B0"], nome: "Água", posicao: 3},
      {emojiUnicode: ["1F9D8"], nome: "Terapia", posicao: 4},
      {emojiUnicode: ["2615"], nome: "Chás", posicao: 5},
      {emojiUnicode: ["1F343"], nome: "Florais", posicao: 6},
    ],
  },
  {
    nome: "Profissional",
    posicao: 8,
    habitos: [
      {emojiUnicode: ["1F4D3"], nome: "Estudos", posicao: 1},
      {emojiUnicode: ["1F642"], nome: "Trabalho leve", posicao: 2},
      {emojiUnicode: ["1F61F"], nome: "Pressão/tensão", posicao: 3},
      {
        emojiUnicode: ["1F64B", "200D", "2642", "FE0F"],
        nome: "Voluntariado",
        posicao: 4,
      },
      {
        emojiUnicode: ["1F9B8", "200D", "2642", "FE0F"],
        nome: "Workaholic",
        posicao: 5,
      },
      {emojiUnicode: ["1F61E"], nome: "Procrastinei", posicao: 6},
    ],
  },
  {
    nome: "Tarefa",
    posicao: 9,
    habitos: [
      {emojiUnicode: ["1F9F9"], nome: "Faxina", posicao: 1},
      {emojiUnicode: ["1F6A7"], nome: "Reforma", posicao: 2},
      {emojiUnicode: ["1F6D2"], nome: "Compras", posicao: 3},
      {emojiUnicode: ["1F4B2"], nome: "Finanças", posicao: 4},
      {emojiUnicode: ["1F9FC"], nome: "Lavar roupa", posicao: 5},
      {emojiUnicode: ["1F468", "200D", "1F373"], nome: "Cozinhar", posicao: 6},
    ],
  },
  {
    nome: "Sexo",
    posicao: 10,
    habitos: [
      {emojiUnicode: ["1F590", "FE0F"], nome: "Masturbação", posicao: 1},
      {emojiUnicode: ["1F34C"], nome: "Usei proteção", posicao: 2},
      {emojiUnicode: ["1F57A"], nome: "Casual", posicao: 3},
      {
        emojiUnicode: [
          "1F469",
          "200D",
          "2764",
          "FE0F",
          "200D",
          "1F468",
          "1F468",
          "200D",
          "2764",
          "FE0F",
          "200D",
          "1F468",
        ],
        nome: "Companheir@",
        posicao: 4,
      },
      {emojiUnicode: ["1F525"], nome: "Com tesão", posicao: 5},
      {emojiUnicode: ["1F4A6"], nome: "Ejaculei", posicao: 6},
    ],
  },
  {
    nome: "Vício",
    posicao: 11,
    habitos: [
      {emojiUnicode: ["1F6AC"], nome: "Cigarro", posicao: 1},
      {emojiUnicode: ["1F377"], nome: "Álcool", posicao: 2},
      {emojiUnicode: ["1F489"], nome: "Entorpecente", posicao: 3},
      {emojiUnicode: ["1F51E"], nome: "Pornografia", posicao: 4},
      {emojiUnicode: ["1F3AE"], nome: "Jogos", posicao: 5},
      {emojiUnicode: ["1F4F1"], nome: "Rede Social", posicao: 6},
    ],
  },
];

export const createGruposDeHabitosModelos = functions.https.onRequest(
  (request, response) => {
    gruposDeHabitosTemplate.forEach(async element => {
      const {nome, posicao, habitos} = element;
      const querySnapshot = await admin
        .firestore()
        .collection("gruposDeHabitosModelos")
        .where("nome", "==", nome)
        .limit(1)
        .get();
      let grupoId: string | null = null;

      if (querySnapshot.empty) {
        const docRef = await admin
          .firestore()
          .collection("gruposDeHabitosModelos")
          .add({
            nome,
            posicao,
          });
        grupoId = docRef.id;
      } else {
        grupoId = querySnapshot.docs[0].id;
        await admin
          .firestore()
          .collection("gruposDeHabitosModelos")
          .doc(grupoId)
          .set(
            {
              nome,
              posicao,
            },
            {merge: true}
          );
      }

      habitos?.forEach(async habito => {
        const habitoQuerySnapshot = await admin
          .firestore()
          .collection(`gruposDeHabitosModelos/${grupoId}/habitosModelos`)
          .where("nome", "==", habito.nome)
          .limit(1)
          .get();

        if (habitoQuerySnapshot.empty) {
          admin
            .firestore()
            .collection(`gruposDeHabitosModelos/${grupoId}/habitosModelos`)
            .add({
              nome: habito.nome,
              emojiUnicode: habito.emojiUnicode,
              posicao: habito.posicao,
            });
        } else {
          admin
            .firestore()
            .collection(`gruposDeHabitosModelos/${grupoId}/habitosModelos`)
            .doc(habitoQuerySnapshot.docs[0].id)
            .set(
              {
                nome: habito.nome,
                emojiUnicode: habito.emojiUnicode,
                posicao: habito.posicao,
              },
              {merge: true}
            );
        }
      });
    });

    functions.logger.info("createGruposDeHabitosModelos", {
      structuredData: true,
    });
    response.send("createGruposDeHabitosModelos");
  }
);
