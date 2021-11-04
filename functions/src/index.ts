/* eslint-disable quotes */
import { createGruposDeHabitosModelos } from "./createGruposDeHabitosModelos"
import { createSentimentosModelos } from "./createSentimentosModelos"
import { createGruposDeHabitosModelosTraduzidos } from "./createGruposDeHabitosModelosTraduzidos"
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
  createGruposDeHabitosModelosTraduzidos,
  createSentimentosModelosTraduzidos,
  preencheGruposDeHabitosUsers,
  preencheSentimentosUsuarios,
  migrarHabitosPersonalizados,
  migrarRegistrosHabitos,
  migrarRegistrosSentimentos
}
