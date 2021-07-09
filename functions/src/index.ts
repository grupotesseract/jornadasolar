/* eslint-disable quotes */

import {createGruposDeHabitosModelos} from "./createGruposDeHabitosModelos";
import {createSentimentosModelos} from "./createSentimentosModelos";
import {preencheGruposDeHabitosUsers} from "./preencheGruposDeHabitosUsers";
import {migrarHabitosPersonalizados} from "./migrarHabitosPersonalizados";
import * as admin from "firebase-admin";

admin.initializeApp();

export {
  migrarHabitosPersonalizados,
  createSentimentosModelos,
  createGruposDeHabitosModelos,
  preencheGruposDeHabitosUsers
}
