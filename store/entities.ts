import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from './employees'
import uiReducer from './ui'
import searchReducer from './search'
import departmentsReducer from './departments'
import locationsReducer from './locations'
import projectsReducer from './projects'
import skillsReducer from './skills'

export default combineReducers({
  employees: employeesReducer,
  ui: uiReducer,
  search: searchReducer,
  departments: departmentsReducer,
  locations: locationsReducer,
  projects: projectsReducer,
  skills: skillsReducer,
})
