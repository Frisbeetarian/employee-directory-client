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
  activeIndex: 'employees',
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
    setActiveIndex: (ui, action) => {
      ui.activeIndex = action.payload
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

export const getActiveIndex = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.activeIndex
)

export const {
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchEmployees,
  setActiveIndex,
} = slice.actions
export default slice.reducer
