import { createAction } from '@reduxjs/toolkit'

export const sentimentoUpdated = createAction('sentimento/sentimentoUpdated')
export const sentimentoFailedUpdate = createAction(
  'sentimento/sentimentoFailedUpdate'
)
export const sentimentoFailedCreate = createAction(
  'sentimento/sentimentoFailedCreate'
)

export default {}
