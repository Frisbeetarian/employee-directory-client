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
    setSelectedProject: (projects, action) => {
      projects.selectedProjects = action.payload
    },
  },
})

export const getProjects = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.list
)

export const getSelectedProject = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.selectedProjects
)

export const { setProjects, setSelectedProject } = slice.actions
export default slice.reducer
