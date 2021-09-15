import { createSlice } from '@reduxjs/toolkit'
import { createdOrUpdated as createdOrUpdatedDiario } from './diario'
import { redefinirSenha } from './auth'
import {
  createdOrUpdated as createdOrUpdatedMeditacao,
  deleteMeditacao
} from './admin/meditacoes'
import {
  createdOrUpdated as createdOrUpdatedNovidade,
  deleteNovidade
} from './admin/novidades'
import { nameUpdated, passwordUpdated } from './perfil'
import { habitoFailedCreate, habitoFailedUpdate, habitoUpdated } from './habito'
import {
  sentimentoFailedCreate,
  sentimentoFailedUpdate,
  sentimentoUpdated
} from './sentimento'

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
      .addCase(createdOrUpdatedNovidade, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Novidade salva com sucesso.'
        state.only = ['/admin/novidades']
      })
      .addCase(deleteNovidade, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Novidade removida com sucesso.'
        state.only = ['/admin/novidades']
      })
      .addCase(nameUpdated, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Nome alterado com sucesso.'
        state.only = ['/app/perfil/dados']
      })
      .addCase(passwordUpdated, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Senha alterada com sucesso.'
        state.only = ['/app/perfil/dados']
      })
      .addCase(habitoUpdated, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Hábito atualizado com sucesso.'
        state.only = []
      })
      .addCase(habitoFailedUpdate, state => {
        state.severity = AlertSeverity.Warning
        state.message = 'A atualização do hábito falhou.'
        state.only = []
      })
      .addCase(habitoFailedCreate, state => {
        state.severity = AlertSeverity.Warning
        state.message = 'A criação do hábito falhou.'
        state.only = []
      })
      .addCase(sentimentoUpdated, state => {
        state.severity = AlertSeverity.Success
        state.message = 'Sentimento atualizado com sucesso.'
        state.only = []
      })
      .addCase(sentimentoFailedUpdate, state => {
        state.severity = AlertSeverity.Warning
        state.message = 'A atualização do sentimento falhou.'
        state.only = []
      })
      .addCase(sentimentoFailedCreate, state => {
        state.severity = AlertSeverity.Warning
        state.message = 'A criação do sentimento falhou.'
        state.only = []
      })
  }
})

export const { closed } = alertSlice.actions

export default alertSlice.reducer
