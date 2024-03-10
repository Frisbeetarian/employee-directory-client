import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  isEmployeeDataloading: true,
  paginationData: {
    page: 1,
    limit: 12,
    total: 0,
  },
}

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsEmployeeDataLoading: (ui, action) => {
      ui.isEmployeeDataloading = action.payload
    },
    setPaginationData: (ui, action) => {
      ui.paginationData = action.payload
    },
  },
})

export const getIsEmployeeDataLoading = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.isEmployeeDataloading
)

export const getPaginationData = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.paginationData
)

export const { setIsEmployeeDataLoading, setPaginationData } = slice.actions
export default slice.reducer
