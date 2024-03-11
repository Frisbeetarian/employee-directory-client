import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from './employees'
import uiReducer from './ui'
import searchReducer from './search'
import departmentsReducer from './departments'

export default combineReducers({
  employees: employeesReducer,
  ui: uiReducer,
  search: searchReducer,
  departments: departmentsReducer,
})
