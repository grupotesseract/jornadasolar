import { combineReducers } from '@reduxjs/toolkit'
import cadastro from './cadastro'
import alert from './alert'

const rootReducer = combineReducers({
  cadastro,
  alert
})

export default rootReducer
