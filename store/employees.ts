import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  list: [],
  selectedEmployee: null,
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
    setSelectedEmployee: (employees, action) => {
      employees.selectedEmployee = action.payload
    },
  },
})

export const getEmployees = createSelector(
  (state) => state.entities.employees,
  (employees) => employees.list
)

export const getSelectedEmployee = createSelector(
  (state) => state.entities.employees,
  (employees) => employees.selectedEmployee
)

export const { setEmployees, setSelectedEmployee } = slice.actions
export default slice.reducer
