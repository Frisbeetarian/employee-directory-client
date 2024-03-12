import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  isEmployeeDataloading: true,
  paginationData: {
    page: 1,
    limit: 12,
    pageCount: 0,
    totalCount: 0,
  },
  shouldFetchEmployees: true,
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
    setShouldFetchEmployees: (ui, action) => {
      ui.shouldFetchEmployees = action.payload
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

export const getShouldFetchEmployees = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.shouldFetchEmployees
)

export const {
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchEmployees,
} = slice.actions
export default slice.reducer
