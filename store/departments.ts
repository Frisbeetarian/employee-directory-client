import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface DepartmentState {
  list: string[]
  selectedDepartment: string | null
}

const initialState: DepartmentState = {
  list: [],
  selectedDepartment: null,
}

const slice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments: (departments, action) => {
      if (action.payload) {
        departments.list = action.payload
      }
    },
    setSelectedDepartment: (departments, action) => {
      departments.selectedDepartment = action.payload
    },
  },
})

export const getDepartments = createSelector(
  (state) => state.entities.departments,
  (departments) => departments.list
)

export const getSelectedDepartment = createSelector(
  (state) => state.entities.departments,
  (departments) => departments.selectedDepartment
)

export const { setDepartments, setSelectedDepartment } = slice.actions
export default slice.reducer
