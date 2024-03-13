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
  shouldFetchDepartmentEmployees: false,
  shouldFetchLocationEmployees: false,
  shouldFetchProjectEmployees: false,
  shouldFetchSkillEmployees: false,
  activeIndex: 'employees',
  isDrawerOpen: false,
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
    setShouldFetchDepartmentEmployees: (ui, action) => {
      ui.shouldFetchDepartmentEmployees = action.payload
    },
    setShouldFetchLocationEmployees: (ui, action) => {
      ui.shouldFetchLocationEmployees = action.payload
    },
    setShouldFetchProjectEmployees: (ui, action) => {
      ui.shouldFetchProjectEmployees = action.payload
    },
    setShouldFetchSkillEmployees: (ui, action) => {
      ui.shouldFetchSkillEmployees = action.payload
    },
    setIsDrawerOpen: (ui, action) => {
      ui.isDrawerOpen = action.payload
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

export const getShouldFetchDepartmentEmployees = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.shouldFetchDepartmentEmployees
)

export const getShouldFetchLocationEmployees = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.shouldFetchLocationEmployees
)

export const getShouldFetchProjectEmployees = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.shouldFetchProjectEmployees
)

export const getShouldFetchSkillEmployees = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.shouldFetchSkillEmployees
)

export const getIsDrawerOpen = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.isDrawerOpen
)

export const {
  setIsEmployeeDataLoading,
  setPaginationData,
  setShouldFetchEmployees,
  setActiveIndex,
  setShouldFetchDepartmentEmployees,
  setShouldFetchLocationEmployees,
  setShouldFetchProjectEmployees,
  setShouldFetchSkillEmployees,
  setIsDrawerOpen,
} = slice.actions
export default slice.reducer
