import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { GrupoDeHabitos } from "./types/GrupoDeHabitos"
import { Habito } from "./types/Habito"
import { getIdIdiomaModelo } from "./utils/getIdIdiomaModelo"

export const createGruposDeHabitosModelosTraduzidos = functions.https.onRequest(
  async (request, response) => {
    const gruposAntigosPT = await getGruposAntigosPT()
    if (
      gruposAntigosPT.length &&
      gruposAntigosPT.some(grupo => grupo.habitos?.length)
    ) {
      const idIdioma = await getIdIdiomaModelo("pt")
      await insereGrupoDeHabitosIdioma(gruposAntigosPT, idIdioma)
      functions.logger.info("grupos de hábitos antigos copiados")
    }

    gruposDeHabitosTemplate.forEach(async element => {
      const { idioma, grupos } = element

      const idIdioma = await getIdIdiomaModelo(idioma)
      await insereGrupoDeHabitosIdioma(grupos, idIdioma)
      functions.logger.info(`grupos de hábitos criados no idioma ${idioma}`)
    })

    functions.logger.info("createGruposDeHabitosModelos", {
      structuredData: true,
    })
    response.send("createGruposDeHabitosModelos")
  }
)

const insereGrupoDeHabitosIdioma = (
  gruposDeHabitosTemplate: GrupoDeHabitos[],
  idIdioma: string
) => {
  const refCollectionGrupo = admin
    .firestore()
    .collection(`modelos/${idIdioma}/gruposDeHabitosModelos`)

  gruposDeHabitosTemplate.forEach(async (element: GrupoDeHabitos) => {
    const { nome, posicao, habitos, id } = element
    let grupoId: string | null = null
    if (id) {
      grupoId = id
      await refCollectionGrupo.doc(id).set(
        {
          nome,
          posicao,
        },
        { merge: true }
      )
    } else {
      const querySnapshot = await refCollectionGrupo
        .where("nome", "==", nome)
        .limit(1)
        .get()

      if (querySnapshot.empty) {
        const docRef = await refCollectionGrupo.add({
          nome,
          posicao,
        })
        grupoId = docRef.id
      } else {
        grupoId = querySnapshot.docs[0].id
        await refCollectionGrupo.doc(grupoId).set(
          {
            nome,
            posicao,
          },
          { merge: true }
        )
      }
    }

    habitos?.forEach(async (habito: Habito) => {
      const refCollectionHabitos = admin
        .firestore()
        .collection(
          `modelos/${idIdioma}/gruposDeHabitosModelos/${grupoId}/habitosModelos`
        )

      const { nome, emojiUnicode, posicao, id } = habito
      if (id) {
        refCollectionHabitos.doc(id).set(
          {
            nome,
            emojiUnicode,
            posicao,
          },
          { merge: true }
        )
      } else {
        const habitoQuerySnapshot = await refCollectionHabitos
          .where("nome", "==", habito.nome)
          .limit(1)
          .get()

        if (habitoQuerySnapshot.empty) {
          refCollectionHabitos.add({
            nome,
            emojiUnicode,
            posicao,
          })
        } else {
          refCollectionHabitos.doc(habitoQuerySnapshot.docs[0].id).set(
            {
              nome,
              emojiUnicode,
              posicao,
            },
            { merge: true }
          )
        }
      }
    })
  })
}

const getGruposAntigosPT = async (): Promise<GrupoDeHabitos[]> => {
  const refCollectionGrupo = admin
    .firestore()
    .collection("gruposDeHabitosModelos")

  const querySnapshot = await refCollectionGrupo.get()

  const gruposDeHabitosModelos: GrupoDeHabitos[] = []

  querySnapshot.forEach(grupoDeHabitoModelo => {
    const grupoDeHabitosModeloData = grupoDeHabitoModelo.data()

    const grupoDeHabitosModelo = {
      id: grupoDeHabitoModelo.id,
      nome: grupoDeHabitosModeloData.nome,
      posicao: grupoDeHabitosModeloData.posicao,
    }

    gruposDeHabitosModelos.push(grupoDeHabitosModelo)
  })

  for (let index = 0; index < gruposDeHabitosModelos.length; index++) {
    const grupoDeHabitosModelo = gruposDeHabitosModelos[index]

    const habitos = await getHabitosModelos(grupoDeHabitosModelo.id)
    grupoDeHabitosModelo.habitos = habitos
  }

  return gruposDeHabitosModelos
}

