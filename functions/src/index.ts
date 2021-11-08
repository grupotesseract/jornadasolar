import { createGruposDeHabitosModelos } from "./createGruposDeHabitosModelos"
import { createSentimentosModelos } from "./createSentimentosModelos"
import { preencheGruposDeHabitosUsers } from "./preencheGruposDeHabitosUsers"
import { preencheSentimentosUsuarios } from "./preencheSentimentosUsuarios"
import { migrarHabitosPersonalizados } from "./migrarHabitosPersonalizados"
import { migrarRegistrosHabitos } from "./migrarRegistrosHabitos"
import { migrarRegistrosSentimentos } from "./migrarRegistrosSentimentos"
import { createCanaisNotificacao } from "./createCanaisNotificacao"
import { notificaNovaMeditacao } from "./notificaNovaMeditacao"
import * as admin from "firebase-admin"

admin.initializeApp()

export {
  createGruposDeHabitosModelos,
  createSentimentosModelos,
  preencheGruposDeHabitosUsers,
  preencheSentimentosUsuarios,
  migrarHabitosPersonalizados,
  migrarRegistrosHabitos,
  migrarRegistrosSentimentos,
  createCanaisNotificacao,
  notificaNovaMeditacao
}
