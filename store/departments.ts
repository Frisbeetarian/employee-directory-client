import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface DepartmentState {
  list: string[]
}

const initialState: DepartmentState = {
  list: [],
}

const slice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setEmployees: (departments, action) => {
      if (action.payload) {
        departments.list = action.payload
      }
    },
  },
})

export const getDepartments = createSelector(
  (state) => state.entities.departments,
  (departments) => departments.list
)

export const { setEmployees } = slice.actions
export default slice.reducer
