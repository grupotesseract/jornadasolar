import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  etapa: 1,
  nome: '',
  objetivos: [],
  sentimentos: [],
  gruposDeHabitos: []
}

const cadastroSlice = createSlice({
  name: 'cadastro',
  initialState,
  reducers: {
    avancoParaEtapa2Solicitado: (state, action) => {
      state.etapa = 2
      state.nome = action.payload.nome
    },
    avancoParaEtapa3Solicitado: (state, action) => {
      state.etapa = 3
      state.objetivos = action.payload.objetivos
    },
    avancoParaEtapa4Solicitado: (state, action) => {
      state.etapa = 4
      state.sentimentos = action.payload.sentimentos
    },
    avancoParaEtapa5Solicitado: (state, action) => {
      state.etapa = 5
      state.gruposDeHabitos = action.payload.gruposDeHabitos
    }
  }
})

export const {
  avancoParaEtapa2Solicitado,
  avancoParaEtapa3Solicitado,
  avancoParaEtapa4Solicitado,
  avancoParaEtapa5Solicitado
} = cadastroSlice.actions

export default cadastroSlice.reducer
