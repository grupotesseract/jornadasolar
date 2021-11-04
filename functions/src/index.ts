/* eslint-disable quotes */
import { createGruposDeHabitosModelos } from "./createGruposDeHabitosModelos"
import { createSentimentosModelos } from "./createSentimentosModelos"
import { createSentimentosModelosTraduzidos } from "./createSentimentosModelosTraduzidos"
import { preencheGruposDeHabitosUsers } from "./preencheGruposDeHabitosUsers"
import { preencheSentimentosUsuarios } from "./preencheSentimentosUsuarios"
import { migrarHabitosPersonalizados } from "./migrarHabitosPersonalizados"
import { migrarRegistrosHabitos } from "./migrarRegistrosHabitos"
import { migrarRegistrosSentimentos } from "./migrarRegistrosSentimentos"
import * as admin from "firebase-admin"

admin.initializeApp()

export {
  createGruposDeHabitosModelos,
  createSentimentosModelos,
  createSentimentosModelosTraduzidos,
  preencheGruposDeHabitosUsers,
  preencheSentimentosUsuarios,
  migrarHabitosPersonalizados,
  migrarRegistrosHabitos,
  migrarRegistrosSentimentos
}
