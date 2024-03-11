import { combineReducers } from 'redux'

import entitiesReducer from './entities'
import { employeesAPISlice } from './api/employeesAPISlice'
import { searchAPISlice } from '@/store/api/searchAPISlice'
import { departmentsAPISlice } from '@/store/api/departmentsAPISlice'
import { locationsAPISlice } from '@/store/api/locationsAPISlice'
import { projectsAPISlice } from '@/store/api/projectsAPISlice'
import { skillsAPISlice } from '@/store/api/skillsAPISlice'

export default combineReducers({
  entities: entitiesReducer,
  [employeesAPISlice.reducerPath]: employeesAPISlice.reducer,
  [searchAPISlice.reducerPath]: searchAPISlice.reducer,
  [departmentsAPISlice.reducerPath]: departmentsAPISlice.reducer,
  [locationsAPISlice.reducerPath]: locationsAPISlice.reducer,
  [projectsAPISlice.reducerPath]: projectsAPISlice.reducer,
  [skillsAPISlice.reducerPath]: skillsAPISlice.reducer,
})
