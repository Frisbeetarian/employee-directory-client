import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from './employees'
import uiReducer from './ui'

export default combineReducers({
  employees: employeesReducer,
  ui: uiReducer,
})
