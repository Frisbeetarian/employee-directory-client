import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: {},
}

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (employees, action) => {
      if (action.payload) {
        employees.employees = action.payload
      }
    },
  },
})

export const { setEmployees } = slice.actions
export default slice.reducer
