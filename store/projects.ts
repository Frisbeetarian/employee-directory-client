import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface ProjectState {
  list: string[]
}

const initialState: ProjectState = {
  list: [],
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
  },
})

export const getProjects = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.list
)

export const { setProjects } = slice.actions
export default slice.reducer
