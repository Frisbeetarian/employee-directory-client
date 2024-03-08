import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  list: {},
}

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (employees, action) => {
      if (action.payload) {
        employees.list = action.payload
      }
    },
  },
})

export const getEmployees = createSelector(
  (state) => state.entities.employees,
  (employees) => employees.list
)

export const { setEmployees } = slice.actions
export default slice.reducer
