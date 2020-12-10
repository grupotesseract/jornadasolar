import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  etapa: 1
}

const cadastroSlice = createSlice({
  name: 'cadastro',
  initialState,
  reducers: {
    avancoDeEtapaSolicitado: (state, action) => {
      state.etapa = action.payload
    }
  }
})

export const { avancoDeEtapaSolicitado } = cadastroSlice.actions

export default cadastroSlice.reducer
