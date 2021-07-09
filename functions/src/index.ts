/* eslint-disable quotes */

import {createGruposDeHabitosModelos} from "./createGruposDeHabitosModelos";
import {createSentimentosModelos} from "./createSentimentosModelos";
import {preencheGruposDeHabitosUsers} from "./preencheGruposDeHabitosUsers";
import * as admin from "firebase-admin";

admin.initializeApp();

export {
  createSentimentosModelos,
  createGruposDeHabitosModelos,
  preencheGruposDeHabitosUsers
}
