import { combineReducers } from 'redux'

import entitiesReducer from './entities'
import { employeesAPISlice } from './api/employeesAPISlice'
import { searchAPISlice } from '@/store/api/searchAPISlice'

export default combineReducers({
  entities: entitiesReducer,
  [employeesAPISlice.reducerPath]: employeesAPISlice.reducer,
  [searchAPISlice.reducerPath]: searchAPISlice.reducer,
})
