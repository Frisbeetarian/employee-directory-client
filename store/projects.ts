import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface ProjectState {
  list: string[]
  selectedProjects: string | null
}

const initialState: ProjectState = {
  list: [],
  selectedProjects: null,
}

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (projects, action) => {
      if (action.payload) {
        projects.list = action.payload
      }
    },
    setSelectedProjects: (projects, action) => {
      projects.selectedProjects = action.payload
    },
  },
})

export const getProjects = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.list
)

export const getSelectedProjects = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.selectedProjects
)

export const { setProjects, setSelectedProjects } = slice.actions
export default slice.reducer
