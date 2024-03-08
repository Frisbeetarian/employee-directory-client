import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  isEmployeeDataloading: true,
}

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsEmployeeDataLoading: (ui, action) => {
      ui.isEmployeeDataloading = action.payload
    },
  },
})

export const getIsEmployeeDataLoading = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.isEmployeeDataloading
)

export const { setIsEmployeeDataLoading } = slice.actions
export default slice.reducer