const getHabitosModelos = async (
  grupoDeHabitoId?: string
): Promise<Habito[]> => {
  try {
    const habitosModelosSnapshot = await admin
      .firestore()
      .collection(`gruposDeHabitosModelos/${grupoDeHabitoId}/habitosModelos`)
      .get()
    const habitos: Habito[] = []
    habitosModelosSnapshot.forEach(
      (habitoModelo: FirebaseFirestore.DocumentData) => {
        const habitoModeloData = habitoModelo.data()
        const habito = {
          id: habitoModelo.id,
          nome: habitoModeloData.nome,
          emojiUnicode: habitoModeloData.emojiUnicode,
          posicao: habitoModeloData.posicao,
        }

        habitos.push(habito)
      }
    )

    return habitos
  } catch (e) {
    return []
  }
}

const gruposDeHabitosTemplate = [
  {
    idioma: "pt",
    grupos: [
      {
        nome: "Personalizados",
        posicao: 1,
      },
      {
        nome: "Social",
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
          { emojiUnicode: ["1F468"], nome: "Sozinho", posicao: 3 },
          { emojiUnicode: ["1F57A"], nome: "Encontro casual", posicao: 4 },
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
          { emojiUnicode: ["1F4F1"], nome: "Digital", posicao: 6 },
        ],
      },
      {
        nome: "Lazer",
        posicao: 3,
        habitos: [
          { emojiUnicode: ["2708", "FE0F"], nome: "Viagem", posicao: 1 },
          { emojiUnicode: ["1F3A5"], nome: "Filmes/séries", posicao: 2 },
          { emojiUnicode: ["1F4DA"], nome: "Leitura", posicao: 3 },
          { emojiUnicode: ["1F3AE"], nome: "Jogos", posicao: 4 },
          { emojiUnicode: ["2600", "FE0F"], nome: "Ar livre", posicao: 5 },
          { emojiUnicode: ["1F60D"], nome: "Hobby", posicao: 6 },
        ],
      },
      {
        nome: "Atividade física",
        posicao: 4,
        habitos: [
          { emojiUnicode: ["1F636"], nome: "Nada", posicao: 1 },
          { emojiUnicode: ["1F6B6"], nome: "Caminhada", posicao: 2 },
          { emojiUnicode: ["1F3C3"], nome: "Esporte", posicao: 3 },
          {
            emojiUnicode: ["1F646", "200D", "2642", "FE0F"],
            nome: "Alongamentos",
            posicao: 4,
          },
          { emojiUnicode: ["1F4AA"], nome: "Treino intenso", posicao: 5 },
          { emojiUnicode: ["1F635"], nome: "Lesionado", posicao: 6 },
        ],
      },
      {
        nome: "Sono",
        posicao: 5,
        habitos: [
          { emojiUnicode: ["1F634"], nome: "Dormi cedo", posicao: 1 },
          { emojiUnicode: ["1F62A"], nome: "Dormi tarde", posicao: 2 },
          { emojiUnicode: ["1F60C"], nome: "Dormi bem", posicao: 3 },
          { emojiUnicode: ["1F441", "FE0F"], nome: "Insônia", posicao: 4 },
          { emojiUnicode: ["1F4AD"], nome: "Sonho", posicao: 5 },
          { emojiUnicode: ["1F616"], nome: "Pesadelo", posicao: 6 },
        ],
      },
      {
        nome: "Alimentação",
        posicao: 6,
        habitos: [
          { emojiUnicode: ["1F951"], nome: "Caseira", posicao: 1 },
          { emojiUnicode: ["1F35F"], nome: "Fast food", posicao: 2 },
          { emojiUnicode: ["1F35D"], nome: "Restaurante", posicao: 3 },
          { emojiUnicode: ["1F357"], nome: "Carne", posicao: 4 },
          { emojiUnicode: ["1F922"], nome: "Exagerei", posicao: 5 },
          { emojiUnicode: ["1F966"], nome: "Comida leve", posicao: 6 },
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
          { emojiUnicode: ["1F48A"], nome: "Remédios", posicao: 2 },
          { emojiUnicode: ["1F6B0"], nome: "Água", posicao: 3 },
          { emojiUnicode: ["1F9D8"], nome: "Terapia", posicao: 4 },
          { emojiUnicode: ["2615"], nome: "Chás", posicao: 5 },
          { emojiUnicode: ["1F343"], nome: "Florais", posicao: 6 },
        ],
      },
      {
        nome: "Profissional",
        posicao: 8,
        habitos: [
          { emojiUnicode: ["1F4D3"], nome: "Estudos", posicao: 1 },
          { emojiUnicode: ["1F642"], nome: "Trabalho leve", posicao: 2 },
          { emojiUnicode: ["1F61F"], nome: "Pressão/tensão", posicao: 3 },
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
          { emojiUnicode: ["1F61E"], nome: "Procrastinei", posicao: 6 },
        ],
      },
      {
        nome: "Tarefa",
        posicao: 9,
        habitos: [
          { emojiUnicode: ["1F9F9"], nome: "Faxina", posicao: 1 },
          { emojiUnicode: ["1F6A7"], nome: "Reforma", posicao: 2 },
          { emojiUnicode: ["1F6D2"], nome: "Compras", posicao: 3 },
          { emojiUnicode: ["1F4B2"], nome: "Finanças", posicao: 4 },
          { emojiUnicode: ["1F9FC"], nome: "Lavar roupa", posicao: 5 },
          {
            emojiUnicode: ["1F468", "200D", "1F373"],
            nome: "Cozinhar",
            posicao: 6,
          },
        ],
      },
      {
        nome: "Sexo",
        posicao: 10,
        habitos: [
          { emojiUnicode: ["1F590", "FE0F"], nome: "Masturbação", posicao: 1 },
          { emojiUnicode: ["1F34C"], nome: "Usei proteção", posicao: 2 },
          { emojiUnicode: ["1F57A"], nome: "Casual", posicao: 3 },
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
          { emojiUnicode: ["1F525"], nome: "Com tesão", posicao: 5 },
          { emojiUnicode: ["1F4A6"], nome: "Ejaculei", posicao: 6 },
        ],
      },
      {
        nome: "Vício",
        posicao: 11,
        habitos: [
          { emojiUnicode: ["1F6AC"], nome: "Cigarro", posicao: 1 },
          { emojiUnicode: ["1F377"], nome: "Álcool", posicao: 2 },
          { emojiUnicode: ["1F489"], nome: "Entorpecente", posicao: 3 },
          { emojiUnicode: ["1F51E"], nome: "Pornografia", posicao: 4 },
          { emojiUnicode: ["1F3AE"], nome: "Jogos", posicao: 5 },
          { emojiUnicode: ["1F4F1"], nome: "Rede Social", posicao: 6 },
        ],
      },
    ],
  },
  {
    idioma: "en",
    grupos: [
      {
        nome: "Personalized",
        posicao: 1,
      },
      {
        nome: "Social",
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
            nome: "Family",
            posicao: 1,
          },
          {
            emojiUnicode: ["1F9D1", "200D", "1F91D", "200D", "1F9D1"],
            nome: "Friends",
            posicao: 2,
          },
          { emojiUnicode: ["1F468"], nome: "Alone", posicao: 3 },
          { emojiUnicode: ["1F57A"], nome: "Casual Encounter", posicao: 4 },
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
            nome: "Partner",
            posicao: 5,
          },
          { emojiUnicode: ["1F4F1"], nome: "Digital", posicao: 6 },
        ],
      },
      {
        nome: "Leisure",
        posicao: 3,
        habitos: [
          { emojiUnicode: ["2708", "FE0F"], nome: "Travel", posicao: 1 },
          { emojiUnicode: ["1F3A5"], nome: "Movies/TV Shows", posicao: 2 },
          { emojiUnicode: ["1F4DA"], nome: "Reading", posicao: 3 },
          { emojiUnicode: ["1F3AE"], nome: "Games", posicao: 4 },
          { emojiUnicode: ["2600", "FE0F"], nome: "Outdoor", posicao: 5 },
          { emojiUnicode: ["1F60D"], nome: "Hobby", posicao: 6 },
        ],
      },
      {
        nome: "Physical activity",
        posicao: 4,
        habitos: [
          { emojiUnicode: ["1F636"], nome: "Nothing", posicao: 1 },
          { emojiUnicode: ["1F6B6"], nome: "Walking", posicao: 2 },
          { emojiUnicode: ["1F3C3"], nome: "Sport", posicao: 3 },
          {
            emojiUnicode: ["1F646", "200D", "2642", "FE0F"],
            nome: "Stretching",
            posicao: 4,
          },
          { emojiUnicode: ["1F4AA"], nome: "Intense training", posicao: 5 },
          { emojiUnicode: ["1F635"], nome: "Injured", posicao: 6 },
        ],
      },
      {
        nome: "Sleep",
        posicao: 5,
        habitos: [
          { emojiUnicode: ["1F634"], nome: "Slept early", posicao: 1 },
          { emojiUnicode: ["1F62A"], nome: "Slept late", posicao: 2 },
          { emojiUnicode: ["1F60C"], nome: "Slept well", posicao: 3 },
          { emojiUnicode: ["1F441", "FE0F"], nome: "Insomnia", posicao: 4 },
          { emojiUnicode: ["1F4AD"], nome: "Dream", posicao: 5 },
          { emojiUnicode: ["1F616"], nome: "Nightmare", posicao: 6 },
        ],
      },
      {
        nome: "Food",
        posicao: 6,
        habitos: [
          { emojiUnicode: ["1F951"], nome: "Homemade", posicao: 1 },
          { emojiUnicode: ["1F35F"], nome: "Fast food", posicao: 2 },
          { emojiUnicode: ["1F35D"], nome: "Restaurant", posicao: 3 },
          { emojiUnicode: ["1F357"], nome: "Meat", posicao: 4 },
          { emojiUnicode: ["1F922"], nome: "Ate too much", posicao: 5 },
          { emojiUnicode: ["1F966"], nome: "Light Food", posicao: 6 },
        ],
      },
      {
        nome: "Health",
        posicao: 7,
        habitos: [
          {
            emojiUnicode: ["1F468", "200D", "2695", "FE0F"],
            nome: "Doctor",
            posicao: 1,
          },
          { emojiUnicode: ["1F48A"], nome: "Medication", posicao: 2 },
          { emojiUnicode: ["1F6B0"], nome: "Water", posicao: 3 },
          { emojiUnicode: ["1F9D8"], nome: "Therapy", posicao: 4 },
          { emojiUnicode: ["2615"], nome: "Teas", posicao: 5 },
          { emojiUnicode: ["1F343"], nome: "Flowers", posicao: 6 },
        ],
      },
      {
        nome: "Professional",
        posicao: 8,
        habitos: [
          { emojiUnicode: ["1F4D3"], nome: "Studies", posicao: 1 },
          { emojiUnicode: ["1F642"], nome: "Light work", posicao: 2 },
          { emojiUnicode: ["1F61F"], nome: "Pressure/Tension", posicao: 3 },
          {
            emojiUnicode: ["1F64B", "200D", "2642", "FE0F"],
            nome: "Volunteering",
            posicao: 4,
          },
          {
            emojiUnicode: ["1F9B8", "200D", "2642", "FE0F"],
            nome: "Workaholic",
            posicao: 5,
          },
          { emojiUnicode: ["1F61E"], nome: "Procrastinated", posicao: 6 },
        ],
      },
      {
        nome: "Chores",
        posicao: 9,
        habitos: [
          { emojiUnicode: ["1F9F9"], nome: "Cleaning", posicao: 1 },
          { emojiUnicode: ["1F6A7"], nome: "Renovation", posicao: 2 },
          { emojiUnicode: ["1F6D2"], nome: "Shopping", posicao: 3 },
          { emojiUnicode: ["1F4B2"], nome: "Finance", posicao: 4 },
          { emojiUnicode: ["1F9FC"], nome: "Laundry", posicao: 5 },
          {
            emojiUnicode: ["1F468", "200D", "1F373"],
            nome: "Cooking",
            posicao: 6,
          },
        ],
      },
      {
        nome: "Sex",
        posicao: 10,
        habitos: [
          { emojiUnicode: ["1F590", "FE0F"], nome: "Masturbation", posicao: 1 },
          { emojiUnicode: ["1F34C"], nome: "Used Protection", posicao: 2 },
          { emojiUnicode: ["1F57A"], nome: "Casual", posicao: 3 },
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
            nome: "Partner",
            posicao: 4,
          },
          { emojiUnicode: ["1F525"], nome: "Horny", posicao: 5 },
          { emojiUnicode: ["1F4A6"], nome: "Ejaculated", posicao: 6 },
        ],
      },
      {
        nome: "Addiction",
        posicao: 11,
        habitos: [
          { emojiUnicode: ["1F6AC"], nome: "Cigarette", posicao: 1 },
          { emojiUnicode: ["1F377"], nome: "Alcohol", posicao: 2 },
          { emojiUnicode: ["1F489"], nome: "Narcotic", posicao: 3 },
          { emojiUnicode: ["1F51E"], nome: "Pornography", posicao: 4 },
          { emojiUnicode: ["1F3AE"], nome: "Games", posicao: 5 },
          { emojiUnicode: ["1F4F1"], nome: "Social Networking", posicao: 6 },
        ],
      },
    ],
  },
  {
    idioma: "es",
    grupos: [
      {
        nome: "Personalizado",
        posicao: 1,
      },
      {
        nome: "Social",
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
            nome: "Familia",
            posicao: 1,
          },
          {
            emojiUnicode: ["1F9D1", "200D", "1F91D", "200D", "1F9D1"],
            nome: "Amigos",
            posicao: 2,
          },
          { emojiUnicode: ["1F468"], nome: "Solo", posicao: 3 },
          { emojiUnicode: ["1F57A"], nome: "Encuentro casual", posicao: 4 },
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
            nome: "Compañer@",
            posicao: 5,
          },
          { emojiUnicode: ["1F4F1"], nome: "Digital", posicao: 6 },
        ],
      },
      {
        nome: "Ocio",
        posicao: 3,
        habitos: [
          { emojiUnicode: ["2708", "FE0F"], nome: "Viajes", posicao: 1 },
          { emojiUnicode: ["1F3A5"], nome: "Películas/Series", posicao: 2 },
          { emojiUnicode: ["1F4DA"], nome: "Lectura", posicao: 3 },
          { emojiUnicode: ["1F3AE"], nome: "Juegos", posicao: 4 },
          { emojiUnicode: ["2600", "FE0F"], nome: "Al aire libre", posicao: 5 },
          { emojiUnicode: ["1F60D"], nome: "Afición", posicao: 6 },
        ],
      },
      {
        nome: "Actividad física",
        posicao: 4,
        habitos: [
          { emojiUnicode: ["1F636"], nome: "Nada", posicao: 1 },
          { emojiUnicode: ["1F6B6"], nome: "Caminar", posicao: 2 },
          { emojiUnicode: ["1F3C3"], nome: "Deporte", posicao: 3 },
          {
            emojiUnicode: ["1F646", "200D", "2642", "FE0F"],
            nome: "Estiramiento",
            posicao: 4,
          },
          {
            emojiUnicode: ["1F4AA"],
            nome: "Entrenamiento intenso",
            posicao: 5,
          },
          { emojiUnicode: ["1F635"], nome: "Lesionado", posicao: 6 },
        ],
      },
      {
        nome: "Dormir",
        posicao: 5,
        habitos: [
          { emojiUnicode: ["1F634"], nome: "Durmió temprano", posicao: 1 },
          { emojiUnicode: ["1F62A"], nome: "Dormido hasta tarde", posicao: 2 },
          { emojiUnicode: ["1F60C"], nome: "Dormir bien", posicao: 3 },
          { emojiUnicode: ["1F441", "FE0F"], nome: "Insomnio", posicao: 4 },
          { emojiUnicode: ["1F4AD"], nome: "Sueño", posicao: 5 },
          { emojiUnicode: ["1F616"], nome: "Pesadilla", posicao: 6 },
        ],
      },
      {
        nome: "Comida",
        posicao: 6,
        habitos: [
          { emojiUnicode: ["1F951"], nome: "Casero", posicao: 1 },
          { emojiUnicode: ["1F35F"], nome: "Fast food", posicao: 2 },
          { emojiUnicode: ["1F35D"], nome: "Restaurante", posicao: 3 },
          { emojiUnicode: ["1F357"], nome: "Carne", posicao: 4 },
          { emojiUnicode: ["1F922"], nome: "Exageré", posicao: 5 },
          { emojiUnicode: ["1F966"], nome: "Comida ligera", posicao: 6 },
        ],
      },
      {
        nome: "Salud",
        posicao: 7,
        habitos: [
          {
            emojiUnicode: ["1F468", "200D", "2695", "FE0F"],
            nome: "Médico",
            posicao: 1,
          },
          { emojiUnicode: ["1F48A"], nome: "Medicamento", posicao: 2 },
          { emojiUnicode: ["1F6B0"], nome: "Agua", posicao: 3 },
          { emojiUnicode: ["1F9D8"], nome: "Terapia", posicao: 4 },
          { emojiUnicode: ["2615"], nome: "Tés", posicao: 5 },
          { emojiUnicode: ["1F343"], nome: "Florales", posicao: 6 },
        ],
      },
      {
        nome: "Profesional",
        posicao: 8,
        habitos: [
          { emojiUnicode: ["1F4D3"], nome: "Estudios", posicao: 1 },
          { emojiUnicode: ["1F642"], nome: "Trabajo ligero", posicao: 2 },
          { emojiUnicode: ["1F61F"], nome: "Presión/Tensión", posicao: 3 },
          {
            emojiUnicode: ["1F64B", "200D", "2642", "FE0F"],
            nome: "Voluntariado",
            posicao: 4,
          },
          {
            emojiUnicode: ["1F9B8", "200D", "2642", "FE0F"],
            nome: "Adicto al trabajo",
            posicao: 5,
          },
          { emojiUnicode: ["1F61E"], nome: "Procrastinación", posicao: 6 },
        ],
      },
      {
        nome: "Tareas",
        posicao: 9,
        habitos: [
          { emojiUnicode: ["1F9F9"], nome: "Limpieza", posicao: 1 },
          { emojiUnicode: ["1F6A7"], nome: "Renovación", posicao: 2 },
          { emojiUnicode: ["1F6D2"], nome: "Compras", posicao: 3 },
          { emojiUnicode: ["1F4B2"], nome: "Finanzas", posicao: 4 },
          { emojiUnicode: ["1F9FC"], nome: "Lavandería", posicao: 5 },
          {
            emojiUnicode: ["1F468", "200D", "1F373"],
            nome: "Cocinar",
            posicao: 6,
          },
        ],
      },
      {
        nome: "Sexo",
        posicao: 10,
        habitos: [
          { emojiUnicode: ["1F590", "FE0F"], nome: "Masturbación", posicao: 1 },
          { emojiUnicode: ["1F34C"], nome: "Usé protección", posicao: 2 },
          { emojiUnicode: ["1F57A"], nome: "Casual", posicao: 3 },
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
            nome: "Pareja",
            posicao: 4,
          },
          { emojiUnicode: ["1F525"], nome: "Caliente", posicao: 5 },
          { emojiUnicode: ["1F4A6"], nome: "Eyaculado", posicao: 6 },
        ],
      },
      {
        nome: "Adicción",
        posicao: 11,
        habitos: [
          { emojiUnicode: ["1F6AC"], nome: "Cigarrillo", posicao: 1 },
          { emojiUnicode: ["1F377"], nome: "Alcohol", posicao: 2 },
          { emojiUnicode: ["1F489"], nome: "Narcóticos", posicao: 3 },
          { emojiUnicode: ["1F51E"], nome: "Pornografía", posicao: 4 },
          { emojiUnicode: ["1F3AE"], nome: "Juegos", posicao: 5 },
          { emojiUnicode: ["1F4F1"], nome: "Redes sociales", posicao: 6 },
        ],
      },
    ],
  },
]
