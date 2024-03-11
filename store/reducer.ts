import { combineReducers } from 'redux'

import entitiesReducer from './entities'
import { employeesAPISlice } from './api/employeesAPISlice'
import { searchAPISlice } from '@/store/api/searchAPISlice'
import { departmentsAPISlice } from '@/store/api/departmentsAPISlice'

export default combineReducers({
  entities: entitiesReducer,
  [employeesAPISlice.reducerPath]: employeesAPISlice.reducer,
  [searchAPISlice.reducerPath]: searchAPISlice.reducer,
  [departmentsAPISlice.reducerPath]: departmentsAPISlice.reducer,
})
