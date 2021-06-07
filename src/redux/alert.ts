import { createSlice } from '@reduxjs/toolkit'
import { createdOrUpdated as createdOrUpdatedDiario } from './diario'
import { redefinirSenha } from './auth'
import {
  createdOrUpdated as createdOrUpdatedMeditacao,
  deleteMeditacao
} from './admin/meditacoes'

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
    builder
      .addCase(createdOrUpdatedDiario, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Cadastro realizado com sucesso.'
        state.only = ['/app/diario/[date]']
      })
      .addCase(redefinirSenha, state => {
        state.severity = AlertSeverity.Success
        state.message =
          'Senha alterada com sucesso! Você já pode efetuar o login utilizando sua nova senha.'
        state.only = ['/login']
      })
      .addCase(createdOrUpdatedMeditacao, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Meditação salva com sucesso.'
        state.only = ['/admin/meditacoes']
      })
      .addCase(deleteMeditacao, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Meditação removida com sucesso.'
        state.only = ['/admin/meditacoes']
      })
  }
})

export const { closed } = alertSlice.actions

export default alertSlice.reducer
