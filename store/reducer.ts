import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import { employeesAPISlice } from './api/employeesAPISlice'

export default combineReducers({
  entities: entitiesReducer,
  [employeesAPISlice.reducerPath]: employeesAPISlice.reducer,
})
