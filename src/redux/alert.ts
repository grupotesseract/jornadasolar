import { createSlice } from '@reduxjs/toolkit'
import { createdOrUpdated as createdOrUpdatedDiario } from './diario'

export enum AlertSeverity {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning'
}

const initialState = {
  severity: null,
  message: null,
  only: []
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    closed: state => {
      state.severity = initialState.severity
      state.message = initialState.message
      state.only = initialState.only
    }
  },
  extraReducers: builder => {
    builder.addCase(createdOrUpdatedDiario, state => {
      state.severity = AlertSeverity.Success
      state.message = 'Cadastro realizado com sucesso.'
      state.only = ['/diario/[date]']
    })
  }
})

export const { closed } = alertSlice.actions

export default alertSlice.reducer
