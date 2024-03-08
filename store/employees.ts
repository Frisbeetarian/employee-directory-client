import { createSlice } from '@reduxjs/toolkit'

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

export const { setEmployees } = slice.actions
export default slice.reducer
