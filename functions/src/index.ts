/* eslint-disable quotes */
import {createGruposDeHabitosModelos} from "./createGruposDeHabitosModelos";
import {createSentimentosModelos} from "./createSentimentosModelos";
import {preencheGruposDeHabitosUsers} from "./preencheGruposDeHabitosUsers";
import {preencheSentimentosUsuarios} from "./preencheSentimentosUsuarios"
import {migrarHabitosPersonalizados} from "./migrarHabitosPersonalizados";
import {migrarRegistrosHabitos} from "./migrarRegistrosHabitos";
import * as admin from "firebase-admin";

admin.initializeApp()

export {
  createGruposDeHabitosModelos, 
  createSentimentosModelos,
  preencheGruposDeHabitosUsers,
  preencheSentimentosUsuarios, 
  migrarHabitosPersonalizados,
  migrarRegistrosHabitos
}
