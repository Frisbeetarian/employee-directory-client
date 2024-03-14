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
    addEmployeeToStore: (employees, action) => {
      employees.list.push(action.payload)
    },
    removeEmployee: (employees, action) => {
      const uuid = action.payload
      employees.list = employees.list.filter(
        (employee) => employee.uuid !== uuid
      )

      if (
        employees.selectedEmployee &&
        employees.selectedEmployee.uuid === uuid
      ) {
        employees.selectedEmployee = null
      }
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

export const {
  setEmployees,
  setSelectedEmployee,
  addEmployeeToStore,
  removeEmployee,
} = slice.actions
export default slice.reducer
