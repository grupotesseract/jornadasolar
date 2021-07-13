/* eslint-disable quotes */

import { createGruposDeHabitosModelos } from "./createGruposDeHabitosModelos"
import { createSentimentosModelos } from "./createSentimentosModelos"
import * as admin from "firebase-admin"
import { preencheSentimentosUsuarios } from "./preencheSentimentosUsuarios"

admin.initializeApp()

export {
  createSentimentosModelos,
  createGruposDeHabitosModelos,
  preencheSentimentosUsuarios
}
