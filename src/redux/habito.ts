import { createAction } from '@reduxjs/toolkit'

export const habitoUpdated = createAction('habito/habitoUpdated')
export const habitoFailedUpdate = createAction('habito/habitoFailedUpdate')
export const habitoFailedCreate = createAction('habito/habitoFailedCreate')

export default {}
