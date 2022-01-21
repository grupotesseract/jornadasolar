import { Habito } from "./Habito";

export type GrupoDeHabitos = {
  id?: string;
  nome: string;
  posicao?: number;
  habitos?: Array<Habito>;
  habitosModelo?: Array<Habito>;
};
