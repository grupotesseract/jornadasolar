/* eslint-disable quotes */

import {createGruposDeHabitosModelos} from "./createGruposDeHabitosModelos";
import {createSentimentosModelos} from "./createSentimentosModelos";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.createGruposDeHabitosModelos = createGruposDeHabitosModelos;
exports.createSentimentosModelos = createSentimentosModelos;
