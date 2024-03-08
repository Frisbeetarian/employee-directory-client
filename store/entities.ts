import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from './employees'

export default combineReducers({
  employees: employeesReducer,
})
