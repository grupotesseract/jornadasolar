
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GrupoDeHabitos } from "./types/GrupoDeHabitos";

/**
 * Função para alterar os registros de todos os hábitos
 * trocando o nome do hábito pelo id que ele possui na 
 * collection de modelos, tanto de hábitos como de grupos de hábitos
 */
export const migrarRegistrosHabitos = functions.https.onRequest(async (request, response) => {
  
  // Monta um array indexado pelo nome dos grupos e habitos
  // eslint-disable-next-line prefer-const
  let gruposIdByNome: Map<string, string> = new Map<string, string>()
  const habitosIdByNome: Map<string, string> = new Map<string, string>()
  const snapshotGruposModelo = await admin.firestore().collection("gruposDeHabitosModelos").get();
  if (snapshotGruposModelo.empty) {
    functions.logger.info("sem gruposDeHabitos", { snapshotGruposModelo });
    return 
  } 

  // monta aray de grupos
  snapshotGruposModelo.forEach(grupoModeloSnap => {
    const grupoModelo = grupoModeloSnap.data() as GrupoDeHabitos
    gruposIdByNome.set(grupoModelo.nome.toLowerCase(), grupoModeloSnap.id)
  })
  functions.logger.info("gruposIdByNome", gruposIdByNome);

  // monta array de habitos com base nos grupos
  for(const grupoModeloId of gruposIdByNome.values()) {
    const snapshotHabitosModelo = await admin
      .firestore()
      .collection(`gruposDeHabitosModelos/${grupoModeloId}/habitosModelos`)
      .get()
    snapshotHabitosModelo.forEach(habitoModeloSnap => {
      const habitoModelo = habitoModeloSnap.data()
      habitosIdByNome.set(habitoModelo.nome.toLowerCase(), habitoModeloSnap.id)
    })
  }
  functions.logger.info("habitosIdByNome", habitosIdByNome);

  
  // Passa por todos os registros
  const diarioCollection = admin.firestore().collection("diario")
  const snapshotDiario = await diarioCollection.get()
  snapshotDiario.forEach(diarioSnap => {
    const { id } = diarioSnap
    const diario = diarioSnap.data()
    const { gruposDeHabitos } = diario
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const novoGrupoDeHabitos = gruposDeHabitos.map((grupo : any) => {
      const { nome, habitos } = grupo
      const idGrupo = gruposIdByNome.get(nome.toLowerCase()) || ""
      if (!habitos || habitos.length === 0) {
        return {
          nome,
          id: idGrupo
        }
      }
      const novosHabitos = habitos?.map((habitoNome: string) => 
        habitosIdByNome.get(habitoNome.toLowerCase())
      )
      return {
        nome,
        id: idGrupo,
        habitos: novosHabitos
      }
    })
    functions.logger.info("novoGrupoDeHabitos", novoGrupoDeHabitos);
    // Atualiza no banco
    admin
      diarioCollection
      .doc(id)
      .set(
        { gruposDeHabitos: novoGrupoDeHabitos },
        {merge: true}
      );
  })
  

  response.send({ message: "grupos de hábitos e hábitos migrados", gruposIdByNome });

})